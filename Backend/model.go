package main

import "github.com/gorilla/websocket"

type RequestMessage struct {
	Message string          `json:"message"`
	Client  *websocket.Conn `json:"-"`
}

type ResponseMessage struct {
	Message  string `json:"message"`
	IsMyself bool   `json:"isMyself"`
}
