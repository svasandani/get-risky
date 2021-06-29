const config = {};

function updateConfig() {
    return new Promise((resolve, reject) => {
        getServices()
            .then(data => {
                let toPopulate = document.querySelector('#services-table-body');

                while (toPopulate.firstChild) toPopulate.removeChild(toPopulate.lastChild);

                data.forEach(service => {
                    appendService(toPopulate, service);
                })
            })
            .then(resolve)
    });
}

function setUpModals() {
    document.querySelectorAll('.close-modal').forEach(close => {
        close.addEventListener('click', () => {
            document.querySelector(`#${close.dataset.target}`).classList.add('hidden');
        })
    })

    document.querySelectorAll('.modal-launcher').forEach(close => {
        close.addEventListener('click', () => {
            document.querySelector(`#${close.dataset.target}`).classList.remove('hidden');
        })
    })

    document.querySelector('#new-modal-form').addEventListener('submit', (e) => {
        e.preventDefault();

        let newFd = new FormData(document.querySelector('#new-modal-form'));
        let data = {};
        newFd.forEach((value, key) => data[key] = isNaN(value) ? value : parseFloat(value));
        
        createService(data)
            .then(getAllServices)
            .then(() => document.querySelector('#new-modal-form').reset())
            .then(() => { document.querySelector('#new-modal').classList.add('hidden'); })
    })

    document.querySelector('#new-modal').addEventListener('click', (e) => {
        if (!Boolean(e.target.closest('form'))) {
            document.querySelector('#new-modal').classList.add('hidden');
        }
    })
}

window.addEventListener('load', () => {
    currentServiceId = (new URLSearchParams(window.location.search)).get('service');

    getServiceNameFromId(currentServiceId)
        .then(name => currentServiceName = name)
        .then(() => document.title = `${currentServiceName} — View Configuration`)
        .then(() => document.querySelector('h1').textContent = `Configuring ${currentServiceName}`)
        .then(() => getConfig(currentServiceId))
        .then(cfg => Object.assign(config, cfg))
        .then(updateConfig)
        .catch(err => console.log(err));
})