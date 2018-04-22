class Set {
    /**
     * Создает сет, опционально принимая элементы для добавления
     * @param {...*} [items] Добавляемые элементы
     */
    constructor(...items) {
        this.store = {};
        this.key = 0;
    
        for (let i =0; i<items.length; i++) {     //фильтрация входящего массива. Остаются только уникальные
         let index = items.indexOf(items[i],i+1);
          if (index>-1) {
            items.splice(index,1);
            i--;
          }
        }
    
        items.forEach( item => {
            this.store[this.key] = item;
            this.key++;
        });
      }

    /**
     * Возвращает количество элементов в сете
     * @returns {number}
     */
    get size() {
        let length = 0;
        for (let key in this.store) {
          length++;
        }
        return length;
      }

    /**
     * Возвращает массив элементов сета
     * @returns {Array}
     */
    get values() {
        let items = [];
        
        for (let key in this.store) {
          items.push( this.store[key]);
        }
        return items;
      }

    /**
     * Добавляет элемент в сет
     * @param {*} item
     */
    add(item) {
        if (!this.has(item)) {
          this.key++;
          this.store[this.key] = item;
        }
        return this;
      }

    /**
     * Проверяет наличие элемента в сете
     * @param {*} item
     * @returns {boolean}
     */
    has(item) {
        for (let key in this.store) {
          if (this.store[key] == item) {
            return true
          }
        }
          return false
      }

    /**
     * Удаляет элемент из сета и возвращает `true` если элемент удален и `false` если нет
     * @param {*} item
     * @returns {boolean}
     */
    remove(item) {
        for (let key in this.store) {
          if (this.store[key] == item) {
            delete this.store[key];
            return true
          }
        }
        return false
      }

    /**
     * Удаляет все элементы в сете
     */
    clear() {
        this.store = {};
        this.key = 0;
      }

    /**
     * Возращает сет состоящий из элементов двух сетов
     * @param {Set} set
     * @returns {Set}
     */
    union(set) {
        let setStore = set.store;
        let newSet = new Set(...this.values); 
        
        for (let key in setStore) {
          if (!newSet.has(setStore[key])) {
              newSet.add(setStore[key]);
          }
        }
        return newSet;
      }

    /**
     * Возращает сет состоящий из элементов которые присутствуют в обоих сетах
     * @param {Set} set
     * @returns {Set}
     */
    intersection(set) {
        let setStore = set.store;
        let newSet = new Set();
    
        for (let key in setStore) {
          if (this.has(setStore[key])) {
            newSet.add(setStore[key]); 
          }
        }
        return newSet
      }

    /**
     * Возращает сет состоящий из элементов присутствующих в первом сете, и отсутствующих во втором
     * @param {Set} set
     * @returns {Set}
     */
    difference(set) {
        let store = this.store;
        let newSet = new Set();
    
        for (let key in store) {
          if ( !set.has(store[key]) ) {
            newSet.add(store[key])
          }
        }
        return newSet
      }

    /**
     * Возвращает `true` если сет содержит в себе все элементы из друого сета
     * @param {Set} set
     * @returns {boolean}
     */
    isSubset(set) {
        var setStore = set.store;
        for (let key in setStore) {
         if ( !this.has(setStore[key]) ) {
           return false;
         }
        }
        return true
      }
}

module.exports = Set;