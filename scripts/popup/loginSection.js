function showLogIn() {
    document.getElementById("workArea").innerHTML =
        `
            <input class="benefitty-input-bY" id="login" type="text" value="ileka.foto@yandex.ru">
            <input style="margin-top: 10px;" class="benefitty-input-bY" id="password" type="password" value="Samoki1989">
            <span class="text-error hide" id="loginErrorText" style="width: 100%; text-align: center"></span>
            <button style="margin-top: 10px;" class="benefitty-btn-bY" id="authBtn">Войти</button>
        `

    let btn = document.getElementById("authBtn");
    let loginInput = document.getElementById("login");
    let passwordInput = document.getElementById("password");

    btn.addEventListener("click", () => {
        chrome.runtime.sendMessage({intent: "login", payload: {login: loginInput.value, password: passwordInput.value}}, async () => {
            showLoginLoader()
            await getCurrentUser();

            if(currentUser && currentUser.id) {
                showWorkArea();
            } else {
                showLogIn()
                showErrorText("Проверьте правильность ввода логина/пароля");
            }
        });
    });
}

function showLoginLoader() {
    document.getElementById("workArea").innerHTML =
        `
            <div style="display: flex; flex-grow: 1; align-items: center; justify-content: center;">
                <img src="/assets/loader.svg" class="loader"/>
            </div>
        `
}

function showErrorText(text) {
    let errorTextEl = document.getElementById("loginErrorText")

    errorTextEl.innerText = text;
    errorTextEl.classList.remove("hide");
}