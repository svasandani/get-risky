package util

import (
	"bufio"
	"encoding/json"
	"log"
	"net/http"
	"os"
	"strings"
)

type httpError struct {
	Status int    `json:"status"`
	Msg    string `json:"message"`
}

type httpOK struct {
	Msg string `json:"message"`
}

/**************************************************************
UTILITY
**************************************************************/

// CheckError - Check for error; if not nil, print a message along with the error.
func CheckError(msg string, err error) {
	if err != nil {
		log.Println(msg)
		log.Println(err.Error())
	}
}

// RespondError - Boilerplate HTTP responses for error
func RespondError(w http.ResponseWriter, status int, msg string) {
	resp := httpError{Status: status, Msg: msg}

	json, err := json.Marshal(resp)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)

	w.Write(json)
}

// RespondOK - Boilerplate HTTP responses for ok
func RespondOK(w http.ResponseWriter) {
	ok := httpOK{Msg: "Ok"}

	json, err := json.Marshal(ok)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	w.Write(json)
}

// GetDBConfig - gets dbUser, dbPass, and dbName from config/database file for given environment
func GetDBConfig(env string, path string) (string, string, string) {
	m := make(map[string]string)

	if _, err := os.Stat(path); err == nil {
		f, err := os.Open(path)

		if err != nil {
			log.Fatalf("Got error: %s", err)
		}

		defer f.Close()

		scanner := bufio.NewScanner(f)

		scanner.Split(bufio.ScanLines)

		line := scanner.Text()

		for !(strings.TrimSpace(line) == env+":") && scanner.Scan() {
			line = scanner.Text()
		}

		c := true

		for c && scanner.Scan() {
			line = scanner.Text()

			if strings.HasPrefix(line, "  ") || strings.HasPrefix(line, "\t") {
				larr := strings.Split(strings.TrimSpace(line), ":")
				if len(larr) > 1 {
					m[larr[0]] = strings.TrimSpace(larr[1])
				}
			} else {
				c = false
			}
		}
	} else if os.IsNotExist(err) {
		log.Fatalf("%s doesn't exist!", path)
	}

	return m["user"], m["pass"], m["name"]
}
