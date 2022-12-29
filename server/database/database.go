package database

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/lib/pq"
)

const (
	host     = "localhost"
	port     = 5432
	user     = "user"
	password = "password"
	dbname   = "panther"
)

// Create a Database structure
type Database struct {
	Conn *sql.DB
}

// Global Database variable
var DB Database

func ConnectDB() (Database, error) {
	db := Database{}

	// PostgreSQL connection string
	psqlconn := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable", host, port, user, password, dbname)

	// Open DB
	connection, err := sql.Open("postgres", psqlconn)
	CheckError(err)

	if err == nil {
		db.Conn = connection

		// Check DB
		err = connection.Ping()
		CheckError(err)

		fmt.Println("Connected to database!")
		DB = db
	}

	return db, err
}

func CheckError(err error) {
	if err != nil {
		log.Panicln(err)
	}
}
