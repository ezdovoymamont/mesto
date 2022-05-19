export default class UserInfo {
    constructor(info) {
        this._name = document.querySelector(info['userName']);
        this._info = document.querySelector(info['userJob']);
    }

    getUserInfo() {
        const name = this._name.textContent;
        const info = this._info.textContent;
        const profile = {name, info};
        return profile;
    }

    setUserInfo(name, info) {
        this._name.textContent = name;
        this._info.textContent = info;
    }
}
