package controller

import (
	"net/http"
	"url_shortener/config"
)

func RedirectURL(w http.ResponseWriter, r *http.Request) {

	shortCode := r.URL.Path[1:] // remove "/"
	if shortCode == "" {
		http.Error(w, "Invalid URL", 400)
		return
	}

	var originalURL string

	query := "SELECT original_url FROM urls WHERE short_code=$1"

	err := config.DB.QueryRow(query, shortCode).Scan(&originalURL)

	if err != nil {
		http.Error(w, "URL not found", 404)
		return
	}

	// // 🔥 Redirect
	http.Redirect(w, r, originalURL, http.StatusFound)
}
