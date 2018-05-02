export default class Tab {
    /**
     * Создает вкладку.
     * @param {{ element: HTMLElement, onActivate: Function }} args
     */ 
    constructor( {element, onActivate = () => {}  } ) {
            this._active = false;
            this._element = element;
            this._onActivate = onActivate;

            this.init();
    }

    /**
     * Инициализирует объект.
     * Устанавливает свойство акивности вкладки.
     * Устанавливает обработчик для обработки нажатия на элемент.
     * @private
     */
    init() {
        this._active = this._element.classList.contains('active');
        this._element.addEventListener('click', this.handleClick.bind(this));
    }

    /**
     * Возвращает HTML элемент.
     * @returns {HTMLElement}
     */
    get element() { 
        return this._element;
     }

    /**
     * Возвращает ID вкладки.
     * ID вкладки берется из атрибута `hash` у элемента (`#panel-1` => `panel-1`)
     * @returns {string}
     */
    get id() {
        return this._element.hash.slice(1);
      }

    /**
     * `get` - Возвращает `true` или `false` в зависимости от того активна вкладка или нет.
     * 
     * `set` - Устанавливает активность вкладки, добавляя или удаляя соответствующий класс
     * @returns {boolean}
     */
    get isActive() { 
        return this._active
     }
    set isActive(value) {
        this._active = value;
        this._element.classList.toggle('active', value);
    }
    /**
     * Вызывается при нажатии на вкладку.
     * 
     * Устанавливает активность вкладки.
     * Вызывает функцию обратно вызова, отправляя туда ссылку на текущий объект, т.е. саму вкладку.
     * @private
     * @param {Event} event 
     */
    handleClick(event) {
        event.preventDefault();
        this.isActive = true;
        this._onActivate(this);

    }
}