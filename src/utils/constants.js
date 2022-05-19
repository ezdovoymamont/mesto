export const buttonEditProfile = document.querySelector('.edit-profile');
export const userName = '.profile__name';
export const userJob = '.profile__job';
export const popupProfile = '.popup_type_profile';
export const popupProfileNameInput = document.querySelector('.popup__input_type_name');
export const popupProfileJobInput = document.querySelector('.popup__input_type_job');
export const profileForm = document.querySelector('.popup__form_type_profile');
 
export const addButton = document.querySelector('.add-button');
export const popupAddPhoto = '.popup_type_photo';
export const photoForm = document.querySelector('.popup__form_type_photo');

export const popupView = '.popup_view-photo';
export const elementList = '.elements__list';

export const initialCards = [
	{
	  name: 'Архыз',
	  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
	},
	{
	  name: 'Челябинская область',
	  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
	},
	{
	  name: 'Иваново',
	  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
	},
	{
	  name: 'Камчатка',
	  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
	},
	{
	  name: 'Холмогорский район',
	  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
	},
	{
	  name: 'Байкал',
	  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
	}
];

export const params = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    fieldsetSelector:'.popup__set',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_visible'
};

