package controller

import (
	"encoding/json"
	"net/http"
	"url_shortener/config"
	"url_shortener/utils"
)

type Input struct {
	Link string `json:"url"`
}

func UserURL(w http.ResponseWriter, r *http.Request) {
	var url Input
	err := json.NewDecoder(r.Body).Decode(&url)
	if err != nil || url.Link == "" {
		http.Error(w, "Invalid input", 400)
		return
	}

	shortCode := utils.GenerateShortCode(6)
	query := "INSERT INTO urls (original_url, short_code) VALUES ($1, $2) RETURNING id"

	var id int
	err = config.DB.QueryRow(query, url.Link, shortCode).Scan(&id)
	if err != nil {
		http.Error(w, "DB insert failed", 500)
		return
	}

	response := map[string]interface{}{
		"id":        id,
		"short_url": "https://snip-it-url-shortener.onrender.com/" + shortCode,
		"original":  url.Link,
	}

	json.NewEncoder(w).Encode(response)
}
