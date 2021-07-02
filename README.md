Get Risky
========

A risk assessment tool to help determine which risks to tolerate and which to mitigate. Builtin migration handler. Currently in development.

Table of Contents
========

- [Get Risky](#get-risky)
  * [Frontend](#front-end)
    + [Running it locally](#running-it-locally)
    + [Deployment](#deployment)
    + [Testing](#testing)
    + [Contributing](#contributing)
    + [Issues](#issues)
    + [Future features](#future-features)
  * [Backend](#backend)
    + [Running it locally](#running-it-locally-1)
    + [Deployment](#deployment-1)
    + [Contributing](#contributing-1)
    + [Issues](#issues-1)
    + [Endpoints](#endpoints)
      - [Services](#services)
      - [Risks](#risks)
      - [Risk Factors](#risk-factors)
      - [Configs](#configs)
    + [Future features](#future-features-1)
  * [Migration](#migration)
    + [Creating a new migration](#creating-a-new-migration)
    + [Running migrations](#running-migrations)
      - [Migrating forwards](#migrating-forwards)
      - [Migrating backwards](#migrating-backwards)
    + [Contributing](#contributing-2)
    + [Issues](#issues-2)
    + [Future features](#future-features-2)
  * [Testing](#testing-1)
    + [Testing packages](#testing-packages)
    + [More involved tests](#more-involved-tests)
    + [Running all tests](#running-all-tests)

## Frontend

### Running it locally
The front-end is entirely static, no build step required. You have two options to run it:
- Serve the `website/` folder using your favorite server (I like `serve`) 
- Run the entire service via the backend (see `Backend` below)

### Deployment
To deploy the front-end by itself, just copy the directory somewhere. `scp` it, `ftp` it, `Ctrl+C, Ctrl+V` it.

### Testing
We don't currently have any front-end testing. If you know of a good framework/way to test static sites without a build step, please reach out to me.

### Contributing
It might be hard to add new features given the static nature of the site. It might be helpful to rewrite it in some sort of framework (React, Angular) to make it easier for contributors down the line. If you'd like to do that, submit a PR or an issue and we'll get you started.

### Issues
We use Github's issue tracker. Any issues should be reported there, tagged with #front-end.

### Future features

The front-end has a lot of good functionality already, and these features are geared more towards scalability/maintainability.

#### (Option 1) Switch to a framework

Most developers know (and prefer to use) frameworks. For a small static site, it doesn't make sense to use one. If the scope of the app gets larger though, it might be a good idea to consider.

#### (Option 2) Refactor + pipeline?

I'd like to refactor the JavaScript to avoid too much technical debt down the line. It would also make sense to introduce some tooling like Babel to increase browser compatibility. If we don't switch to a framework, this would be the route to go. 

## Backend

### Running it locally
First, install [MySQL](https://www.mysql.com/). Create a database for the app as well as a user for the database. You can infer the database types from the Go models (or I could add it here, but that's TODO).

Then, download and install [Go](https://golang.org/). Once everything is set up in the usual way, migrate your database:

    $ go run src/migrations/migrate.go

Finally, run the following command:

    $ go run src/main.go

There are a few optional command-line arguments:

| Flag | Required | Default | Description |
|-----|-----|-----|-----|
| `dbuser` | No | `get_risky` | MySQL user |
| `dbpass` | No | `get_risky` | Password for MySQL user |
| `dbname` | No | `get_risky` | Name of MySQL database |
| `port` | No | `3000` | Port to serve get-risky |

### Deployment
You can build the app using the following command:

    $ go build src/main.go

Then, copy the executable to the deploy server.

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

### Future features

There are some plans for the future of get-risky. Here are a few possible features.

#### Backend transformations

The backend currently only functions as a CRUD API. All the transformation is done on the front-end. Ideally, we'd like to serve some transformed data from the backend to be consumed by an external application. This shouldn't be too difficult, since much of the logic can be translated from JavaScript to Go.

#### Dockerization

To make it easier to deploy, we'd like to create a Docker container for the entire app. This shouldn't be too difficult, since almost everything is self-contained.

#### More granular controls

Currently, calculations are done very haphazardly. While this makes sense for actually assessing risks (you can never be too optimistic), it doesn't give an accurate picture of factors contributing to downtime. We'd like to add a way to finetune how/which risk factors affect which risks, and to what degree. It may also be worth rolling risk factors into risks and allowing risks to affect each other, but this is a significantly complex problem.

## Migration

A quick follow-up - the built-in migration handler is very bare-bones, and only has two major operations. It also does not support branching, as you'll see below. It has some optional global parameters that apply to all operations:

| Flag | Required | Default | Description |
|-----|-----|-----|-----|
| `dbuser` | No | `get_risky` | MySQL user |
| `dbpass` | No | `get_risky` | Password for MySQL user |
| `dbname` | No | `get_risky` | Name of MySQL database |
| `path` | No | `src/migrations/sql` | Path to migrations folder |

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

There are two command-line arguments specific to this mode:

| Flag | Required | Default | Description |
|-----|-----|-----|-----|
| `new` | **Yes, to create a new migration** | `false` | Whether to create a new migration |
| `name` | No | `Untitled migration` | Name/description for the migration |

The metadata will be populated automatically, and since the handler does not support branching, it will set the previous migration to be the current `HEAD` (not the file, but the latest migration). *Please don't change this field :)*

When the file is created, populate the SQL code for both `forwards` and `backwards` keys. It's your responsibility to make sure this works with the state of the database directly before/after the migration. Once you're ready, run the migration.

### Running migrations

When running migrations, the migration handler looks for a `HEAD` file in the migration path. This file represents the current state of the database. If there is none, it assumes that the migration is before the `TAIL`; i.e. the database is empty. 

To run a migration, run the following command:

    $ go run src/migrations/migrate.go [--target="<Migration ID target>"]

There are two optional command-line arguments:

| Flag | Required | Default | Description |
|-----|-----|-----|-----|
| `from` | No | reads from `HEAD` file | Where to start migration |
| `target` | No | `HEAD` (i.e. including latest migration) | Where to migrate to |

The handler will automatically detect if the target is ahead or before the current state, and proceed accordingly. There are some quirks though:

#### Migrating forwards

When migrating forwards to a named migration (i.e. not `HEAD`) from the current migration, the handler will skip the current migration, then execute every following migration up to but not including the target migration. In other words, it looks like this:

    current migration (not executed) -> next migration (executed) -> ... (executed) -> next migration (executed) -> target migration (not executed)

This is done so that the `HEAD` file represents the most recently completed migration. Note that `TAIL` is technically before the first migration, so when migrating from an empty database, the first migration **will** be executed. To execute all migrations (including the last) starting from the current state, set `target` to `HEAD` or omit it entirely, e.g.

    $ go run src/migrations/migrate.go

#### Migrating backwards

When migrating backwards to a named migration (i.e. not `TAIL`) from the current migration, the handler will roll back the current migration, then roll back every preceding migration up to but not including the target migration. Something like this:

    current migration (rolled back) -> previous migration (rolled back) -> ... (rolled back) -> previous migration (executed) -> target migration (not rolled back)

Again, done this way, the `HEAD` file represents the most recently completed migration (i.e. target, since it wasn't rolled back). To roll back all the way to empty, set `target` to `TAIL`, i.e.

    $ go run src/migrations/migrate.go --target=TAIL

### Contributing
Find an issue and submit a PR! Or make an issue and then submit a PR. Either works.

### Issues
Report issues in Github's issue tracker with the tag #migration.

### Future features

While this migration handler is designed to be bare-bones, there are some future features that I'd like to add.

#### Cherry picking migrations

Sometimes, you just need to run one specific migration. While this can currently be done by using the `from` and `target` flags, you need to find the previous and the next migrations of the one you want to run. Ideally we'd add a `forwards` flag or something similar, but implementation is left open.

#### Supporting branching

This is a lot more difficult, and it would make sense to extract this to a separate library once this feature is added.

## Testing

There are some basic unit tests written for certain files.

### Testing packages

To run tests for a specific package/folder, use the command:

    $ go test get-risky/src/<package / folder>

For example, to test the `migrations` folder, you would run:

    $ go test get-risky/src/migrations

### More involved tests

Some packages (`db`, `api`) require a testing database. The default is to use `get_risky_test`, but this can be specified by command-line arguments:

| Flag | Required | Default | Description |
|-----|-----|-----|-----|
| `dbuser` | No | `get_risky` | MySQL user |
| `dbpass` | No | `get_risky` | Password for MySQL user |
| `dbname` | No | `get_risky_test` | Name of MySQL test database |

Make sure to run migrations on the test database! They won't be run automatically. As a refresher, you can do that with this command:

    $ go run src/migrations/migrate.go --dbname=<name of test database>

When you're ready, run tests on these packages using the same command as above, e.g.:

    $ go test get-risky/src/db
    $ go test get-risky/src/api

### Running all tests

Since running all tests will also include running `db` and `api` tests, make sure you've followed the steps above and your test database is ready.

Run all tests with this command:

    $ go test ./...