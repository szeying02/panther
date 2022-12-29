package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/szeying02/panther/server/database"
	"github.com/szeying02/panther/server/router"
)

func corsHandler(handler http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if origin := r.Header.Get("Origin"); origin != "" {
			w.Header().Set("Access-Control-Allow-Origin", origin)
			w.Header().Add("Access-Control-Allow-Headers", "Content-Type, Authorization")
			w.Header().Set("Access-Control-Allow-Methods", "OPTIONS, GET, POST, DELETE, PUT")
			w.Header().Set("Access-Control-Allow-Credentials", "true")
		}
		if r.Method == "OPTIONS" {
			return
		}
		handler.ServeHTTP(w, r)
	})
}

func main() {

	db, dbErr := database.ConnectDB()

	if dbErr != nil {
		log.Fatalf("Database Connection Error: %v", dbErr)
	}

	// close database
	defer db.Conn.Close()

	r := router.InitialiseRoutes()
	r = corsHandler(r)

	fmt.Println(http.ListenAndServe(":8000", r))
}
