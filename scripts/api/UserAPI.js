class UserAPI {

     login(username, password) {
        return fetch(`https://${BASE_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify({ username, password })
        }).then(data => data.json())
    }

    refreshTokens() {
        return fetch(`https://${BASE_URL}/token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify({ RefreshTokenRequestBody: tokens.refreshToken })
        }).then(data => ({data: data.json(), statusCode: data.status}));
    }

    currentUser() {
        return fetch(`https://${BASE_URL}/users/current`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                "Authorization": "Bearer " + tokens.token
            }
        }).then(data => common.responseHandler(data, this.currentUser));
    }

    getDiscountCards() {
        return fetch(`https://${BASE_URL}/discount-cards`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                "Authorization": "Bearer " + tokens.token
            }
        }).then(data => common.responseHandler(data, this.getDiscountCards));
    }

}
