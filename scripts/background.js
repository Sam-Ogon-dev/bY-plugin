// localStorage.setItem("test", 123)
// console.log(localStorage)
let currentUser = undefined;
let discountsCards = [];
let currentDomain = "";
let companies = [];

initCurrentUser();

chrome.runtime.onMessage.addListener((request, sender, response) => {

    switch (request.intent) {

        case "getCurrentUser": {
            if (currentUser) { response(currentUser) }
            else {
                userAPI.currentUser().then(data => {
                    currentUser = data.data;
                    response(currentUser);
                });
                return true;
            }
            break;
        }

        case "info": {
            console.log(request.payload); break
        }

        case "login": {
            userAPI.login(request.payload.login, request.payload.password).then(data => {
                tokens.setTokens(data.token, data.refresh_token)
                common.updateTokensInLocalStorage(data);
                currentUser = undefined
                response();
            });
            return true;
        }

        case "updateTokens": {
            common.updateTokensInLocalStorage(request.payload); break
        }

        case "getCompany": {
            response(companies.find(item => item.url === currentDomain));
           break;
        }

        case "initCompany": {
            currentDomain = request.payload.url
            initCompany().then(data => {
                response(data);
            });

            return true;
        }

        case "setActiveDomain": {
            currentDomain = request.payload.url
            break
        }

        case "getLoyaltyCard": {
            response(discountsCards.find((card) => card.loyality_program_id === request.payload.loyaltyProgramId));
            break;
        }

        case "removeCompany": {

            companies = companies.filter(item => item.data.company_id !== request.payload.companyId
            );
        }
    }
});

function initCurrentUser() {
    userAPI.currentUser().then((data) => {
        if(data.statusCode !== 200) {
            return;
        }

        currentUser = data.data;

        userAPI.getDiscountCards().then(data => {
            discountsCards = data;
        });
    });
}

function initCompany() {
    return organizationAPI.getCompanyByDomain(currentDomain).then(({data}) => {
        companies.push({url: currentDomain, data: data.length ? data[0] : data});
        return data.length ? data[0] : data;
    })
}
