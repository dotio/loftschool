// import { resolve } from "url";

/* ДЗ 6 - Асинхронность и работа с сетью */

/*
 Задание 1:

 Функция должна возвращать Promise, который должен быть разрешен через указанное количество секунду

 Пример:
   delayPromise(3) // вернет promise, который будет разрешен через 3 секунды
 */
function delayPromise(seconds) {

    seconds = 1000;

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, seconds);
    });
}

/*
 Задание 2:

 2.1: Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json

 2.2: Элементы полученного массива должны быть отсортированы по имени города

 Пример:
   loadAndSortTowns().then(towns => console.log(towns)) // должна вывести в консоль отсортированный массив городов
 */
function loadAndSortTowns() {
    return new Promise(function(resolve) {

        const xhr = new XMLHttpRequest();

        xhr.open('GET', 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json');
        xhr.send();
        xhr.addEventListener('load', function() {

            let cities = [];

            cities = JSON.parse(xhr.response);
            
            cities = cities.sort(function (x, y) {
                if (x.name > y.name) {
                    return 1;
                }
                if (x.name < y.name) {
                    return -1;
                }

                return 0;
            });

            resolve(cities);
        });
    })

}

export {
    delayPromise,
    loadAndSortTowns
};
