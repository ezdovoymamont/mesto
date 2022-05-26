import {
	addButton,
	buttonEditProfile,
	elementList,
	params,
	photoForm,
	popupAddPhoto,
	popupProfile,
	popupProfileJobInput,
	popupProfileNameInput,
	popupView,
	profileForm,
	popupAvatar,
	avatarForm,
	userAvatar,
	buttonEditAvatar,
	userJob,
	userName,
	popupDeletePhoto
} from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';

import '../pages/index.css';

const api = new Api('https://mesto.nomoreparties.co/v1/cohort-41', 'c667b9e8-d609-4570-8d24-855bf53da70e');

let userInfo;
api.getUserInfo()
	.then((result) => {
		userInfo = new UserInfo({userName, userJob, userAvatar}, result['_id']);
		userInfo.setUserInfo(result['name'], result['about']);
		userInfo.setUserAvatar(result['avatar']);
	})
	.catch((err) => {
		alert(`Ошибка ${err}`);
	});

let section;
api.getInitialCards()
	.then((result) => {
		const cards = [];
		result.forEach((item) => {
			cards.push({link:item['link'], name:item['name'], _id:item['_id'], likes:item['likes'], owner:item['owner']});
		});

		section = new Section(
			{
				items: cards,
				renderer: (item) => {
					section.addNewItemEnd(createAllCard(item.link, item.name, item._id, item.likes, item.owner));
				}
			},
			elementList);

		section.renderItems();
	})
	.catch((err) => {
		alert(`Ошибка ${err}`);
	});

function createAllCard(link, name, id, likes, owner) {
	const card = new Card(link, name, id, likes, owner, '#card-template', handleCardClick, deleteUserCard, likeUserClicked);
	card.setCurrentUserId(userInfo.getUserID());
	return card.createCard(userInfo.getUserID());
}

function handleCardClick(cardPhoto, cardName) {
	popupWithImage.open(cardPhoto, cardName);
}
const popupAddCard = new PopupWithForm(popupAddPhoto, '.popup__form_type_photo', handleNewCardSubmit); // Добавить фото
popupAddCard.setEventListeners();

const editProfile = new PopupWithForm(popupProfile, '.popup__form_type_profile', handleProfileSubmit); // Редактировать профиль
editProfile.setEventListeners();

const editAvatar = new PopupWithForm(popupAvatar, '.popup__form_edit-avatar', handleAvatarSubmit); // Редактировать фото профиля
editAvatar.setEventListeners();

const popupWithImage = new PopupWithImage(popupView); // Увеличить фото
popupWithImage.setEventListeners();

const confirmDeleteCard = new PopupWithSubmit(popupDeletePhoto);	// Подтверждение об удалении фото
confirmDeleteCard.setEventListeners();

addButton.addEventListener('click', () => popupAddCard.open());
buttonEditAvatar.addEventListener('click', () => editAvatar.open());

// Функция добавления новой фотокарточки
function handleNewCardSubmit(cardInfo) {
	renderLoading('.popup__save-button-creat', true);
	api.addNewCard(cardInfo['link-image'], cardInfo['title'])
		.then((item) => section.addNewItemStart(createAllCard(item.link, item.name, item._id, item.likes, item.owner)))
		.then(() => popupAddCard.close())
		.catch((err) => {
			console.log(`Ошибка при добавлении фотокарточки ${err}`);
		})
		.finally(() => {
			renderLoading('.popup__save-button-creat', false);
		});

	newCardValidation.toggleButtonState();
}

// Открытие popup по клику на редактировать профиль
buttonEditProfile.addEventListener('click', function() {
	const {name, info, } = userInfo.getUserInfo();
	popupProfileNameInput.value = name;
	popupProfileJobInput.value = info;
	popupProfileNameInput.dispatchEvent(new Event('input', {bubbles:true}));
	popupProfileJobInput.dispatchEvent(new Event('input', {bubbles:true}));
	editProfile.open();
});

// Функция формы для изменения профиля
function handleProfileSubmit(profileInfo) {
	renderLoading('.popup__save-button-profile', true);
	userInfo.setUserInfo(profileInfo['name'], profileInfo['job']);
	api.updateProfile(userInfo.getUserInfo())
		.then(() => editProfile.close())
		.catch((err) => {
			console.log(`Ошибка изменения профиля ${err}`);
		})
		.finally(() => {
			renderLoading('.popup__save-button-profile', false);
		});

	profileForm.reset();
}

// Функция формы для изменения фотографии профиля
function handleAvatarSubmit(linkAvatar) {
	renderLoading('.popup__save-button-profilePhoto', true);
	userInfo.setUserAvatar(linkAvatar['link-image']);
	api.updatePhotoProfile(userInfo.getUserInfo())
		.then(() => editAvatar.close())
		.catch((err) => {
			console.log(`Ошибка изменения фотографии профиля ${err}`);
		})
		.finally(() => {
			renderLoading('.popup__save-button-profilePhoto', false);
		});

	avatarValidation.toggleButtonState();
}

const profileValidation = new FormValidator(params, profileForm);
const newCardValidation = new FormValidator(params, photoForm);
const avatarValidation = new FormValidator(params, avatarForm);

// Валидация
function enableValidations() {

	profileValidation.enableValidation();
	newCardValidation.enableValidation();
	avatarValidation.enableValidation();
}
enableValidations();

// Удалить свою карточку
function deleteUserCard(cardId) {
	confirmDeleteCard.setHandleFormSubmit(() => {
		renderLoading('.popup__save-button-delete', true);
		api.deleteCard(cardId)
			.then(() => (confirmDeleteCard.close()))
			.catch((err) => {
				console.log(`Ошибка при удалении своей карточки ${err}`);
			})
			.finally(() => {
				renderLoading('.popup__save-button-delete', false);
			});
	});
	confirmDeleteCard.open();
}

// Поставить и убрать лайк
function likeUserClicked(cardId, isLiked) {
	if(isLiked){
		api.deleteLike(cardId)
			.catch((err) => {
				console.log(`Ошибка при удалении лайка ${err}`);
			});
	}
	else{
		api.putLike(cardId)
			.catch((err) => {
				console.log(`Ошибка при установки лайка ${err}`);
			});
	}
}

//Идет загрузка
function renderLoading (buttonForm, isLoading) {
	const buttonConfirmation = document.querySelector(buttonForm);
	if(isLoading) {
		buttonConfirmation.textContent = 'Сохранение...';
	}
}





