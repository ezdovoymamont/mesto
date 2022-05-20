export default class Section {
    constructor({items, renderer}, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._element = document.querySelector(containerSelector);
    }

    renderItems() {
        this._items.forEach(item => {
            this._renderer(item);
        });
    }

    addNewItemStart(item) {
        this._element.prepend(item);
    }

    addNewItemEnd(item) {
        this._element.append(item);
    }
}