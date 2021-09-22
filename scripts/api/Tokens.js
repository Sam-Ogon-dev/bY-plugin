class Tokens {
    token = localStorage.getItem("token")
    refreshToken = localStorage.getItem("refresh_token")

    setTokens(token, refreshToken) {
        this.token = token;
        this.refreshToken = refreshToken;
    }
}