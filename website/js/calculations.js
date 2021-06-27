const state = {
    "uptime": 0,
    get budget() {
        return f((1 - this.uptime) * 1440 * 365.25)
    },
    get accepted() {
        return this.risks.reduce((acc, curr) => acc + (curr.accepted ? curr.affectedTime : 0), 0)
    },
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

    if (typeof foundRisk === 'undefined') {
        risks.push({
            ...risk,
            get _baseIncidents() {
                return f(365.25 / this.riskEttf)
            },
            get incidents() {
                return f(365.25 / this.netEttf)
            },
            get _baseAffectedTime() {
                return f((this.riskEttd + this.riskEttr) * this.riskImpact * this._baseIncidents)
            },
            get netEttd() {
                return state.riskFactors.reduce((acc, curr) => acc + curr.riskFactorEttd, this.riskEttd)
            },
            get netEttr() {
                return state.riskFactors.reduce((acc, curr) => acc + curr.riskFactorEttr, this.riskEttr)
            },
            get netImpact() {
                return state.riskFactors.reduce((acc, curr) => acc + curr.riskFactorImpact, this.riskImpact)
            },
            get netEttf() {
                return state.riskFactors.reduce((acc, curr) => acc + curr.riskFactorEttf, this.riskEttf)
            },
            get affectedTime() {
                return f((this.netEttd + this.netEttr) * this.netImpact * this.incidents)
            },
            get _tolerableBudget() {
                return this.affectedTime < state.unallocated
            },
            get _tolerableIndividual() {
                return state.threshold == 0 || this.affectedTime < state.threshold
            },
            get tolerable() {
                return (this.accepted ? state.unallocated >= 0 : this._tolerableBudget) && this._tolerableIndividual
            },
            get reasons() {
                let reasons = []

                if (!this._tolerableBudget) reasons.push('this risk increases downtime beyond the available budget')
                if (!this._tolerableIndividual) reasons.push('this risk is beyond the acceptable individual threshold')

                return reasons
            },
            "accepted": false
        })
    } else {
        Object.assign(foundRisk, risk);
    }    

    recalculate();
}

function accept(riskId) {
    const risks = state.risks;

    let foundRisk = risks.find(r => r.riskId === riskId);

    if (typeof foundRisk === 'undefined') return;
    else {
        foundRisk.accepted = true;
    }

    recalculate();
}

function unaccept(riskId) {
    const risks = state.risks;

    let foundRisk = risks.find(r => r.riskId === riskId);

    if (typeof foundRisk === 'undefined') return;
    else {
        foundRisk.accepted = false;
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

function updateComputedRiskFactor(riskFactorId, data) {
    return new Promise((resolve, reject) => {
        const riskFactors = state.riskFactors;

        let foundRiskFactor = riskFactors.find(r => r.riskFactorId === riskFactorId);

        if (typeof foundRiskFactor === 'undefined') reject('Could not find risk factor');
        else resolve(Object.assign(foundRiskFactor, data));
    })  
}

function updateComputedRisk(riskId, data) {
    return new Promise((resolve, reject) => {
        const risks = state.risks;

        let foundRisk = risks.find(r => r.riskId === riskId);

        if (typeof foundRisk === 'undefined') reject('Could not find risk');
        else resolve(Object.assign(foundRisk, data));
    })  
}

function deleteComputedRiskFactor(riskFactorId) {
    return new Promise((resolve, reject) => {
        const riskFactors = state.riskFactors;

        let foundRiskFactorIndex = riskFactors.findIndex(r => r.riskFactorId === riskFactorId);

        if (foundRiskFactorIndex === -1) reject('Could not find risk');
        
        riskFactors.splice(foundRiskFactorIndex, 1);
        console.log(`Deleted risk factor with id ${riskFactorId} from state`);

        resolve();
    })
}

function deleteComputedRisk(riskId) {
    return new Promise((resolve, reject) => {
        const risks = state.risks;

        let foundRiskIndex = risks.findIndex(r => r.riskId === riskId);

        if (foundRiskIndex === -1) reject('Could not find risk');
        
        risks.splice(foundRiskIndex, 1);
        console.log(`Deleted risk with id ${riskId} from state`);

        resolve();
    })
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

        let accepted = document.querySelector("#accepted-min");
        accepted.textContent = state.accepted;

        let unallocated = document.querySelector("#unallocated-min");
        unallocated.textContent = state.unallocated;

        let threshold = document.querySelector("#toobig-min");
        threshold.textContent = state.threshold;

        resolve();
    })
}