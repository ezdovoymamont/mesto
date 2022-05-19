import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupPhoto = this._popup.querySelector('.popup__photo');
        this._popupDescription = this._popup.querySelector('.popup__description');
    }

    open(cardPhoto, cardName) {
        this._popupPhoto.src = cardPhoto;
        this._popupPhoto.alt = cardName;
        this._popupDescription.textContent = cardName;

        super.open();
    }
}