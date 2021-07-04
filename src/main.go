package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"
	"path/filepath"
	"regexp"
	"sync"

	"get-risky/src/api"
	"get-risky/src/db"
	"get-risky/src/util"
)

var apiPort *string
var sitePort *string

func main() {
	env := flag.String("env", "dev", "Environment to run get-risky")
	path := flag.String("dbPath", filepath.Join("config", "database"), "Path to database config")
	apiPort = flag.String("api-port", "3000", "Port to serve get-risky api")
	sitePort = flag.String("site-port", "", "Port to serve get-risky frontend")

	flag.Parse()

	u, p, n := util.GetDBConfig(*env, *path)

	database := db.ConnectDB(db.Connection{User: u, Password: p, Database: n})
	defer database.Close()

	wg := new(sync.WaitGroup)

	wg.Add(2)

	go func() {
		if *sitePort == "" {
			wg.Done()
		} else {
			s := createFrontendServer()
			log.Fatal(s.ListenAndServe())
			wg.Done()
		}
	}()

	go func() {
		s := createBackendServer()
		log.Fatal(s.ListenAndServe())
		wg.Done()
	}()

	wg.Wait()
}

func createFrontendServer() *http.Server {
	mux := http.NewServeMux()

	fs := http.FileServer(http.Dir("./website"))
	mux.Handle("/", fs)

	server := http.Server{
		Addr:    fmt.Sprintf("localhost:%s", *sitePort),
		Handler: mux,
	}

	return &server
}

func createBackendServer() *http.Server {
	mux := http.NewServeMux()

	// This kinda works but also doesn't. Feel free to adapt as necessary!

	mux.HandleFunc("/", api.CorsHandler(api.PreflightRequestHandler(func(w http.ResponseWriter, r *http.Request) {
		path := r.URL.Path

		re := regexp.MustCompile(`/services/(?P<serviceId>\d+)/(?P<model>\w+)/(?P<id>\d*)`)

		match := re.FindStringSubmatch(path)
		w.Write([]byte(fmt.Sprintf("%#v\n", re.FindStringSubmatch(path))))
		if len(match) == 0 {
			// must be services
			params := r.URL.Query()

			w.Write([]byte(fmt.Sprintf("%#v\n", params)))
		}
		w.Write([]byte(fmt.Sprintf("%#v\n", re.FindStringSubmatch(path))))
		w.Write([]byte(fmt.Sprintf("%#v\n", re.SubexpNames())))
	})))

	// mux.HandleFunc("/api/services", func(w http.ResponseWriter, r *http.Request) {
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

	// mux.HandleFunc("/api/services/:serviceId/risks", func(w http.ResponseWriter, r *http.Request) {
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

	// mux.HandleFunc("/api/services/:serviceId/riskFactors", func(w http.ResponseWriter, r *http.Request) {
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

	// mux.HandleFunc("/api/services/:serviceId/configs", func(w http.ResponseWriter, r *http.Request) {
	// 	switch r.Method {
	// 	case http.MethodPut:
	// 		api.PutMiddleware(api.UpdateConfigHandler)(w, r)
	// 	default:
	// 		// !
	// 	}
	// })

	server := http.Server{
		Addr:    fmt.Sprintf("localhost:%s", *apiPort),
		Handler: mux,
	}

	return &server
}
