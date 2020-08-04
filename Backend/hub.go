package main

import (
	"github.com/gorilla/websocket"
)

type Hub struct {
	clients map[*websocket.Conn]bool
	message chan RequestMessage
}

func newHub() *Hub {
	return &Hub{
		clients: make(map[*websocket.Conn]bool),
		message: make(chan RequestMessage),
	}
}

func (hub *Hub) run() {
	for {
		message := <-hub.message
		for client := range hub.clients {
			responseMessage := &ResponseMessage{
				Message:  message.Message,
				IsMyself: client == message.Client,
			}
			client.WriteJSON(responseMessage)
		}
	}
}
