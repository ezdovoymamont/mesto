export default class UserInfo {
    constructor(info, id) {
        this._name = document.querySelector(info['userName']);
        this._info = document.querySelector(info['userJob']);
        this._avatar = document.querySelector('.profile__avatar');
        this._id = id;
    }

    getUserInfo() {
        const name = this._name.textContent;
        const info = this._info.textContent;
        const avatar = this._avatar.src;
        const profile = {name, info, avatar};
        return profile;
    }

    getUserID() {
        return this._id;
    }

    setUserInfo(name, info) {
        this._name.textContent = name;
        this._info.textContent = info;
    }

    setUserAvatar(avatar){
        this._avatar.src = avatar;
    }
}
