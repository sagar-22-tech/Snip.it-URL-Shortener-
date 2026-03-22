package config

import (
	"database/sql"
	"log"
	"os"

	_ "github.com/jackc/pgx/v5/stdlib"
)

var DB *sql.DB

func ConnectDB() {
	var err error

	connStr := os.Getenv("DB_URL")

	// 👇 Use "pgx" instead of "postgres"
	DB, err = sql.Open("pgx", connStr)
	if err != nil {
		log.Fatal("DB connection failed:", err)
	}

	err = DB.Ping()
	if err != nil {
		log.Fatal("DB not reachable:", err)
	}

	log.Println("✅ Connected using pgx")
}
