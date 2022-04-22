const buttonEditProfile = document.querySelector('.edit-profile');
const userName = document.querySelector('.profile__name');
const userJob = document.querySelector('.profile__job');
const popupProfile = document.querySelector('.popup_type_profile')
const popupProfileNameInput = popupProfile.querySelector('.popup__input_type_name');
const popupProfileJobInput = popupProfile.querySelector('.popup__input_type_job');
const profileForm = popupProfile.querySelector('.popup__form_type_profile');

const addButton = document.querySelector('.add-button');
const popupAddPhoto = document.querySelector('.popup_type_photo')
const popupProfileTitleInput = popupAddPhoto.querySelector('.popup__input_type_title');
const popupProfileLinkInput = popupAddPhoto.querySelector('.popup__input_type_link');
const photoForm = popupAddPhoto.querySelector('.popup__form_type_photo');

const popupView = document.querySelector('.popup_view-photo');
const popupViewPhoto = popupView.querySelector('.popup__photo');
const popupViewDesc = popupView.querySelector('.popup__description');

const elementList = document.querySelector('.elements__list');
const cardTemplate = document.querySelector('#card-template').content;

const initialCards = [
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

const params = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    fieldsetSelector:'.popup__set',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_visible'
};

