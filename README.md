# Get Risky

A risk assessment tool to help determine which risks to tolerate and which to mitigate. Currently in development.

## Frontend

### Running it locally
The frontend is entirely static, no build step required. Serve the `website/` folder using your favorite server (I like `serve`) and everything should work.

### Deployment
Just copy the directory somewhere. `scp` it, `ftp` it, `Ctrl+C, Ctrl+V` it.

### Testing
We don't currently have any frontend testing. If you know of a good framework/way to test static sites without a build step, please reach out to me.

### Contributing
It might be hard to add new features given the static nature of the site. It might be helpful to rewrite it in some sort of framework (React, Angular) to make it easier for contributors down the line. If you'd like to do that, submit a PR or an issue and we'll get you started.

### Issues
We use Github's issue tracker. Any issues should be reported there, tagged with #frontend.

## Backend

The backend is currently AFK. It will be written in Go.

### Running it locally
Download and install [Go](https://golang.org/). Import this repository in the customary way. Run the following command:

    $ go run cmd/get-risky/main.go

### Deployment
You can build the app using the following command:

    $ go build cmd/get-risky/main.go

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

- `/services` - get all services
- `/service/:serviceId` - get one service with `id=serviceId`
- `/service/:serviceId/risks` - get all risks from the service with `id=serviceId`
- `/service/:serviceId/risk/:riskId` - get the risk with `id=riskId` from the service with `id=serviceId`
- `/service/:serviceId/riskFactors` - get all risk factors from the service with `id=serviceId`
- `/service/:serviceId/riskFactor/:riskFactorId` - get the risk factors with `id=riskFactorId` from the service with `id=serviceId`