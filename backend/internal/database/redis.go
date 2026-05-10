package database

import (
	"context"
	"log"
	"os"

	"github.com/redis/go-redis/v9"
)

var RedisClient *redis.Client
var Ctx = context.Background()

func ConnectRedis() {
	redisURL := os.Getenv("REDIS_URL")
	if redisURL == "" {
		redisURL = "localhost:6379"
	}

	RedisClient = redis.NewClient(&redis.Options{
		Addr: redisURL,
	})

	_, err := RedisClient.Ping(Ctx).Result()
	if err != nil {
		log.Printf("Warning: Failed to connect to Redis at %s: %v", redisURL, err)
	} else {
		log.Println("Successfully connected to Redis")
	}
}
