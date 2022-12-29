package models

type Comment struct {
	ID       string `json:"id"`
	UserID   string `json:"userid"`
	Username string `json:"username"`
	Comment  string `json:"comment"`
	Timediff string `json:"timediff"`
}

type CommentList struct {
	Comment []Comment `json:"comments"`
}

type CommentCreationInfo struct {
	Comment  string `json:"comment"`
	UserID   string `json:"userid"`
	ThreadID string `json:"threadid"`
}
