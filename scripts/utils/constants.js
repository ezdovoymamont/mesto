export const buttonEditProfile = document.querySelector('.edit-profile');
export const userName = document.querySelector('.profile__name');
export const userJob = document.querySelector('.profile__job');
export const popupProfile = document.querySelector('.popup_type_profile')
export const popupProfileNameInput = popupProfile.querySelector('.popup__input_type_name');
export const popupProfileJobInput = popupProfile.querySelector('.popup__input_type_job');
export const profileForm = popupProfile.querySelector('.popup__form_type_profile');
 
export const addButton = document.querySelector('.add-button');
export const popupAddPhoto = document.querySelector('.popup_type_photo')
export const popupProfileTitleInput = popupAddPhoto.querySelector('.popup__input_type_title');
export const popupProfileLinkInput = popupAddPhoto.querySelector('.popup__input_type_link');
export const photoForm = popupAddPhoto.querySelector('.popup__form_type_photo');

export const popupView = document.querySelector('.popup_view-photo');
export const popupViewPhoto = popupView.querySelector('.popup__photo');
export const popupViewDesc = popupView.querySelector('.popup__description');
 
export const elementList = document.querySelector('.elements__list');
export const cardTemplate = document.querySelector('#card-template').content;

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

