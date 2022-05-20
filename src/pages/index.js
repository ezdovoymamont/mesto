import {
	addButton,
	buttonEditProfile,
	elementList,
	initialCards,
	params,
	photoForm,
	popupAddPhoto,
	popupProfile,
	popupProfileJobInput,
	popupProfileNameInput,
	popupView,
	profileForm,
	userJob,
	userName
} from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

import '../pages/index.css';

const popupAddCard = new PopupWithForm(popupAddPhoto, '.popup__form_type_photo', handleNewCardSubmit);
popupAddCard.setEventListeners();

const editProfile = new PopupWithForm(popupProfile, '.popup__form_type_profile', handleProfileSubmit);
editProfile.setEventListeners();

const popupWithImage = new PopupWithImage(popupView);
popupWithImage.setEventListeners();

function handleCardClick(cardPhoto, cardName) {
	popupWithImage.open(cardPhoto, cardName);
}

addButton.addEventListener('click', () => popupAddCard.open());

// Функция добавления новой фотокарточки
function handleNewCardSubmit(cardInfo) {
	popupAddCard.close();
	section.addNewItemStart(createAllCard(cardInfo['link-image'], cardInfo['title']));
	newCardValidation.toggleButtonState();
}

const userInfo = new UserInfo({userName, userJob});

// Функция формы для изменения профиля
function handleProfileSubmit(profileInfo) {
	editProfile.close();
	userInfo.setUserInfo(profileInfo['name'], profileInfo['job']);

	profileForm.reset();
}

// Открытие popup по клику на редактировать профиль
buttonEditProfile.addEventListener('click', function() {
	const {name, info} = userInfo.getUserInfo();
	popupProfileNameInput.value = name;
	popupProfileJobInput.value = info;
	popupProfileNameInput.dispatchEvent(new Event('input', {bubbles:true}));
	popupProfileJobInput.dispatchEvent(new Event('input', {bubbles:true}));
	editProfile.open();
});

const profileValidation = new FormValidator(params, profileForm);
const newCardValidation = new FormValidator(params, photoForm);

// Валидация
function enableValidations() {

	profileValidation.enableValidation();
	newCardValidation.enableValidation();  	
}
enableValidations();


function createAllCard(link, name) {
	const card = new Card(link, name, '#card-template', handleCardClick);
	return card.createCard();
}

// const items = [];
// initialCards.forEach((item) => {
// 	items.push(createAllCard(item.link, item.name));
// });

const section = new Section(
	{
		items: initialCards,
		renderer: (item) => {
			section.addNewItemEnd(createAllCard(item.link, item.name))
		}
	},
	elementList);
section.renderItems();


