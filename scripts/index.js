const popupElement = document.querySelector('.popup');
const editProfile = document.querySelector('.edit-profile');
const closeButton = popupElement.querySelector('.popup__close-button');
const saveButton = document.querySelector('.popup__save-button');
const userName = document.querySelector('.profile__name');
const userJob = document.querySelector('.profile__job');
const likeButtons = document.querySelectorAll('.element__like');

const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');

function openPopup() {
	popupElement.classList.toggle('popup_open');

	nameInput.value = userName.textContent;
	jobInput.value = userJob.textContent;
}

function closePopup() {
	popupElement.classList.toggle('popup_open');
}

editProfile.addEventListener('click', openPopup)
closeButton.addEventListener('click', closePopup)

let formElement = document.querySelector('.popup__form'); 


function formSubmitHandler (evt) {
	evt.preventDefault(); 

	userName.textContent = nameInput.value;
	userJob.textContent = jobInput.value;

	closePopup();
}

formElement.addEventListener('submit', formSubmitHandler); 

