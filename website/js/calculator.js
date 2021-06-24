let currentService = '';

function getRisks() {
    // stub
    return new Promise((resolve, reject) => {
        resolve([
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
        ]);
    })
}

function appendRisk(toPopulate, risk, transformedRisk) {
    toPopulate.insertAdjacentHTML('beforeEnd',
    `
    <tr data-risk="${risk.riskId}">
        <td>${risk.riskDesc}</td>
        <td>${transformedRisk.badMinsYear}</td>
        <td class="accept accept-${transformedRisk.canAccept ? 'yes' : 'no'}">${transformedRisk.canAccept ? 'Yes' : 'No'}</td>
        <td>
            <input type="checkbox" ${transformedRisk.canAccept ? '' : 'disabled="true"'}>
        </td>
        <td>
            <div class="risk-actions">
                <a class="edit-risk edit-btn" data-risk="${risk.riskId}">edit</a>
                /
                <a class="delete-risk delete-btn" data-risk="${risk.riskId}">delete</a>
            </div>
        </td>
    </tr>
    `
    )

    toPopulate.querySelector(`.delete-risk[data-risk="${risk.riskId}"]`).addEventListener('click', () => {
        if (confirm(`Are you sure you want to delete ${risk.riskId}?`)) {
            // deleteService(service.serviceId);
        }
    })

    toPopulate.querySelector(`.edit-risk[data-risk="${risk.riskId}"]`).addEventListener('click', () => {
        let m = document.querySelector(`#edit-risk-modal`);
        m.classList.remove('hidden');

        m.dataset.risk = risk.riskId;

        // m.querySelector('[name="serviceId"]').value = service.serviceId;
        // m.querySelector('[name="serviceName"]').value = service.serviceName;
    })
}

function transform(risk) {
    // stub
    return {
        "badMinsYear": 1870,
        "canAccept": true
    }
}

function getAllRisks() {
    return new Promise((resolve, reject) => {
        getServiceNameFromId((new URLSearchParams(window.location.search)).get('service'))
            .then(name => currentService = name)
            .then(getRisks)
            .then(data => {
                let toPopulate = document.querySelector('#risk-populate');

                while (toPopulate.firstChild) toPopulate.removeChild(toPopulate.lastChild);

                data.forEach(risk => {
                    appendRisk(toPopulate, risk, transform(risk));
                })
            })
            .then(resolve)
            .catch(reject)
    })
}

function setUpCalculator() {
    document.querySelector('h1').textContent = currentService;

    document.querySelector("#downtime-percent").addEventListener('input', () => {
        updateState({ "uptime": document.querySelector("#downtime-percent").value / 100 });
        recalculate();
    })
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

    document.querySelector('#new-risk-modal-form').addEventListener('submit', (e) => {
        e.preventDefault();

        let newFd = new FormData(document.querySelector('#new-risk-modal-form'));
        let data = {};
        newFd.forEach((value, key) => data[key] = value);
        
        createService(data);
    })

    let m = document.querySelector('#edit-risk-modal-form');
    m.addEventListener('submit', (e) => {
        e.preventDefault();

        let editFd = new FormData(m);
        let data = {};
        editFd.forEach((value, key) => data[key] = value);

        let md = m.parentElement;
        
        if (md.dataset.service !== 'undefined' && confirm(`Are you sure you want to update ${md.dataset.risk}?`)) {
            updateService(md.dataset.service, data);
            md.classList.add('hidden');
        }
    })

    document.querySelector('#new-risk-factor-modal-form').addEventListener('submit', (e) => {
        e.preventDefault();

        let newFd = new FormData(document.querySelector('#new-risk-factor-modal-form'));
        let data = {};
        newFd.forEach((value, key) => data[key] = value);
        
        createService(data);
    })

    let mm = document.querySelector('#edit-risk-factor-modal-form');
    mm.addEventListener('submit', (e) => {
        e.preventDefault();

        let editFd = new FormData(m);
        let data = {};
        editFd.forEach((value, key) => data[key] = value);

        let md = mm.parentElement;
        
        if (md.dataset.service !== 'undefined' && confirm(`Are you sure you want to update ${md.dataset.riskfactor}?`)) {
            updateService(md.dataset.service, data);
            md.classList.add('hidden');
        }
    })
}

function setUpSynchronous() {
    setUpCalculator();
    setUpModals();
}

window.addEventListener('load', () => {
    getAllRisks()
        // .then(getAllRiskFactors)
        .then(setUpSynchronous);
})