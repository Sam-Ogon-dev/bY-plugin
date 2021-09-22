class OrganizationAPI {

    getCompanyByDomain(domain) {
        return fetch(`https://${BASE_URL}/places/by-url?url=${domain}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                "Authorization": "Bearer " + tokens.token
            }
        }).then(data => common.responseHandler(data, this.getCompanyByDomain));
    }

    getLoyaltyPrograms(companyId) {
        return fetch(`https://${BASE_URL}//loyality-programs?company_id=${companyId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                "Authorization": "Bearer " + tokens.token
            }
        }).then(data => common.responseHandler(data, this.getCompanyByDomain));
    }
}