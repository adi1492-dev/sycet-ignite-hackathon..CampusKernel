package main

import (
	"log"
	"os"

	"campuskernal/backend/internal/auth"
	"campuskernal/backend/internal/database"
	"campuskernal/backend/internal/files"
	"campuskernal/backend/internal/marks"
	"campuskernal/backend/internal/middleware"
	"campuskernal/backend/internal/notifications"
	"campuskernal/backend/internal/sandbox"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/recover"
	"github.com/gofiber/websocket/v2"
	"github.com/joho/godotenv"
)

func main() {
	// Load .env file
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found, using system environment variables")
	}

	// Connect to Database
	database.Connect()
	database.InitSchema()
	database.ConnectRedis()

	// Create Fiber app
	app := fiber.New(fiber.Config{
		AppName: "CampusKernal API",
	})

	// Middleware
	app.Use(logger.New())
	app.Use(recover.New())

	// Auth routes
	authGroup := app.Group("/api/auth")
	authGroup.Post("/register", auth.Register)
	authGroup.Post("/login", auth.Login)

	// Marks routes
	marksGroup := app.Group("/api/marks", middleware.Protected())
	marksGroup.Get("/", marks.GetMarks)
	marksGroup.Post("/upload", middleware.TeacherOnly(), marks.UploadMarks)

	// Sandbox routes
	sandboxGroup := app.Group("/api/sandbox", middleware.Protected())
	sandboxGroup.Post("/submit", sandbox.SubmitCode)
	sandboxGroup.Get("/submissions", sandbox.GetSubmissions)

	// File routes
	fileGroup := app.Group("/api/files")
	fileGroup.Get("/", files.GetFiles)
	fileGroup.Get("/download/:id", files.DownloadFile)
	fileGroup.Post("/upload", middleware.Protected(), middleware.TeacherOnly(), files.UploadFile)

	// Notification routes (WebSocket)
	app.Get("/ws/notifications", middleware.Protected(), websocket.New(notifications.SocketHandler))

	// Serve static uploads
	app.Static("/uploads", "./uploads")

	// Basic route
	app.Get("/health", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{
			"status": "up",
			"message": "CampusKernal API is running",
		})
	})

	// Start server
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Fatal(app.Listen(":" + port))
}
