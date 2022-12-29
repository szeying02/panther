package queries

import (
	"fmt"

	"github.com/szeying02/panther/server/database"
)

// Obtains user ID and password given the username from DB
func Login(db database.Database, username string) (int, string, error) {

	stringQuery := fmt.Sprintf("SELECT id, password FROM users WHERE username = '%s';", username)
	row := db.Conn.QueryRow(stringQuery)

	type UserInfo struct {
		ID       int
		Password string
	}

	userInfo := &UserInfo{}

	err := row.Scan(&userInfo.ID, &userInfo.Password)

	return userInfo.ID, userInfo.Password, err
}

// Creates a user given the username and password.
func Register(db database.Database, username, password string) (int, error) {
	id, err := CreateUser(db, username, password)
	return id, err
}
