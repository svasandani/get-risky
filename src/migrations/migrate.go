package main

import (
	"flag"
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"path/filepath"
	"strings"

	"get-risky/src/db"
	"get-risky/src/util"
)

var path string

func main() {
	dbuser := flag.String("dbUser", "get_risky", "Username for MySQL")
	dbpass := flag.String("dbPass", "get_risky", "Password for MySQL")
	dbname := flag.String("dbName", "get_risky", "Name of MySQL database")

	new := flag.Bool("new", false, "Create a new migration?")
	name := flag.String("name", "", "New migration name")
	target := flag.String("target", "", "Migration target")
	path = *flag.String("path", filepath.Join("src", "migrations", "sql"), "Path to migration folder")

	flag.Parse()

	database := db.ConnectDB(db.Connection{User: *dbuser, Password: *dbpass, Database: *dbname})
	defer database.Close()

	if *new {
		createNewMigration(*name)
	} else {
		migrateTo(*target)
	}
}

func createNewMigration(name string) {
	if name == "" {
		name = "Untitled migration"
	}

	head := getHead()

	id := generateUUID()

	filename := filepath.Join(path, fmt.Sprintf("%s-%s", id, slugify(name)))

	tmplt := []byte(fmt.Sprintf("meta:\n\tname: %s\n\tprevious: %s\n\nforwards:\n\n\nbackwards:\n", name, head))
	err := ioutil.WriteFile(filename, tmplt, 0644)
	check(err)

	log.Println("Created new migration in", filename)

	writeHead(id)
}

func getHead() string {
	filename := filepath.Join(path, "HEAD")

	if _, err := os.Stat(filename); err == nil {
		c, err := ioutil.ReadFile(filename)
		check(err)

		return string(c)
	} else if os.IsNotExist(err) {
		log.Println("HEAD doesn't exist!")

		f, err := os.Create(filename)
		check(err)
		f.Close()
	}

	return ""
}

func writeHead(head string) {
	filename := filepath.Join(path, "HEAD")

	bhead := []byte(head)
	err := ioutil.WriteFile(filename, bhead, 0644)

	check(err)
}

func migrateTo(target string) {
	log.Println("Migrating to", target)
}

func generateUUID() string {
	return util.UUID()
}

func slugify(name string) string {
	return strings.ReplaceAll(strings.ToLower(name), " ", "-")
}

func check(err error) {
	if err != nil {
		log.Fatal("We ran into an error:\n\t", err)
	}
}
