const url =`http://localhost:3000`

const datastore = {
    "services": [
        {
            "id": 1,
            "serviceId": "auth",
            "serviceName": "Authentication",
            "risks": [
                {
                    "id": 1,
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
                    "id": 1,
                    "configId": "budget",
                    "configDesc": "Shows the total number of minutes that a service can be down each year to meet the specified availability.",
                    "configCategory": "global",
                    "configValue": true
                },
                {
                    "id": 2,
                    "configId": "accepted",
                    "configDesc": "Shows the amount of downtime that has been marked as tolerated.",
                    "configCategory": "global",
                    "configValue": true
                },
                {
                    "id": 3,
                    "configId": "unallocated",
                    "configDesc": "Shows the total number of remaining minutes in the budget after subtracting tolerated minutes.",
                    "configCategory": "global",
                    "configValue": false
                },
                {
                    "id": 4,
                    "configId": "individualThreshold",
                    "configDesc": "Shows the number of minutes that represents the individual threshold for any one risk.",
                    "configCategory": "global",
                    "configValue": true
                },
                {
                    "id": 5,
                    "configId": "incidents",
                    "configDesc": "Shows the number of incidents each year that are expected to happen regarding this risk.",
                    "configCategory": "risk",
                    "configValue": true
                },
                {
                    "id": 6,
                    "configId": "affectedTime",
                    "configDesc": "Shows the calculated downtime that this risk will generate each year.",
                    "configCategory": "risk",
                    "configValue": true
                },
                {
                    "id": 7,
                    "configId": "shareBudget",
                    "configDesc": "Shows the percentage of the total budget that this risk represents.",
                    "configCategory": "risk",
                    "configValue": true
                },
                {
                    "id": 8,
                    "configId": "shareTolerated",
                    "configDesc": "Shows the percentage of the total number of tolerated minutes that this risk represents.",
                    "configCategory": "risk",
                    "configValue": false
                },
                {
                    "id": 9,
                    "configId": "contribution",
                    "configDesc": "Shows the number of minutes that this risk factor contributed to the total.",
                    "configCategory": "riskFactor",
                    "configValue": true
                },
                {
                    "id": 10,
                    "configId": "enable",
                    "configDesc": "Shows a toggle to enable or disable a risk factor temporarily.",
                    "configCategory": "riskFactor",
                    "configValue": true
                }
            ]
        },
        {
            "id": 2,
            "serviceId": "backend",
            "serviceName": "Backend",
            "risks": [
                {
                    "id": 1,
                    "riskId": "pods-down",
                    "riskDesc": "Service pods down",
                    "riskEttd": 1440,
                    "riskEttr": 120,
                    "riskImpact": 5,
                    "riskEttf": 365
                },
                {
                    "id": 2,
                    "riskId": "prometheus-misconfigured",
                    "riskDesc": "Prometheus retention misconfigured",
                    "riskEttd": 1440,
                    "riskEttr": 30,
                    "riskImpact": 5,
                    "riskEttf": 365
                },
                {
                    "id": 3,
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
                    "id": 1,
                    "riskFactorId": "no-phone",
                    "riskFactorDesc": "Engineers don't have cellphones",
                    "riskFactorEttd": 0,
                    "riskFactorEttr": 0,
                    "riskFactorImpact": 0,
                    "riskFactorEttf": 0
                },
                {
                    "id": 2,
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
                    "id": 1,
                    "configId": "budget",
                    "configDesc": "Shows the total number of minutes that a service can be down each year to meet the specified availability.",
                    "configCategory": "global",
                    "configValue": true
                },
                {
                    "id": 2,
                    "configId": "accepted",
                    "configDesc": "Shows the amount of downtime that has been marked as tolerated.",
                    "configCategory": "global",
                    "configValue": true
                },
                {
                    "id": 3,
                    "configId": "unallocated",
                    "configDesc": "Shows the total number of remaining minutes in the budget after subtracting tolerated minutes.",
                    "configCategory": "global",
                    "configValue": true
                },
                {
                    "id": 4,
                    "configId": "individualThreshold",
                    "configDesc": "Shows the number of minutes that represents the individual threshold for any one risk.",
                    "configCategory": "global",
                    "configValue": true
                },
                {
                    "id": 5,
                    "configId": "incidents",
                    "configDesc": "Shows the number of incidents each year that are expected to happen regarding this risk.",
                    "configCategory": "risk",
                    "configValue": true
                },
                {
                    "id": 6,
                    "configId": "affectedTime",
                    "configDesc": "Shows the calculated downtime that this risk will generate each year.",
                    "configCategory": "risk",
                    "configValue": true
                },
                {
                    "id": 7,
                    "configId": "shareBudget",
                    "configDesc": "Shows the percentage of the total budget that this risk represents.",
                    "configCategory": "risk",
                    "configValue": true
                },
                {
                    "id": 8,
                    "configId": "shareTolerated",
                    "configDesc": "Shows the percentage of the total number of tolerated minutes that this risk represents.",
                    "configCategory": "risk",
                    "configValue": false
                },
                {
                    "id": 9,
                    "configId": "contribution",
                    "configDesc": "Shows the number of minutes that this risk factor contributed to the total.",
                    "configCategory": "riskFactor",
                    "configValue": false
                },
                {
                    "id": 10,
                    "configId": "enable",
                    "configDesc": "Shows a toggle to enable or disable a risk factor temporarily.",
                    "configCategory": "riskFactor",
                    "configValue": false
                }
            ]
        },
        {
            "id": 3,
            "serviceId": "event",
            "serviceName": "EventBus",
            "risks": [
                {
                    "id": 1,
                    "riskId": "pods-down",
                    "riskDesc": "Service pods down",
                    "riskEttd": 1440,
                    "riskEttr": 120,
                    "riskImpact": 5,
                    "riskEttf": 365
                },
                {
                    "id": 2,
                    "riskId": "prometheus-misconfigured",
                    "riskDesc": "Prometheus retention misconfigured",
                    "riskEttd": 1440,
                    "riskEttr": 30,
                    "riskImpact": 5,
                    "riskEttf": 365
                },
                {
                    "id": 3,
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
                    "id": 1,
                    "riskFactorId": "no-phone",
                    "riskFactorDesc": "Engineers don't have cellphones",
                    "riskFactorEttd": 60,
                    "riskFactorEttr": 4,
                    "riskFactorImpact": 1,
                    "riskFactorEttf": 1
                },
                {
                    "id": 2,
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
                    "id": 1,
                    "configId": "budget",
                    "configDesc": "Shows the total number of minutes that a service can be down each year to meet the specified availability.",
                    "configCategory": "global",
                    "configValue": true
                },
                {
                    "id": 2,
                    "configId": "accepted",
                    "configDesc": "Shows the amount of downtime that has been marked as tolerated.",
                    "configCategory": "global",
                    "configValue": true
                },
                {
                    "id": 3,
                    "configId": "unallocated",
                    "configDesc": "Shows the total number of remaining minutes in the budget after subtracting tolerated minutes.",
                    "configCategory": "global",
                    "configValue": true
                },
                {
                    "id": 4,
                    "configId": "individualThreshold",
                    "configDesc": "Shows the number of minutes that represents the individual threshold for any one risk.",
                    "configCategory": "global",
                    "configValue": true
                },
                {
                    "id": 5,
                    "configId": "incidents",
                    "configDesc": "Shows the number of incidents each year that are expected to happen regarding this risk.",
                    "configCategory": "risk",
                    "configValue": true
                },
                {
                    "id": 6,
                    "configId": "affectedTime",
                    "configDesc": "Shows the calculated downtime that this risk will generate each year.",
                    "configCategory": "risk",
                    "configValue": true
                },
                {
                    "id": 7,
                    "configId": "shareBudget",
                    "configDesc": "Shows the percentage of the total budget that this risk represents.",
                    "configCategory": "risk",
                    "configValue": true
                },
                {
                    "id": 8,
                    "configId": "shareTolerated",
                    "configDesc": "Shows the percentage of the total number of tolerated minutes that this risk represents.",
                    "configCategory": "risk",
                    "configValue": true
                },
                {
                    "id": 9,
                    "configId": "contribution",
                    "configDesc": "Shows the number of minutes that this risk factor contributed to the total.",
                    "configCategory": "riskFactor",
                    "configValue": true
                },
                {
                    "id": 10,
                    "configId": "enable",
                    "configDesc": "Shows a toggle to enable or disable a risk factor temporarily.",
                    "configCategory": "riskFactor",
                    "configValue": true
                }
            ]
        },
        {
            "id": 4,
            "serviceId": "geo",
            "serviceName": "Geolocation",
            "risks": [
                {
                    "id": 1,
                    "riskId": "pods-down",
                    "riskDesc": "Service pods down",
                    "riskEttd": 1440,
                    "riskEttr": 120,
                    "riskImpact": 5,
                    "riskEttf": 365
                },
                {
                    "id": 2,
                    "riskId": "prometheus-misconfigured",
                    "riskDesc": "Prometheus retention misconfigured",
                    "riskEttd": 1440,
                    "riskEttr": 30,
                    "riskImpact": 5,
                    "riskEttf": 365
                },
                {
                    "id": 3,
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
                    "id": 1,
                    "riskFactorId": "no-phone",
                    "riskFactorDesc": "Engineers don't have cellphones",
                    "riskFactorEttd": 60,
                    "riskFactorEttr": 4,
                    "riskFactorImpact": 1,
                    "riskFactorEttf": 1
                },
                {
                    "id": 2,
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
                    "id": 1,
                    "configId": "budget",
                    "configDesc": "Shows the total number of minutes that a service can be down each year to meet the specified availability.",
                    "configCategory": "global",
                    "configValue": true
                },
                {
                    "id": 2,
                    "configId": "accepted",
                    "configDesc": "Shows the amount of downtime that has been marked as tolerated.",
                    "configCategory": "global",
                    "configValue": true
                },
                {
                    "id": 3,
                    "configId": "unallocated",
                    "configDesc": "Shows the total number of remaining minutes in the budget after subtracting tolerated minutes.",
                    "configCategory": "global",
                    "configValue": true
                },
                {
                    "id": 4,
                    "configId": "individualThreshold",
                    "configDesc": "Shows the number of minutes that represents the individual threshold for any one risk.",
                    "configCategory": "global",
                    "configValue": true
                },
                {
                    "id": 5,
                    "configId": "incidents",
                    "configDesc": "Shows the number of incidents each year that are expected to happen regarding this risk.",
                    "configCategory": "risk",
                    "configValue": true
                },
                {
                    "id": 6,
                    "configId": "affectedTime",
                    "configDesc": "Shows the calculated downtime that this risk will generate each year.",
                    "configCategory": "risk",
                    "configValue": true
                },
                {
                    "id": 7,
                    "configId": "shareBudget",
                    "configDesc": "Shows the percentage of the total budget that this risk represents.",
                    "configCategory": "risk",
                    "configValue": true
                },
                {
                    "id": 8,
                    "configId": "shareTolerated",
                    "configDesc": "Shows the percentage of the total number of tolerated minutes that this risk represents.",
                    "configCategory": "risk",
                    "configValue": true
                },
                {
                    "id": 9,
                    "configId": "contribution",
                    "configDesc": "Shows the number of minutes that this risk factor contributed to the total.",
                    "configCategory": "riskFactor",
                    "configValue": true
                },
                {
                    "id": 10,
                    "configId": "enable",
                    "configDesc": "Shows a toggle to enable or disable a risk factor temporarily.",
                    "configCategory": "riskFactor",
                    "configValue": true
                }
            ]
        }
    ]
}

function deleteIfNotUndo(msg, callback, resolve, timeout=5000) {
    mock(deleteIfNotUndo, msg, callback, resolve, timeout);

    let notifId = pushNotification({ 
        msg,
        onClick: (id) => {
            popNotification(id);
            resolve();
        }
    }, timeout);

    let handler;
    window.addEventListener('beforeunload', handler = function(e) {
        if (popNotification(notifId)) callback();
    });

    setTimeout(() => {
        window.removeEventListener('beforeunload', handler);
        if (popNotification(notifId)) {
            callback();
            resolve();
        }
    }, timeout)
}

function getServices() {
    mock(getServices);

    return new Promise((resolve, reject) => {

        const services = datastore.services;

        resolve(services);
    })
}

function createService(data) {
    mock(createService, data);

    return new Promise((resolve, reject) => {

        const services = datastore.services;
        services.push(data);
        
        console.log(`Created new service ${data.serviceName}`);

        resolve();
    })
}

function updateService(id, data) {
    mock(updateService, id, data);

    return new Promise((resolve, reject) => {
        const services = datastore.services;

        let foundService = services.find(s => s.id === id);

        if (typeof foundService === 'undefined') reject('Could not find service');
        else resolve(Object.assign(foundService, data));
    })    
}

function deleteService(id) {
    mock(deleteService, id);

    return new Promise((resolve, reject) => {
        const services = datastore.services;

        let foundServiceIndex = services.findIndex(s => s.id === id);

        if (foundServiceIndex === -1) reject('Could not find service');
        
        deleteIfNotUndo(`Deleted service <em>${services[foundServiceIndex].serviceName}</em>. <a>Click to undo.</a>`, () => {
            services.splice(foundServiceIndex, 1);
            console.log(`Deleted service with id: ${id}`);
        }, resolve)
    })
}

function getServiceFromSlug(serviceId) {
    mock(getServiceFromSlug, serviceId);
    
    return new Promise((resolve, reject) => {
        mock(getServiceFromSlug, serviceId);

        const services = datastore.services;

        let foundService = services.find(s => s.serviceId === serviceId);

        if (typeof foundService === 'undefined') reject('Could not find service');
        else resolve(foundService);
    })
}

function getConfig(id) {
    mock(getConfig, id);
    
    return new Promise((resolve, reject) => {
        const services = datastore.services;

        let foundService = services.find(s => s.id === id);

        if (typeof foundService === 'undefined') reject('Could not find service');
        else resolve(foundService.config);

        // fetch(`${url}/services/${id}/configs/`)
        //     .then(r => r.json())
        //     .then(resolve)
    })
}

function updateConfig(id, configId, configValue) {
    mock(updateConfig, id, configId, configValue);
    
    return new Promise((resolve, reject) => {
        const services = datastore.services;

        let foundService = services.find(s => s.id === id);

        if (typeof foundService === 'undefined') reject('Could not find service');
        
        const config = foundService.config;
        
        let foundConfig = config.find(c => c.id === configId);

        if (typeof foundConfig === 'undefined') reject('Could not find config option');
        else {
            foundConfig.configValue = configValue;
            resolve();
        }
    })
}

function getRiskFactors(id) {
    mock(getRiskFactors, id);
    
    return new Promise((resolve, reject) => {
        const services = datastore.services;

        let foundService = services.find(s => s.id === id);

        if (typeof foundService === 'undefined') reject('Could not find service');
        else resolve(foundService.riskFactors);

        // fetch(`${url}/services/${id}/riskFactors/`)
        //     .then(r => r.json())
        //     .then(resolve)
    })
}

function createRiskFactor(id, data) {
    mock(createRiskFactor, id, data);
    
    return new Promise((resolve, reject) => {
        const services = datastore.services;
        
        let foundService = services.find(s => s.id === id);

        if (typeof foundService === 'undefined') reject('Could not find service');

        const riskFactors = foundService.riskFactors;
        
        riskFactors.push(data);
        console.log(`Created new risk factor under ${foundService.serviceName}: ${data.riskFactorDesc}`);

        resolve();
    })
}

function updateRiskFactor(id, riskFactorId, data) {
    mock(updateRiskFactor, id, riskFactorId, data);
    
    return new Promise((resolve, reject) => {
        const services = datastore.services;

        let foundService = services.find(s => s.id === id);

        if (typeof foundService === 'undefined') reject('Could not find service');

        const riskFactors = foundService.riskFactors;

        let foundRiskFactor = riskFactors.find(r => r.id === riskFactorId);

        if (typeof foundRiskFactor === 'undefined') reject('Could not find risk factor');
        else resolve(Object.assign(foundRiskFactor, data));
    })    
}

function deleteRiskFactor(id, riskFactorId) {
    mock(deleteRiskFactor, id, riskFactorId);
    
    return new Promise((resolve, reject) => {
        const services = datastore.services;

        let foundService = services.find(s => s.id === id);

        if (typeof foundService === 'undefined') reject('Could not find service');

        const riskFactors = foundService.riskFactors;

        let foundRiskFactorIndex = riskFactors.findIndex(r => r.id === riskFactorId);

        if (foundRiskFactorIndex === -1) reject('Could not find risk');
        
        deleteIfNotUndo(`Deleted risk factor <em>${riskFactors[foundRiskFactorIndex].riskFactorDesc}</em>. <a>Click to undo.</a>`, () => {
            riskFactors.splice(foundRiskFactorIndex, 1);
            console.log(`Deleted risk factor with id ${riskFactorId} from ${foundService.serviceName}`);
        }, resolve)
    })
}

function getRisks(id) {
    mock(getRisks, id);
    
    return new Promise((resolve, reject) => {
        const services = datastore.services;

        let foundService = services.find(s => s.id === id);

        if (typeof foundService === 'undefined') reject('Could not find service');
        else resolve(foundService.risks);

        // fetch(`${url}/services/${id}/risks/`)
        //     .then(r => r.json())
        //     .then(resolve)
    })
}

function createRisk(id, data) {
    mock(createRisk, id, data);
    
    return new Promise((resolve, reject) => {
        const services = datastore.services;
        
        let foundService = services.find(s => s.id === id);

        if (typeof foundService === 'undefined') reject('Could not find service');

        const risks = foundService.risks;
        
        risks.push(data);
        console.log(`Created new risk under ${foundService.serviceName}: ${data.riskDesc}`);

        resolve();
    })
}

function updateRisk(id, riskId, data) {
    mock(updateRisk, id, riskId, data);
    
    return new Promise((resolve, reject) => {
        const services = datastore.services;

        let foundService = services.find(s => s.id === id);

        if (typeof foundService === 'undefined') reject('Could not find service');

        const risks = foundService.risks;

        let foundRisk = risks.find(r => r.id === riskId);

        if (typeof foundRisk === 'undefined') reject('Could not find risk');
        else resolve(Object.assign(foundRisk, data));
    })    
}

function deleteRisk(id, riskId) {
    mock(deleteRisk, id, riskId);
    
    return new Promise((resolve, reject) => {
        const services = datastore.services;

        let foundService = services.find(s => s.id === id);

        if (typeof foundService === 'undefined') reject('Could not find service');

        const risks = foundService.risks;

        let foundRiskIndex = risks.findIndex(r => r.id === riskId);

        if (foundRiskIndex === -1) reject('Could not find risk');
        
        deleteIfNotUndo(`Deleted risk <em>${risks[foundRiskIndex].riskDesc}</em>. <a>Click to undo.</a>`, () => {
            risks.splice(foundRiskIndex, 1);
            console.log(`Deleted risk with id ${riskId} from ${foundService.serviceName}`);
        }, resolve)
    })
}