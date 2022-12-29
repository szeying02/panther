package router

import (
	"net/http"

	"github.com/go-chi/chi/v5"

	"github.com/szeying02/panther/server/api"
	"github.com/szeying02/panther/server/middleware"
)

func InitialiseRoutes() http.Handler {
	r := chi.NewRouter()

	//r.Use(middleware.Logger)

	// Public Routes
	r.Group(func(r chi.Router) {
		r.Post("/login", api.Login)
		r.Post("/register", api.Register)
	})

	// Private Routes -- Inaccessible till logged in
	// https://go-chi.io/#/pages/routing?id=sub-routers
	r.Group(func(r chi.Router) {
		r.Route("/auth", func(r chi.Router) {
			r.Post("/logout", middleware.CheckAuthJWT(api.Logout))
			r.Get("/claims", middleware.CheckAuthJWT(api.GetClaims))
		})
		r.Route("/forum", func(r chi.Router) {
			r.Route("/threads", func(r chi.Router) {
				r.Get("/", middleware.CheckAuthJWT(api.GetAllThreads)) // GET / -- displays all threads
				r.Get("/{id}", middleware.CheckAuthJWT(api.GetThread)) // GET /{threads id} -- displays individual post
				r.Get("/search/{search}", middleware.CheckAuthJWT(api.SearchThreads))
				r.Get("/filter/{category}", middleware.CheckAuthJWT(api.FilterThreads)) // GET /filter/{threads category} -- displays all threads of given category
				r.Get("/searchandfilter/{search}/{category}", middleware.CheckAuthJWT(api.SearchAndFilterThreads))
				r.Post("/create", middleware.CheckAuthJWT(api.CreateThread)) //POST /create -- creates a new threads
				r.Delete("/{id}", middleware.CheckAuthJWT(api.DeleteThread)) //DELETE /{thread id}
				r.Put("/{id}", middleware.CheckAuthJWT(api.UpdateThread))    //PUT /contacts/0147344454
			})
			r.Route("/comments", func(r chi.Router) {
				r.Get("/{threadid}", middleware.CheckAuthJWT(api.GetAllComments)) // GET /{thread id} -- retrieves all comments associated to the thread id
				r.Post("/create", middleware.CheckAuthJWT(api.CreateComment))     // POST /create -- creates a comment
				r.Delete("/{id}", middleware.CheckAuthJWT(api.DeleteComment))     // DELETE /{comment id} -- deletes a comment given its id
				r.Put("/{id}", middleware.CheckAuthJWT(api.UpdateComment))        //PUT /{comment id} -- updates a comment
			})
		})
	})

	return r
}
