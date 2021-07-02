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

// GetServiceHandler - get all services
// GETS path: "/api/services"
// returns 200 (Ok) with body: JSON
// allows filtering by id or slug (but not both), e.g. "/api/services?id=:id" OR "/api/services?slug=:slug"
func GetServiceHandler(w http.ResponseWriter, r *http.Request) {
	// TODO
}

// CreateServiceHandler - create service
// POSTS path: "/api/services/" with body: JSON
// returns 201 (Created) with body: empty and header Location: /api/services/:id
func CreateServiceHandler(w http.ResponseWriter, r *http.Request) {
	// TODO
}

// UpdateServiceHandler - update service by id
// PUTS path: "/api/services/:id" with body: JSON
// returns 200 (Ok) with body: empty
func UpdateServiceHandler(w http.ResponseWriter, r *http.Request) {
	// TODO
}

// DeleteServiceHandler - delete service by id
// DELETES path: "/api/services/:id"
// returns 204 (No Content) with body: empty
func DeleteServiceHandler(w http.ResponseWriter, r *http.Request) {
	// TODO
}

// RISKS

// GetRiskHandler - get all risks in service
// GETS path: "/api/services/:serviceId/risks"
// returns 200 (Ok) with body: JSON
// allows filtering by id or slug (but not both), e.g. "/api/services/:serviceId/risks?id=:id" OR "/api/services/:serviceId/risks?slug=:slug"
func GetRiskHandler(w http.ResponseWriter, r *http.Request) {
	// TODO
}

// CreateRiskHandler - create risk in service
// POSTS path: "/api/services/:serviceId/risks" with body: JSON
// returns 201 (Created) with body: empty and header Location: /api/services/:serviceId/risks/:id
func CreateRiskHandler(w http.ResponseWriter, r *http.Request) {
	// TODO
}

// UpdateRiskHandler - update risk in service
// PUTS path: "/api/services/:esrviceId/risks/:id" with body: JSON
// returns 200 (Ok) with body: empty
func UpdateRiskHandler(w http.ResponseWriter, r *http.Request) {
	// TODO
}

// DeleteRiskHandler - delete risk in service
// DELETES path: "/api/services/:serviceId/risks/:id"
// returns 204 (No Content) with body: empty
func DeleteRiskHandler(w http.ResponseWriter, r *http.Request) {
	// TODO
}

// RISK FACTORS

// GetRiskFactorHandler - get all risk factors in service
// GETS path: "/api/services/:serviceId/riskFactors"
// returns 200 (Ok) with body: JSON
// allows filtering by id or slug (but not both), e.g. "/api/services/:serviceId/riskFactors?id=:id" OR "/api/services/:serviceId/riskFactors?slug=:slug"
func GetRiskFactorHandler(w http.ResponseWriter, r *http.Request) {
	// TODO
}

// CreateRiskFactorHandler - create risk factor in service
// POSTS path: "/api/services/:serviceId/riskFactors" with body: JSON
// returns 201 (Created) with body: empty and header Location: /api/services/:serviceId/riskFactors/:id
func CreateRiskFactorHandler(w http.ResponseWriter, r *http.Request) {
	// TODO
}

// UpdateRiskFactorHandler - update risk factor in service
// PUTS path: "/api/services/:esrviceId/riskFactors/:id" with body: JSON
// returns 200 (Ok) with body: empty
func UpdateRiskFactorHandler(w http.ResponseWriter, r *http.Request) {
	// TODO
}

// DeleteRiskFactorHandler - delete risk factor in service
// DELETES path: "/api/services/:serviceId/riskFactors/:id"
// returns 204 (No Content) with body: empty
func DeleteRiskFactorHandler(w http.ResponseWriter, r *http.Request) {
	// TODO
}

// CONFIGS

// GetConfigHandler - get all configs in service
// GETS path: "/api/services/:serviceId/configs"
// returns 200 (Ok) with body: JSON
// allows filtering by id or slug (but not both), e.g. "/api/services/:serviceId/configs?id=:id" OR "/api/services/:serviceId/configs?slug=:slug"
func GetConfigHandler(w http.ResponseWriter, r *http.Request) {
	// TODO
}

// UpdateConfigHandler - update config in service
// PUTS path: "/api/services/:esrviceId/configs/:id" with body: JSON
// returns 200 (Ok) with body: empty
func UpdateConfigHandler(w http.ResponseWriter, r *http.Request) {
	// TODO
}
