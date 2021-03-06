function appendService(toPopulate, service) {
    toPopulate.insertAdjacentHTML('beforeEnd',
    `
    <details class="table-hidden-row" data-service="${service.serviceId}">
        <summary class="services-table-row table-row">
            <a class="hover-reveal table-data" data-reveal="&nbsp;&nbsp;>" href="../calculator/?service=${service.serviceId}">${service.serviceName}</a>
            <span class="table-center-data table-data show-details">· · ·</span>
        </summary>
        <h4>Edit this service</h4>
        <form class="service-details" data-service="${service.serviceId}">
            <div class="inputs">
                <label>
                    Service Slug
                    <input id="${service.serviceId}-serviceId" class="labelled-input" name="serviceId" value="${service.serviceId}" placeholder="" required/>
                </label>
                <label>
                    Service Name
                    <input id="${service.serviceId}-serviceName" class="labelled-input" name="serviceName" value="${service.serviceName}" placeholder="" required/>
                </label>
            </div>
            <div class="buttons">
                <button type="submit" class="edit-btn">Edit</button>
                <button type="button" class="delete-btn">Delete</button>
            </div>
        </form>
    </details>
    `
    )

    toPopulate.querySelector(`details[data-service="${service.serviceId}"] .delete-btn`).addEventListener('click', (e) => {
        e.preventDefault();

        document.querySelector(`details[data-service="${service.serviceId}"]`).parentElement.removeChild(document.querySelector(`details[data-service="${service.serviceId}"]`));

        deleteService(service.id)
            .then(getAllServices);
    })

    let editThisService = toPopulate.querySelector(`form.service-details[data-service="${service.serviceId}"]`);
    editThisService.addEventListener('submit', (e) => {
        e.preventDefault();

        let editFd = new FormData(editThisService);
        let data = {};
        editFd.forEach((value, key) => data[key] = isNaN(value) ? value : parseFloat(value));
    
        updateService(service.id, data)
            .then(getAllServices);
    })
}

function getAllServices() {
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
    getAllServices()
        .then(setUpModals)
})

function test(cfg) {
    import('../test/js/services_test.js')
        .then(m => {
            m.run(cfg)
        })
}