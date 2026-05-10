package sandbox

import (
	"bytes"
	"context"
	"fmt"
	"io/ioutil"
	"os"
	"os/exec"
	"path/filepath"
	"time"
)

type ExecutionResult struct {
	Output     string
	TimeMS     int
	Status     string // completed, failed, timeout
	ExitCode   int
}

func ExecuteCode(ctx context.Context, code string, language string) (*ExecutionResult, error) {
	// Create temporary directory for execution
	tmpDir, err := ioutil.TempDir("", "sandbox-*")
	if err != nil {
		return nil, fmt.Errorf("failed to create temp dir: %v", err)
	}
	defer os.RemoveAll(tmpDir)

	var cmd *exec.Cmd
	var fileName string
	var outputBuffer bytes.Buffer

	startTime := time.Now()

	switch language {
	case "c":
		fileName = filepath.Join(tmpDir, "main.c")
		binaryName := filepath.Join(tmpDir, "main.exe")
		if err := ioutil.WriteFile(fileName, []byte(code), 0644); err != nil {
			return nil, err
		}
		
		// Compile
		compileCmd := exec.CommandContext(ctx, "gcc", fileName, "-o", binaryName)
		if out, err := compileCmd.CombinedOutput(); err != nil {
			return &ExecutionResult{
				Output: string(out),
				Status: "failed",
				TimeMS: int(time.Since(startTime).Milliseconds()),
			}, nil
		}
		cmd = exec.CommandContext(ctx, binaryName)

	case "go":
		fileName = filepath.Join(tmpDir, "main.go")
		if err := ioutil.WriteFile(fileName, []byte(code), 0644); err != nil {
			return nil, err
		}
		cmd = exec.CommandContext(ctx, "go", "run", fileName)

	case "rust":
		fileName = filepath.Join(tmpDir, "main.rs")
		binaryName := filepath.Join(tmpDir, "main.exe")
		if err := ioutil.WriteFile(fileName, []byte(code), 0644); err != nil {
			return nil, err
		}
		
		// Compile
		compileCmd := exec.CommandContext(ctx, "rustc", fileName, "-o", binaryName)
		if out, err := compileCmd.CombinedOutput(); err != nil {
			return &ExecutionResult{
				Output: string(out),
				Status: "failed",
				TimeMS: int(time.Since(startTime).Milliseconds()),
			}, nil
		}
		cmd = exec.CommandContext(ctx, binaryName)

	default:
		return nil, fmt.Errorf("unsupported language: %s", language)
	}

	cmd.Stdout = &outputBuffer
	cmd.Stderr = &outputBuffer

	// Set a timeout
	done := make(chan error, 1)
	go func() {
		done <- cmd.Run()
	}()

	select {
	case <-ctx.Done():
		if cmd.Process != nil {
			cmd.Process.Kill()
		}
		return nil, ctx.Err()
	case <-time.After(10 * time.Second):
		if cmd.Process != nil {
			cmd.Process.Kill()
		}
		return &ExecutionResult{
			Output: "Execution timed out (10s limit)",
			Status: "timeout",
			TimeMS: int(time.Since(startTime).Milliseconds()),
		}, nil
	case err := <-done:
		executionTime := int(time.Since(startTime).Milliseconds())
		if err != nil {
			return &ExecutionResult{
				Output:   outputBuffer.String(),
				Status:   "failed",
				TimeMS:   executionTime,
				ExitCode: cmd.ProcessState.ExitCode(),
			}, nil
		}

		return &ExecutionResult{
			Output: outputBuffer.String(),
			Status: "completed",
			TimeMS: executionTime,
		}, nil
	}
}
