const popupElement = document.querySelector('.popup');
const editProfile = document.querySelector('.edit-profile');
const closeButton = popupElement.querySelector('.popup__close-button');
const saveButton = document.querySelector('.popup__save-button');
const Name = document.querySelector('.profile__name');
const Job = document.querySelector('.profile__job');
const likeButtons = document.querySelectorAll('.element__like');

let nameInput = document.querySelector('.popup__name');
let jobInput = document.querySelector('.popup__job');

function openPopup() {
	popupElement.classList.remove('popup_open');
}

function closePopup() {
	popupElement.classList.add('popup_open');
}

editProfile.addEventListener('click', openPopup)
closeButton.addEventListener('click', closePopup)

let formElement = document.querySelector('.popup__form'); 
nameInput.value = Name.textContent;
jobInput.value = Job.textContent;

function formSubmitHandler (evt) {
	evt.preventDefault(); 

	Name.textContent = nameInput.value;
	Job.textContent = jobInput.value;

	closePopup();
}

formElement.addEventListener('submit', formSubmitHandler); 

function toggleLike () {
	this.classList.toggle('element__like_active');	
}	

for (let i = 0; i < likeButtons.length; i++)
{
	likeButtons[i].addEventListener('click', toggleLike);
}

