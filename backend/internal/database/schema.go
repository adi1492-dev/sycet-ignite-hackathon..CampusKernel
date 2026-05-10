package database

import (
	"log"
)

func InitSchema() {
	query := `
	CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

	CREATE TABLE IF NOT EXISTS users (
		id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
		email VARCHAR(255) UNIQUE NOT NULL,
		password_hash TEXT NOT NULL,
		name VARCHAR(255) NOT NULL,
		role VARCHAR(20) NOT NULL DEFAULT 'student', -- student, teacher
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
	);

	CREATE TABLE IF NOT EXISTS marks (
		id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
		student_id UUID REFERENCES users(id),
		subject VARCHAR(255) NOT NULL,
		marks INT DEFAULT 0,
		uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
	);

	CREATE TABLE IF NOT EXISTS submissions (
		id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
		student_id UUID REFERENCES users(id),
		code TEXT NOT NULL,
		language VARCHAR(20) NOT NULL, -- c, rust, go
		status VARCHAR(20) NOT NULL DEFAULT 'pending', -- pending, queued, running, completed, failed
		output TEXT,
		execution_time_ms INT,
		submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		completed_at TIMESTAMP
	);

	CREATE TABLE IF NOT EXISTS files (
		id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
		filename VARCHAR(255) NOT NULL,
		file_path TEXT NOT NULL,
		file_size INT,
		uploaded_by UUID REFERENCES users(id),
		uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
	);

	CREATE TABLE IF NOT EXISTS assignments (
		id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
		title VARCHAR(255) NOT NULL,
		description TEXT,
		due_date TIMESTAMP,
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
	);

	CREATE TABLE IF NOT EXISTS attendance (
		id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
		student_id UUID REFERENCES users(id),
		date DATE DEFAULT CURRENT_DATE,
		status VARCHAR(20) NOT NULL DEFAULT 'present', -- present, absent, late
		UNIQUE(student_id, date)
	);
	`
	_, err := DB.Exec(query)
	if err != nil {
		log.Fatal("Failed to initialize schema:", err)
	}
	log.Println("Database schema initialized successfully")
}
