let currentServiceId = '';
let currentService;
const config = {};

function appendConfigGroup(toPopulate, configGroup) {
    toPopulate.insertAdjacentHTML('beforeEnd',
    `
    <h2>${configGroup}</h2>
    <div id="${configGroup}-table" class="table">
        <div id="${configGroup}-table-head" class="table-head ${configGroup}-table-row table-row">
            <h3>Property</h3>
            <h3 class="table-center-data">Enable</h3>
        </div>
        <div id="${configGroup}-table-body">
        </div>
    </div>
    `
    )

    config[configGroup].forEach(cfg => {
        appendConfig(document.querySelector(`#${configGroup}-table-body`), cfg);
    })
}

function appendConfig(toPopulate, config) {
    toPopulate.insertAdjacentHTML('beforeEnd',
    `
    <details class="table-hidden-row">
        <summary class="config-table-row table-row">
            <span class="table-data">${config.configId}</span>
            <label class="custom-toggle">
                <input id="${config.configId}-enable" name="${config.configId}-enable" class="custom-toggle" type="checkbox" ${config.configValue ? 'checked' : ''}/>
                <span class="custom-toggle"></span>
            </label>
        </summary>
        <div class="expanded-details border-bottom">
            ${config.configDesc}
        </div>
    </details>
    `
    )
    
    toPopulate.querySelector(`#${config.configId}-enable`).addEventListener('click', () => {
        if (toPopulate.querySelector(`#${config.configId}-enable`).checked) updateConfig(currentService.id, config.id, true)
        else updateConfig(currentService.id, config.id, false)
    })
}

function updateAllConfig() {
    return new Promise((resolve, reject) => {
        let toPopulate = document.querySelector('#config-list');

        while (toPopulate.firstChild) toPopulate.removeChild(toPopulate.lastChild);
        
        for (let configGroup of Object.keys(config)) {
            appendConfigGroup(toPopulate, configGroup);
        }
    });
}

function parseConfig(cfg) {
    cfg.forEach(c => {
        if (!(c.configCategory in config)) config[c.configCategory] = [];
        config[c.configCategory].push(c)
    })
}

window.addEventListener('load', () => {
    currentServiceSlug = (new URLSearchParams(window.location.search)).get('service');

    getServiceFromSlug(currentServiceSlug)
        .then(service => currentService = service)
        .then(() => document.title = `${currentService.serviceName} — View Configuration`)
        .then(() => document.querySelector('h1').textContent = `Configuring ${currentService.serviceName}`)
        .then(() => getConfig(currentService.id))
        .then(parseConfig)
        .then(updateAllConfig)
        .catch(err => console.error(err));
})