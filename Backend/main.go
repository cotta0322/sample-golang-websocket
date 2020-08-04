package main

import (
	"fmt"
	"html"
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

func main() {
	hub := newHub()
	go hub.run()

	http.HandleFunc("/api/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Hello, %q", html.EscapeString(r.URL.Path))
	})

	http.HandleFunc("/api/chat/message", func(w http.ResponseWriter, r *http.Request) {
		websocket, err := upgrader.Upgrade(w, r, nil)
		if err != nil {
			log.Fatal("error upgrading GET request to a websocket::", err)
		}
		defer websocket.Close()
		hub.clients[websocket] = true

		for {
			var message RequestMessage
			err := websocket.ReadJSON(&message)
			if err != nil {
				log.Printf("error occurred while reading message: %v", err)
				delete(hub.clients, websocket)
				break
			}
			message.Client = websocket
			hub.message <- message
		}
	})

	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatal("error starting http server::", err)
		return
	}
}
