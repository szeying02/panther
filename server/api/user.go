package api

import (
	"encoding/json"
	"net/http"

	"github.com/szeying02/panther/server/middleware"
	"github.com/szeying02/panther/server/models"
)

// Obtains the user id and username claims in JWT
func GetClaims(w http.ResponseWriter, r *http.Request) {
	id, username, err := middleware.ExtractClaims(w, r)

	hasError := CheckInternalServerError(w, err)
	if hasError {
		return
	}

	claimsInfo := &models.ClaimsInfo{
		ID:       id,
		Username: username,
	}

	json.NewEncoder(w).Encode(claimsInfo)
}
