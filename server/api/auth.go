package api

import (
	"encoding/json"
	"net/http"
	"strconv"
	"time"

	"github.com/szeying02/panther/server/database"
	"github.com/szeying02/panther/server/database/queries"
	"github.com/szeying02/panther/server/middleware"
	"github.com/szeying02/panther/server/models"
)

// Create Authentication Token
func CreateAuthToken(w http.ResponseWriter, id, username string) {

	// Generate JWT
	tokenString, err := middleware.GenerateJWT(id, username)

	hasError := CheckInternalServerError(w, err)
	if hasError {
		return
	}

	http.SetCookie(w, &http.Cookie{
		Name:    "token",
		Value:   tokenString,
		MaxAge:  600,
		Expires: time.Now().Add(10 * time.Minute),
		Path:    "/",
	})
}

// Logs user in
func Login(w http.ResponseWriter, r *http.Request) {
	var user models.User
	err := json.NewDecoder(r.Body).Decode(&user)

	hasError := CheckInternalServerError(w, err)
	if hasError {
		return
	}

	id, password, err := queries.Login(database.DB, user.Username)

	if err != nil || user.Password != password {
		w.WriteHeader(400)
		w.Write([]byte("Incorrect username or password"))
		return
	}

	CreateAuthToken(w, strconv.Itoa(id), user.Username)
}

// Register a new user
func Register(w http.ResponseWriter, r *http.Request) {
	var user models.User
	err := json.NewDecoder(r.Body).Decode(&user)

	hasError := CheckInternalServerError(w, err)
	if hasError {
		return
	}

	id, err := queries.Register(database.DB, user.Username, user.Password)

	if err != nil {
		w.WriteHeader(400)
		w.Write([]byte("Username is taken"))
		return
	}

	CreateAuthToken(w, strconv.Itoa(id), user.Username)
}

// Logs user out
func Logout(w http.ResponseWriter, r *http.Request) {
	// Sets cookie it's expiry to now
	http.SetCookie(w, &http.Cookie{
		Name:    "token",
		MaxAge:  -1,
		Expires: time.Now().Add(-1 * time.Minute),
		Path:    "/",
	})
}
