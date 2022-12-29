package queries

import (
	"fmt"

	"github.com/szeying02/panther/server/database"
	"github.com/szeying02/panther/server/models"
)

// Obtains a list of threads in database sorted in descending order
func GetAllThreads(db database.Database) (*models.ThreadList, error) {
	list := &models.ThreadList{}

	rows, err := db.Conn.Query("SELECT threads.id, users.username, threads.title, threads.content, FLOOR(EXTRACT(EPOCH FROM (current_timestamp - threads.datetime))) AS timediff, threads.category, COUNT(comments.thread_id) AS comments FROM threads LEFT JOIN comments ON threads.id = comments.thread_id LEFT JOIN users ON users.id = threads.user_id GROUP BY (threads.id, users.username) ORDER BY threads.datetime DESC;")

	// Loop through every row and append each row of comment into the list
	if err == nil {
		for rows.Next() {
			var thread models.Thread
			err := rows.Scan(&thread.ID, &thread.Username, &thread.Title, &thread.Content, &thread.Timediff, &thread.Category, &thread.Comments)
			if err != nil {
				return list, err
			}
			list.Thread = append(list.Thread, thread)
		}
	}

	return list, err
}

// Create a new thread given the relevant data
func CreateThread(db database.Database, title, content, userid, category string) error {
	stringQuery := fmt.Sprintf("INSERT INTO threads (user_id, title, content, datetime, category) VALUES ('%s', '%s', '%s', current_timestamp, '%s');", userid, title, content, category)
	_, err := db.Conn.Exec(stringQuery)

	return err
}

// Obtains a single thread given the thread id
func GetThread(db database.Database, id string) (*models.Thread, error) {
	thread := &models.Thread{}

	stringQuery := fmt.Sprintf("SELECT threads.id, users.username, threads.title, threads.content, FLOOR(EXTRACT(EPOCH FROM (current_timestamp - threads.datetime))) AS timediff, threads.category, COUNT(comments.thread_id) AS comments FROM threads LEFT JOIN comments ON threads.id = comments.thread_id LEFT JOIN users ON users.id = threads.user_id WHERE threads.id = %s GROUP BY (threads.id, users.username);", id)

	// get row from the database
	row := db.Conn.QueryRow(stringQuery)

	err := row.Scan(&thread.ID, &thread.Username, &thread.Title, &thread.Content, &thread.Timediff, &thread.Category, &thread.Comments)

	return thread, err
}

// Deletes the thread and its respective comments
func DeleteThread(db database.Database, id string) error {

	err := DeleteAllThreadComments(db, id)
	if err != nil {
		return err
	}

	stringQuery := fmt.Sprintf("DELETE FROM threads WHERE threads.id = %s;", id)

	_, err = db.Conn.Exec(stringQuery)

	return err
}

// Updates the thread given the relevant data
func UpdateThread(db database.Database, id, title, content, category string) error {
	stringQuery := fmt.Sprintf("UPDATE threads SET title = '%s', content = '%s', category = '%s' WHERE threads.id = %s;", title, content, category, id)

	_, err := db.Conn.Exec(stringQuery)

	return err
}

// Filters the threads by given categories
func FilterThreads(db database.Database, category string) (*models.ThreadList, error) {
	list := &models.ThreadList{}

	stringQuery := fmt.Sprintf("SELECT threads.id, users.username, threads.title, threads.content, FLOOR(EXTRACT(EPOCH FROM (current_timestamp - threads.datetime))) AS timediff, threads.category, COUNT(comments.thread_id) AS comments FROM threads LEFT JOIN comments ON threads.id = comments.thread_id LEFT JOIN users ON users.id = threads.user_id WHERE threads.category = '%s' GROUP BY (threads.id, users.username) ORDER BY threads.datetime DESC;", category)

	rows, err := db.Conn.Query(stringQuery)

	// Loop through every row and append each row of comment into the list
	if err == nil {
		for rows.Next() {
			var thread models.Thread
			err := rows.Scan(&thread.ID, &thread.Username, &thread.Title, &thread.Content, &thread.Timediff, &thread.Category, &thread.Comments)
			if err != nil {
				return list, err
			}
			list.Thread = append(list.Thread, thread)
		}
	}

	return list, err
}

// Search all threads (title and content) given the search string
func SearchThreads(db database.Database, search string) (*models.ThreadList, error) {
	list := &models.ThreadList{}

	stringQuery := fmt.Sprintf("SELECT threads.id, users.username, threads.title, threads.content, FLOOR(EXTRACT(EPOCH FROM (current_timestamp - threads.datetime))) AS timediff, threads.category, COUNT(comments.thread_id) AS comments FROM threads LEFT JOIN comments ON threads.id = comments.thread_id LEFT JOIN users ON users.id = threads.user_id WHERE to_tsvector(threads.title) @@ to_tsquery('%s') OR to_tsvector(threads.content) @@ to_tsquery('%s') GROUP BY (threads.id, users.username);", search, search)

	rows, err := db.Conn.Query(stringQuery)

	// Loop through every row and append each row of comment into the list
	if err == nil {
		for rows.Next() {
			var thread models.Thread
			err = rows.Scan(&thread.ID, &thread.Username, &thread.Title, &thread.Content, &thread.Timediff, &thread.Category, &thread.Comments)
			if err != nil {
				return list, err
			}
			list.Thread = append(list.Thread, thread)
		}
	}

	return list, err
}

// Search all threads (title and content) given the search string AND filters the for threads in a given category
func SearchAndFilterThreads(db database.Database, category, search string) (*models.ThreadList, error) {
	list := &models.ThreadList{}

	stringQuery := fmt.Sprintf("SELECT threads.id, users.username, threads.title, threads.content, FLOOR(EXTRACT(EPOCH FROM (current_timestamp - threads.datetime))) AS timediff, threads.category, COUNT(comments.thread_id) AS comments FROM threads LEFT JOIN comments ON threads.id = comments.thread_id LEFT JOIN users ON users.id = threads.user_id WHERE threads.category = '%s' AND (to_tsvector(threads.title) @@ to_tsquery('%s') OR to_tsvector(threads.content) @@ to_tsquery('%s')) GROUP BY (threads.id, users.username);", category, search, search)

	rows, err := db.Conn.Query(stringQuery)

	// Loop through every row and append each row of comment into the list
	if err == nil {
		for rows.Next() {
			var thread models.Thread
			err = rows.Scan(&thread.ID, &thread.Username, &thread.Title, &thread.Content, &thread.Timediff, &thread.Category, &thread.Comments)
			if err != nil {
				return list, err
			}
			list.Thread = append(list.Thread, thread)
		}
	}

	return list, err
}
