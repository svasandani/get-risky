let currentServiceId = '';
let currentServiceName = '';
const config = {};

function appendRisk(toPopulate, risk) {
    toPopulate.insertAdjacentHTML('beforeEnd',
    `
    <details class="table-hidden-row ${ risk.accepted ? 'tolerated' : (risk.tolerable ? 'tolerable' : 'not-tolerable')}" data-risk="${risk.riskId}" ${risk.open ? 'open' : ''}>
        <summary class="risks-table-row table-row">
            <span>${risk.riskDesc}</span>
            <span class="table-center-data show-details">· · ·</span>
        </summary>
        <div class="expanded-details">
            <label${config.risk.incidents ? '' : ' class="invisible"'}>
                <span>
                    Incidents per year
                    <span class="tooltip" data-tip="Without risk factors: ${risk._baseIncidents}">ⓘ</span>
                </span>
                <span id="${risk.riskId}-incidents" class="calculated">${risk.incidents}</span>
            </label>
            <label${config.risk.affectedTime ? '' : ' class="invisible"'}>
                <span>
                    Affected time (min/yr)
                    <span class="tooltip" data-tip="Without risk factors: ${risk._baseAffectedTime}">ⓘ</span>
                </span>
                <span id="${risk.riskId}-affected-min" class="calculated">${risk.affectedTime}</span>
            </label>
            <label${config.risk.shareBudget ? '' : ' class="invisible"'}>
                <span>
                    Share of total budget (%)
                    <span class="tooltip" data-tip="Without risk factors: ${risk._baseShareOfTotalBudget}${risk._baseShareOfTotalBudget === 'N/A' ? '' : '%'}">ⓘ</span>
                </span>
                <span id="${risk.riskId}-share-min" class="calculated">${risk.shareOfTotalBudget}${risk.shareOfTotalBudget === 'N/A' ? '' : '%'}</span>
            </label>
            <label${config.risk.shareTolerated ? '' : ' class="invisible"'}>
                <span>
                    Share of tolerated (%)
                    <span class="tooltip" data-tip="Without risk factors: ${risk._baseShareOfTolerated}${risk._baseShareOfTolerated === 'N/A' ? '' : '%'}">ⓘ</span>
                </span>
                <span id="${risk.riskId}-sharet-min" class="calculated">${risk.shareOfTolerated}${risk.shareOfTolerated === 'N/A' ? '' : '%'}</span>
            </label>
            <label>
                ${
                    risk.tolerable
                    ? `Tolerable?`
                    :   `
                            <span>
                                Tolerable?
                                <span class="tooltip" data-tip="This risk is not tolerable for the following reasons: ${risk.reasons.join(', and ')}.">ⓘ</span>
                            </span>
                        `
                }
                <span id="${risk.riskId}-tolerable" class="calculated ${risk.accepted || risk.tolerable ? 'yes' : 'no'}">${risk.accepted || risk.tolerable ? 'Yes' : 'No'}</span>
            </label>
            <label class="custom-checkbox">
                Accept this risk
                <input id="${risk.riskId}-accept" name="${risk.riskId}-accept" class="custom-checkbox" type="checkbox" ${risk.accepted || risk.tolerable ? '' : 'disabled'} ${risk.accepted ? 'checked' : ''}/>
                <span class="custom-checkbox"></span>
            </label>
        </div>
        <h4>Edit this risk</h4>
        <form class="risk-edit" data-risk="${risk.riskId}">
            <div class="inputs">
                <label>
                    Risk ID
                    <input id="${risk.riskId}-riskId" class="labelled-input" name="riskId" value="${risk.riskId}" placeholder="" required/>
                </label>
                <label>
                    Risk Description
                    <input id="${risk.riskId}-riskDesc" class="labelled-input" name="riskDesc" value="${risk.riskDesc}" placeholder="" required/>
                </label>
                <label>
                    <span>
                        ETTD
                        <span class="tooltip" data-tip="Estimated time to detect the risk">ⓘ</span>
                    </span>
                    <input id="${risk.riskId}-riskEttd" class="labelled-input" name="riskEttd" value="${risk.riskEttd}" type="number" placeholder="" required/>
                </label>
                <label>
                    <span>
                        ETTR
                        <span class="tooltip" data-tip="Estimated time to recover from the risk">ⓘ</span>
                    </span>
                    <input id="${risk.riskId}-riskEttr" class="labelled-input" name="riskEttr" value="${risk.riskEttr}" type="number" placeholder="" required/>
                </label>
                <label>
                    Impact (% users)
                    <input id="${risk.riskId}-riskImpact" class="labelled-input" name="riskImpact" value="${risk.riskImpact}" type="number" min="0" max="100" step="0.001" placeholder="" required/>
                    <span class="percentage-input">%</span>
                </label>
                <label>
                    <span>
                        ETTF
                        <span class="tooltip" data-tip="Estimated time to failure (i.e. frequency)">ⓘ</span>
                    </span>
                    <input id="${risk.riskId}-riskEttf" class="labelled-input" name="riskEttf" value="${risk.riskEttf}" type="number" placeholder="" required/>
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
    
    toPopulate.querySelector(`details[data-risk="${risk.riskId}"]`).addEventListener('toggle', () => {
        if (toPopulate.querySelector(`details[data-risk="${risk.riskId}"]`).open) setIsRiskOpen(risk.riskId, true);
        else setIsRiskOpen(risk.riskId, false);
    })

    if (!risk.tolerable && toPopulate.querySelector(`#${risk.riskId}-accept`).checked) {
        unaccept(risk.riskId);
        updateAllRisks();
        return false;
    }

    toPopulate.querySelector(`#${risk.riskId}-accept`).addEventListener('click', () => {
        if (toPopulate.querySelector(`#${risk.riskId}-accept`).checked) accept(risk.riskId);
        else unaccept(risk.riskId);
        
        updateAllRisks();
    })

    toPopulate.querySelector(`details[data-risk="${risk.riskId}"] .delete-btn`).addEventListener('click', (e) => {
        e.preventDefault();

        document.querySelector(`details[data-risk="${risk.riskId}"]`).parentElement.removeChild(document.querySelector(`details[data-risk="${risk.riskId}"]`));

        updateComputedRisk(risk.riskId, { deleted: true })
            .then(updateAllRisks)
            .then(() => deleteRisk(currentServiceId, risk.riskId))
            .then(() => deleteComputedRisk(risk.riskId))
            .then(getAllRisks);
    })

    let editThisRisk = toPopulate.querySelector(`form.risk-edit[data-risk="${risk.riskId}"]`);
    editThisRisk.addEventListener('submit', (e) => {
        e.preventDefault();

        let editFd = new FormData(editThisRisk);
        let data = {};
        editFd.forEach((value, key) => data[key] = isNaN(value) ? value : parseFloat(value));
        
        updateRisk(currentServiceId, risk.riskId, data)
            .then(() => updateComputedRisk(risk.riskId, data))
            .then(getAllRisks);
    })

    return true;
}

function appendRiskFactor(toPopulate, riskFactor) {
    toPopulate.insertAdjacentHTML('beforeEnd',
    `
    <details class="table-hidden-row ${riskFactor.enabled ? '' : 'disabled'}" data-risk-factor="${riskFactor.riskFactorId}" ${riskFactor.open ? 'open' : ''}>
        <summary class="risk-factors-table-row table-row">
            <span>${riskFactor.riskFactorDesc}</span>
            <span class="table-center-data show-details">· · ·</span>
        </summary>
        <div class="expanded-details">
            <label${config.riskFactor.contribution ? '' : ' class="invisible"'}>
                ${
                    riskFactor.contribution == 0
                    ? `Contribution (min/yr)`
                    :   `
                            <span>
                                Contribution (min/yr)
                                <span class="tooltip" data-tip="${riskFactor.reasons.join(', ')}">ⓘ</span>
                            </span>
                        `
                }
                <span id="${riskFactor.riskFactorId}-contribution" class="calculated">${riskFactor.contribution}</span>
            </label>
            <label class="custom-toggle${config.riskFactor.enable ? '' : ' invisible'}">
                Enable this risk factor
                <input id="${riskFactor.riskFactorId}-enable" name="${riskFactor.riskFactorId}-enable" class="custom-toggle" type="checkbox" ${riskFactor.enabled ? 'checked' : ''}/>
                <span class="custom-toggle"></span>
            </label>
        </div>
        <h4>Edit this risk factor</h4>
        <form class="risk-factor-edit" data-risk-factor="${riskFactor.riskFactorId}">
            <div class="inputs">
                <label>
                    Risk Factor ID
                    <input id="${riskFactor.riskFactorId}-riskFactorId" class="labelled-input" name="riskFactorId" value="${riskFactor.riskFactorId}" placeholder="" required/>
                </label>
                <label>
                    Risk Description
                    <input id="${riskFactor.riskFactorId}-riskFactorDesc" class="labelled-input" name="riskFactorDesc" value="${riskFactor.riskFactorDesc}" placeholder="" required/>
                </label>
                <label>
                    <span>
                        Δ ETTD
                        <span class="tooltip" data-tip="Estimated difference in time to detect the risk">ⓘ</span>
                    </span>
                    <input id="${riskFactor.riskFactorId}-riskFactorEttd" class="labelled-input" name="riskFactorEttd" value="${riskFactor.riskFactorEttd}" type="number" placeholder="" required/>
                </label>
                <label>
                    <span>
                        Δ ETTR
                        <span class="tooltip" data-tip="Estimated difference in time to recover from the risk">ⓘ</span>
                    </span>
                    <input id="${riskFactor.riskFactorId}-riskFactorEttr" class="labelled-input" name="riskFactorEttr" value="${riskFactor.riskFactorEttr}" type="number" placeholder="" required/>
                </label>
                <label>
                    Δ Impact (% users)
                    <input id="${riskFactor.riskFactorId}-riskFactorImpact" class="labelled-input" name="riskFactorImpact" value="${riskFactor.riskFactorImpact}" type="number" min="0" max="100" step="0.001" placeholder="" required/>
                    <span class="percentage-input">%</span>
                </label>
                <label>
                    <span>
                        Δ ETTF
                        <span class="tooltip" data-tip="Estimated difference in time to failure (i.e. frequency)">ⓘ</span>
                    </span>
                    <input id="${riskFactor.riskFactorId}-riskFactorEttf" class="labelled-input" name="riskFactorEttf" value="${riskFactor.riskFactorEttf}" type="number" placeholder="" required/>
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
    
    toPopulate.querySelector(`details[data-risk-factor="${riskFactor.riskFactorId}"]`).addEventListener('toggle', () => {
        if (toPopulate.querySelector(`details[data-risk-factor="${riskFactor.riskFactorId}"]`).open) setIsRiskFactorOpen(riskFactor.riskFactorId, true);
        else setIsRiskFactorOpen(riskFactor.riskFactorId, false);
    })

    toPopulate.querySelector(`#${riskFactor.riskFactorId}-enable`).addEventListener('click', () => {
        if (toPopulate.querySelector(`#${riskFactor.riskFactorId}-enable`).checked) enable(riskFactor.riskFactorId);
        else unenable(riskFactor.riskFactorId);

        updateAllRisks();
        updateAllRiskFactors();
    })

    toPopulate.querySelector(`details[data-risk-factor="${riskFactor.riskFactorId}"] .delete-btn`).addEventListener('click', (e) => {
        e.preventDefault();

        document.querySelector(`details[data-risk-factor="${riskFactor.riskFactorId}"]`).parentElement.removeChild(document.querySelector(`details[data-risk-factor="${riskFactor.riskFactorId}"]`));

        updateComputedRiskFactor(riskFactor.riskFactorId, { deleted: true })
            .then(updateAllRiskFactors)
            .then(updateAllRisks)
            .then(() => deleteRiskFactor(currentServiceId, riskFactor.riskFactorId))
            .then(() => deleteComputedRiskFactor(riskFactor.riskFactorId))
            .then(getAllRiskFactors);
    })

    let editThisRiskFactor = toPopulate.querySelector(`form.risk-factor-edit[data-risk-factor="${riskFactor.riskFactorId}"]`);
    editThisRiskFactor.addEventListener('submit', (e) => {
        e.preventDefault();

        let editFd = new FormData(editThisRiskFactor);
        let data = {};
        editFd.forEach((value, key) => data[key] = isNaN(value) ? value : parseFloat(value));
        
        updateRiskFactor(currentServiceId, riskFactor.riskFactorId, data)
            .then(() => updateComputedRiskFactor(riskFactor.riskFactorId, data))
            .then(getAllRiskFactors);
    })

    return true;
}

function getAllRisks() {
    return new Promise((resolve, reject) => {
        getRisks(currentServiceId)
            .then(data => {
                let toPopulate = document.querySelector('#risks-table-body');

                while (toPopulate.firstChild) toPopulate.removeChild(toPopulate.lastChild);

                for (risk of data) {
                    addComputedRisk(risk);
                }

                let computedData = getAllComputedRisks();

                computedData.sort((a,b) => b.affectedTime - a.affectedTime);

                computedData.forEach(risk => {
                    if(!risk.deleted) appendRisk(toPopulate, risk);
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
                    addComputedRiskFactor(riskFactor);
                }

                let computedData = getAllComputedRiskFactors();

                computedData.forEach(riskFactor => {
                    if(!riskFactor.deleted) appendRiskFactor(toPopulate, riskFactor);
                })
            })
            .then(recalculate)
            .then(updateAllRisks)
            .then(resolve)
            .catch(reject)
    })
}

function updateAllRisks() {
    return new Promise((resolve, reject) => {
        let toPopulate = document.querySelector('#risks-table-body');

        while (toPopulate.firstChild) toPopulate.removeChild(toPopulate.lastChild);

        let computedData = getAllComputedRisks();

        computedData.sort((a,b) => b.affectedTime - a.affectedTime);

        computedData.every(risk => {
            if(!risk.deleted) return appendRisk(toPopulate, getComputedRisk(risk.riskId));
            else return true;
        })

        recalculate();

        resolve();
    })
}

function updateAllRiskFactors() {
    return new Promise((resolve, reject) => {
        let toPopulate = document.querySelector('#risk-factors-table-body');

        while (toPopulate.firstChild) toPopulate.removeChild(toPopulate.lastChild);

        let computedData = getAllComputedRiskFactors();

        computedData.every(riskFactor => {
            if (!riskFactor.deleted) return appendRiskFactor(toPopulate, riskFactor);
            else return true;
        })

        recalculate();

        resolve();
    })
}

function parseConfig(cfg) {
    cfg.forEach(c => {
        if (!(c.configCategory in config)) config[c.configCategory] = {};
        config[c.configCategory][c.configId] = c.configValue
    })
}

function setUpCalculator() {
    document.querySelector('h1').textContent = currentServiceName;

    document.querySelector("#downtime-percent").addEventListener('input', () => {
        updateState({ "uptime": document.querySelector("#downtime-percent").value / 100 });
        recalculate()
            .then(updateAllRisks)
            .then(updateAllRiskFactors);
    })

    document.querySelector("#unacceptable-threshold").addEventListener('input', () => {
        updateState({ "individualLevel": document.querySelector("#unacceptable-threshold").value / 100 });
        recalculate()
            .then(updateAllRisks)
            .then(updateAllRiskFactors);
    })
    
    for (const [id, display] of Object.entries(config.global)) {
        if (!display) document.querySelector(`#${id}-container`).classList.add('invisible');
    }
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
        newFd.forEach((value, key) => data[key] = isNaN(value) ? value : parseFloat(value));
        
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
        newFd.forEach((value, key) => data[key] = isNaN(value) ? value : parseFloat(value));
        
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
    currentServiceId = (new URLSearchParams(window.location.search)).get('service');

    getServiceNameFromId(currentServiceId)
        .then(name => currentServiceName = name)
        .then(() => document.title = `${currentServiceName} — Risk Calculator`)
        .then(() => getConfig(currentServiceId))
        .then(parseConfig)
        .then(getAllRisks)
        .then(getAllRiskFactors)
        .then(setUpSynchronous)
        .catch(err => console.log(err));
})