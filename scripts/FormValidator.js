export default class FormValidator {

    constructor(params, formElement) {
        this._params = params;
        this._formElement = formElement;
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
      
    _hasInvalidInput = (inputList) => {
        
        return inputList.some((inputElement) => {
    
          return !inputElement.validity.valid;
        })
    }
      
    _toggleButtonState = (inputList, buttonElement) => {
        if(this._hasInvalidInput(inputList)) {
          buttonElement.classList.add(this._params['inactiveButtonClass']);
          buttonElement.setAttribute('disabled', true);
        }
        else {
          buttonElement.classList.remove(this._params['inactiveButtonClass']);
          buttonElement.removeAttribute('disabled');
        }
    }
      
    _setEventListeners() {
        const inputList = Array.from(this._formElement.querySelectorAll(this._params['inputSelector']));
        const buttonElement = this._formElement.querySelector(this._params['submitButtonSelector']);
      
        // чтобы проверить состояние кнопки в самом начале
        this._toggleButtonState(inputList, buttonElement);
      
        inputList.forEach((inputElement) => {
          inputElement.addEventListener('input',  () => {
            this._checkInputValidity(inputElement);
            // чтобы проверять его при изменении любого из полей
            this._toggleButtonState(inputList, buttonElement);
          });
        });
    }

    enableValidation() {
        this._formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
          
        const fieldsetList = Array.from(this._formElement.querySelectorAll(this._params['fieldsetSelector']));
        fieldsetList.forEach((fieldSet) => {
            this._setEventListeners(fieldSet);
        }); 
    }

}