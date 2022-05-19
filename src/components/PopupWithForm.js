import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, formSelector, handleSubmitForm) {
        super(popupSelector);
        this._handleSubmitForm = handleSubmitForm;
        this._form = this._popup.querySelector(formSelector);
        this._form.addEventListener('submit', (evt) => {
            this._handleSubmitForm(evt, this._getInputValues());
        });
    }

    _getInputValues() {
        this._inputList = this._form.querySelectorAll('.popup__input');
        this._formValues = {};
        this._inputList.forEach(input => this._formValues[input.name] = input.value);
        return this._formValues;
    }

    setEventListeners() {
        super.setEventListeners();
    }

    close() {
        this._form.reset();
        super.close();
    }
}