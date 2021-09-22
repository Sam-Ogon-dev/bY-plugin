class Common {
    updateTokensInLocalStorage(data) {
        localStorage.setItem("token", data.token)
        localStorage.setItem("refresh_token", data.refresh_token)
        localStorage.setItem("userId", data.id)
    }

    responseHandler(rawData, callbackRetry) {
        if(rawData.status === 401) {
            return userAPI.refreshTokens().then(data => {
                if(data.statusCode !== 200) {
                    return {data: null, statusCode: data.statusCode};
                }
                tokens.setTokens(data.token, data.refresh_token);
                common.updateTokensInLocalStorage(data)
                return callbackRetry()
            })
        } else {
            return rawData.json().then(data => ({data, statusCode: rawData.status}));
        }
    }
}