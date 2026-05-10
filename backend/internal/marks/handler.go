package marks

import (
	"campuskernal/backend/internal/database"
	"encoding/csv"
	"io"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

type Mark struct {
	ID         string `json:"id"`
	StudentID  string `json:"student_id"`
	Subject    string `json:"subject"`
	Marks      int    `json:"marks"`
	UploadedAt string `json:"uploaded_at"`
}

func GetMarks(c *fiber.Ctx) error {
	userID := c.Locals("user_id").(string)
	role := c.Locals("role").(string)

	var query string
	var args []interface{}

	if role == "teacher" {
		query = `SELECT id, student_id, subject, marks, uploaded_at FROM marks`
	} else {
		query = `SELECT id, student_id, subject, marks, uploaded_at FROM marks WHERE student_id = $1`
		args = append(args, userID)
	}

	rows, err := database.DB.Query(query, args...)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to fetch marks"})
	}
	defer rows.Close()

	var marks []Mark
	for rows.Next() {
		var m Mark
		if err := rows.Scan(&m.ID, &m.StudentID, &m.Subject, &m.Marks, &m.UploadedAt); err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to scan marks"})
		}
		marks = append(marks, m)
	}

	return c.JSON(marks)
}

func UploadMarks(c *fiber.Ctx) error {
	file, err := c.FormFile("file")
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "File upload failed"})
	}

	f, err := file.Open()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to open file"})
	}
	defer f.Close()

	reader := csv.NewReader(f)
	// Skip header
	if _, err := reader.Read(); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Failed to read CSV header"})
	}

	for {
		record, err := reader.Read()
		if err == io.EOF {
			break
		}
		if err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Failed to read CSV record"})
		}

		if len(record) < 3 {
			continue
		}

		studentEmail := record[0]
		subject := record[1]
		markVal, _ := strconv.Atoi(record[2])

		// Find student ID by email
		var studentID string
		err = database.DB.QueryRow(`SELECT id FROM users WHERE email = $1`, studentEmail).Scan(&studentID)
		if err != nil {
			continue // Skip if student not found
		}

		_, err = database.DB.Exec(`INSERT INTO marks (student_id, subject, marks) VALUES ($1, $2, $3)`, studentID, subject, markVal)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to insert mark"})
		}
	}

	return c.JSON(fiber.Map{"message": "Marks uploaded successfully"})
}
