const state = {
    "uptime": 0,
    get budget() {
        return parseFloat(((1 - this.uptime) * 1440 * 365.25).toPrecision(5))
    },
    "accepted": 0,
    get unallocated() {
        return parseFloat((this.budget - this.accepted).toPrecision(5))
    },
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

    let budget = document.querySelector("#budget-min");
    budget.textContent = state.budget;

    let unallocated = document.querySelector("#unallocated-min");
    unallocated.textContent = state.unallocated;
}