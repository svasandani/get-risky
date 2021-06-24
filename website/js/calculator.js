let currentServiceId = '';
let currentServiceName = '';

function appendRisk(toPopulate, risk) {
    toPopulate.insertAdjacentHTML('beforeEnd',
    `
    <details class="table-hidden-row ${risk.tolerable ? (risk.isTolerated ? 'tolerated' : 'tolerable') : 'not-tolerable'}" data-risk="${risk.riskId}">
        <summary class="risks-table-row table-row">
            <span>${risk.riskDesc}</span>
            <span class="table-center-data show-details">· · ·</span>
        </summary>
        <div class="risk-details">
            <label>
                Incidents per year
                <span id="${risk.riskId}-incidents" class="calculated">${risk.incidents}</span>
            </label>
            <label>
                Affected time (min/yr)
                <span id="${risk.riskId}-affected-min" class="calculated">${risk.affectedTime}</span>
            </label>
            <label>
                Tolerable?
                <span id="${risk.riskId}-tolerable" class="calculated ${risk.tolerable ? 'yes' : 'no'}">${risk.tolerable ? 'Yes' : 'No'}</span>
            </label>
            <label class="custom-checkbox">
                Accept this risk
                <input id="${risk.riskId}-accept" name="${risk.riskId}-accept" class="custom-checkbox" type="checkbox" ${risk.tolerable ? '' : 'disabled'}/>
                <span class="custom-checkbox"></span>
            </label>
        </div>
        <h4>Edit this risk</h4>
        <form class="risk-edit" data-risk="${risk.riskId}">
            <div class="inputs">
                <label>
                    Risk ID
                    <input id="${risk.riskId}-riskId" class="labelled-input" name="riskId" value="${risk.riskId}" placeholder=""/>
                </label>
                <label>
                    Risk Description
                    <input id="${risk.riskId}-riskDesc" class="labelled-input" name="riskDesc" value="${risk.riskDesc}" placeholder=""/>
                </label>
                <label>
                    <span>
                        ETTD
                        <span class="tooltip" data-tip="Estimated time to detect the risk">ⓘ</span>
                    </span>
                    <input id="${risk.riskId}-riskEttd" class="labelled-input" name="riskEttd" value="${risk.riskEttd}" placeholder=""/>
                </label>
                <label>
                    <span>
                        ETTR
                        <span class="tooltip" data-tip="Estimated time to recover from the risk">ⓘ</span>
                    </span>
                    <input id="${risk.riskId}-riskEttr" class="labelled-input" name="riskEttr" value="${risk.riskEttr}" placeholder=""/>
                </label>
                <label>
                    Impact (% users)
                    <input id="${risk.riskId}-riskImpact" class="labelled-input" name="riskImpact" value="${risk.riskImpact}" type="number" min="0" max="100" step="0.01" placeholder=""/>
                    <span class="percentage-input">%</span>
                </label>
                <label>
                    <span>
                        ETTF
                        <span class="tooltip" data-tip="Estimated time to fix the risk">ⓘ</span>
                    </span>
                    <input id="${risk.riskId}-riskEttf" class="labelled-input" name="riskEttf" value="${risk.riskEttf}" placeholder=""/>
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

    toPopulate.querySelector(`details[data-risk="${risk.riskId}"] .delete-btn`).addEventListener('click', (e) => {
        e.preventDefault();

        if (confirm(`Are you sure you want to delete ${risk.riskDesc}?`)) {
            deleteRisk(currentServiceId, risk.riskId)
                .then(getAllRisks);
        }
    })

    let editThisRisk = toPopulate.querySelector(`form.risk-edit[data-risk="${risk.riskId}"]`);
    editThisRisk.addEventListener('submit', (e) => {
        e.preventDefault();

        let editFd = new FormData(editThisRisk);
        let data = {};
        editFd.forEach((value, key) => data[key] = value);
        
        if (confirm(`Are you sure you want to update ${risk.riskDesc}?`)) {
            updateRisk(currentServiceId, risk.riskId, data)
                .then(getAllRisks);
        }
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
        currentServiceId = (new URLSearchParams(window.location.search)).get('service');

        getServiceNameFromId(currentServiceId)
            .then(name => currentServiceName = name)
            .then (() => getRisks(currentServiceId))
            .then(data => {
                let toPopulate = document.querySelector('#risks-table-body');

                while (toPopulate.firstChild) toPopulate.removeChild(toPopulate.lastChild);

                for (risk of data) {
                    addComputedRisk(risk);
                }

                data.forEach(risk => {
                    appendRisk(toPopulate, getComputedRisk(risk.riskId));
                })
            })
            .then(resolve)
            .catch(reject)
    })
}

function updateAllRisks() {
    return new Promise((resolve, reject) => {
        let toPopulate = document.querySelector('#risks-table-body');

        while (toPopulate.firstChild) toPopulate.removeChild(toPopulate.lastChild);

        getAllComputedRisks().forEach(risk => {
            appendRisk(toPopulate, getComputedRisk(risk.riskId));
        })
    })
}

function setUpCalculator() {
    document.querySelector('h1').textContent = currentServiceName;

    document.querySelector("#downtime-percent").addEventListener('input', () => {
        updateState({ "uptime": document.querySelector("#downtime-percent").value / 100 });
        recalculate()
            .then(updateAllRisks);
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