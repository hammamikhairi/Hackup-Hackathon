package main

import (
	ag "hackup/ServerAgent"
	"log"
	"net/http"
)

func main() {

	var agent ag.ServerAgent = ag.ServerAgentInit()

	http.HandleFunc("/posts", agent.GetPosts)
	http.HandleFunc("/users", agent.GetUsers)
	http.HandleFunc("/tasks", agent.GetTasks)
	http.HandleFunc("/submit", agent.HandleFormSubmission)

	// ?userId=<num>
	http.HandleFunc("/userscore", agent.GetUserScore)
	http.HandleFunc("/user", agent.GetUser)
	http.HandleFunc("/usertasks", agent.GetUserTasks)

	if err := http.ListenAndServe(":5051", nil); err != nil {
		log.Fatal("ERR : Server Crashed\n", err)
	}

}
