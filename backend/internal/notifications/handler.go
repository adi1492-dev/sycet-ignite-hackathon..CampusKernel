package notifications

import (
	"campuskernal/backend/internal/database"
	"fmt"
	"log"

	"github.com/gofiber/websocket/v2"
)

func SocketHandler(c *websocket.Conn) {
	userID := c.Locals("user_id").(string)
	if userID == "" {
		c.WriteMessage(websocket.TextMessage, []byte("Unauthorized"))
		c.Close()
		return
	}

	channel := fmt.Sprintf("notifications:%s", userID)
	pubsub := database.RedisClient.Subscribe(database.Ctx, channel)
	defer pubsub.Close()

	log.Printf("User %s connected to notifications", userID)

	ch := pubsub.Channel()

	// Listen for Redis messages and send to WebSocket
	for msg := range ch {
		if err := c.WriteMessage(websocket.TextMessage, []byte(msg.Payload)); err != nil {
			log.Printf("Error sending message to user %s: %v", userID, err)
			break
		}
	}
}
