class Stack {
    /**
     * Создает стопку, опционально принимая элементы для добавления
     * @param {...*} [items] Добавляемые элементы
     */
    constructor(...item) {
        this.items = item;
      }

    /**
     * Возвращает количество элементов в стопке
     * @returns {number}
     */
    get size() {
        return this.items.length;
      }

    /**
     * Возвращает `true` если стопка пустая, и `false` если стопка не пустая
     * @returns {boolean}
     */
    get isEmpty() {
        return this.items.length>0 ? false : true;
      }

    /**
     * Добавляет элемент в стопку
     * @param {*} item
     */
    push(item) {
        this.items.push(item);
      }

    /**
     * Удаляет элемент из стопки и возвращает его
     * @returns {*}
     */
    pop() {
        return this.items.pop();
       }

    /**
     * Возвращает последний элемент в стопке не удаляя его
     * @returns {*}
     */
    peek() {
        return this.items[this.items.length-1];
      }
}

module.exports = Stack;