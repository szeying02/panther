package models

type User struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type ClaimsInfo struct {
	ID       string `json:"id"`
	Username string `json:"username"`
}
