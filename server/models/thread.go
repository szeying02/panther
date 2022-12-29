package models

type Thread struct {
	ID       string `json:"id"`
	Username string `json:"username"`
	Title    string `json:"title"`
	Content  string `json:"content"`
	Timediff string `json:"timediff"`
	Category string `json:"category"`
	Comments string `json:"comments"`
}

type ThreadList struct {
	Thread []Thread `json:"threads"`
}

type ThreadCreationInfo struct {
	Title    string `json:"title"`
	Content  string `json:"content"`
	UserID   string `json:"userid"`
	Category string `json:"category"`
}
