function getServices() {
    // stub
    return new Promise((resolve, reject) => {
        resolve([
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
        ]);
    })
}

function createService(data) {
    // stub
    console.log(data);
}

function updateService(service, data) {
    // stub
    console.log('Updating', service, 'to', data);
}

function deleteService(serviceId) {
    // stub
    console.log('oof');
}