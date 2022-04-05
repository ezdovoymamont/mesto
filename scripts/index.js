	// Cоздаем новые фотокарточки 
function createCard(cardPhoto, cardName) {
	
	const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
	const cardElementPhoto = cardElement.querySelector('.element__photo');
  
	cardElementPhoto.src = cardPhoto;
	cardElementPhoto.alt = cardName;
	cardElement.querySelector('.element__title').textContent = cardName;
  
	// Лайк фотокарточки 
	cardElement.querySelector('.element__like').addEventListener('click', function(evt) {
		evt.target.classList.toggle('element__like_active');
	})
  
	// Удаление фотокарточки 
	cardElement.querySelector('.element__trash').addEventListener('click', function(evt) {
		evt.target.closest('.element').remove();
	})
  
	// Открытие фотокарточки в popup окне
	cardElement.querySelector('.element__photo').addEventListener('click', function() {
		popupViewPhoto.src = cardPhoto;
		popupViewPhoto.alt = cardName;
	  	popupViewDesc.textContent = cardName;
		  
		openPopup(popupView);
	})

	return cardElement;
}

// Функция перебора массива с фотокарточками
function renderInitialCards(initialCards) {
	initialCards.forEach((item) => {
		elementList.append(createCard(item.link, item.name));
	})
}
renderInitialCards(initialCards);




// Открытие popup
function openPopup(popup) {
	popup.classList.add('popup_open');

	// добавляем обработчики закрытия по Escape и клику на overlay
	//document.addEventListener('keydown', handleHotkey);
	document.addEventListener('click', overlayClick);
}

// Закрытие popup
function closePopup(popup) {
	popup.classList.remove('popup_open');

	// удаляем обработчики закрытия по Escape и клику на overlay
	//document.removeEventListener('keydown', handleHotkey);
	document.removeEventListener('click', overlayClick);
}

// Открытие popup по клику на редактировать профиль или добавить фотокарточку
editProfile.addEventListener('click', function() {
	popupProfileNameInput.value = userName.textContent;
	popupProfileJobInput.value = userJob.textContent;
	popupProfileNameInput.dispatchEvent(new Event('input', {bubbles:true}));
	popupProfileJobInput.dispatchEvent(new Event('input', {bubbles:true}));

	openPopup(popupProfile);
})

addButton.addEventListener('click', () => openPopup(popupAddPhoto));

// Закрытие popup по клику
closeButtonProfile.addEventListener('click', () => closePopup(popupProfile));
closeButtonPhoto.addEventListener('click', () => closePopup(popupAddPhoto));
popupButtonView.addEventListener('click', () => closePopup(popupView));

// Закрытие popup по Escape
const popups = Array.from(document.querySelectorAll('.popup'));
document.addEventListener('keydown',  (evt) => {
		if (evt.key === "Escape") {
			popups.forEach(
				(p) => {closePopup(p);}
			);
		}	 
});

// Закрытие popup по overlay
function overlayClick(evt) {
	const activePopup = document.querySelector('.popup_open');
	
	if (activePopup && evt.target === activePopup ) {
	  closePopup(activePopup);
	}
}

// Функция формы для изменения профиля
function handlerРrofileSubmit(evt) {
	evt.preventDefault();
  
	userName.textContent = popupProfileNameInput.value;
	userJob.textContent = popupProfileJobInput.value;
  
	closePopup(popupProfile);
  
	profileForm.reset();
}
profileForm.addEventListener('submit', handlerРrofileSubmit);

// Функция добавления новой фотокарточки
function handlerNewCardSubmit(evt) {
	evt.preventDefault();

	elementList.prepend(createCard(popupProfileLinkInput.value, popupProfileTitleInput.value));

	closePopup(popupAddPhoto);
	photoForm.reset();

	const saveButton = photoForm.querySelector('.popup__save-button');
	saveButton.classList.add('popup__save-button_disabled');

}
photoForm.addEventListener('submit', handlerNewCardSubmit);

