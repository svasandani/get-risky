const state = {
    "uptime": 0,
    get budget() {
        return parseFloat(((1 - this.uptime) * 1440 * 365.25).toPrecision(5))
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
    console.log('Calculating static values...');

    let budget = document.querySelector("#budget-min");
    budget.textContent = state.budget;

    console.log('Collecting dynamic inputs...');


    console.log('Calculating dynamic values...');

    // accepted + unallocated


}