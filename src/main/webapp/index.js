const OK = 200;
const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;

let loginContentDivEl;
let profileContentDivEl;
let logoutContentDivEl;
let schedulesContentDivEl;
let scheduleColumns;
let tasksContentDivEl;
let taskContentDivEl;
let usersContentDivEl;
let userContentDivEl;
let menuDivEl;
let activeUser;
let registerContentDivEl;

function newInfo(targetEl, message) {
    newMessage(targetEl, 'info', message);
}

function newError(targetEl, message) {
    newMessage(targetEl, 'error', message);
}

function newMessage(targetEl, cssClass, message) {
    clearMessages();

    const pEl = document.createElement('p');
    pEl.classList.add('message');
    pEl.classList.add(cssClass);
    pEl.textContent = message;

    targetEl.appendChild(pEl);
}

function clearMessages() {
    const messageEls = document.getElementsByClassName('message');
    for (let i = 0; i < messageEls.length; i++) {
        const messageEl = messageEls[i];
        messageEl.remove();
    }
}

function showContents(ids) {
    const contentEls = document.getElementsByClassName('content');
    for (let i = 0; i < contentEls.length; i++) {
        const contentEl = contentEls[i];
        if (ids.includes(contentEl.id)) {
            contentEl.classList.remove('hidden');
        } else {
            contentEl.classList.add('hidden');
        }
    }
}

function removeAllChildren(el) {
    while (el.firstChild) {
        el.removeChild(el.firstChild);
    }
}

function onNetworkError(response) {
    document.body.remove();
    const bodyEl = document.createElement('body');
    document.appendChild(bodyEl);
    newError(bodyEl, 'Network error, please try reloaing the page');
}

function onOtherResponse(targetEl, xhr) {
    if (xhr.status === NOT_FOUND) {
        newError(targetEl, 'Not found');
        console.error(xhr);
    } else {
        const json = JSON.parse(xhr.responseText);
        if (xhr.status === INTERNAL_SERVER_ERROR) {
            newError(targetEl, `Server error: ${json.message}`);
        } else if (xhr.status === UNAUTHORIZED || xhr.status === BAD_REQUEST) {
            newError(targetEl, json.message);
        } else {
            newError(targetEl, `Unknown error: ${json.message}`);
        }
    }
}

function hasAuthorization() {
    return localStorage.getItem('user') !== null;
}

function setAuthorization(user) {
    return localStorage.setItem('user', JSON.stringify(user));
}

function getAuthorization() {
    return JSON.parse(localStorage.getItem('user'));
}

function setUnauthorized() {
    return localStorage.removeItem('user');
}

function onLoad() {
    loginContentDivEl = document.getElementById('login-content');
    profileContentDivEl = document.getElementById('profile-content');
    logoutContentDivEl = document.getElementById('logout-content');
    usersContentDivEl = document.getElementById('users-content');
    userContentDivEl = document.getElementById('user-content');
    registerContentDivEl = document.getElementById('register-content');

    const loginLightboxButtonEl = document.getElementById('login-lightbox-button');
    loginLightboxButtonEl.style.cursor = "pointer";

    const registerLightboxButtonEl = document.getElementById('register-lightbox-button');
    registerLightboxButtonEl.style.cursor = "pointer";

    const loginButtonEl = document.getElementById('login-button');
    loginButtonEl.style.cursor = "pointer";
    loginButtonEl.addEventListener('click', onLoginButtonClicked);

    const registerButtonEl = document.getElementById('register-button');
    registerButtonEl.style.cursor = "pointer";
    registerButtonEl.addEventListener('click', onRegisterButtonClicked);

    const logoutButtonEl = document.getElementById('logout-button');
    logoutButtonEl.style.cursor = "pointer";
    logoutButtonEl.addEventListener('click', onLogoutButtonClicked);

    schedulesContentDivEl = document.getElementById('schedules-content');
    scheduleColumns = document.getElementById('schedule-columns');

    tasksContentDivEl = document.getElementById('tasks-content');

    taskContentDivEl = document.getElementById('task-content');

    if (hasAuthorization()) {
        onProfileLoad(getAuthorization());
    }
}

document.addEventListener('DOMContentLoaded', onLoad);
