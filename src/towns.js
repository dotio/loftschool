/*
 Страница должна предварительно загрузить список городов из
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 и отсортировать в алфавитном порядке.

 При вводе в текстовое поле, под ним должен появляться список тех городов,
 в названии которых, хотя бы частично, есть введенное значение.
 Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.

 Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 После окончания загрузки городов, надпись исчезает и появляется текстовое поле.

 Разметку смотрите в файле towns-content.hbs

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер

 *** Часть со звездочкой ***
 Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 При клике на кнопку, процесс загруки повторяется заново
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 */
function loadTowns() {
    // create promise and request
    return new Promise(function(resolve, reject) {

        const xhr = new XMLHttpRequest();

        xhr.open('GET', 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json');
        xhr.send();
        xhr.addEventListener('load', function() {
            // check status
            if (xhr.readyState !== 4 && xhr.status !== 200) {
                reject();
            } else {

                let cities = JSON.parse(xhr.response);

                // sort cities
                cities = cities.sort(function(x, y) {
                    if (x.name > y.name) {
                        return 1;
                    }
                    if (x.name < y.name) {
                        return -1;
                    }

                    return 0
                });

                resolve(cities);
            }
        });
 
    });
}

/*
 Функция должна проверять встречается ли подстрока chunk в строке full
 Проверка должна происходить без учета регистра символов

 Пример:
   isMatching('Moscow', 'moscow') // true
   isMatching('Moscow', 'mosc') // true
   isMatching('Moscow', 'cow') // true
   isMatching('Moscow', 'SCO') // true
   isMatching('Moscow', 'Moscov') // false
 */
function isMatching(full, chunk) {
    // if element not found recive -1
    if (full.toLowerCase().indexOf(chunk.toLowerCase()) != -1) {
        return true;
    }
        
    return false;
}

/* Блок с надписью "Загрузка" */
const loadingBlock = homeworkContainer.querySelector('#loading-block');
/* Блок с текстовым полем и результатом поиска */
const filterBlock = homeworkContainer.querySelector('#filter-block');
/* Текстовое поле для поиска по городам */
const filterInput = homeworkContainer.querySelector('#filter-input');
/* Блок с результатами поиска */
const filterResult = homeworkContainer.querySelector('#filter-result');

// enter data input
filterInput.addEventListener('keyup', function() {
    // promise cities
    loadTowns()
        .then((citiesPromise) => {
            // clear input
            filterResult.innerText = '';
            // check value
            if (!filterInput.value) {
                return false;
            }
            // array of cities
            let cities = [];
            // create fragment
            let fragment = document.createDocumentFragment();

            // styling blocks
            loadingBlock.style.display = 'none';
            filterBlock.style.display = 'block';

            for (let i = 0; i < citiesPromise.length; i++) {
                if (isMatching(citiesPromise[i].name, filterInput.value)) {
                    cities.push(citiesPromise[i]);
                }
                
            }
            // create li in list
            cities.map(city => {

                let li = document.createElement('li');
      
                li.textContent = city.name;
                fragment.appendChild(li);
            });
      
            filterResult.appendChild(fragment);

        }) 
        // mistake description
        .catch(function () {

            let message = document.createElement('div');

            message.innerText = 'Не удалось загрузить города';
            homeworkContainer.appendChild(message);

            let repeatBtn = document.createElement('button');

            repeatBtn.setAttribute('type', 'submit');
            repeatBtn.innerText = 'Повтор';
            homeworkContainer.appendChild(repeatBtn);

            repeatBtn.addEventListener('click', function() {
                repeatBtn.remove();
                loadTowns();
            });
        });
   
});

export {
    loadTowns,
    isMatching
};
