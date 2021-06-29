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
            "riskFactors": [],
            "config": [
                {
                    "configId": "budget",
                    "configDesc": "Shows the total number of minutes that a service can be down each year to meet the specified availability.",
                    "configCategory": "global",
                    "configValue": true
                },
                {
                    "configId": "accepted",
                    "configDesc": "Shows the amount of downtime that has been marked as tolerated.",
                    "configCategory": "global",
                    "configValue": true
                },
                {
                    "configId": "unallocated",
                    "configDesc": "Shows the total number of remaining minutes in the budget after subtracting tolerated minutes.",
                    "configCategory": "global",
                    "configValue": false
                },
                {
                    "configId": "individualThreshold",
                    "configDesc": "Shows the number of minutes that represents the individual threshold for any one risk.",
                    "configCategory": "global",
                    "configValue": true
                },
                {
                    "configId": "incidents",
                    "configDesc": "Shows the number of incidents each year that are expected to happen regarding this risk.",
                    "configCategory": "risk",
                    "configValue": true
                },
                {
                    "configId": "affectedTime",
                    "configDesc": "Shows the calculated downtime that this risk will generate each year.",
                    "configCategory": "risk",
                    "configValue": true
                },
                {
                    "configId": "shareBudget",
                    "configDesc": "Shows the percentage of the total budget that this risk represents.",
                    "configCategory": "risk",
                    "configValue": true
                },
                {
                    "configId": "shareTolerated",
                    "configDesc": "Shows the percentage of the total number of tolerated minutes that this risk represents.",
                    "configCategory": "risk",
                    "configValue": false
                },
                {
                    "configId": "contribution",
                    "configDesc": "Shows the number of minutes that this risk factor contributed to the total.",
                    "configCategory": "riskFactor",
                    "configValue": true
                },
                {
                    "configId": "enable",
                    "configDesc": "Shows a toggle to enable or disable a risk factor temporarily.",
                    "configCategory": "riskFactor",
                    "configValue": true
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
            ],
            "config": [
                {
                    "configId": "budget",
                    "configDesc": "Shows the total number of minutes that a service can be down each year to meet the specified availability.",
                    "configCategory": "global",
                    "configValue": true
                },
                {
                    "configId": "accepted",
                    "configDesc": "Shows the amount of downtime that has been marked as tolerated.",
                    "configCategory": "global",
                    "configValue": true
                },
                {
                    "configId": "unallocated",
                    "configDesc": "Shows the total number of remaining minutes in the budget after subtracting tolerated minutes.",
                    "configCategory": "global",
                    "configValue": true
                },
                {
                    "configId": "individualThreshold",
                    "configDesc": "Shows the number of minutes that represents the individual threshold for any one risk.",
                    "configCategory": "global",
                    "configValue": true
                },
                {
                    "configId": "incidents",
                    "configDesc": "Shows the number of incidents each year that are expected to happen regarding this risk.",
                    "configCategory": "risk",
                    "configValue": true
                },
                {
                    "configId": "affectedTime",
                    "configDesc": "Shows the calculated downtime that this risk will generate each year.",
                    "configCategory": "risk",
                    "configValue": true
                },
                {
                    "configId": "shareBudget",
                    "configDesc": "Shows the percentage of the total budget that this risk represents.",
                    "configCategory": "risk",
                    "configValue": true
                },
                {
                    "configId": "shareTolerated",
                    "configDesc": "Shows the percentage of the total number of tolerated minutes that this risk represents.",
                    "configCategory": "risk",
                    "configValue": false
                },
                {
                    "configId": "contribution",
                    "configDesc": "Shows the number of minutes that this risk factor contributed to the total.",
                    "configCategory": "riskFactor",
                    "configValue": false
                },
                {
                    "configId": "enable",
                    "configDesc": "Shows a toggle to enable or disable a risk factor temporarily.",
                    "configCategory": "riskFactor",
                    "configValue": false
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
            ],
            "config": [
                {
                    "configId": "budget",
                    "configDesc": "Shows the total number of minutes that a service can be down each year to meet the specified availability.",
                    "configCategory": "global",
                    "configValue": true
                },
                {
                    "configId": "accepted",
                    "configDesc": "Shows the amount of downtime that has been marked as tolerated.",
                    "configCategory": "global",
                    "configValue": true
                },
                {
                    "configId": "unallocated",
                    "configDesc": "Shows the total number of remaining minutes in the budget after subtracting tolerated minutes.",
                    "configCategory": "global",
                    "configValue": true
                },
                {
                    "configId": "individualThreshold",
                    "configDesc": "Shows the number of minutes that represents the individual threshold for any one risk.",
                    "configCategory": "global",
                    "configValue": true
                },
                {
                    "configId": "incidents",
                    "configDesc": "Shows the number of incidents each year that are expected to happen regarding this risk.",
                    "configCategory": "risk",
                    "configValue": true
                },
                {
                    "configId": "affectedTime",
                    "configDesc": "Shows the calculated downtime that this risk will generate each year.",
                    "configCategory": "risk",
                    "configValue": true
                },
                {
                    "configId": "shareBudget",
                    "configDesc": "Shows the percentage of the total budget that this risk represents.",
                    "configCategory": "risk",
                    "configValue": true
                },
                {
                    "configId": "shareTolerated",
                    "configDesc": "Shows the percentage of the total number of tolerated minutes that this risk represents.",
                    "configCategory": "risk",
                    "configValue": true
                },
                {
                    "configId": "contribution",
                    "configDesc": "Shows the number of minutes that this risk factor contributed to the total.",
                    "configCategory": "riskFactor",
                    "configValue": true
                },
                {
                    "configId": "enable",
                    "configDesc": "Shows a toggle to enable or disable a risk factor temporarily.",
                    "configCategory": "riskFactor",
                    "configValue": true
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
            ],
            "config": [
                {
                    "configId": "budget",
                    "configDesc": "Shows the total number of minutes that a service can be down each year to meet the specified availability.",
                    "configCategory": "global",
                    "configValue": true
                },
                {
                    "configId": "accepted",
                    "configDesc": "Shows the amount of downtime that has been marked as tolerated.",
                    "configCategory": "global",
                    "configValue": true
                },
                {
                    "configId": "unallocated",
                    "configDesc": "Shows the total number of remaining minutes in the budget after subtracting tolerated minutes.",
                    "configCategory": "global",
                    "configValue": true
                },
                {
                    "configId": "individualThreshold",
                    "configDesc": "Shows the number of minutes that represents the individual threshold for any one risk.",
                    "configCategory": "global",
                    "configValue": true
                },
                {
                    "configId": "incidents",
                    "configDesc": "Shows the number of incidents each year that are expected to happen regarding this risk.",
                    "configCategory": "risk",
                    "configValue": true
                },
                {
                    "configId": "affectedTime",
                    "configDesc": "Shows the calculated downtime that this risk will generate each year.",
                    "configCategory": "risk",
                    "configValue": true
                },
                {
                    "configId": "shareBudget",
                    "configDesc": "Shows the percentage of the total budget that this risk represents.",
                    "configCategory": "risk",
                    "configValue": true
                },
                {
                    "configId": "shareTolerated",
                    "configDesc": "Shows the percentage of the total number of tolerated minutes that this risk represents.",
                    "configCategory": "risk",
                    "configValue": true
                },
                {
                    "configId": "contribution",
                    "configDesc": "Shows the number of minutes that this risk factor contributed to the total.",
                    "configCategory": "riskFactor",
                    "configValue": true
                },
                {
                    "configId": "enable",
                    "configDesc": "Shows a toggle to enable or disable a risk factor temporarily.",
                    "configCategory": "riskFactor",
                    "configValue": true
                }
            ]
        }
    ]
}

function deleteIfNotUndo(msg, callback, resolve, timeout=10000) {
    let notifId = pushNotification({ 
        msg,
        onClick: (id) => {
            popNotification(id);
            resolve();
        }
    }, timeout);

    setTimeout(() => {
        if (popNotification(notifId)) {
            callback();
            resolve();
        }
    }, timeout)
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
        
        deleteIfNotUndo(`Deleted service <em>${services[foundServiceIndex].serviceName}</em>. <a>Click to undo.</a>`, () => {
            services.splice(foundServiceIndex, 1);
            console.log(`Deleted service with id: ${serviceId}`);
        }, resolve)
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

function getConfig(serviceId) {
    // stub
    return new Promise((resolve, reject) => {
        const services = datastore.services;

        let foundService = services.find(s => s.serviceId === serviceId);

        if (typeof foundService === 'undefined') reject('Could not find service');
        else resolve(foundService.config);
    })
}

function updateConfig(serviceId, configId, configValue) {
    // stub
    return new Promise((resolve, reject) => {
        const services = datastore.services;

        let foundService = services.find(s => s.serviceId === serviceId);

        if (typeof foundService === 'undefined') reject('Could not find service');
        
        const config = foundService.config;
        
        let foundConfig = config.find(c => c.configId === configId);

        if (typeof foundConfig === 'undefined') reject('Could not find config option');
        else {
            foundConfig.configValue = configValue;
            resolve();
        }
    })
}

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
        
        deleteIfNotUndo(`Deleted risk factor <em>${riskFactors[foundRiskFactorIndex].riskFactorDesc}</em>. <a>Click to undo.</a>`, () => {
            riskFactors.splice(foundRiskFactorIndex, 1);
            console.log(`Deleted risk factor with id ${riskFactorId} from ${foundService.serviceName}`);
        }, resolve)
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
        
        deleteIfNotUndo(`Deleted risk <em>${risks[foundRiskIndex].riskDesc}</em>. <a>Click to undo.</a>`, () => {
            risks.splice(foundRiskIndex, 1);
            console.log(`Deleted risk with id ${riskId} from ${foundService.serviceName}`);
        }, resolve)
    })
}