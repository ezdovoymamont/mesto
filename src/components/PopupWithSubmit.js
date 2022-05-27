import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._button = this._popup.querySelector('.popup__save-button');
    }

    setEventListeners() {
        super.setEventListeners();
        this._button.addEventListener('click', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit();
        });
    }

    setHandleFormSubmit(handleFormSubmit) {
        this._handleFormSubmit = handleFormSubmit;
    }

}