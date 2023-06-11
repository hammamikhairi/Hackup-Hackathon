package serveragent

import (
	"encoding/json"
	"fmt"
	scl "hackup/SQLClient"
	. "hackup/Types"
	utils "hackup/Utils"
	"math/rand"
	"net/http"
)

type ServerAgent struct {
	sqlc *scl.SQLClient
}

func ServerAgentInit() ServerAgent {
	return ServerAgent{
		scl.OpenConn(),
	}
}

func (ag *ServerAgent) GetPosts(w http.ResponseWriter, req *http.Request) {
	utils.Log("<Fetched Posts>")

	w.Header().Set("Access-Control-Allow-Origin", "*")

	rows := ag.sqlc.GetRows(
		fmt.Sprintf(
			"select * from %s order by id desc",
			scl.TBN_POSTS,
		),
	)
	defer rows.Close()

	var posts []Post = []Post{}
	for rows.Next() {
		post := Post{}
		rows.Scan(&post.Id, &post.Title, &post.Body)
		posts = append(posts, post)
	}

	json.NewEncoder(w).Encode(posts)
}

func (ag *ServerAgent) GetUsers(w http.ResponseWriter, req *http.Request) {
	utils.Log("<Fetched Users>")

	w.Header().Set("Access-Control-Allow-Origin", "*")

	rows := ag.sqlc.GetRows(
		fmt.Sprintf(
			"select * from %s",
			scl.TBN_USERS,
		),
	)
	defer rows.Close()

	var users []User = []User{}
	for rows.Next() {
		user := User{}
		rows.Scan(&user.UserId, &user.Name, &user.Username, &user.Email, &user.Phone, &user.HireDate)
		users = append(users, user)
	}

	json.NewEncoder(w).Encode(users)
}

func (ag *ServerAgent) GetUser(w http.ResponseWriter, req *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")

	userId := req.URL.Query().Get("userId")
	rows := ag.sqlc.GetRows(
		fmt.Sprintf(
			"select * from USERS where USER_ID = '%s'",
			userId,
		),
	)
	rows.Next()
	defer rows.Close()

	user := User{}
	rows.Scan(&user.UserId, &user.Name, &user.Username, &user.Email, &user.Phone, &user.HireDate)

	json.NewEncoder(w).Encode(user)
}

func (ag *ServerAgent) GetUserTasks(w http.ResponseWriter, req *http.Request) {
	userId := req.URL.Query().Get("userId")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	utils.Log("get user score <" + userId + ">")
	rows := ag.sqlc.GetRows(
		fmt.Sprintf(
			"select score, task from SCORES where USER_ID = '%s'",
			userId,
		),
	)
	defer rows.Close()

	tasks := []Task{}
	for rows.Next() {
		task := Task{}
		rows.Scan(&task.Score, &task.Name)
		tasks = append(tasks, task)
	}

	json.NewEncoder(w).Encode(tasks)
}

func (ag *ServerAgent) GetUserScore(w http.ResponseWriter, req *http.Request) {
	userId := req.URL.Query().Get("userId")
	utils.Log("get user score <" + userId + ">")
	rows := ag.sqlc.GetRows(
		fmt.Sprintf(
			"select sum(score) from SCORES where USER_ID = '%s'",
			userId,
		),
	)
	rows.Next()
	defer rows.Close()
	w.Header().Set("Access-Control-Allow-Origin", "*")

	userScore := UserScore{
		UserId: userId,
	}

	if err := rows.Scan(&userScore.Score); err != nil {
		fmt.Println(err)
	}

	json.NewEncoder(w).Encode(userScore)
}

func (ag *ServerAgent) GetTasks(w http.ResponseWriter, req *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")

	rows := ag.sqlc.GetRows(
		fmt.Sprintf(
			"select score, task from SCORES",
		),
	)
	defer rows.Close()

	var tasks []Task = []Task{}
	for rows.Next() {
		task := Task{}
		rows.Scan(&task.Score, &task.Name)
		tasks = append(tasks, task)
	}

	json.NewEncoder(w).Encode(tasks)
}

func (ag *ServerAgent) HandleFormSubmission(w http.ResponseWriter, req *http.Request) {
	if req.Method == "POST" {
		title := req.FormValue("title")
		body := req.FormValue("body")

		query := fmt.Sprintf(
			"INSERT INTO %s VALUES ('%d', '%s', '%s')",
			scl.TB_POSTS,
			rand.Intn(1000),
			title,
			body,
		)
		fmt.Println(query)
		ag.sqlc.Push(query)

		response := "Form submitted successfully"
		fmt.Fprintf(w, response)
	} else {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
}