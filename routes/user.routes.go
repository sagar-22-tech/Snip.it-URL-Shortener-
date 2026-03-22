package routes

import (
	"net/http"
	"url_shortener/controller"
)

func RegisterUserRoutes(app *http.ServeMux) {
	app.HandleFunc("/user", controller.UserURL)
	app.HandleFunc("/", controller.RedirectURL)
}
