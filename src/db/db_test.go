package db

import (
	"database/sql"
	"flag"
	"get-risky/src/util"
	"path/filepath"
	"testing"

	_ "github.com/go-sql-driver/mysql"
)

var database *sql.DB
var u string
var p string
var n string

func init() {
	var _ = func() bool {
		testing.Init()
		return true
	}()

	env := flag.String("env", "test", "Environment to run tests")
	path := flag.String("dbPath", filepath.Join("..", "..", "config", "database"), "Path to database config")

	flag.Parse()

	u, p, n = util.GetDBConfig(*env, *path)
}

func seed(t *testing.T) {
	database = ConnectDB(Connection{User: u, Password: p, Database: n})

	ExecSQL("insert into services (slug, name) values ('auth', 'Authentication');")
	ExecSQL("insert into services (slug, name) values ('backend', 'Backend');")
	ExecSQL("insert into services (slug, name) values ('eventbus', 'Event Bus');")
	ExecSQL("insert into services (slug, name) values ('geo', 'Geolocation');")
}

func cleanup(t *testing.T) {
	ExecSQL("set foreign_key_checks = 0;")
	ExecSQL("truncate table configs;")
	ExecSQL("truncate table risk_factors;")
	ExecSQL("truncate table risks;")
	ExecSQL("truncate table services;")
	ExecSQL("set foreign_key_checks = 1;")

	database.Close()
}
func TestAddColumns(t *testing.T) {
	seed(t)

	err := ExecSQL("alter table services add test varchar(255) not null;")
	if err != nil {
		t.Fatalf("Adding column gave error: \n%s, \nwanted nil", err)
	}

	err = ExecSQL("alter table services drop column test;")
	if err != nil {
		t.Fatalf("Dropping column gave error: \n%s, \nwanted nil", err)
	}

	cleanup(t)
}

func TestQueryColumns(t *testing.T) {
	seed(t)

	sel, err := db.Prepare("SELECT name FROM services WHERE slug LIKE ?")
	defer sel.Close()
	if err != nil {
		t.Fatalf("Preparing SQL statement gave error: \n%s, \nwanted nil", err)
	}

	var name string

	err = sel.QueryRow("auth").Scan(&name)
	if err != nil {
		t.Fatalf("Querying row gave error: \n%s, \nwanted nil", err)
	}

	if name != "Authentication" {
		t.Fatalf("Selecting name with slug=auth gave: \n%s, \nwanted Authentication", name)
	}

	cleanup(t)
}
