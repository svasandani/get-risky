package api

import (
	"net/http"

	"get-risky/src/util"
)

/**************************************************************

API MIDDLEWARE HANDLERS

**************************************************************/

// GetMiddleware - chain all middleware handlers for GET
func GetMiddleware(fn func(w http.ResponseWriter, r *http.Request)) func(w http.ResponseWriter, r *http.Request) {
	return CorsHandler(PreflightRequestHandler(MethodHandler(fn, http.MethodGet)))
}

// PostMiddleware - chain all middleware handlers for POST
func PostMiddleware(fn func(w http.ResponseWriter, r *http.Request)) func(w http.ResponseWriter, r *http.Request) {
	return CorsHandler(PreflightRequestHandler(MethodHandler(JSONHandler(fn), http.MethodPost)))
}

// PutMiddleware - chain all middleware handlers for PUT
func PutMiddleware(fn func(w http.ResponseWriter, r *http.Request)) func(w http.ResponseWriter, r *http.Request) {
	return CorsHandler(PreflightRequestHandler(MethodHandler(JSONHandler(fn), http.MethodPut)))
}

// DeleteMiddleware - chain all middleware handlers for DELETE
func DeleteMiddleware(fn func(w http.ResponseWriter, r *http.Request)) func(w http.ResponseWriter, r *http.Request) {
	return CorsHandler(PreflightRequestHandler(MethodHandler(fn, http.MethodDelete)))
}

// CorsHandler - set all CORS headers
func CorsHandler(fn func(w http.ResponseWriter, r *http.Request)) func(w http.ResponseWriter, r *http.Request) {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
		fn(w, r)
	})
}

// MethodHandler - ensure all requests to API are a specific method
func MethodHandler(fn func(w http.ResponseWriter, r *http.Request), method string) func(w http.ResponseWriter, r *http.Request) {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Method == method {
			fn(w, r)
		} else {
			util.RespondError(w, 403, "Please use "+method+"requests only.")
		}
	})
}

// JSONHandler - ensure all requests have JSON payloads
func JSONHandler(fn func(w http.ResponseWriter, r *http.Request)) func(w http.ResponseWriter, r *http.Request) {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Header.Get("Content-Type") == "application/json" {
			fn(w, r)
		} else {
			util.RespondError(w, 400, "Please submit JSON payloads only.")
		}
	})
}

// PreflightRequestHandler - respond with OK on CORS preflight check
func PreflightRequestHandler(fn func(w http.ResponseWriter, r *http.Request)) func(w http.ResponseWriter, r *http.Request) {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodOptions {
			util.RespondOK(w)
		} else {
			fn(w, r)
		}
	})
}

/**************************************************************

API HANDLERS

**************************************************************/

// SERVICES

// GetAllServicesHandler - get all services
func GetAllServicesHandler(w http.ResponseWriter, r *http.Request) {
	// TODO
}

// GetServiceHandler - get service by id - path: "/service?id=:id"
func GetServiceHandler(w http.ResponseWriter, r *http.Request) {
	// TODO
}

// CreateServiceHandler - create service - body: JSON
func CreateServiceHandler(w http.ResponseWriter, r *http.Request) {
	// TODO
}

// UpdateServiceHandler - update service by id - body: JSON
func UpdateServiceHandler(w http.ResponseWriter, r *http.Request) {
	// TODO
}

// DeleteServiceHandler - delete service by id - path: "/service?id=:id"
func DeleteServiceHandler(w http.ResponseWriter, r *http.Request) {
	// TODO
}

// RISKS

// GetAllRisksFromServiceHandler - get all risks in service - path: "/risks?service=:serviceId"
func GetAllRisksFromServiceHandler(w http.ResponseWriter, r *http.Request) {
	// TODO
}

// CreateRiskHandler - create risk in service - body: JSON
func CreateRiskHandler(w http.ResponseWriter, r *http.Request) {
	// TODO
}

// UpdateRiskHandler - update risk in service - body: JSON
func UpdateRiskHandler(w http.ResponseWriter, r *http.Request) {
	// TODO
}

// DeleteRiskHandler - delete risk in service - path: "/risk?service=:serviceId&id=:id"
func DeleteRiskHandler(w http.ResponseWriter, r *http.Request) {
	// TODO
}

// RISK FACTORS

// GetAllRiskFactorsFromServiceHandler - get all risks in service - path: "/riskFactors?service=:serviceId"
func GetAllRiskFactorsFromServiceHandler(w http.ResponseWriter, r *http.Request) {
	// TODO
}

// CreateRiskFactorHandler - create risk in service - body: JSON
func CreateRiskFactorHandler(w http.ResponseWriter, r *http.Request) {
	// TODO
}

// UpdateRiskFactorHandler - update risk in service - body: JSON
func UpdateRiskFactorHandler(w http.ResponseWriter, r *http.Request) {
	// TODO
}

// DeleteRiskFactorHandler - delete risk in service - path: "/riskFactor?service=:serviceId&id=:id"
func DeleteRiskFactorHandler(w http.ResponseWriter, r *http.Request) {
	// TODO
}

// CONFIGS

// GetAllConfigsFromServiceHandler - get all configs in service - path: "/configs?service=:serviceId"
func GetAllConfigsFromServiceHandler(w http.ResponseWriter, r *http.Request) {
	// TODO
}

// UpdateConfigHandler - update config in service - body: JSON
func UpdateConfigHandler(w http.ResponseWriter, r *http.Request) {
	// TODO
}
