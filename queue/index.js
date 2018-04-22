// ALSO TESTING
class Queue {
    /**
     * Создает очередь, опционально принимая элементы для добавления
     * @param {...*} [items] Добавляемые элементы
     */
    constructor(...item) {
        this.items = item;
      }

    /**
     * Возвращает количество элементов в очереди
     * @returns {number}
     */
    get size() {
        return this.items.length;
      }
    /**
     * Возвращает `true` если очередь пустая, в противном случае возвращает `false`
     * @returns {boolean}
     */
    get isEmpty() {
        return this.items.length>0 ? false : true;
      }

    /**
     * Возвращает первый элемент в очереди
     * @returns {*}
     */
    get front() {
        return this.items[0];
      }

    /**
     * Возвращает последний элемент в очереди
     * @returns {*}
     */
    get back() {
        return this.items[this.items.length-1];
      }

    /**
     * Добавляет элемент в очередь
     * @param {*} item 
     */
    enqueue(item) {
        this.items.push(item);
      }

    /**
     * Удаляет первый элемент из очереди и возвращает его
     * @returns {*}
     */
    dequeue() {
        this.items.splice(this.items.length-1,1);
      }
}

module.exports = Queue;