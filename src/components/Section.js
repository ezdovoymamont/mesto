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

    addNewItem(item) {
        this._element.prepend(item);
    }

    addItem(item) {
        this._element.append(item);
    }
}