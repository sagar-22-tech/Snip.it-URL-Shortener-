# 🔗 URL Shortener (Full Stack Project)

A full-stack URL shortener web application built using Go (Golang), PostgreSQL (Supabase), and React. The application allows users to convert long URLs into short, shareable links and automatically redirects users to the original URL when accessed.

## 🚀 Features

* 🔗 Generate short URLs from long links
* ⚡ Fast redirection using unique short codes
* 🗄️ Store URLs in PostgreSQL (Supabase)
* 🌐 REST API built with Go (net/http)
* 🎯 Clean architecture (routes, controllers, config, utils)
* 💻 React frontend with modern UI
* 📋 Copy-to-clipboard functionality for short URLs
* 🔒 Environment-based configuration using `.env`

## 🛠️ Tech Stack

### Backend

* Go (Golang)
* net/http (ServeMux)
* PostgreSQL (Supabase)
* pgx driver

### Frontend

* React (Vite)
* Tailwind CSS

### Tools

* Git & GitHub
* Postman / Curl for API testing

## 📂 Project Structure

* `server/` → Entry point (main.go)
* `routes/` → API route definitions
* `controller/` → Business logic
* `config/` → Database connection
* `utils/` → Helper functions (short code generator)
* `url-frontend/` → React frontend

## 🔄 How It Works

1. User submits a long URL via frontend
2. Backend generates a unique short code
3. URL + short code is stored in database
4. A short URL is returned to the user
5. Visiting the short URL redirects to the original link

## ▶️ Run Locally

### Backend

cd server
go run main.go

### Frontend

cd url-frontend
npm install
npm run dev

## 📌 Future Improvements

* Custom short URLs
* Click analytics (tracking visits)
* Expiry time for links
* Authentication system
* Deployment (Vercel + Render)

## 👨‍💻 Author

Developed by Sagar Saini
