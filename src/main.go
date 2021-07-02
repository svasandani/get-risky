package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"
	"path/filepath"
	"regexp"

	"get-risky/src/db"
	"get-risky/src/util"
)

func main() {
	env := *flag.String("env", "dev", "Environment to run get-risky")
	path := *flag.String("dbPath", filepath.Join("config", "database"), "Path to database config")
	port := *flag.String("port", "3000", "Port to serve get-risky")

	u, p, n := util.GetDBConfig(env, path)

	flag.Parse()

	database := db.ConnectDB(db.Connection{User: u, Password: p, Database: n})
	defer database.Close()

	// This kinda works but also doesn't. Feel free to adapt as necessary!

	http.HandleFunc("/api/", func(w http.ResponseWriter, r *http.Request) {
		path := r.URL.Path

		re := regexp.MustCompile(`/api/services/(?P<serviceId>\d+)/(?P<model>\w+)/(?P<id>\d*)`)

		match := re.FindStringSubmatch(path)
		w.Write([]byte(fmt.Sprintf("%#v\n", re.FindStringSubmatch(path))))
		if len(match) == 0 {
			// must be services
			params := r.URL.Query()

			w.Write([]byte(fmt.Sprintf("%#v\n", params)))
		}
		w.Write([]byte(fmt.Sprintf("%#v\n", re.FindStringSubmatch(path))))
		w.Write([]byte(fmt.Sprintf("%#v\n", re.SubexpNames())))
	})

	// http.HandleFunc("/api/services", func(w http.ResponseWriter, r *http.Request) {
	// 	switch r.Method {
	// 	case http.MethodGet:
	// 		api.GetMiddleware(api.GetServiceHandler)(w, r)
	// 	case http.MethodPost:
	// 		api.PostMiddleware(api.CreateServiceHandler)(w, r)
	// 	case http.MethodPut:
	// 		api.PutMiddleware(api.UpdateServiceHandler)(w, r)
	// 	case http.MethodDelete:
	// 		api.DeleteMiddleware(api.DeleteServiceHandler)(w, r)
	// 	default:
	// 		// !
	// 	}
	// })

	// http.HandleFunc("/api/services/:serviceId/risks", func(w http.ResponseWriter, r *http.Request) {
	// 	switch r.Method {
	// 	case http.MethodPost:
	// 		api.PutMiddleware(api.CreateRiskHandler)(w, r)
	// 	case http.MethodPut:
	// 		api.PostMiddleware(api.UpdateRiskHandler)(w, r)
	// 	case http.MethodDelete:
	// 		api.DeleteMiddleware(api.DeleteRiskHandler)(w, r)
	// 	default:
	// 		// !
	// 	}
	// })

	// http.HandleFunc("/api/services/:serviceId/riskFactors", func(w http.ResponseWriter, r *http.Request) {
	// 	switch r.Method {
	// 	case http.MethodPost:
	// 		api.PutMiddleware(api.CreateRiskFactorHandler)(w, r)
	// 	case http.MethodPut:
	// 		api.PostMiddleware(api.UpdateRiskFactorHandler)(w, r)
	// 	case http.MethodDelete:
	// 		api.DeleteMiddleware(api.DeleteRiskFactorHandler)(w, r)
	// 	default:
	// 		// !
	// 	}
	// })

	// http.HandleFunc("/api/services/:serviceId/configs", func(w http.ResponseWriter, r *http.Request) {
	// 	switch r.Method {
	// 	case http.MethodPut:
	// 		api.PutMiddleware(api.UpdateConfigHandler)(w, r)
	// 	default:
	// 		// !
	// 	}
	// })

	fs := http.FileServer(http.Dir("./website"))
	http.Handle("/", fs)

	log.Fatal(http.ListenAndServe("localhost:"+port, nil))
}
