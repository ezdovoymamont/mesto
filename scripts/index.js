import Card from './Card.js';
import FormValidator from './FormValidator.js';

// Открытие popup
function openPopup(popup) {
	popup.classList.add('popup_open');

	// добавляем обработчики закрытия по Escape и клику на overlay
	document.addEventListener('keydown', handleHotkey);
	popup.addEventListener('click', handleOverlayClick);
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
	const activePopup = document.querySelector('.popup_open');
	if (activePopup && evt.key === 'Escape') { 
	  closePopup(activePopup);
	}
  }

// Закрытие popup по overlay и крестику
function handleOverlayClick(evt) {
	const activePopup = document.querySelector('.popup_open');

	if ((activePopup && evt.target === activePopup) || evt.target.classList.contains('popup__close-button') ) {
		console.log();
		closePopup(activePopup);
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

// Функция добавления новой фотокарточки
function handleNewCardSubmit(evt) {
	evt.preventDefault();

	const card = new Card(popupProfileLinkInput.value, popupProfileTitleInput.value, '#card-template');
	elementList.prepend(card.createCard());

	closePopup(popupAddPhoto);
	photoForm.reset();

	const buttonSave = photoForm.querySelector('.popup__save-button');
	buttonSave.classList.add('popup__save-button_disabled');
	buttonSave.setAttribute('disabled', true);

}
photoForm.addEventListener('submit', handleNewCardSubmit);


// Функция перебора массива с фотокарточками
function renderInitialCards(initialCards) {
	initialCards.forEach((item) => {
  		const card = new Card(item.link, item.name, '#card-template', openPopup);
		elementList.append(card.createCard());
	})
}
renderInitialCards(initialCards);

//-----
function enableValidations() {
	const formElement = Array.from(document.querySelectorAll(params['formSelector']));
	formElement.forEach((formElement) => {
		const formList = new FormValidator(params, formElement);
		formList.enableValidation();
	});
	
}
enableValidations();
//-----

