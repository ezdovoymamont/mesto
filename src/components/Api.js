export default class Api {
    constructor(baseUrl, headers) {
        this._headers = headers;
        this._baseUrl = baseUrl;
    }

    _checkError(res) {
        if (res.ok) {
            return res.json();
        }

        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: {
                authorization: this._headers
            }
        })
            .then(this._checkError);
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'GET',
            headers: {
                authorization: this._headers
            }
        })
            .then(this._checkError);
    }

    updateProfile(info) {
        return fetch(`${this._baseUrl}/users/me`, {

            method: 'PATCH',
            headers: {
                authorization: this._headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: info.name,
                about: info.info,
            })
        })
            .then(this._checkError);
    }

    updatePhotoProfile(info) {
        return fetch(`${this._baseUrl}/users/me/avatar `, {

            method: 'PATCH',
            headers: {
                authorization: this._headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: info.avatar
            })
        })
            .then(this._checkError);
    }

    addNewCard(userLink, userTitle) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: {
                authorization: this._headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                link: userLink,
                name: userTitle,
            })
        })
            .then(this._checkError);
    }

    deleteCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: this._headers
            }
        })
            .then(this._checkError);
    }

    putLike(id) {
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
            method: 'PUT',
            headers: {
                authorization: this._headers
            }
        })
            .then(this._checkError);
    }

    deleteLike(id) {
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
            method: 'DELETE',
            headers: {
                authorization: this._headers
            }
        })
            .then(this._checkError);
    }
}