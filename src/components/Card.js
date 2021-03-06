export default class Card {

    constructor(cardPhoto, cardName, cardId, cardLikes, cardOwner, cardTemplate, handleCardClick, deleteUserCard, likeUserClicked) {
        this._cardPhoto = cardPhoto;
        this._cardName = cardName;
        this._cardId = cardId;
        this._cardLikes = cardLikes;
        this._cardOwner = cardOwner;
        this._cardTemplate = cardTemplate;
        this._handleCardClick = handleCardClick;
        this._deleteUserCard = deleteUserCard;
        this._likeUserClicked = likeUserClicked;
        this._cardElement = this._getTemplate();
        this._likeButton = this._cardElement.querySelector('.element__like');
        this._likePhoto = this._cardElement.querySelector('.element__like-count');

    }

    _getTemplate() {
        return document
            .querySelector(this._cardTemplate)
            .content
            .querySelector('.element')
            .cloneNode(true);
    }

    _likeClicked() {
        this._likeUserClicked(this._cardId, this._isLicked)
            .then((card) => {
                this._likeButton.classList.toggle('element__like_active');
                this._likePhoto.textContent = card.likes.length;
                this._isLicked = !this._isLicked;
            });

    }

    _trashClicked() {
        this._deleteUserCard(this);
    }

    remove() {
        this._cardElement.remove();
        this._cardElement = null;
    }

    getCardId() {
        return this._cardId;
    }


    _openClicked() {
        this._handleCardClick(this._cardPhoto, this._cardName);
    }

    setCurrentUserId(userId) {
        this._isLicked = this._cardLikes.some((z) => z._id === userId);
        if (this._isLicked) {
            this._likeButton.classList.add('element__like_active');
        }
    }

    createCard(userId) {
        const cardElementPhoto = this._cardElement.querySelector('.element__photo');

        cardElementPhoto.src = this._cardPhoto;
        cardElementPhoto.alt = this._cardName;
        this._likePhoto.textContent = this._cardLikes.length;
        this._cardElement.querySelector('.element__title').textContent = this._cardName;

        // ???????? ???????????????????????? 
        this._likeButton.addEventListener('click', () => this._likeClicked());

        // ???????????????? ????????????????????????
        if (this._cardOwner._id !== userId) {
            this._cardElement.querySelector('.element__trash').remove();
        } else {
            this._cardElement.querySelector('.element__trash').addEventListener('click', () => this._trashClicked());
        }


        // ???????????????? ???????????????????????? ?? popup ????????
        cardElementPhoto.addEventListener('click', () => this._openClicked());

        return this._cardElement;
    }
}
