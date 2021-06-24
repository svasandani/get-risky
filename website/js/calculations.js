const state = {
    "uptime": 0,
    get budget() {
        return f((1 - this.uptime) * 1440 * 365.25)
    },
    "accepted": 0,
    get unallocated() {
        return f(this.budget - this.accepted)
    },
    risks: []
}

function f(number) {
    return parseFloat(number.toPrecision(5))
}

function addComputedRisk(risk) {
    const risks = state.risks;

    risks.push({
        ...risk,
        get incidents() {
            return f(365.25 / this.riskEttf)
        },
        get affectedTime() {
            return f((this.riskEttd + this.riskEttr) * this.riskImpact * this.incidents)
        },
        get tolerable() {
            return this.affectedTime < state.budget
        }
    })

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

        resolve();
    })
}