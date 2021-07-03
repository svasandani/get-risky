package main

import (
	"bufio"
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

type Node struct {
	id        string
	name      string
	prevId    string
	prev      *Node
	nextId    string
	next      *Node
	forwards  []string
	backwards []string
}

var path *string
var from *string

func main() {
	new := flag.Bool("new", false, "Create a new migration?")
	name := flag.String("name", "", "New migration name")
	target := flag.String("target", "", "Migration target")
	from = flag.String("from", "", "Migration start")
	path = flag.String("path", filepath.Join("src", "migrations", "sql"), "Path to migration folder")

	env = flag.String("env", "dev", "Environment to run migrations")
	dbPath := flag.String("dbPath", filepath.Join("config", "database"), "Path to database config")

	flag.Parse()

	u, p, n := util.GetDBConfig(*env, *dbPath)

	database := db.ConnectDB(db.Connection{User: u, Password: p, Database: n})
	defer database.Close()

	if *new {
		createNewMigration(*name)
	} else {
		migrateTo(*target)
	}
}

// createNewMigration - creates a migration file and updates HEAD
func createNewMigration(name string) {
	if name == "" {
		name = "Untitled migration"
	}

	head := getNewHead()

	id := generateUUID()

	filename := filepath.Join(*path, fmt.Sprintf("%s-%s", id, slugify(name)))

	tmplt := []byte(fmt.Sprintf("meta:\n\tname: %s\n\tprevious: %s\n\nforwards:\n\n\nbackwards:\n", name, head))
	err := ioutil.WriteFile(filename, tmplt, 0644)
	check(err)

	log.Println("Created new migration in", filename)
}

func getNewHead() string {
	m := parseFiles()

	if m["HEAD"] != nil {
		return m["HEAD"].prevId
	}

	return ""
}

// getHead - gets the current HEAD
func getHead() string {
	if *from != "" {
		return *from
	}

	filename := filepath.Join(*path, "HEAD")

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

// writeHead - writes a new HEAD
func writeHead(head string) {
	if head == "HEAD" {
		head = getNewHead()
	}

	filename := filepath.Join(*path, "HEAD")

	bhead := []byte(head)
	err := ioutil.WriteFile(filename, bhead, 0644)

	check(err)
}

// migrateTo - migrate to a specific migration
func migrateTo(target string) {
	if target == "" {
		target = "HEAD"
	}

	m := parseFiles()

	head := getHead()

	if head == "" {
		head = "TAIL"
	}

	c := *m[head]
	t := *m[target]

	if c.id == t.id {
		log.Fatal("Already at target!")
	}

	forward := checkForward(m, c, t)

	if forward {
		for c.next != nil && c.prevId != t.id {
			c = *c.next

			log.Println("Playing forwards:", c.name)
			for _, q := range c.forwards {
				err := db.ExecSQL(strings.TrimSpace(q))
				check(err)
			}
		}
	} else {
		for c.id != t.id {
			log.Println("Playing backwards:", c.name)
			for _, q := range c.backwards {
				err := db.ExecSQL(strings.TrimSpace(q))
				check(err)
			}

			if c.prev == nil {
				break
			} else {
				c = *c.prev
			}
		}
	}

	writeHead(target)
	log.Println("Migrated to", target)
}

// execSQL

// checkForward - checks if this is a forward migration (i.e target ahead of current)
func checkForward(m map[string]*Node, curr Node, target Node) bool {
	n := *m["HEAD"]

	for n.prevId != "" {
		if n.id == curr.id {
			return false
		}

		if n.id == target.id {
			return true
		}

		n = *n.prev
	}

	return true
}

// parseFiles - parse files in folder and return a and a map (id: Node), with m["HEAD"], m["TAIL"] being HEAD and TAIL of DLL
func parseFiles() map[string]*Node {
	m := make(map[string]*Node)

	var t *Node

	fs, err := ioutil.ReadDir(*path)
	check(err)

	for _, f := range fs {
		filename := f.Name()

		if filename == "HEAD" {
			continue
		}

		id := strings.Split(filename, "-")[0]

		m[id] = parseNodeFromFile(filepath.Join(*path, filename), id)
		if m[id].prevId == "" {
			t = m[id]
		}
	}

	if t == nil {
		t = &Node{
			id: "",
		}
	} else {
		t.prevId = "TAIL"
	}

	m["TAIL"] = &Node{
		id:     "TAIL",
		nextId: t.id,
		next:   t,
	}

	buildList(m)

	return m
}

// buildList - generate doubly linked list from map
func buildList(m map[string]*Node) {
	for k, v := range m {
		if k == "TAIL" {
			continue
		}

		if v.prevId == "" {
			continue
		}

		n := m[v.prevId]
		n.next = v
		v.prev = n
	}

	if m["TAIL"] != nil {
		n := m["TAIL"]

		for n.next != nil {
			n = n.next
		}

		m["HEAD"] = &Node{
			id:     "HEAD",
			prevId: n.id,
			prev:   n,
		}
	}
}

// parseNodeFromFile - read filename and parse it into a node
func parseNodeFromFile(filename string, id string) *Node {
	n := Node{id: id}

	f, err := os.Open(filename)
	check(err)

	defer f.Close()

	scanner := bufio.NewScanner(f)

	scanner.Split(bufio.ScanLines)

	line := scanner.Text()

	for !(line == "forwards:") && scanner.Scan() {
		line = strings.TrimSpace(scanner.Text())

		if strings.Split(line, ":")[0] == "name" {
			n.name = strings.TrimSpace(strings.Split(line, ":")[1])
		}

		if strings.Split(line, ":")[0] == "previous" {
			n.prevId = strings.TrimSpace(strings.Split(line, ":")[1])
		}
	}

	forwards := ""

	for !(line == "backwards:") && scanner.Scan() {
		line = strings.TrimSpace(scanner.Text())

		if line != "backwards:" {
			forwards += line + " "
		}
	}

	n.forwards = strings.Split(forwards, ";")

	backwards := ""

	for scanner.Scan() {
		line = strings.TrimSpace(scanner.Text())

		backwards += line + " "
	}

	n.backwards = strings.Split(backwards, ";")

	return &n
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
