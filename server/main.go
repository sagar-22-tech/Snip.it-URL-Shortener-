package main

import (
	"fmt"
	"net/http"
	"url_shortener/config"
	"url_shortener/routes"

	"github.com/joho/godotenv"
)

type User struct {
	Name string `json:"Name"`
}

func main() {
	//Load env file
	_ = godotenv.Load()
	//DB connection
	config.ConnectDB()

	//Creating server
	app := http.NewServeMux()
	fmt.Println("Server is running on port 3000")

	//Routes
	routes.RegisterUserRoutes(app)

	//CORS
	handler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		// Allow frontend
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")

		// Handle preflight request
		if r.Method == http.MethodOptions {
			return
		}

		app.ServeHTTP(w, r)
	})
	//Server Listen
	err := http.ListenAndServe(":3000", handler)
	if err != nil {
		fmt.Printf("Server failed:%s\n", err)
	}

}
