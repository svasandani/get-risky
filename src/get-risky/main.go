package main

import (
	"flag"
	"log"
	"net/http"

	"get-risky/internal/api"
	"get-risky/internal/db"
)

func main() {
	dbuser := flag.String("dbUser", "get_risky", "Username for MySQL")
	dbpass := flag.String("dbPass", "get_risky", "Password for MySQL")
	dbname := flag.String("dbName", "get_risky", "Name of MySQL database")

	port := flag.String("port", "3000", "Port to serve get-risky")

	flag.Parse()

	database := db.ConnectDB(db.Connection{User: *dbuser, Password: *dbpass, Database: *dbname})
	defer database.Close()

	http.HandleFunc("/api/services", api.GetMiddleware(api.GetAllServicesHandler))

	http.HandleFunc("/api/service", func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
		case http.MethodGet:
			api.GetMiddleware(api.GetServiceHandler)(w, r)
		case http.MethodPost:
			api.PostMiddleware(api.CreateServiceHandler)(w, r)
		case http.MethodPut:
			api.PutMiddleware(api.UpdateServiceHandler)(w, r)
		case http.MethodDelete:
			api.DeleteMiddleware(api.DeleteServiceHandler)(w, r)
		default:
			// !
		}
	})

	http.HandleFunc("/api/risks", api.GetMiddleware(api.GetAllRisksFromServiceHandler))

	http.HandleFunc("/api/risk", func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
		case http.MethodPost:
			api.PutMiddleware(api.CreateRiskHandler)(w, r)
		case http.MethodPut:
			api.PostMiddleware(api.UpdateRiskHandler)(w, r)
		case http.MethodDelete:
			api.DeleteMiddleware(api.DeleteRiskHandler)(w, r)
		default:
			// !
		}
	})

	http.HandleFunc("/api/riskFactors", api.GetMiddleware(api.GetAllRiskFactorsFromServiceHandler))

	http.HandleFunc("/api/riskFactor", func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
		case http.MethodPost:
			api.PutMiddleware(api.CreateRiskFactorHandler)(w, r)
		case http.MethodPut:
			api.PostMiddleware(api.UpdateRiskFactorHandler)(w, r)
		case http.MethodDelete:
			api.DeleteMiddleware(api.DeleteRiskFactorHandler)(w, r)
		default:
			// !
		}
	})

	http.HandleFunc("/api/configs", api.GetMiddleware(api.GetAllConfigsFromServiceHandler))

	http.HandleFunc("/api/config", func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
		case http.MethodPut:
			api.PutMiddleware(api.UpdateConfigHandler)(w, r)
		default:
			// !
		}
	})

	fs := http.FileServer(http.Dir("./website"))
	http.Handle("/", fs)

	log.Fatal(http.ListenAndServe("localhost:"+*port, nil))
}
