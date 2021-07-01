# Get Risky

A risk assessment tool to help determine which risks to tolerate and which to mitigate. Currently in development.

## Frontend

### Running it locally
The frontend is entirely static, no build step required. You have two options to run it:
- Serve the `website/` folder using your favorite server (I like `serve`) 
- Run the entire service via the backend (see `Backend` below)

### Deployment
To deploy the frontend by itself, just copy the directory somewhere. `scp` it, `ftp` it, `Ctrl+C, Ctrl+V` it.

### Testing
We don't currently have any frontend testing. If you know of a good framework/way to test static sites without a build step, please reach out to me.

### Contributing
It might be hard to add new features given the static nature of the site. It might be helpful to rewrite it in some sort of framework (React, Angular) to make it easier for contributors down the line. If you'd like to do that, submit a PR or an issue and we'll get you started.

### Issues
We use Github's issue tracker. Any issues should be reported there, tagged with #frontend.

## Backend

### Running it locally
First, install [MySQL](https://www.mysql.com/). Create a database for the app as well as a user for the database. You can infer the database types from the Go models (or I could add it here, but that's TODO).

Then, download and install [Go](https://golang.org/). Once everything is set up in the usual way, run the following command:

    $ go run src/get-risky/main.go

There are a few optional command-line arguments:
- `dbuser` := MySQL user (default: `get-risky`)
- `dbpass` := Password for MySQL user (default: `get-risky`)
- `dbname` := Name of MySQL database (default: `get-risky`)
- `port` := Port to serve get-risky (default: `3000`)

### Deployment
You can build the app using the following command:

    $ go build src/get-risky/main.go

Then, copy the executable to the deploy server.

### Testing
Tests aren't written yet. When they are, run them with this command:

    $ go test ./...

### Contributing
Find an issue and submit a PR! Or make an issue and then submit a PR. Either works.

### Issues
Report issues in Github's issue tracker with the tag #backend.

### Endpoints
Endpoints aren't currently set up yet. We're thinking about the following (with a base URI of `/api`):

#### Services
- `/services` 
    - **GET** all services
    - returns `[]Service`
- `/service?id=:id` 
    - **GET** the service with `id=id`
    - returns `Service`
- `/service` 
    - **POST** (create) a service via JSON body
    - returns `Service.ID`
- `/service?id=:id` 
    - **PUT** (update) the service with `id=id` via JSON body
    - returns `Service`
- `/service?id=:id` 
    - **DELETE** the service with `id=id`
    - returns `Service.ID`

#### Risks
- `/risks?service=:serviceId` 
    - **GET** all risks in service with `id=serviceId`
    - returns `[]Risk`
- `/risk?service=:serviceId`  
    - **POST** (create) a risk in service with `id=serviceId` via JSON body
    - returns `Risk.ID`
- `/risk?service=:serviceId&id=:id`  
    - **PUT** (update) the risk with `id=id` in service with `id=serviceId` via JSON body
    - returns `Risk`
- `/risk?service=:serviceId&id=:id` 
    - **DELETE** the risk with `id=id` in service with `id=serviceId`
    - returns `Risk.ID`

#### Risk Factors
- `/riskFactors?service=:serviceId`  
    - **GET** all risk factors in service with `id=serviceId`
    - returns `[]RiskFactor`
- `/riskFactor?service=:serviceId&id=:id`  
    - **POST** (create) a risk factor in service with `id=serviceId` via JSON body
    - returns `RiskFactor.ID`
- `/riskFactor?service=:serviceId&id=:id`  
    - **PUT** (update) the risk factor with `id=id` in service with `id=serviceId` via JSON body
    - returns `RiskFactor`
- `/riskFactor?service=:serviceId&id=:id`  
    - **DELETE** the risk factor with `id=id` in service with `id=serviceId`
    - returns `RiskFactor.ID`

#### configs
- `/configs?service=:serviceId`  
    - **GET** all configs in service with `id=serviceId`
    - returns `[]Config`
- `/config?service=:serviceId&id=:id`  
    - **PUT** (update) the config with `id=id` in service with `id=serviceId` via JSON body
    - returns `Config`