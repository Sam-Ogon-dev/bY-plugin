let modal = document.createElement("div")
let currentCompanyId = undefined;
let dataForNotification = undefined;

modal.classList.add("modal-bY")
modal.innerHTML =
    `<div class="close-block-bY">
        <button id="closeBtnBY" class="close-btn-bY">✖</button>
    </div>
    <div class="content-bY">
        <span>На этом сайте действует ваша карта лояльности!</span>
    </div>
    <button class="benefitty-btn-bY">МОЯ КАРТА</button>
    `
document.documentElement.appendChild(modal)

document.getElementById("closeBtnBY").addEventListener("click", hideNotification)

function hideNotification() {
    modal.style.display = "none"
}

chrome.runtime.sendMessage({intent: "initCompany", payload: {url: window.location.origin}}, data => {
    currentCompanyId = data.company_id;
    dataForNotification = data;
});

window.onbeforeunload = function () {
    chrome.runtime.sendMessage({intent: "removeCompany", payload: { companyId: currentCompanyId }})
}

window.onfocus = function () {
    chrome.runtime.sendMessage({intent: "setActiveDomain", payload: {url: window.location.origin}});
}