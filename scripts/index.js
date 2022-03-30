const editProfile = document.querySelector('.edit-profile');
const userName = document.querySelector('.profile__name');
const userJob = document.querySelector('.profile__job');
const popupProfile = document.querySelector('.popup_type_profile')
const popupProfileNameInput = popupProfile.querySelector('.popup__input_type_name');
const popupProfileJobInput = popupProfile.querySelector('.popup__input_type_job');
const closeButtonProfile = popupProfile.querySelector('.popup__close-button');
const profileForm = popupProfile.querySelector('.popup__form_type_profile');

const addButton = document.querySelector('.add-button');
const popupAddPhoto = document.querySelector('.popup_type_photo')
const popupProfileTitleInput = popupAddPhoto.querySelector('.popup__input_type_title');
const popupProfileLinkInput = popupAddPhoto.querySelector('.popup__input_type_link');
const closeButtonPhoto = popupAddPhoto.querySelector('.popup__close-button');
const photoForm = popupAddPhoto.querySelector('.popup__form_type_photo');

const popupView = document.querySelector('.popup_view-photo');
const popupButtonView = popupView.querySelector('.popup__close-button');
const popupViewPhoto = popupView.querySelector('.popup__photo');
const popupViewDesc = popupView.querySelector('.popup__description');

const elementList = document.querySelector('.elements__list');

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

	// Cоздаем новые фотокарточки 
function createCard(cardPhoto, cardName) {
	const cardTemplate = document.querySelector('#card-template').content;
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
}

// Закрытие popup
function closePopup(popup) {
	popup.classList.remove('popup_open');
}

// Открытие popup по клику на редактировать профиль или добавить фотокарточку
editProfile.addEventListener('click', function() {
	popupProfileNameInput.value = userName.textContent;
	popupProfileJobInput.value = userJob.textContent;

	openPopup(popupProfile);
})

addButton.addEventListener('click', () => openPopup(popupAddPhoto));

// Закрытие popup по клику
closeButtonProfile.addEventListener('click', () => closePopup(popupProfile));
closeButtonPhoto.addEventListener('click', () => closePopup(popupAddPhoto));
popupButtonView.addEventListener('click', () => closePopup(popupView));

// Функция формы для изменения профиля
function formSubmitHandler(evt) {
	evt.preventDefault();
  
	userName.textContent = popupProfileNameInput.value;
	userJob.textContent = popupProfileJobInput.value;
  
	closePopup(popupProfile);
  
	profileForm.reset();
}
profileForm.addEventListener('submit', formSubmitHandler);

// Функция добавления новой фотокарточки
function handleNewCardSubmit(evt) {
	evt.preventDefault();

	elementList.prepend(createCard(popupProfileLinkInput.value, popupProfileTitleInput.value));

	closePopup(popupAddPhoto);
	photoForm.reset();
}
photoForm.addEventListener('submit', handleNewCardSubmit);

