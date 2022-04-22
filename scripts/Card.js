export default class Card {
    
    constructor(cardPhoto, cardName, cardTemplate, openPopup) {
        this._cardPhoto = cardPhoto;
	    this._cardName = cardName;
        this._cardTemplate = cardTemplate;
        this._openPopup = openPopup;

    }

    _getTemplate() {
        const cardElement = document
          .querySelector(this._cardTemplate)
          .content
          .querySelector('.element')
          .cloneNode(true);
    
        return cardElement;
    }

    _likeClicked() {
        this.classList.toggle('element__like_active');
    }

    _trashClicked() {
        this.closest('.element').remove();
    }

    _openClicked() {
        popupViewPhoto.src = this._cardPhoto;
        popupViewPhoto.alt = this._cardName;
        popupViewDesc.textContent = this._cardName;

        this._openPopup(popupView);
    }

    createCard() {
        const cardElement = this._getTemplate();
        const cardElementPhoto = cardElement.querySelector('.element__photo');
      
        cardElementPhoto.src = this._cardPhoto;
        cardElementPhoto.alt = this._cardName;
        cardElement.querySelector('.element__title').textContent = this._cardName;
      
        // Лайк фотокарточки 
        cardElement.querySelector('.element__like').addEventListener('click', this._likeClicked);
      
        // Удаление фотокарточки 
        cardElement.querySelector('.element__trash').addEventListener('click',  this._trashClicked);
      
        // Открытие фотокарточки в popup окне
        cardElement.querySelector('.element__photo').addEventListener('click', () => this._openClicked());
    
        return cardElement;
    } 
}
