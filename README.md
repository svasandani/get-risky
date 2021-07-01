# Get Risky

A risk assessment tool to help determine which risks to tolerate and which to mitigate. Currently in development.

## Table of contents

- [Get Risky](#get-risky)
  * [Frontend](#frontend)
    + [Running it locally](#running-it-locally)
    + [Deployment](#deployment)
    + [Testing](#testing)
    + [Contributing](#contributing)
    + [Issues](#issues)
  * [Backend](#backend)
    + [Running it locally](#running-it-locally-1)
    + [Deployment](#deployment-1)
    + [Testing](#testing-1)
    + [Contributing](#contributing-1)
    + [Issues](#issues-1)
    + [Endpoints](#endpoints)
      - [Services](#services)
      - [Risks](#risks)
      - [Risk Factors](#risk-factors)
      - [Configs](#configs)
  * [Migration](#migration)
    + [Creating a new migration](#creating-a-new-migration)
    + [Running migrations](#running-migrations)
      - [Migrating forwards](#migrating-forwards)
      - [Migrating backwards](#migrating-backwards)
    + [Future features](#future-features)

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

Then, download and install [Go](https://golang.org/). Once everything is set up in the usual way, migrate your database:

    $ go run src/migrations/migrate.go

Finally, run the following command:

    $ go run src/main.go

There are a few optional command-line arguments:
- `dbuser` := MySQL user (default: `get_risky`)
- `dbpass` := Password for MySQL user (default: `get_risky`)
- `dbname` := Name of MySQL database (default: `get_risky`)
- `port` := Port to serve get-risky (default: `3000`)

### Deployment
You can build the app using the following command:

    $ go build src/main.go

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

#### Configs
- `/configs?service=:serviceId`  
    - **GET** all configs in service with `id=serviceId`
    - returns `[]Config`
- `/config?service=:serviceId&id=:id`  
    - **PUT** (update) the config with `id=id` in service with `id=serviceId` via JSON body
    - returns `Config`

## Migration

A quick follow up - the builtin migration handler is very bare bones, and only has two major operations. It also does not support branching, as you'll see below. It has some optional global parameters that apply to all operations:
- `dbuser` := MySQL user (default: `get_risky`)
- `dbpass` := Password for MySQL user (default: `get_risky`)
- `dbname` := Name of MySQL database (default: `get_risky`)
- `path` := Path to migrations (default: `src/migrations/sql`)

Some terminology specific to this handler:
- the `HEAD` file specifies the most recently executed migration
- the `HEAD` migration is the latest migration
- the `TAIL` migration is the earliest migration (commonly creating the basic tables)

### Creating a new migration

When creating a new migration, the migration handler creates a new file using a proprietary format:

    meta:
        name: <Migration name / description>
        previous: <Previous migration>
    
    forwards:
    <SQL code for forward migration>

    backwards:
    <SQL code to undo the code above>

To create a file like this, run the following command:

    $ go run src/migrations/migrate.go --new [--name="<Migration name / description>"]

There are two command line arguments specific to this mode:
- `new` := Whether to create a new migration, **required for this mode**
- `name` := Name for the migration (default: `Untitled migration`)

The metadata will be populated automatically, and since the handler does not support branching, it will set the previous migration to be the current `HEAD` (not the file, but the latest migration). *Please don't change this field :)*

When the file is created, populate the SQL code for both `forwards` and `backwards` keys. It's your responsibility to make sure this works with the state of the database directly before / after the migration. Once you're ready, run the migration.

### Running migrations

When running migrations, the migration handler looks for a `HEAD` file in the migration path. This file represents the current state of the database. If there is none, it assumes that the migration is before the `TAIL`; i.e. the database is empty. 

To run a migration, run the following command:

    $ go run src/migrations/migrate.go [--target="<Migration ID target>"]

There is one optional command line argument:
- `target` := Migration target (default: `HEAD`)

The handler will automatically detect if the target is ahead or before the current state, and proceed accordingly. There are some quirks though:

#### Migrating forwards

When migrating forwards to a named migration (i.e. not `HEAD`) from the current migration, the handler will skip the current migration, then execute every following migration up to but not including the target migration. In other words, it looks like this:

    current migration (not executed) -> next migration (executed) -> ... (executed) -> next migration (executed) -> target migration (not executed)

This is done so that the `HEAD` file represents the most recently completed migration. Note that `TAIL` is technically before the first migration, so when migrating from an empty database, the first migration **will** be executed. To execute all migrations (including the last), set `target` to `HEAD` or omit it entirely, e.g.

    $ go run src/migrations/migrate.go

#### Migrating backwards

When migrating backwards to a named migration (i.e. not `TAIL`) from the current migration, the handler will roll back the current migration, then roll back every preceding migration up to but not including the target migration. Something like this:

    current migration (rolled back) -> previous migration (rolled back) -> ... (rolled back) -> previous migration (executed) -> target migration (not rolled back)

Again, done this way, the `HEAD` file represents the most recently completed migration (i.e. target, since it wasn't rolled back). To roll back all the way to empty, set `target` to `TAIL`, i.e.

    $ go run src/migrations/migrate.go --target=TAIL

### Future features

While this migration handler is designed to be bare bones, there are some future features that I'd like to add:
- Cherry picking migrations (obvious enough)
- Supporting branching