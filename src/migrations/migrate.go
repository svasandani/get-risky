package main

import (
	"flag"
	"log"

	"get-risky/src/db"
	"get-risky/src/util"
)

var path string

func main() {
	dbuser := flag.String("dbUser", "get_risky", "Username for MySQL")
	dbpass := flag.String("dbPass", "get_risky", "Password for MySQL")
	dbname := flag.String("dbName", "get_risky", "Name of MySQL database")

	new := flag.Bool("new", false, "Create a new migration?")
	target := flag.String("target", "", "Migration target")
	path = *flag.String("path", "sql", "Path to migration folder")

	flag.Parse()

	database := db.ConnectDB(db.Connection{User: *dbuser, Password: *dbpass, Database: *dbname})
	defer database.Close()

	if *new {
		createNewMigration()
	} else {
		migrateTo(*target)
	}
}

func createNewMigration() {
	log.Println("Created new migration in", path)
}

func migrateTo(target string) {
	log.Println("Migrating to", target)
}

func generateUUID() string {
	return util.UUID()
}
