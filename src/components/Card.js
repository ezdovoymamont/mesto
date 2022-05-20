export default class Card {
    
    constructor(cardPhoto, cardName, cardTemplate, handleCardClick) {
        this._cardPhoto = cardPhoto;
	    this._cardName = cardName;
        this._cardTemplate = cardTemplate;
        this._handleCardClick= handleCardClick;
        this._cardElement = this._getTemplate();
    }

    _getTemplate() {
        return document
            .querySelector(this._cardTemplate)
            .content
            .querySelector('.element')
            .cloneNode(true);
    }

    _likeClicked() {
        this.classList.toggle('element__like_active');
    }

    _trashClicked() {
        this._cardElement.remove();
        this._cardElement = null;
    }

    _openClicked() {
        this._handleCardClick( this._cardPhoto,  this._cardName);
    }

    createCard() {
        const cardElementPhoto = this._cardElement.querySelector('.element__photo');
      
        cardElementPhoto.src = this._cardPhoto;
        cardElementPhoto.alt = this._cardName;
        this._cardElement.querySelector('.element__title').textContent = this._cardName;
      
        // Лайк фотокарточки 
        this._cardElement.querySelector('.element__like').addEventListener('click', this._likeClicked);
      
        // Удаление фотокарточки 
        this._cardElement.querySelector('.element__trash').addEventListener('click', () => this._trashClicked());
      
        // Открытие фотокарточки в popup окне
        cardElementPhoto.addEventListener('click', () => this._openClicked());
    
        return this._cardElement;
    } 
}
