package queries

import (
	"fmt"

	"github.com/szeying02/panther/server/database"
)

// Creates a new user given the username and password
func CreateUser(db database.Database, username, password string) (int, error) {
	stringQuery := fmt.Sprintf("INSERT INTO users (username, password) VALUES ('%s', '%s') RETURNING id;", username, password)
	row := db.Conn.QueryRow(stringQuery)

	var id int
	err := row.Scan(&id)

	if err != nil {
		return 0, err
	}

	return id, err
}
