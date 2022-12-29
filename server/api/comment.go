package api

import (
	"encoding/json"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/szeying02/panther/server/database"
	"github.com/szeying02/panther/server/database/queries"
	"github.com/szeying02/panther/server/models"
)

// Retrieves all comments
func GetAllComments(w http.ResponseWriter, r *http.Request) {
	threadid := chi.URLParam(r, "threadid")
	if threadid == "" {
		http.Error(w, http.StatusText(404), 404)
		return
	}

	list, err := queries.GetAllComments(database.DB, threadid)

	hasError := CheckInternalServerError(w, err)
	if hasError {
		return
	}

	json.NewEncoder(w).Encode(list)
}

// Creates a comment
func CreateComment(w http.ResponseWriter, r *http.Request) {
	var comment models.CommentCreationInfo
	err := json.NewDecoder(r.Body).Decode(&comment)

	hasError := CheckInternalServerError(w, err)
	if hasError {
		return
	}

	err = queries.CreateComment(database.DB, comment.Comment, comment.UserID, comment.ThreadID)

	hasError = CheckInternalServerError(w, err)
	if hasError {
		return
	}

	w.WriteHeader(201)
	w.Write([]byte("Comment created successfully"))
}

// Deletes a comment
func DeleteComment(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	if id == "" {
		http.Error(w, http.StatusText(404), 404)
		return
	}

	err := queries.DeleteComment(database.DB, id)

	hasError := CheckInternalServerError(w, err)
	if hasError {
		return
	}

	w.WriteHeader(200)
	w.Write([]byte("Comment deleted successfully!"))
}

// Updates a comment
func UpdateComment(w http.ResponseWriter, r *http.Request) {
	var comment models.Comment
	err := json.NewDecoder(r.Body).Decode(&comment)

	hasError := CheckInternalServerError(w, err)
	if hasError {
		return
	}

	err = queries.UpdateComment(database.DB, comment.ID, comment.Comment)

	hasError = CheckInternalServerError(w, err)
	if hasError {
		return
	}

	w.WriteHeader(200)
	w.Write([]byte("Thread edited successfully!"))
}
