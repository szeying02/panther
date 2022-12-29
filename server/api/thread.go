package api

import (
	"encoding/json"
	"net/http"

	"github.com/go-chi/chi/v5"

	"github.com/szeying02/panther/server/database"
	"github.com/szeying02/panther/server/database/queries"
	"github.com/szeying02/panther/server/models"
)

// Retrieves all threads
func GetAllThreads(w http.ResponseWriter, r *http.Request) {
	list, err := queries.GetAllThreads(database.DB)

	hasError := CheckInternalServerError(w, err)
	if hasError {
		return
	}

	json.NewEncoder(w).Encode(list)
}

// Creates a thread
func CreateThread(w http.ResponseWriter, r *http.Request) {
	var thread models.ThreadCreationInfo
	err := json.NewDecoder(r.Body).Decode(&thread)

	hasError := CheckInternalServerError(w, err)
	if hasError {
		return
	}

	err = queries.CreateThread(database.DB, thread.Title, thread.Content, thread.UserID, thread.Category)

	hasError = CheckInternalServerError(w, err)
	if hasError {
		return
	}

	w.WriteHeader(200)
	w.Write([]byte("Thread created successfully"))
}

// Retrieve a thread
func GetThread(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	if id == "" {
		http.Error(w, http.StatusText(404), 404)
		return
	}

	thread, err := queries.GetThread(database.DB, id)

	hasError := CheckInternalServerError(w, err)
	if hasError {
		return
	}

	json.NewEncoder(w).Encode(thread)
}

// Deletes a thread
func DeleteThread(w http.ResponseWriter, r *http.Request) {

	id := chi.URLParam(r, "id")
	if id == "" {
		http.Error(w, http.StatusText(404), 404)
		return
	}

	err := queries.DeleteThread(database.DB, id)

	hasError := CheckInternalServerError(w, err)
	if hasError {
		return
	}

	w.WriteHeader(200)
	w.Write([]byte("Thread deleted successfully!"))
}

// Updates a thread
func UpdateThread(w http.ResponseWriter, r *http.Request) {

	var thread models.Thread
	err := json.NewDecoder(r.Body).Decode(&thread)

	hasError := CheckInternalServerError(w, err)
	if hasError {
		return
	}

	err = queries.UpdateThread(database.DB, thread.ID, thread.Title, thread.Content, thread.Category)

	hasError = CheckInternalServerError(w, err)
	if hasError {
		return
	}

	w.WriteHeader(200)
	w.Write([]byte("Thread edited successfully!"))
}

// Filter threads by category
func FilterThreads(w http.ResponseWriter, r *http.Request) {

	category := chi.URLParam(r, "category")
	if category == "" {
		http.Error(w, http.StatusText(404), 404)
		return
	}

	list, err := queries.FilterThreads(database.DB, category)

	hasError := CheckInternalServerError(w, err)
	if hasError {
		return
	}

	json.NewEncoder(w).Encode(list)
}

// Search title and content of threads
func SearchThreads(w http.ResponseWriter, r *http.Request) {
	search := chi.URLParam(r, "search")
	if search == "" {
		http.Error(w, http.StatusText(404), 404)
		return
	}

	list, err := queries.SearchThreads(database.DB, search)

	hasError := CheckInternalServerError(w, err)
	if hasError {
		return
	}

	json.NewEncoder(w).Encode(list)
}

// Search and filter threads
func SearchAndFilterThreads(w http.ResponseWriter, r *http.Request) {
	search := chi.URLParam(r, "search")
	if search == "" {
		http.Error(w, http.StatusText(404), 404)
		return
	}

	category := chi.URLParam(r, "category")
	if category == "" {
		http.Error(w, http.StatusText(404), 404)
		return
	}

	list, err := queries.SearchAndFilterThreads(database.DB, category, search)

	hasError := CheckInternalServerError(w, err)
	if hasError {
		return
	}

	json.NewEncoder(w).Encode(list)
}
