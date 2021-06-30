package db

// Service - service
type Service struct {
	ID          string       `json:"id,omitempty"`
	Slug        string       `json:"slug"`
	Name        string       `json:"name,omitempty"`
	Risks       []Risk       `json:"risks,omitempty"`
	RiskFactors []RiskFactor `json:"riskFactors,omitempty"`
	Configs     []Config     `json:"configs,omitempty"`
}

// Risk - risk for a service
type Risk struct {
	ID          string  `json:"id,omitempty"`
	Slug        string  `json:"slug"`
	Description string  `json:"description"`
	ETTD        int     `json:"ettd"`
	ETTR        int     `json:"ettr"`
	Impact      float32 `json:"ettd"`
	ETTF        int     `json:"ettf"`
}

// RiskFactor - risk for a service
type RiskFactor struct {
	ID          string  `json:"id,omitempty"`
	Slug        string  `json:"slug"`
	Description string  `json:"description"`
	ETTD        int     `json:"ettd"`
	ETTR        int     `json:"ettr"`
	Impact      float32 `json:"ettd"`
	ETTF        int     `json:"ettf"`
}

// Config - risk for a service
type Config struct {
	ID          string `json:"id,omitempty"`
	Slug        string `json:"slug"`
	Description string `json:"description"`
	Category    string `json:"category"`
	Value       bool   `json:"vale"`
}

// Connection - export DBConnection to connect to database
type Connection struct {
	User     string
	Password string
	Database string
}
