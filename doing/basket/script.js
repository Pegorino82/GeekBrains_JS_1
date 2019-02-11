'use strict';


/**
 * @property {object} settings Настройки корзины товаров.
 * @property {{price: number, name: string}[]} goods Список товаров что купил пользователь.
 * @property {HTMLElement} basketCountEl Место для показа количества товаров.
 * @property {HTMLElement} basketPriceEl Место для показа цены всех товаров.
 */
const basket = {
    settings: {
        countSelector: '#basket-count',
        priceSelector: '#basket-price',
        goodsBlock: '#container',
    },
    goods: [],
    countEl: null,
    priceEl: null,

    /**
     * Инициализирует переменные для корзины и показывает эти значения.
     */
    init(settings = {}) {
        // console.log('init!');
        Object.assign(this.settings, settings);
        this.countEl = document.querySelector(this.settings.countSelector);
        this.priceEl = document.querySelector(this.settings.priceSelector);
        document
            .querySelector(this.settings.goodsBlock)
            .addEventListener('click', event => this.clickHandler(event));
        this.render();
    },


    /**
     * обрабатывает нажатия на кнопки - купить или удалить товар
     * @param event событие (клик внутри блока с продуктами)
     */
    clickHandler(event) {
        // console.log(event.target.className);
        if (event.target.className === 'buy-btn') {
            this.add(event.target.dataset.name, event.target.dataset.price);
        } else if (event.target.className === 'rem-btn') {
            this.remove(event.target.dataset.name)
        }
    },

    /**
     * Отображает количество всех товаров и их цену.
     */
    render() {
        this.priceEl.innerText = this.getGoodsPrice();
        this.countEl.innerText = this.goods.length;
    },

    /**
     * Считает и возвращает цену всех купленных товаров из массива this.goods.
     * @returns {number} Цену всех купленных товаров.
     */
    getGoodsPrice() {
        return this.goods.reduce(function (accumulator, currentValue) {
            return accumulator + +currentValue.price;
        }, 0)
    },

    /**
     * Добавляет купленный товар в массив купленных товаров и отображает количество и цену всех товаров.
     * @param goodName Название товара.
     * @param goodPrice Цена товара.
     */
    add(goodName, goodPrice) {
        this.goods.push({name: goodName, price: goodPrice});
        this.render();
    },

    /**
     * Удаляет товар из корзины
     * @param goodName Название товара
     */
    remove(goodName) {
        let el = this.goods.find((element) => {
            if (element.name === goodName) {
                return element
            }
        });
        if (el) {
            this.goods.splice(this.goods.indexOf(el), 1);
        }
        this.render();
    }
};
