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

/*******************************************

	SERVICES

*******************************************/

// GetAllServices - get all services
func GetAllServices() ([]Service, error) {
	// TODO
}

// GetServiceById - get the service with specified id
func GetServiceById(id int) (Service, error) {
	// TODO
}

// GetServiceBySlug - get the service with specified slug
func GetServiceBySlug(slug string) (Service, error) {
	// TODO
}

// CreateService - create the service with specified data
func CreateService(serv Service) error {
	// TODO
}

// UpdateService - update the service with specified id with specified data
func UpdateService(id int, serv Service) error {
	// TODO
}

// DeleteService - delete the service with specified id
func DeleteService(id int) error {
	// TODO
}

/*******************************************

	RISKS

*******************************************/

// GetAllRisks - get all risks
func GetAllRisks() ([]Risk, error) {
	// TODO
}

// GetRiskById - get the risk with specified id
func GetRiskById(id int) (Risk, error) {
	// TODO
}

// GetRiskBySlug - get the risk with specified slug
func GetRiskBySlug(slug string) (Risk, error) {
	// TODO
}

// CreateRisk - create the risk with specified data
func CreateRisk(risk Risk) error {
	// TODO
}

// UpdateRisk - update the risk with specified id with specified data
func UpdateRisk(id int, risk Risk) error {
	// TODO
}

// DeleteRisk - delete the risk with specified id
func DeleteRisk(id int) error {
	// TODO
}

/*******************************************

	RISK FACTORS

*******************************************/

// GetAllRiskFactors - get all risk factors
func GetAllRiskFactors() ([]RiskFactor, error) {
	// TODO
}

// GetRiskFactorById - get the risk factor with specified id
func GetRiskFactorById(id int) (RiskFactor, error) {
	// TODO
}

// GetRiskFactorBySlug - get the risk factor with specified slug
func GetRiskFactorBySlug(slug string) (RiskFactor, error) {
	// TODO
}

// CreateRiskFactor - create the risk factor with specified data
func CreateRiskFactor(riskf RiskFactor) error {
	// TODO
}

// UpdateRiskFactor - update the risk factor with specified id with specified data
func UpdateRiskFactor(id int, riskf RiskFactor) error {
	// TODO
}

// DeleteRiskFactor - delete the risk factor with specified id
func DeleteRiskFactor(id int) error {
	// TODO
}

/*******************************************

	CONFIGS

*******************************************/

// GetAllConfigs - get all configs
func GetAllConfigs() ([]Config, error) {
	// TODO
}

// GetConfigById - get the config with specified id
func GetConfigById(id int) (Config, error) {
	// TODO
}

// GetConfigBySlug - get the config with specified slug
func GetConfigBySlug(slug string) (Config, error) {
	// TODO
}

// UpdateConfig - update the config with specified id with specified data
func UpdateConfig(id int, cfg Config) error {
	// TODO
}
