/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

// filter function
function isMatching(full, chunk) {
    if (full.toLowerCase().indexOf(chunk.toLowerCase()) != -1) {
        return true;
    }

    return false;
}

// get cookies to object
function getCookie() {
    let cookie = document.cookie.split('; ').reduce((prev, current) => {
        const [name, value] = current.split('=');

        prev[name]=value;

        return prev;
    }, {});

    return cookie;
}

// create table and btn delete
function createTable(cookieName, cookieValue) {
    let row = document.createElement('TR');

    row.className='row';
    row.innerHTML = `
                    <td>${cookieName}</td>
                    <td>${cookieValue}</td>
                    <td><button>Удалить</button></td>
                    `;

    // listTable.addEventListener('click', (e) => {
    //     if (e.target.innerText === 'Удалить') {
    //         deleteCookie ();
    //         //document.cookie = `${cookieName}=${cookieValue}; expires= ${new Date(-1)}`;
    //         filteredCookie()
    //     }

    // });                

    listTable.appendChild(row);

}

function deleteCookie (cookieName, cookieValue) {
    let cookieDate = new Date ( );

    cookieDate.setTime ( cookieDate.getTime() - 1 );
    document.cookie = cookieName += '=; expires=' + cookieDate.toGMTString();
    document.cookie = cookieValue += '=; expires=' + cookieDate.toGMTString();
}

// filtered cookie
function filteredCookie() {
    let cookie = getCookie();

    // if have value
    if (filterNameInput.value) {
        listTable.innerHTML = '';
        if (cookie) {
            Object.keys(cookie).forEach(item => {
                if (isMatching(cookie[item], filterNameInput.value) || isMatching(item, filterNameInput.value)) {
                    createTable(item, cookie[item]);
                }
            });
        }

    }
    // if value empty
    if (filterNameInput.value == '') {
        listTable.innerHTML='';
        if (cookie) {
            Object.keys(cookie).forEach(item => {
                createTable(item, cookie[item]);
            });
        }
    }
}

filterNameInput.addEventListener('keyup', function() {
// здесь можно обработать нажатия на клавиши внутри текстового поля для фильтрации cookie
    filteredCookie();

});

addButton.addEventListener('click', () => {
// здесь можно обработать нажатие на кнопку "добавить cookie"
    let cookie = getCookie();

    if (cookie[addNameInput.value]) {
        deleteCookie(addNameInput.value);
    }

    document.cookie = `${addNameInput.value} = ${addValueInput.value}`;
    filteredCookie();
});

