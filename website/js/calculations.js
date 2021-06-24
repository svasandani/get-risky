const state = {
    "uptime": 0,
    get budget() {
        return f((1 - this.uptime) * 1440 * 365.25)
    },
    "accepted": 0,
    get unallocated() {
        return f(this.budget - this.accepted)
    },
    "individualLevel": 0,
    get threshold() {
        return f(this.budget * this.individualLevel)
    },
    risks: [],
    riskFactors: []
}

function f(number) {
    return parseFloat(number.toPrecision(5))
}

function addToleratedRisk(risk) {
    console.log('Add', risk);
}

function removeToleratedRisk(risk) {
    console.log('Remove', risk);
}

function addComputedRiskFactor(riskFactor) {
    const riskFactors = state.riskFactors;

    let foundRiskFactor = riskFactors.find(r => r.riskFactorId === riskFactor.riskFactorId);

    if (typeof foundRiskFactor === 'undefined'){
        riskFactors.push(riskFactor)
    } else {
        Object.assign(foundRiskFactor, riskFactor);
    }    

    recalculate();
}

function addComputedRisk(risk) {
    const risks = state.risks;

    let foundRisk = risks.find(r => r.riskId === risk.riskId);

    if (typeof foundRisk === 'undefined'){
        risks.push({
            ...risk,
            get incidents() {
                return f(365.25 / this.riskEttf)
            },
            get affectedTime() {
                return f((this.riskEttd + this.riskEttr) * this.riskImpact * this.incidents)
            },
            get _tolerableBudget() {
                return this.affectedTime < state.budget
            },
            get _tolerableIndividual() {
                return state.threshold == 0 || this.affectedTime < state.threshold
            },
            get tolerable() {
                return this._tolerableBudget && this._tolerableIndividual
            },
            get reasons() {
                let reasons = []

                if (!this._tolerableBudget) reasons.push('this risk increases downtime beyond the available budget')
                if (!this._tolerableIndividual) reasons.push('this risk is beyond the acceptable individual threshold')

                return reasons
            },
            set checked(value) {
                if (value) addToleratedRisk(this)
                else removeToleratedRisk(this)
            }
        })
    } else {
        Object.assign(foundRisk, risk);
    }    

    recalculate();
}

function getComputedRisk(riskId) {
    const risks = state.risks;

    let foundRisk = risks.find(r => r.riskId === riskId);

    return foundRisk;
}

function getAllComputedRisks() {
    return state.risks;
}

function updateState(data) {
    // hard check?
    Object.assign(state, data);
}

function getState() {
    return state;
}

function recalculate() {
    // stub
    return new Promise((resolve, reject) => {
        let budget = document.querySelector("#budget-min");
        budget.textContent = state.budget;

        let unallocated = document.querySelector("#unallocated-min");
        unallocated.textContent = state.unallocated;

        let threshold = document.querySelector("#toobig-min");
        threshold.textContent = state.threshold;

        resolve();
    })
}