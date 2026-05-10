package sandbox

import (
	"bytes"
	"context"
	"fmt"
	"io"
	"os"
	"time"

	"github.com/docker/docker/api/types"
	"github.com/docker/docker/api/types/container"
	"github.com/docker/docker/client"
	"github.com/docker/docker/pkg/stdcopy"
)

type ExecutionResult struct {
	Output     string
	TimeMS     int
	Status     string // completed, failed, timeout
	ExitCode   int
}

func ExecuteCode(ctx context.Context, code string, language string) (*ExecutionResult, error) {
	cli, err := client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
	if err != nil {
		return nil, fmt.Errorf("failed to create docker client: %v", err)
	}
	defer cli.Close()

	var image string
	var cmd []string

	switch language {
	case "c":
		image = "gcc:latest"
		cmd = []string{"sh", "-c", fmt.Sprintf("echo '%s' > main.c && gcc main.c -o main && ./main", code)}
	case "go":
		image = "golang:latest"
		cmd = []string{"sh", "-c", fmt.Sprintf("echo '%s' > main.go && go run main.go", code)}
	case "rust":
		image = "rust:latest"
		cmd = []string{"sh", "-c", fmt.Sprintf("echo '%s' > main.rs && rustc main.rs -o main && ./main", code)}
	default:
		return nil, fmt.Errorf("unsupported language: %s", language)
	}

	// Create container
	resp, err := cli.ContainerCreate(ctx, &container.Config{
		Image: image,
		Cmd:   cmd,
		Tty:   false,
	}, &container.HostConfig{
		Resources: container.Resources{
			Memory: 128 * 1024 * 1024, // 128MB limit
		},
	}, nil, nil, "")
	if err != nil {
		return nil, fmt.Errorf("failed to create container: %v", err)
	}

	defer func() {
		// Clean up container
		cli.ContainerRemove(ctx, resp.ID, types.ContainerRemoveOptions{Force: true})
	}()

	startTime := time.Now()

	// Start container
	if err := cli.ContainerStart(ctx, resp.ID, types.ContainerStartOptions{}); err != nil {
		return nil, fmt.Errorf("failed to start container: %v", err)
	}

	// Wait for container to exit or timeout
	statusCh, errCh := cli.ContainerWait(ctx, resp.ID, container.WaitConditionNotRunning)
	
	select {
	case err := <-errCh:
		if err != nil {
			return nil, fmt.Errorf("error waiting for container: %v", err)
		}
	case <-statusCh:
		// Container finished
	case <-time.After(10 * time.Second):
		return &ExecutionResult{
			Output: "Execution timed out (10s limit)",
			Status: "timeout",
			TimeMS: int(time.Since(startTime).Milliseconds()),
		}, nil
	}

	executionTime := int(time.Since(startTime).Milliseconds())

	// Get logs
	out, err := cli.ContainerLogs(ctx, resp.ID, types.ContainerLogsOptions{ShowStdout: true, ShowStderr: true})
	if err != nil {
		return nil, fmt.Errorf("failed to get container logs: %v", err)
	}
	defer out.Close()

	var stdout, stderr bytes.Buffer
	_, err = stdcopy.StdCopy(&stdout, &stderr, out)
	if err != nil {
		return nil, fmt.Errorf("failed to copy logs: %v", err)
	}

	output := stdout.String() + stderr.String()

	return &ExecutionResult{
		Output: output,
		TimeMS: executionTime,
		Status: "completed",
	}, nil
}
