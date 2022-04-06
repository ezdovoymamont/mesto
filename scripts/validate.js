
const showInputError = (formElement, inputElement, errorMessage, params) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(params['inputErrorClass']);          //('popup__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add(params['errorClass']);               //('popup__input-error_visible');
  };
  
  const hideInputError = (formElement, inputElement, params) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(params['inputErrorClass']);       //('popup__input_type_error');
    errorElement.classList.remove(params['errorClass']);            //('popup__input-error_visible');
    errorElement.textContent = '';
  };
  
  const checkInputValidity = (formElement, inputElement, params) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, params);
    } else {
      hideInputError(formElement, inputElement, params);
    }
  };
  
  const hasInvalidInput = (inputList) => {
    
    return inputList.some((inputElement) => {

      return !inputElement.validity.valid;
    })
  };
  
  const toggleButtonState = (inputList, buttonElement, params) => {
    if(hasInvalidInput(inputList)) {
      buttonElement.classList.add(params['inactiveButtonClass']);   //('popup__save-button_disabled');
      buttonElement.setAttribute('disabled', true);
    }
    else {
      buttonElement.classList.remove(params['inactiveButtonClass']);//('popup__save-button_disabled');
      buttonElement.removeAttribute('disabled');
    }
  };
  
  const setEventListeners = (formElement, params) => {
    const inputList = Array.from(formElement.querySelectorAll(params['inputSelector']));      //('.popup__input'));
    const buttonElement = formElement.querySelector(params['submitButtonSelector']);          //('.popup__save-button');
  
    // чтобы проверить состояние кнопки в самом начале
    toggleButtonState(inputList, buttonElement, params);
  
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement, params);
        // чтобы проверять его при изменении любого из полей
        toggleButtonState(inputList, buttonElement, params);
      });
    });
  };
  
  const enableValidation = (params) => {
    const formList = Array.from(document.querySelectorAll(params['formSelector']));           //('.popup__form'));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
      
      //setEventListeners(formElement);
      const fieldsetList = Array.from(formElement.querySelectorAll(params['fieldsetSelector']));//('.popup__set'));
      fieldsetList.forEach((fieldSet) => {
        setEventListeners(fieldSet, params);
      }); 
  
    });
  };
  
  enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    fieldsetSelector:'.popup__set',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_visible'
    });