<h1 align="center">
  <img src="https://user-images.githubusercontent.com/24604927/124636394-7d8edb00-de56-11eb-9df0-11ed4d3de6f1.png" alt="Get Risky"/>
</h1>
<p align="center">
  A risk assessment tool to help determine which risks to tolerate and which to mitigate. <em>Currently in development.</em>
</p>

## Quickstart

    $ go run src/main.go --site-port=3001

Serves api on port `3000`, site on port `3001`. Navigate to `http://localhost:3000/` to load the site.

<!--   <img src="https://user-images.githubusercontent.com/24604927/124519698-0d317c80-ddb8-11eb-82b3-ead3b8c01f82.png" alt="screenshot of get-risky" width="640"/> -->

<br>
<hr>
<br>

<p align="center">
  <img src="https://user-images.githubusercontent.com/24604927/124632296-37377d00-de52-11eb-9926-a0e02ef70c4f.png" alt="get-risky" width="320"/>
</p>

Table of Contents
========

- [Quickstart](#quickstart)
- [Frontend](#frontend)
  * [Running it locally](#running-it-locally)
    + [Serve it yourself](#serve-it-yourself)
    + [Use backend](#use-backend)
  * [Deployment](#deployment)
  * [Testing](#testing)
  * [Contributing](#contributing)
  * [Issues](#issues)
  * [Future features](#future-features)
    + [(Option 1) Switch to a framework](#option-1-switch-to-a-framework)
    + [(Option 2) Refactor + pipeline?](#option-2-refactor--pipeline)
- [Backend](#backend)
  * [Running it locally](#running-it-locally-1)
  * [Deployment](#deployment-1)
  * [Contributing](#contributing-1)
  * [Issues](#issues-1)
  * [Endpoints](#endpoints)
    + [Services](#services)
    + [Risks](#risks)
    + [Risk Factors](#risk-factors)
    + [Configs](#configs)
  * [Future features](#future-features-1)
    + [Backend transformations](#backend-transformations)
    + [Dockerization](#dockerization)
    + [More granular controls](#more-granular-controls)
- [Migration](#migration)
  * [Operation 1: Creating a new migration](#operation-1-creating-a-new-migration)
  * [Operation 2: Running migrations](#operation-2-running-migrations)
    + [Migrating forwards](#migrating-forwards)
    + [Migrating backwards](#migrating-backwards)
  * [Contributing](#contributing-2)
  * [Issues](#issues-2)
  * [Future features](#future-features-2)
    + [Cherry picking migrations](#cherry-picking-migrations)
    + [Supporting branching](#supporting-branching)
- [Testing](#testing-1)
  * [Testing packages](#testing-packages)
  * [More involved tests](#more-involved-tests)
  * [Running all tests](#running-all-tests)
- [Roadmap](#roadmap)
  * [v0](#v0)
    + [Estimated release](#estimated-release)
    + [Features](#features)
  * [v1](#v1)
    + [Estimated release](#estimated-release-1)
    + [Features](#features-1)
  * [v2](#v2)
    + [Estimated release](#estimated-release-2)
    + [Features](#features-2)
  * [v3](#v3)
    + [Estimated release](#estimated-release-3)
    + [Features](#features-3)

## Frontend

### Running it locally
The frontend is entirely static, no build step required. You have two options to run it:

- #### Serve it yourself

  Serve the `website/` folder using your favorite server (I like `serve`) 

- #### Use backend

  Run the entire service via the backend (see [Backend](#backend) below), but make sure to specify the `site-port` flag! 

### Deployment
To deploy the frontend by itself, just copy the directory somewhere. `scp` it, `ftp` it, `Ctrl+C, Ctrl+V` it.

To deploy it with the backend, follow [these deployment instructions](#deployment-1).

### Testing
Since it's entirely static, we use an in-house testing system named `kahwah` to test the frontend. To run tests, you need to serve the frontend along with the backend, and you need to use `--env=test`. Then, open the page you want to test in your browser, open developer tools, and run the following:

    test()

For more information on kahwah, [read its documentation](kahwah.md).

### Contributing
It might be hard to add new features given the static nature of the site. It might be helpful to rewrite it in some sort of framework (React, Angular) to make it easier for contributors down the line. If you'd like to do that, check out [our Contributing doc](CONTRIBUTING.md) get you started.

### Issues
We use Github's issue tracker. Any issues should be reported there, tagged with #frontend.

### Future features

The frontend has a lot of good functionality already, and these features are geared more towards scalability/maintainability.

- #### (Option 1) Switch to a framework

  Most developers know (and prefer to use) frameworks. For a small static site, it doesn't make sense to use one. If the scope of the app gets larger though, it might be a good idea to consider.

- #### (Option 2) Refactor + pipeline?

  I'd like to refactor the JavaScript to avoid too much technical debt down the line. It would also make sense to introduce some tooling like Babel to increase browser compatibility. If we don't switch to a framework, this would be the route to go. 

## Backend

### Running it locally
First, install [MySQL](https://www.mysql.com/). Create a database for the app as well as a user for the database; by default, the app expects a database called `get_risky` accessible by a user named `get_risky` with a password of `get_risky`. Original, I know.

Set up your `config/database` file: rename `database.example` to `database` and change values accordingly to match the user, password, and database name that you created.

Then, download and install [Go](https://golang.org/) (anything with Go module support should be fine; i.e. `>1.11`). Once everything is set up in the usual way, migrate your database:

    $ go run src/migrations/migrate.go

There are a few optional command-line arguments that are important here, but the command should work out of the box. Here's what you can tweak:

| Flag | Required | Default | Description |
|-----|-----|-----|-----|
| `env` | No | `dev` | Migration environment |
| `dbPath` | No | `config/database` | Path to database configuration file |

Finally, run the following command:

    $ go run src/main.go

Again, a few optional command-line arguments:

| Flag | Required | Default | Description |
|-----|-----|-----|-----|
| `env` | No | `dev` | Environment to run get-risky |
| `dbPath` | No | `config/database` | Path to database configuration file |
| `api-port` | No | `3000` | Port to serve get-risky backend |
| `site-port` | No | ` ` | Port to serve get-risky frontend (not served if empty) |

### Deployment
You can build the app using the following command:

    $ go build src/main.go

Then, copy the executable to the deploy server. 

Alternatively, run the `build.sh` script in the root of the repo, and use the tarball generated in the `releases/` folder. Pass in the `GOOS` and `GOARCH` targets as arguments to the `build.sh` script, e.g.

    $ sh build.sh linux amd64

Note: the `build.sh` script runs tests, and will not build the project if they fail.

### Contributing
Find an issue and submit a PR! Or make an issue and then submit a PR. Either works, just check [our Contributing doc](CONTRIBUTING.md) for more guidelines.

### Issues
Report issues in Github's issue tracker with the tag #backend.

### Endpoints
Endpoints aren't currently set up yet. We're thinking about the following:

#### Services
- `/services` 
    - **GET** all services
    - returns `[]Service` as JSON
    - allows filtering by `id` or `slug`:
        - `/services?id=<id>` OR `/services?slug=<slug>`
- `/services` 
    - **POST** (create) a service via JSON body
    - returns `201 (Created)` with header `Location: /api/service/:id`
- `/services/:id` 
    - **PUT** (update) the service with `id=id` via JSON body
    - returns `200 (Ok)`
- `/services/:id` 
    - **DELETE** the service with `id=id`
    - returns `204 (No Content)`

#### Risks
- `/services/:serviceId/risks` 
    - **GET** all risks in service with `id=serviceId`
    - returns `[]Risk` as JSON
    - allows filtering by `id` or `slug`:
        - `/services/:serviceId/risks?id=<id>` OR `/services/:serviceId/risks?slug=<slug>`
- `/services/:serviceId/risks` 
    - **POST** (create) a risk in service with `id=serviceId` via JSON body
    - returns `201 (Created)` with header `Location: /api/service/:id`
- `/services/:serviceId/risks/:id` 
    - **PUT** (update) the risk with `id=id` in service with `id=serviceId` via JSON body
    - returns `200 (Ok)`
- `/services/:serviceId/risks/:id` 
    - **DELETE** the risk with `id=id` in service with `id=serviceId`
    - returns `204 (No Content)`

#### Risk Factors
- `/services/:serviceId/riskFactors` 
    - **GET** all risk factors in service with `id=serviceId`
    - returns `[]RiskFactor` as JSON
    - allows filtering by `id` or `slug`:
        - `/services/:serviceId/riskFactors?id=<id>` OR `/services/:serviceId/riskFactors?slug=<slug>`
- `/services/:serviceId/riskFactors` 
    - **POST** (create) a risk factor in service with `id=serviceId` via JSON body
    - returns `201 (Created)` with header `Location: /api/service/:id`
- `/services/:serviceId/riskFactors/:id` 
    - **PUT** (update) the risk factor with `id=id` in service with `id=serviceId` via JSON body
    - returns `200 (Ok)`
- `/services/:serviceId/riskFactors/:id` 
    - **DELETE** the risk factor with `id=id` in service with `id=serviceId`
    - returns `204 (No Content)`

#### Configs
- `/services/:serviceId/configs` 
    - **GET** all configs in service with `id=serviceId`
    - returns `[]Config` as JSON
    - allows filtering by `id` or `slug`:
        - `/services/:serviceId/configs?id=<id>` OR `/services/:serviceId/configs?slug=<slug>`
- `/services/:serviceId/configs/:id` 
    - **PUT** (update) the config with `id=id` in service with `id=serviceId` via JSON body
    - returns `200 (Ok)`

### Future features

There are some plans for the future of get-risky. Here are a few possible features.

- #### Backend transformations

  The backend currently only functions as a CRUD API. All the transformation is done on the frontend. Ideally, we'd like to serve some transformed data from the backend to be consumed by an external application. This shouldn't be too difficult, since much of the logic can be translated from JavaScript to Go.

- #### Dockerization

  To make it easier to deploy, we'd like to create a Docker container for the entire app. This shouldn't be too difficult, since almost everything is self-contained.

- #### More granular controls

  Currently, calculations are done very haphazardly. While this makes sense for actually assessing risks (you can never be too optimistic), it doesn't give an accurate picture of factors contributing to downtime. We'd like to add a way to finetune how/which risk factors affect which risks, and to what degree. It may also be worth rolling risk factors into risks and allowing risks to affect each other, but this is a significantly complex problem.

## Migration

A quick follow-up - the built-in migration handler is very bare-bones, and only has two major operations. It also does not support branching, as you'll see below. It has some optional global parameters that apply to all operations (and more that are unique to specific operations):

| Flag | Required | Default | Description |
|-----|-----|-----|-----|
| `env` | No | `dev` | Migration environment |
| `dbPath` | No | `config/database` | Path to database configuration file |
| `path` | No | `src/migrations/sql` | Path to migrations folder |

Some terminology specific to this handler:
- the `HEAD` file specifies the most recently executed migration
- the `HEAD` migration is the latest migration
- the `TAIL` migration is the earliest migration (commonly creating the basic tables)

### Operation 1: Creating a new migration

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

When the file is created, populate the SQL code for both `forwards` and `backwards` keys. It's your responsibility to make sure this works with the state of the database directly before/after the migration. Ideally, they should be idempotent. Once you're ready, run the migration.

### Operation 2: Running migrations

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
This handler is a low priority service, but if you want to contribute, make sure to read [our Contributing doc](CONTRIBUTING.md).

### Issues
Report issues in Github's issue tracker with the tag #migration.

### Future features

While this migration handler is designed to be bare-bones, there are some future features that I'd like to add.

- #### Cherry picking migrations

  Sometimes, you just need to run one specific migration. While this can currently be done by using the `from` and `target` flags, you need to find the previous and the next migrations of the one you want to run. Ideally we'd add a `forwards` flag or something similar, but implementation is left open.

- #### Supporting branching

  This is a lot more difficult, and it would make sense to extract this to a separate library once this feature is added.

## Testing

There are some basic unit tests written for certain files.

### Testing packages

To run tests for a specific package/folder, use the command:

    $ go test get-risky/src/<package / folder>

For example, to test the `migrations` folder, you would run:

    $ go test get-risky/src/migrations

### More involved tests

Some packages (`db`, `api`) require a testing database. This is specified in the `config/database` file under the `test:` key. If you're unsure how to structure this file, take a look at `config/database.example`; it should give you the right idea. To help with reading this file, we have the following command-line arguments:

| Flag | Required | Default | Description |
|-----|-----|-----|-----|
| `env` | No | `test` | Testing environment |
| `dbPath` | No | `config/database` | Path to database configuration file |

Make sure to run migrations on the test database! They won't be run automatically. As a refresher, you can do that with this command:

    $ go run src/migrations/migrate.go --env=test

When you're ready, run tests on these packages using the same command as above, e.g.

    $ go test get-risky/src/db
    $ go test get-risky/src/api

### Running all tests

Since running all tests will also include running `db` and `api` tests, make sure you've followed the steps above and your test database is ready.

Run all tests with this command:

    $ go test ./...

## Roadmap

While the documentation for each part of the service has some associated feature planning, I find that it's helpful to provide a more structured overview of where the project is headed.

### v0

#### Estimated release
Current

#### Features
- Mocked endpoints
- Working frontend with mock data
- No official release

### v1

#### Estimated release
July 9

#### Features

##### Frontend
- Frontend using real API endpoints + real data
- Different configuration types (toggle, input, select)
  - **Input:** availability, risk threshold, low/medium/high availabilities

##### Backend
- Functional endpoints
- Default config options for availability, unacceptable risk threshold, low/medium/high availabilities

### v2

#### Estimated release
July 23

#### Features

##### Frontend
- Basic authentication page
- Refactor computation logic to depend on backend
- Updated display for dependencies
  - New table
  - Warnings for circular/poor dependencies

##### Backend
- Basic authentication (administrators, permissions to view/edit service)
- Migrate computation logic and service state management to backend
- Dependencies on other services on the platform

### v3

#### Estimated release
August 6

#### Features

##### Frontend
- Display for depdency groups
  - Warnings for sparse groups without backups
  - Support for external dependencies

##### Backend
- Dependency groups
  - Support for external dependencies
- Improved auth (teams that own services)
- Add support for core/important services
  - Allow users to set relative importance of services
- Add support for forced iteration
  - Deprecate risks after two months (?) to ensure forced iteration
