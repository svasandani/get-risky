package db

import (
	// "errors"
	"context"
	"fmt"
	"regexp"
	"time"

	// "time"

	"database/sql"

	_ "github.com/go-sql-driver/mysql"

	"get-risky/src/util"
)

/**************************************************************

DATABASE FUNCTIONS

**************************************************************/

var db *sql.DB

const ers string = "^[a-zA-Z0-9.!#$%&'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$"

var er *regexp.Regexp = regexp.MustCompile(ers)

// ConnectDB - connect to the database.
func ConnectDB(dbConn Connection) *sql.DB {
	conn := fmt.Sprintf("%v:%v@/%v?parseTime=true", dbConn.User, dbConn.Password, dbConn.Database)

	dbLocal, err := sql.Open("mysql", conn)

	util.CheckError("Error opening connection to database:", err)

	err = dbLocal.Ping()

	util.CheckError("Error establishing connection to database:", err)

	db = dbLocal

	return dbLocal

	// @QOL create table if not exists, maybe?
}

func ExecSQL(query string) error {
	if query == "" {
		return nil
	}

	ctx, cancelfunc := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancelfunc()

	_, err := db.ExecContext(ctx, query)

	return err
}
