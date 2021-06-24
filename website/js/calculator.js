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
                        <span class="tooltip" data-tip="Estimated time to fix TODO the risk">ⓘ</span>
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
        
        // if (confirm(`Are you sure you want to update ${risk.riskDesc}?`)) {
            updateRisk(currentServiceId, risk.riskId, data)
                .then(getAllRisks);
        // }
    })
}

function appendRiskFactor(toPopulate, riskFactor) {
    toPopulate.insertAdjacentHTML('beforeEnd',
    `
    <details class="table-hidden-row" data-risk-factor="${riskFactor.riskFactorId}">
        <summary class="risk-factors-table-row table-row">
            <span>${riskFactor.riskFactorDesc}</span>
            <span class="table-center-data show-details">· · ·</span>
        </summary>
        <h4>Edit this risk factor</h4>
        <form class="risk-factor-edit" data-risk-factor="${riskFactor.riskFactorId}">
            <div class="inputs">
                <label>
                    Risk Factor ID
                    <input id="${riskFactor.riskFactorId}-riskFactorId" class="labelled-input" name="riskFactorId" value="${riskFactor.riskFactorId}" placeholder=""/>
                </label>
                <label>
                    Risk Description
                    <input id="${riskFactor.riskFactorId}-riskFactorDesc" class="labelled-input" name="riskFactorDesc" value="${riskFactor.riskFactorDesc}" placeholder=""/>
                </label>
                <label>
                    <span>
                        + ETTD
                        <span class="tooltip" data-tip="Estimated additional time to detect the risk">ⓘ</span>
                    </span>
                    <input id="${riskFactor.riskFactorId}-riskFactorEttd" class="labelled-input" name="riskFactorEttd" value="${riskFactor.riskFactorEttd}" placeholder=""/>
                </label>
                <label>
                    <span>
                        + ETTR
                        <span class="tooltip" data-tip="Estimated additional time to recover from the risk">ⓘ</span>
                    </span>
                    <input id="${riskFactor.riskFactorId}-riskFactorEttr" class="labelled-input" name="riskFactorEttr" value="${riskFactor.riskFactorEttr}" placeholder=""/>
                </label>
                <label>
                    + Impact (% users)
                    <input id="${riskFactor.riskFactorId}-riskFactorImpact" class="labelled-input" name="riskFactorImpact" value="${riskFactor.riskFactorImpact}" type="number" min="0" max="100" step="0.01" placeholder=""/>
                    <span class="percentage-input">%</span>
                </label>
                <label>
                    <span>
                        + ETTF
                        <span class="tooltip" data-tip="Estimated additional time to fix TODO the risk">ⓘ</span>
                    </span>
                    <input id="${riskFactor.riskFactorId}-riskFactorEttf" class="labelled-input" name="riskFactorEttf" value="${riskFactor.riskFactorEttd}" placeholder=""/>
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

    toPopulate.querySelector(`details[data-risk-factor="${riskFactor.riskFactorId}"] .delete-btn`).addEventListener('click', (e) => {
        e.preventDefault();

        if (confirm(`Are you sure you want to delete ${riskFactor.riskFactorDesc}?`)) {
            deleteRiskFactor(currentServiceId, riskFactor.riskFactorId)
                .then(getAllRiskFactors);
        }
    })

    let editThisRiskFactor = toPopulate.querySelector(`form.risk-factor-edit[data-risk-factor="${riskFactor.riskFactorId}"]`);
    editThisRiskFactor.addEventListener('submit', (e) => {
        e.preventDefault();

        let editFd = new FormData(editThisRiskFactor);
        let data = {};
        editFd.forEach((value, key) => data[key] = value);
        
        // if (confirm(`Are you sure you want to update ${risk.riskDesc}?`)) {
            updateRiskFactor(currentServiceId, riskFactor.riskFactorId, data)
                .then(getAllRiskFactors);
        // }
    })
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

function getAllRiskFactors() {
    return new Promise((resolve, reject) => {
        getRiskFactors(currentServiceId)
            .then(data => {
                let toPopulate = document.querySelector('#risk-factors-table-body');

                while (toPopulate.firstChild) toPopulate.removeChild(toPopulate.lastChild);

                for (riskFactor of data) {
                    addComputedRiskFactor(risk);
                }

                data.forEach(riskFactor => {
                    appendRiskFactor(toPopulate, riskFactor);
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

    document.querySelector("#unacceptable-threshold").addEventListener('input', () => {
        updateState({ "individualLevel": document.querySelector("#unacceptable-threshold").value / 100 });
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
        
        createRisk(currentServiceId, data)
            .then(getAllRisks)
            .then(() => document.querySelector('#new-risk-modal-form').reset())
            .then(() => { document.querySelector('#new-risk-modal').classList.add('hidden'); })
    })

    document.querySelector('#new-risk-modal').addEventListener('click', (e) => {
        if (!Boolean(e.target.closest('form'))) {
            document.querySelector('#new-risk-modal').classList.add('hidden');
        }
    })

    document.querySelector('#new-risk-factor-modal-form').addEventListener('submit', (e) => {
        e.preventDefault();

        let newFd = new FormData(document.querySelector('#new-risk-factor-modal-form'));
        let data = {};
        newFd.forEach((value, key) => data[key] = value);
        
        createRiskFactor(currentServiceId, data)
            .then(getAllRiskFactors)
            .then(() => document.querySelector('#new-risk-factor-modal-form').reset())
            .then(() => { document.querySelector('#new-risk-factor-modal').classList.add('hidden'); })
    })

    document.querySelector('#new-risk-factor-modal').addEventListener('click', (e) => {
        if (!Boolean(e.target.closest('form'))) {
            document.querySelector('#new-risk-factor-modal').classList.add('hidden');
        }
    })
}

function setUpSynchronous() {
    setUpCalculator();
    setUpModals();
}

window.addEventListener('load', () => {
    getAllRisks()
        .then(getAllRiskFactors)
        .then(setUpSynchronous);
})