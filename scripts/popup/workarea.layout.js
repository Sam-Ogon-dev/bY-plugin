function workAreaLayout(currentUser, currentCompany) {
   return `
    <div class="person">
        <div style="display: flex; align-items: center; flex-direction: row">
            <div class="person__bg-status ${getBackgroundColor(currentUser.benefitty_current_level)}" style="margin-right: 10px;">
                <img src="${currentUser.profile_image.url}" class="avatar"/>
            </div>
            
            <div class="person__info">
                <span id="name">${currentUser.full_name}</span>
                <span id="status">Статус: ${currentUser.benefitty_card.currentLevel.name_full}</span>
            </div>
        </div>
        
        <img style="width: 20px; height: 20px; cursor: pointer" src="/assets/logout.svg"/>
    </div>
    <hr class="separator" style="margin-top: 5px; margin-bottom: 5px;"/>
    <div class="company">
        <span class="company__name">${currentCompany.name}</span>
    </div>
    <div class="benefitty-sections">
        <div class="benefitty-sections__section">
            <div class="benefitty-sections__section__name">Кэшбэк</div>
            <span class="benefitty-sections__section__text">Получи до 7.5%</span>
            <button style="width: fit-content; margin-left: 20px;" class="orange-btn-bY">Активировать</button>
        </div>
        <div class="benefitty-sections__section">
            <div class="benefitty-sections__section__name">Программа лояльности</div>
            <span class="benefitty-sections__section__text">Здесь действует Ваша карта лояльности</span>
        </div>
        <div class="benefitty-sections__section">
            <div class="benefitty-sections__section__name">Скидки от банков и платежных систем</div>
            <span class="benefitty-sections__section__text">Действует скидка от Mastercard</span>
        </div>
        <div class="benefitty-sections__section">
            <div class="benefitty-sections__section__name">Обмен баллами</div>
            <span class="benefitty-sections__section__text">20 человек меняют баллы</span>
            <button style="width: fit-content; margin-left: 20px;" class="benefitty-btn-bY">Смотреть</button>
        </div>
        <div class="benefitty-sections__section">
            <div class="benefitty-sections__section__name">Кэшбэк по чеку</div>
            <span class="benefitty-sections__section__text">Отсканируй чек после покупки - получи кэшбэк</span>
            <button style="width: fit-content; margin-left: 20px;" class="benefitty-btn-bY">Отсканировать чек</button>
        </div>
    </div>
    
    `
}

function getBackgroundColor(statusId) {
    if(statusId === 0) {
        return "person__bg-status_start"
    }
    else if(statusId === 1) {
        return "person__bg-status_silver"
    }
    else if(statusId === 2) {
        return "person__bg-status_gold"
    }
    else if(statusId === 3) {
        return "person__bg-status_premium"
    }
}