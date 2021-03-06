const state = {
    "uptime": 0,
    get estAvailability() {
        return f((1 - (this.risks.reduce((acc, curr) => acc += curr.affectedTime, 0) / (1440 * 365.25))) * 100, 3)
    },
    get budget() {
        return f((1 - this.uptime) * 1440 * 365.25)
    },
    get accepted() {
        return f(this.risks.reduce((acc, curr) => acc + (curr.deleted ? 0 : (curr.accepted ? curr.affectedTime : 0)), 0))
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

function f(number, precision=5) {
    return parseFloat(number.toPrecision(precision))
}

function addComputedRiskFactor(id) {
    const riskFactors = state.riskFactors;

    let foundRiskFactor = riskFactors.find(r => r.id === riskFactor.id);

    if (typeof foundRiskFactor === 'undefined'){
        riskFactors.push({
            ...riskFactor,
            get contribution() {
                this.reasons = [];
                
                return this.enabled
                    ? f(state.risks.reduce((acc, curr) => {
                        if (curr.deleted) return acc;

                        let riskContribution = f((
                            curr.riskEttd + this.riskFactorEttd + 
                            curr.riskEttr + this.riskFactorEttr
                        ) * (curr.riskImpact + this.riskFactorImpact)
                        * f(365.25 / (curr.riskEttf + this.riskFactorEttf))) - curr._baseAffectedTime;

                        this.reasons.push(`${curr.riskDesc}: ${f(riskContribution)}`);
                        
                        return acc + riskContribution;
                    }, 0))
                    : 0;
            },
            reasons: [],
            "enabled": true,
            "open": false,
            "deleted": false
        })
    } else {
        Object.assign(foundRiskFactor, riskFactor);
    }    

    recalculate();
}

function addComputedRisk(risk) {
    const risks = state.risks;

    let foundRisk = risks.find(r => r.id === risk.id);

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
                return state.riskFactors.reduce((acc, curr) => (!curr.deleted && curr.enabled) ? acc + curr.riskFactorEttd : acc, this.riskEttd)
            },
            get netEttr() {
                return state.riskFactors.reduce((acc, curr) => (!curr.deleted && curr.enabled) ? acc + curr.riskFactorEttr : acc, this.riskEttr)
            },
            get netImpact() {
                return state.riskFactors.reduce((acc, curr) => (!curr.deleted && curr.enabled) ? acc + curr.riskFactorImpact : acc, this.riskImpact)
            },
            get netEttf() {
                return state.riskFactors.reduce((acc, curr) => (!curr.deleted && curr.enabled) ? acc + curr.riskFactorEttf : acc, this.riskEttf)
            },
            get affectedTime() {
                return f((this.netEttd + this.netEttr) * this.netImpact * this.incidents)
            },
            get _baseShareOfTotalBudget() {
                return state.budget <= 0
                    ? 'N/A'
                    : f((this._baseAffectedTime / state.budget) * 100, 3);
            },
            get shareOfTotalBudget() {
                return state.budget <= 0
                    ? 'N/A'
                    : f((this.affectedTime / state.budget) * 100, 3);
            },
            get _baseShareOfTolerated() {
                return this.accepted
                    ? 
                        state.accepted == 0
                        ? 0
                        : f((this._baseAffectedTime / state.accepted) * 100, 3)
                    : 'N/A';
            },
            get shareOfTolerated() {
                return this.accepted
                    ? 
                        state.accepted == 0
                        ? 0
                        : f((this.affectedTime / state.accepted) * 100, 3)
                    : 'N/A';
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
            "accepted": false,
            "open": false,
            "deleted": false
        })
    } else {
        Object.assign(foundRisk, risk);
    }    

    recalculate();
}

function enable(id) {
    const riskFactors = state.riskFactors;

    let foundRiskFactor = riskFactors.find(r => r.id === id);

    if (typeof foundRiskFactor === 'undefined') return;
    else {
        foundRiskFactor.enabled = true;
    }

    recalculate();
}

function unenable(id) {
    const riskFactors = state.riskFactors;

    let foundRiskFactor = riskFactors.find(r => r.id === id);

    if (typeof foundRiskFactor === 'undefined') return;
    else {
        foundRiskFactor.enabled = false;
    }

    recalculate();
}

function accept(id) {
    const risks = state.risks;

    let foundRisk = risks.find(r => r.id === id);

    if (typeof foundRisk === 'undefined') return;
    else {
        foundRisk.accepted = true;
    }

    recalculate();
}

function unaccept(id) {
    const risks = state.risks;

    let foundRisk = risks.find(r => r.id === id);

    if (typeof foundRisk === 'undefined') return;
    else {
        foundRisk.accepted = false;
    }

    recalculate();
}

function getComputedRiskFactor(id) {
    const riskFactors = state.riskFactors;

    let foundRiskFactor = riskFactors.find(r => r.id === id);

    return foundRiskFactor;
}

function getComputedRisk(id) {
    const risks = state.risks;

    let foundRisk = risks.find(r => r.id === id);

    return foundRisk;
}

function getAllComputedRisks() {
    return state.risks;
}

function getAllComputedRiskFactors() {
    return state.riskFactors;
}

function updateComputedRiskFactor(id, data) {
    return new Promise((resolve, reject) => {
        const riskFactors = state.riskFactors;

        let foundRiskFactor = riskFactors.find(r => r.id === id);

        if (typeof foundRiskFactor === 'undefined') reject('Could not find risk factor');
        else resolve(Object.assign(foundRiskFactor, data));
    })  
}

function updateComputedRisk(id, data) {
    return new Promise((resolve, reject) => {
        const risks = state.risks;

        let foundRisk = risks.find(r => r.id === id);

        if (typeof foundRisk === 'undefined') reject('Could not find risk');
        else resolve(Object.assign(foundRisk, data));
    })  
}

function deleteComputedRiskFactor(id) {
    return new Promise((resolve, reject) => {
        const riskFactors = state.riskFactors;

        let foundRiskFactorIndex = riskFactors.findIndex(r => r.id === id);

        if (foundRiskFactorIndex === -1) reject('Could not find risk');
        
        riskFactors.splice(foundRiskFactorIndex, 1);
        console.log(`Deleted risk factor with id ${id} from state`);

        resolve();
    })
}

function deleteComputedRisk(id) {
    return new Promise((resolve, reject) => {
        const risks = state.risks;

        let foundRiskIndex = risks.findIndex(r => r.id === id);

        if (foundRiskIndex === -1) reject('Could not find risk');
        
        risks.splice(foundRiskIndex, 1);
        console.log(`Deleted risk with id ${id} from state`);

        resolve();
    })
}

function setIsRiskFactorOpen(id, isOpen) {
    const riskFactors = state.riskFactors;

    let foundRiskFactor = riskFactors.find(r => r.id === id);

    if (typeof foundRiskFactor === 'undefined') return;
    else {
        foundRiskFactor.open = isOpen;
    }
}

function setIsRiskOpen(id, isOpen) {
    const risks = state.risks;

    let foundRisk = risks.find(r => r.id === id);

    if (typeof foundRisk === 'undefined') return;
    else {
        foundRisk.open = isOpen;
    }
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
        let estAvailability = document.querySelector("#est-availability");
        estAvailability.textContent = `${state.estAvailability}%`;
        const availabilities = [
            {
                min: 0,
                max: 75,
                className: "low"
            },
            {
                min: 75,
                max: 90,
                className: "medium"
            }, 
            {
                min: 90,
                max: 100,
                className: "high"
            }
        ];
        availabilities.forEach(av => {
            if (state.estAvailability > av.min && state.estAvailability <= av.max) {
                estAvailability.classList.add(av.className);
            } else {
                if (estAvailability.classList.contains(av.className)) estAvailability.classList.remove(av.className);
            }
        })

        let budget = document.querySelector("#budget");
        budget.textContent = state.budget;

        let accepted = document.querySelector("#accepted");
        accepted.textContent = state.accepted;

        let unallocated = document.querySelector("#unallocated");
        unallocated.textContent = state.unallocated;

        let threshold = document.querySelector("#individualThreshold");
        threshold.textContent = state.threshold;

        resolve();
    })
}