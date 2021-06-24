const datastore = {
    "services": [
        {
            "serviceId": "appraisals",
            "serviceName": "Appraisals",
            "risks": [
                {
                    "riskId": "pods-down",
                    "riskDesc": "Service pods down",
                    "riskEttd": 1440,
                    "riskEttr": 120,
                    "riskImpact": 1.0,
                    "riskEttf": 365
                },
                {
                    "riskId": "prometheus-misconfigured",
                    "riskDesc": "Prometheus retention misconfigured",
                    "riskEttd": 1440,
                    "riskEttr": 30,
                    "riskImpact": 1.0,
                    "riskEttf": 365
                },
                {
                    "riskId": "k8s-dns",
                    "riskDesc": "Kubernetes DNS issue",
                    "riskEttd": 20,
                    "riskEttr": 30,
                    "riskImpact": 0.05,
                    "riskEttf": 30
                }
            ]
        },
        {
            "serviceId": "backend",
            "serviceName": "Backend",
            "risks": [
                {
                    "riskId": "pods-down",
                    "riskDesc": "Service pods down",
                    "riskEttd": 1440,
                    "riskEttr": 120,
                    "riskImpact": 1.0,
                    "riskEttf": 365
                },
                {
                    "riskId": "prometheus-misconfigured",
                    "riskDesc": "Prometheus retention misconfigured",
                    "riskEttd": 1440,
                    "riskEttr": 30,
                    "riskImpact": 1.0,
                    "riskEttf": 365
                },
                {
                    "riskId": "k8s-dns",
                    "riskDesc": "Kubernetes DNS issue",
                    "riskEttd": 20,
                    "riskEttr": 30,
                    "riskImpact": 0.05,
                    "riskEttf": 30
                }
            ]
        },
        {
            "serviceId": "barrel",
            "serviceName": "Barrel",
            "risks": [
                {
                    "riskId": "pods-down",
                    "riskDesc": "Service pods down",
                    "riskEttd": 1440,
                    "riskEttr": 120,
                    "riskImpact": 1.0,
                    "riskEttf": 365
                },
                {
                    "riskId": "prometheus-misconfigured",
                    "riskDesc": "Prometheus retention misconfigured",
                    "riskEttd": 1440,
                    "riskEttr": 30,
                    "riskImpact": 1.0,
                    "riskEttf": 365
                },
                {
                    "riskId": "k8s-dns",
                    "riskDesc": "Kubernetes DNS issue",
                    "riskEttd": 20,
                    "riskEttr": 30,
                    "riskImpact": 0.05,
                    "riskEttf": 30
                }
            ]
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

function getRisks(serviceId) {
    // stub
    return new Promise((resolve, reject) => {
        const services = datastore.services;

        let foundService = services.find(s => s.serviceId === serviceId);

        if (typeof foundService === 'undefined') reject('Could not find service');
        else resolve(foundService.risks);
    })
}