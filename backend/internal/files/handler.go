package files

import (
	"campuskernal/backend/internal/database"
	"fmt"
	"os"
	"path/filepath"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

func UploadFile(c *fiber.Ctx) error {
	userID := c.Locals("user_id").(string)
	file, err := c.FormFile("file")
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "File upload failed"})
	}

	// Create uploads directory if it doesn't exist
	uploadDir := "./uploads"
	if _, err := os.Stat(uploadDir); os.IsNotExist(err) {
		os.Mkdir(uploadDir, 0755)
	}

	filename := fmt.Sprintf("%s-%s", uuid.New().String(), file.Filename)
	filePath := filepath.Join(uploadDir, filename)

	if err := c.SaveFile(file, filePath); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to save file"})
	}

	// Save to DB
	query := `INSERT INTO files (filename, file_path, file_size, uploaded_by) VALUES ($1, $2, $3, $4) RETURNING id`
	var fileID string
	err = database.DB.QueryRow(query, file.Filename, filePath, file.Size, userID).Scan(&fileID)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to save file metadata"})
	}

	return c.JSON(fiber.Map{
		"message":   "File uploaded successfully",
		"file_id":   fileID,
		"file_path": filePath,
	})
}

func GetFiles(c *fiber.Ctx) error {
	rows, err := database.DB.Query(`SELECT id, filename, file_path, file_size, uploaded_at FROM files ORDER BY uploaded_at DESC`)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to fetch files"})
	}
	defer rows.Close()

	var files []fiber.Map
	for rows.Next() {
		var id, filename, path, uploadedAt string
		var size int
		if err := rows.Scan(&id, &filename, &path, &size, &uploadedAt); err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to scan files"})
		}
		files = append(files, fiber.Map{
			"id":          id,
			"filename":    filename,
			"url":         fmt.Sprintf("/api/files/download/%s", id), // Placeholder for download route
			"size":        size,
			"uploaded_at": uploadedAt,
		})
	}

	return c.JSON(files)
}

func DownloadFile(c *fiber.Ctx) error {
	fileID := c.Params("id")
	var filePath, filename string
	err := database.DB.QueryRow(`SELECT file_path, filename FROM files WHERE id = $1`, fileID).Scan(&filePath, &filename)
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "File not found"})
	}

	return c.Download(filePath, filename)
}
