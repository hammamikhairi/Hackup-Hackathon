package types

type User struct {
	UserId   string `json:"user_id"`
	Name     string `json:"name"`
	Username string `json:"username"`
	Email    string `json:"email"`
	Phone    string `json:"phone"`
	HireDate string `json:"hire_date"`
}

type Post struct {
	Id    int    `json:"id"`
	Title string `json:"title"`
	Body  string `json:"body"`
}

type UserScore struct {
	UserId string `json:"user_id"`
	Score  int    `json:"score"`
}

type Task struct {
	Name  string `json:"name"`
	Score int    `json:"score"`
}
