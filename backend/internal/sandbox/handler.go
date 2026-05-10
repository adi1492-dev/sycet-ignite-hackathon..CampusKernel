package sandbox

import (
	"campuskernal/backend/internal/database"
	"context"
	"time"

	"github.com/gofiber/fiber/v2"
)

type SubmitRequest struct {
	Code     string `json:"code"`
	Language string `json:"language"`
}

func SubmitCode(c *fiber.Ctx) error {
	userID := c.Locals("user_id").(string)
	req := new(SubmitRequest)
	if err := c.BodyParser(req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Cannot parse JSON"})
	}

	// 1. Create submission entry
	var submissionID string
	query := `INSERT INTO submissions (student_id, code, language, status) VALUES ($1, $2, $3, 'running') RETURNING id`
	err := database.DB.QueryRow(query, userID, req.Code, req.Language).Scan(&submissionID)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to create submission"})
	}

	// 2. Execute code (Sync for now, should be async with queue in prod)
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()

	result, err := ExecuteCode(ctx, req.Code, req.Language)
	if err != nil {
		// Update status to failed
		database.DB.Exec(`UPDATE submissions SET status = 'failed', output = $1 WHERE id = $2`, err.Error(), submissionID)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	// 3. Update submission with results
	_, err = database.DB.Exec(`UPDATE submissions SET status = $1, output = $2, execution_time_ms = $3, completed_at = CURRENT_TIMESTAMP WHERE id = $4`,
		result.Status, result.Output, result.TimeMS, submissionID)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to update submission result"})
	}

	return c.JSON(fiber.Map{
		"submission_id": submissionID,
		"status":        result.Status,
		"output":        result.Output,
		"time_ms":       result.TimeMS,
	})
}

func GetSubmissions(c *fiber.Ctx) error {
	userID := c.Locals("user_id").(string)
	role := c.Locals("role").(string)

	var query string
	var args []interface{}

	if role == "teacher" {
		query = `SELECT id, student_id, code, language, status, output, execution_time_ms, submitted_at FROM submissions ORDER BY submitted_at DESC`
	} else {
		query = `SELECT id, student_id, code, language, status, output, execution_time_ms, submitted_at FROM submissions WHERE student_id = $1 ORDER BY submitted_at DESC`
		args = append(args, userID)
	}

	rows, err := database.DB.Query(query, args...)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to fetch submissions"})
	}
	defer rows.Close()

	var submissions []fiber.Map
	for rows.Next() {
		var id, studentID, code, lang, status, output, submittedAt string
		var timeMS *int
		if err := rows.Scan(&id, &studentID, &code, &lang, &status, &output, &timeMS, &submittedAt); err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to scan submissions"})
		}
		submissions = append(submissions, fiber.Map{
			"id":                id,
			"student_id":        studentID,
			"code":              code,
			"language":          lang,
			"status":            status,
			"output":            output,
			"execution_time_ms": timeMS,
			"submitted_at":      submittedAt,
		})
	}

	return c.JSON(submissions)
}
