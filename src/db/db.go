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

//
// EVERYTHING BELOW HERE IS STUBBED OUT
//

// /*******************************************

// 	GENERAL

// *******************************************/

// // selectAllFromTable - SQL selects all records from given table
// func selectAllFromTable(tab string) (*sql.Rows, error) {
// 	// TODO
// 	// select * from ${tab}
// }

// // selectFromTable - SQL selects record from given table where column eqop 'matcher' (id='1', slug like 'test')
// func selectFromTable(tab string, col string, eqop string, val string) (*sql.Rows, error) {
// 	// TODO
// 	// select * from ${tab} where ${col} ${eqop} '${val}'
// }

// // insertIntoTable - SQL inserts record into given table with cols = vals
// func insertIntoTable(tab string, cols string, vals string) error {
// 	// TODO
// 	// insert into ${tab} (${cols}) values (${vals})
// }

// // updateTable - SQL updates record in given table where column eqop 'matcher' with cols = vals
// func updateTable(tab string, cols string, vals string, col string, eqop string, val string) error {
// 	// TODO
// 	// update ${tab} ${cols} x ${vals} where ${col} ${eqop} '${val}'
// }

// // deleteFromTable - SQL deletes record from given table where column eqop 'matcher'
// func deleteFromTable(tab string, col string, eqop string, val string) error {
// 	// TODO
// 	// delete from ${tab} where ${col} ${eqop} '${val}'
// }

// /*******************************************

// 	SERVICES

// *******************************************/

// // GetAllServices - get all services
// func GetAllServices() ([]Service, error) {
// 	// TODO
// 	selectAllFromTable("services")
// }

// // GetServiceById - get the service with specified id
// func GetServiceById(id string) (Service, error) {
// 	// TODO
// 	selectFromTable("services", "id", "=", id)
// }

// // GetServiceBySlug - get the service with specified slug
// func GetServiceBySlug(slug string) (Service, error) {
// 	// TODO
// 	selectFromTable("services", "slug", " like ", slug)
// }

// // CreateService - create the service with specified data
// func CreateService(serv Service) error {
// 	// TODO
// 	insertIntoTable("services", TODO, TODO)
// }

// // UpdateService - update the service with specified id with specified data
// func UpdateService(id string, serv Service) error {
// 	// TODO
// 	updateTable("services", TODO, TODO, "id", "=", id)
// }

// // DeleteService - delete the service with specified id
// func DeleteService(id string) error {
// 	// TODO
// 	deleteFromTable("services", "id", "=", id)
// }

// /*******************************************

// 	RISKS

// *******************************************/

// // GetAllRisks - get all risks
// func GetAllRisks() ([]Risk, error) {
// 	// TODO
// 	selectAllFromTable("risks")
// }

// // GetRiskById - get the risk with specified id
// func GetRiskById(id string) (Risk, error) {
// 	// TODO
// 	selectFromTable("risks", "id", "=", id)
// }

// // GetRiskBySlug - get the risk with specified slug
// func GetRiskBySlug(slug string) (Risk, error) {
// 	// TODO
// 	selectFromTable("risks", "slug", " like ", slug)
// }

// // CreateRisk - create the risk with specified data
// func CreateRisk(risk Risk) error {
// 	// TODO
// 	insertIntoTable("risks", TODO, TODO)
// }

// // UpdateRisk - update the risk with specified id with specified data
// func UpdateRisk(id string, risk Risk) error {
// 	// TODO
// 	updateTable("risks", TODO, TODO, "id", "=", id)
// }

// // DeleteRisk - delete the risk with specified id
// func DeleteRisk(id string) error {
// 	// TODO
// 	deleteFromTable("risks", "id", "=", id)
// }

// /*******************************************

// 	RISK FACTORS

// *******************************************/

// // GetAllRiskFactors - get all risk factors
// func GetAllRiskFactors() ([]RiskFactor, error) {
// 	// TODO
// 	selectAllFromTable("risk_factors")
// }

// // GetRiskFactorById - get the risk factor with specified id
// func GetRiskFactorById(id string) (RiskFactor, error) {
// 	// TODO
// 	selectFromTable("risk_factors", "id", "=", id)
// }

// // GetRiskFactorBySlug - get the risk factor with specified slug
// func GetRiskFactorBySlug(slug string) (RiskFactor, error) {
// 	// TODO
// 	selectFromTable("risk_factors", "slug", " like ", slug)
// }

// // CreateRiskFactor - create the risk factor with specified data
// func CreateRiskFactor(riskf RiskFactor) error {
// 	// TODO
// 	insertIntoTable("risk_factors", TODO, TODO)
// }

// // UpdateRiskFactor - update the risk factor with specified id with specified data
// func UpdateRiskFactor(id string, riskf RiskFactor) error {
// 	// TODO
// 	updateTable("risk_factors", TODO, TODO, "id", "=", id)
// }

// // DeleteRiskFactor - delete the risk factor with specified id
// func DeleteRiskFactor(id string) error {
// 	// TODO
// 	deleteFromTable("risk_factors", "id", "=", id)
// }

// /*******************************************

// 	CONFIGS

// *******************************************/

// // GetAllConfigs - get all configs
// func GetAllConfigs() ([]Config, error) {
// 	// TODO
// 	selectAllFromTable("configs")
// }

// // GetConfigById - get the config with specified id
// func GetConfigById(id string) (Config, error) {
// 	// TODO
// 	selectFromTable("configs", "id", "=", id)
// }

// // GetConfigBySlug - get the config with specified slug
// func GetConfigBySlug(slug string) (Config, error) {
// 	// TODO
// 	selectFromTable("configs", "slug", " like ", slug)
// }

// // UpdateConfig - update the config with specified id with specified data
// func UpdateConfig(id string, cfg Config) error {
// 	// TODO
// 	updateTable("configs", "value", TODO, "id", "=", id)
// }
