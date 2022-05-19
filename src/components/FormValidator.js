export default class FormValidator {

    constructor(params, formElement) {
        this._params = params;
        this._formElement = formElement;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._params['inputSelector']));
        this._buttonElement = this._formElement.querySelector(this._params['submitButtonSelector']);
    }

    _showInputError = (inputElement, errorMessage) => {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._params['inputErrorClass']);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._params['errorClass']);
    }

    _hideInputError = (inputElement) => {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    
        inputElement.classList.remove(this._params['inputErrorClass']);
        errorElement.classList.remove(this._params['errorClass']);
        errorElement.textContent = '';
    }
      
    _checkInputValidity (inputElement)  {
        if (!inputElement.validity.valid) {
          this._showInputError(inputElement, inputElement.validationMessage);
        } else {
          this._hideInputError(inputElement);
        }
    }
      
    toggleButtonState = () => {

        if(this._formElement.checkValidity() === false) {
            this._buttonElement.classList.add(this._params['inactiveButtonClass']);
            this._buttonElement.setAttribute('disabled', true);
        }
        else {
            this._buttonElement.classList.remove(this._params['inactiveButtonClass']);
            this._buttonElement.removeAttribute('disabled');
        }
    }
      
    _setEventListeners() {
      
        // чтобы проверить состояние кнопки в самом начале
        this.toggleButtonState();
      
        this._inputList.forEach((inputElement) => {
          inputElement.addEventListener('input',  () => {
            this._checkInputValidity(inputElement);
            // чтобы проверять его при изменении любого из полей
            this.toggleButtonState();
          });
        });
    }

    enableValidation() {
        this._formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });

        this._setEventListeners();
    }

}