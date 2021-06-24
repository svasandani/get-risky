const datastore = {
    "services": [
        {
            "serviceId": "appraisals",
            "serviceName": "Appraisals"
        },
        {
            "serviceId": "backend",
            "serviceName": "Backend"
        },
        {
            "serviceId": "barrel",
            "serviceName": "Barrel"
        }
    ]
}

function getServices() {
    // stub
    return new Promise((resolve, reject) => {
        const services = datastore.services;

        resolve(services);
    })
}

function createService(data) {
    // stub
    return new Promise((resolve, reject) => {
        const services = datastore.services;
        services.push(data);
        
        console.log(`Created new service ${data.serviceName}`);

        resolve();
    })
}

function updateService(service, data) {
    // stub
    return new Promise((resolve, reject) => {
        const services = datastore.services;

        let foundService = services.find(s => s.serviceId === serviceId);

        if (typeof foundService === 'undefined') reject('Could not find service');
        else resolve(Object.assign(foundService, service));
    })    
}

function deleteService(serviceId) {
    // stub
    return new Promise((resolve, reject) => {
        const services = datastore.services;

        console.log(`Deleted service with id: ${serviceId}`);

        resolve();
    })
}

function getServiceNameFromId(serviceId) {
    // stub
    return new Promise((resolve, reject) => {
        const services = datastore.services;

        let foundService = services.find(s => s.serviceId === serviceId);

        if (typeof foundService === 'undefined') reject('Could not find service');
        else resolve(foundService.serviceName);
    })
}