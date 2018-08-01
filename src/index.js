/* ДЗ 2 - работа с массивами и объеектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
function forEach(array, fn) {
    for (let i = 0; i < array.length; i++) {
        fn(array[i], i, array);
    }
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
function map(array, fn) {
    let arrNew = [];

    for (let i = 0; i < array.length; i++) {
        arrNew.push(fn(array[i], i, array));
    }

    return arrNew;
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */
function reduce(array, fn, initial) {
    let i = 0;
    let result = initial !== undefined ? initial : array[i++];

    for (; i < array.length; i++) {
        result = fn(result, array[i], i, array);
    }

    return result;
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {

    var arr = Object.keys(obj);

    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].toUpperCase();
    }
    
    return arr;

}

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
function slice(array, from, to) {
    var i = from !== undefined ? from : 0;
    var indTo = to !== undefined && to < array.length ? to : array.length;
    var result = [];

    if (i < 0) {
        i = array.length + i
    }

    if (i < 0) {
        i = 0
    }

    if (to < 0) {
        indTo = array.length + to
    }

    if (indTo < i) {
        return []
    }

    for (; i < indTo; i++) {
        result.push(array[i]);
    }

    return result;
}
/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {

    var proxy = new Proxy(obj, {
        set: function(target, prop, value) {
            target[prop] = value * value;

            return true;
        }
    });

    return proxy;
}

export { forEach, map, reduce, upperProps, slice, createProxy };
