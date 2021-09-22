let currentUser = undefined;
let currentCompany = undefined;

async function main() {
    await getCurrentUser()

    if(currentUser && currentUser.id) {
        showWorkArea();
    }

    else {
        showLogIn();
    }
}

async function showWorkArea() {
    await getCompany().then(({data}) => {
        currentCompany = data;
    });
    document.getElementById("workArea").innerHTML = workAreaLayout(currentUser, currentCompany);
}

function getCurrentUser() {
    return new Promise(resolve => {
        chrome.runtime.sendMessage({intent: "getCurrentUser"}, res => {
            currentUser = res;
            resolve();
        });
    })
}

function getCompany() {
    return new Promise(resolve => {
        chrome.runtime.sendMessage({intent: "getCompany"}, res => {
            resolve(res);
        });
    })
}


function log(res) {
    chrome.runtime.sendMessage({intent: "info", payload: res})
}

main();
