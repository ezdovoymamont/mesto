import {
	buttonEditProfile, 
	userName, 
	userJob, 
	popupProfileNameInput,
 	popupProfileJobInput,
 	popupProfile,
 	profileForm,
 	addButton,
 	popupAddPhoto,
 	popupProfileTitleInput,
 	popupProfileLinkInput,
 	photoForm,
 	popupView,
 	popupViewPhoto,
 	popupViewDesc,
 	elementList,
 	initialCards, 
	params
} from './utils/constants.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';

// Открытие popup
function openPopup(popup) {
	popup.classList.add('popup_open');

	// добавляем обработчики закрытия по Escape и клику на overlay
	document.addEventListener('keydown', handleHotkey);
	popup.addEventListener('click', handleOverlayClick);
}

function handleCardClick(cardPhoto, cardName) {
	popupViewPhoto.src = cardPhoto;
	popupViewPhoto.alt = cardName;
	popupViewDesc.textContent = cardName;

	openPopup(popupView);
}

// Закрытие popup
function closePopup(popup) { 
	popup.classList.remove('popup_open'); 

	// удаляем обработчики закрытия по Escape и клику на overlay
	document.removeEventListener('keydown', handleHotkey); 
	popup.removeEventListener('click', handleOverlayClick); 

} 

// Открытие popup по клику на редактировать профиль или добавить фотокарточку
buttonEditProfile.addEventListener('click', function() {
	popupProfileNameInput.value = userName.textContent;
	popupProfileJobInput.value = userJob.textContent;
	popupProfileNameInput.dispatchEvent(new Event('input', {bubbles:true}));
	popupProfileJobInput.dispatchEvent(new Event('input', {bubbles:true}));

	openPopup(popupProfile);
})

addButton.addEventListener('click', () => openPopup(popupAddPhoto));

function handleHotkey(evt) {
	// проверяем есть ли открытый попап и только тогда закрываем
	
	if (evt.key === 'Escape') { 
		const activePopup = document.querySelector('.popup_open');
		closePopup(activePopup);
	}
}

// Закрытие popup по overlay и крестику
function handleOverlayClick(evt) {
	
	if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button') ) { 
        closePopup(evt.currentTarget); 
    } 
}

// Функция формы для изменения профиля
function handleРrofileSubmit(evt) {
	evt.preventDefault();
  
	userName.textContent = popupProfileNameInput.value;
	userJob.textContent = popupProfileJobInput.value;
  
	closePopup(popupProfile);
  
	profileForm.reset();
}
profileForm.addEventListener('submit', handleРrofileSubmit);

function createAllCard(link, name) {
	const card = new Card(link, name, '#card-template', handleCardClick);
	return card.createCard();
}

// Функция добавления новой фотокарточки
function handleNewCardSubmit(evt) {
	evt.preventDefault();

	elementList.prepend(createAllCard(popupProfileLinkInput.value, popupProfileTitleInput.value, '#card-template'));
	closePopup(popupAddPhoto);
	photoForm.reset();

	newCardValidation.toggleButtonState();
}
photoForm.addEventListener('submit', handleNewCardSubmit);

// Функция перебора массива с фотокарточками
function renderInitialCards(initialCards) {
	initialCards.forEach((item) => {
		elementList.append(createAllCard(item.link, item.name, '#card-template', handleCardClick));
	})
}
renderInitialCards(initialCards);

const profileValidation = new FormValidator(params, profileForm);
const newCardValidation = new FormValidator(params, photoForm);

// Валидация
function enableValidations() {

	profileValidation.enableValidation();
	newCardValidation.enableValidation();  	
}
enableValidations();


