package SQLClient

import (
	"database/sql"

	_ "github.com/microsoft/go-mssqldb"

	"fmt"
	"log"
)

var (
	// these credentials will be diabled automatically after the code review
	user     = "khairi"
	password = "@Azure2023"
	server   = "ustal-server.database.windows.net"
	database = "stal"
	port     = 1433
)

type SQLClient struct {
	db *sql.DB
}

const (
	TBN_USERS string = "USERS"
	TBN_POSTS string = "POSTS"

	TB_POSTS string = "POSTS (id, title, body)"
	TB_USERS string = "USERS (user_id, name, username, email)"
)

func OpenConn() *SQLClient {

	connString := fmt.Sprintf("server=%s;user id=%s;password=%s;port=%d;database=%s;",
		server, user, password, port, database)
	var err error

	db, err := sql.Open("sqlserver", connString)
	if err != nil {
		log.Fatal("Error creating connection pool: ", err.Error())
	}

	err = db.Ping()
	var counter uint
	if err != nil {
		fmt.Println(err)
	}
	for err != nil {
		fmt.Printf("Coonection Timed-out to '%s'. Attempt N°%d\n", server, counter)
		counter++
		err = db.Ping()
	}

	log.Printf("SUCC : Connected to DB. <%s@%s:%d>\n", user, database, port)
	return &SQLClient{
		db,
	}
}

func (sc *SQLClient) GetRows(query string) *sql.Rows {
	rows, err := sc.db.Query(query)
	if err != nil {
		panic(err.Error())
	}

	return rows
}

func (sc *SQLClient) Push(query string) {
	_, err := sc.db.Query(query)
	if err != nil {
		panic(err.Error())
	}
}
