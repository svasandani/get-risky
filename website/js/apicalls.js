const datastore = {
    "services": [
        {
            "serviceId": "auth",
            "serviceName": "Authentication",
            "risks": [
                {
                    "riskId": "pods-down",
                    "riskDesc": "Service pods down",
                    "riskEttd": 1440,
                    "riskEttr": 120,
                    "riskImpact": 5,
                    "riskEttf": 365
                }
            ],
            "riskFactors": []
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
                    "riskImpact": 5,
                    "riskEttf": 365
                },
                {
                    "riskId": "prometheus-misconfigured",
                    "riskDesc": "Prometheus retention misconfigured",
                    "riskEttd": 1440,
                    "riskEttr": 30,
                    "riskImpact": 5,
                    "riskEttf": 365
                },
                {
                    "riskId": "k8s-dns",
                    "riskDesc": "Kubernetes DNS issue",
                    "riskEttd": 20,
                    "riskEttr": 30,
                    "riskImpact": 1,
                    "riskEttf": 30
                }
            ],
            "riskFactors": [
                {
                    "riskFactorId": "no-phone",
                    "riskFactorDesc": "Engineers don't have cellphones",
                    "riskFactorEttd": 0,
                    "riskFactorEttr": 0,
                    "riskFactorImpact": 0,
                    "riskFactorEttf": 0
                },
                {
                    "riskFactorId": "services",
                    "riskFactorDesc": "Engineers don't understand relevant service",
                    "riskFactorEttd": 0,
                    "riskFactorEttr": 0,
                    "riskFactorImpact": 0,
                    "riskFactorEttf": 0
                }
            ]
        },
        {
            "serviceId": "event",
            "serviceName": "EventBus",
            "risks": [
                {
                    "riskId": "pods-down",
                    "riskDesc": "Service pods down",
                    "riskEttd": 1440,
                    "riskEttr": 120,
                    "riskImpact": 5,
                    "riskEttf": 365
                },
                {
                    "riskId": "prometheus-misconfigured",
                    "riskDesc": "Prometheus retention misconfigured",
                    "riskEttd": 1440,
                    "riskEttr": 30,
                    "riskImpact": 5,
                    "riskEttf": 365
                },
                {
                    "riskId": "k8s-dns",
                    "riskDesc": "Kubernetes DNS issue",
                    "riskEttd": 20,
                    "riskEttr": 30,
                    "riskImpact": 1,
                    "riskEttf": 30
                }
            ],
            "riskFactors": [
                {
                    "riskFactorId": "no-phone",
                    "riskFactorDesc": "Engineers don't have cellphones",
                    "riskFactorEttd": 60,
                    "riskFactorEttr": 4,
                    "riskFactorImpact": 1,
                    "riskFactorEttf": 1
                },
                {
                    "riskFactorId": "services",
                    "riskFactorDesc": "Engineers don't understand relevant service",
                    "riskFactorEttd": 0,
                    "riskFactorEttr": 30,
                    "riskFactorImpact": 10,
                    "riskFactorEttf": 0
                }
            ]
        },
        {
            "serviceId": "geo",
            "serviceName": "Geolocation",
            "risks": [
                {
                    "riskId": "pods-down",
                    "riskDesc": "Service pods down",
                    "riskEttd": 1440,
                    "riskEttr": 120,
                    "riskImpact": 5,
                    "riskEttf": 365
                },
                {
                    "riskId": "prometheus-misconfigured",
                    "riskDesc": "Prometheus retention misconfigured",
                    "riskEttd": 1440,
                    "riskEttr": 30,
                    "riskImpact": 5,
                    "riskEttf": 365
                },
                {
                    "riskId": "k8s-dns",
                    "riskDesc": "Kubernetes DNS issue",
                    "riskEttd": 20,
                    "riskEttr": 30,
                    "riskImpact": 1,
                    "riskEttf": 30
                }
            ],
            "riskFactors": [
                {
                    "riskFactorId": "no-phone",
                    "riskFactorDesc": "Engineers don't have cellphones",
                    "riskFactorEttd": 60,
                    "riskFactorEttr": 4,
                    "riskFactorImpact": 1,
                    "riskFactorEttf": 1
                },
                {
                    "riskFactorId": "services",
                    "riskFactorDesc": "Engineers don't understand relevant service",
                    "riskFactorEttd": 0,
                    "riskFactorEttr": 30,
                    "riskFactorImpact": 10,
                    "riskFactorEttf": 0
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

function updateService(serviceId, data) {
    // stub
    return new Promise((resolve, reject) => {
        const services = datastore.services;

        let foundService = services.find(s => s.serviceId === serviceId);

        if (typeof foundService === 'undefined') reject('Could not find service');
        else resolve(Object.assign(foundService, data));
    })    
}

function deleteService(serviceId) {
    // stub
    return new Promise((resolve, reject) => {
        const services = datastore.services;

        let foundServiceIndex = services.findIndex(s => s.serviceId === serviceId);

        if (foundServiceIndex === -1) reject('Could not find service');
        
        services.splice(foundServiceIndex, 1);
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

// TODO: refactor and add 'getRisk'

function getRiskFactors(serviceId) {
    // stub
    return new Promise((resolve, reject) => {
        const services = datastore.services;

        let foundService = services.find(s => s.serviceId === serviceId);

        if (typeof foundService === 'undefined') reject('Could not find service');
        else resolve(foundService.riskFactors);
    })
}

function createRiskFactor(serviceId, data) {
    // stub
    return new Promise((resolve, reject) => {
        const services = datastore.services;
        
        let foundService = services.find(s => s.serviceId === serviceId);

        if (typeof foundService === 'undefined') reject('Could not find service');

        const riskFactors = foundService.riskFactors;
        
        riskFactors.push(data);
        console.log(`Created new risk factor under ${foundService.serviceName}: ${data.riskFactorDesc}`);

        resolve();
    })
}

function updateRiskFactor(serviceId, riskFactorId, data) {
    // stub
    return new Promise((resolve, reject) => {
        const services = datastore.services;

        let foundService = services.find(s => s.serviceId === serviceId);

        if (typeof foundService === 'undefined') reject('Could not find service');

        const riskFactors = foundService.riskFactors;

        let foundRiskFactor = riskFactors.find(r => r.riskFactorId === riskFactorId);

        if (typeof foundRiskFactor === 'undefined') reject('Could not find risk factor');
        else resolve(Object.assign(foundRiskFactor, data));
    })    
}

function deleteRiskFactor(serviceId, riskFactorId) {
    // stub
    return new Promise((resolve, reject) => {
        const services = datastore.services;

        let foundService = services.find(s => s.serviceId === serviceId);

        if (typeof foundService === 'undefined') reject('Could not find service');

        const riskFactors = foundService.riskFactors;

        let foundRiskFactorIndex = riskFactors.findIndex(r => r.riskFactorId === riskFactorId);

        if (foundRiskFactorIndex === -1) reject('Could not find risk');
        
        riskFactors.splice(foundRiskFactorIndex, 1);
        console.log(`Deleted risk factor with id ${riskFactorId} from ${foundService.serviceName}`);

        resolve();
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

function createRisk(serviceId, data) {
    // stub
    return new Promise((resolve, reject) => {
        const services = datastore.services;
        
        let foundService = services.find(s => s.serviceId === serviceId);

        if (typeof foundService === 'undefined') reject('Could not find service');

        const risks = foundService.risks;
        
        risks.push(data);
        console.log(`Created new risk under ${foundService.serviceName}: ${data.riskDesc}`);

        resolve();
    })
}

function updateRisk(serviceId, riskId, data) {
    // stub
    return new Promise((resolve, reject) => {
        const services = datastore.services;

        let foundService = services.find(s => s.serviceId === serviceId);

        if (typeof foundService === 'undefined') reject('Could not find service');

        const risks = foundService.risks;

        let foundRisk = risks.find(r => r.riskId === riskId);

        if (typeof foundRisk === 'undefined') reject('Could not find risk');
        else resolve(Object.assign(foundRisk, data));
    })    
}

function deleteRisk(serviceId, riskId) {
    // stub
    return new Promise((resolve, reject) => {
        const services = datastore.services;

        let foundService = services.find(s => s.serviceId === serviceId);

        if (typeof foundService === 'undefined') reject('Could not find service');

        const risks = foundService.risks;

        let foundRiskIndex = risks.findIndex(r => r.riskId === riskId);

        if (foundRiskIndex === -1) reject('Could not find risk');
        
        risks.splice(foundRiskIndex, 1);
        console.log(`Deleted risk with id ${riskId} from ${foundService.serviceName}`);

        resolve();
    })
}