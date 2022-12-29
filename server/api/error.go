package api

import (
	"net/http"
)

// Checks for 500 Internal Server Error
func CheckInternalServerError(w http.ResponseWriter, err error) bool {
	if err != nil {
		w.WriteHeader(500)
		return true
	}
	return false
}
