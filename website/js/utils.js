const notifications = [];
let notification_mtx = false;

document.querySelectorAll('a[rel="keep-params"]').forEach(a => {
    a.addEventListener('click', (e) => {
        e.preventDefault();

        window.location = e.target.href + window.location.search;
    })
})

// https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
function dec2hex(dec) {
    return dec.toString(16).padStart(2, "0")
}
  
function uuid(len=16) {
    var arr = new Uint8Array((len || 40) / 2)
    window.crypto.getRandomValues(arr)
    return "a" + Array.from(arr, dec2hex).join('')
}

function addNotification(msg, thisId, onClick, timeout) {
    document.querySelector('#notifications').insertAdjacentHTML(`beforeEnd`,
    `
    <div class="notification hidden" id=${thisId}>${msg}</div>
    `)

    setTimeout(() => document.querySelector(`#${thisId}`).classList.remove('hidden'), 100);

    document.querySelector(`#${thisId}`).addEventListener('click', () => { onClick(thisId) });

    setTimeout(() => {
        if (document.querySelector(`#${thisId}`) !== null) {
            document.querySelector(`#${thisId}`).classList.add('hidden');
            setTimeout(() => { if (document.querySelector(`#${thisId}`) !== null) document.querySelector('#notifications').removeChild(document.querySelector(`#${thisId}`)) }, 100);
        }
    }, timeout)
}

function pushNotification(data, timeout=5000) {
    let thisId = uuid();

    notifications.push({
        id: thisId,
        data
    });

    addNotification(
        data.msg, 
        thisId, 
        'onClick' in data ? data.onClick : () => {},
        timeout
    );

    return thisId;
}

function popNotification(id) {
    while(notification_mtx) {}

    notification_mtx = true;
    let foundIndex = notifications.findIndex(n => n.id == id);
    if (foundIndex >= 0) notifications.splice(foundIndex, 1);
    notification_mtx = false;

    if (document.querySelector(`#${id}`) !== null) {
        document.querySelector(`#${id}`).classList.add('hidden');
        setTimeout(() => { if (document.querySelector(`#${id}`) !== null) document.querySelector('#notifications').removeChild(document.querySelector(`#${id}`)) }, 100);
    }

    return foundIndex >= 0;
}