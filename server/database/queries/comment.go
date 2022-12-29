package queries

import (
	"fmt"

	"github.com/szeying02/panther/server/database"
	"github.com/szeying02/panther/server/models"
)

// Obtain a list of comments given the thread id sorted from oldest to most recent comment
func GetAllComments(db database.Database, id string) (*models.CommentList, error) {
	stringQuery := fmt.Sprintf("SELECT comments.id, comments.user_id, users.username, comments.comment, FLOOR(EXTRACT(EPOCH FROM (current_timestamp - comments.datetime))) AS timediff FROM comments LEFT JOIN users ON users.id = comments.user_id WHERE comments.thread_id = %s ORDER BY comments.datetime;", id)

	list := &models.CommentList{}

	rows, err := db.Conn.Query(stringQuery)

	// Loop through every row and append each row of comment into the list
	if err == nil {
		for rows.Next() {
			var comment models.Comment
			err := rows.Scan(&comment.ID, &comment.UserID, &comment.Username, &comment.Comment, &comment.Timediff)
			if err != nil {
				return list, err
			}
			list.Comment = append(list.Comment, comment)
		}
	}

	return list, err
}

// Create a new comment given the relevant data
func CreateComment(db database.Database, comment, userid, threadid string) error {
	stringQuery := fmt.Sprintf("INSERT INTO comments (comment, user_id, thread_id, datetime) VALUES ('%s', '%s', '%s', current_timestamp);", comment, userid, threadid)
	_, err := db.Conn.Exec(stringQuery)

	return err
}

// Delete all comments under a specific and given thread id
func DeleteAllThreadComments(db database.Database, id string) error {
	stringQuery := fmt.Sprintf("DELETE FROM comments WHERE comments.thread_id = %s;", id)

	_, err := db.Conn.Exec(stringQuery)

	return err
}

// Delete a single comment given the comment id
func DeleteComment(db database.Database, id string) error {
	stringQuery := fmt.Sprintf("DELETE FROM comments WHERE comments.id = %s;", id)

	_, err := db.Conn.Exec(stringQuery)

	return err
}

// Update / Edit a single comment given the comment id and the updated comment string
func UpdateComment(db database.Database, id, comment string) error {
	stringQuery := fmt.Sprintf("UPDATE comments SET comment = '%s' WHERE comments.id = %s;", comment, id)

	_, err := db.Conn.Exec(stringQuery)

	return err
}
