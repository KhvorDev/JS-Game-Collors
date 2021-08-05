const words = { 'Красный': 'red', 'Синий': 'blue', 'Зелёный': 'green', 'Черный': 'black', };
const colors = ['red', 'green', 'blue', 'black'];
const leftCard = document.querySelector('.left');
const rightCard = document.querySelector('.right');
const leftWord = document.querySelector('.left-word');
const rightWord = document.querySelector('.right-word');
const buttonNo = document.querySelector('.no');
const buttonYes = document.querySelector('.yes');
const iconCheck = document.querySelector('.check');
const iconCross = document.querySelector('.cross');
const time = document.querySelector('.time');
const lvlCount = document.querySelector('.lvl');
const gamePoint = document.querySelector('.points');
const bonusCount = document.querySelector('.bonus-count');
const bonusBoxs = document.querySelectorAll('.bonus-level');
const rightWordCard = document.querySelector('.right-word');
const leftWordCard = document.querySelector('.left-word');

// Очки бонусов
let bonusPoint = 0;
// Номер уровня
let lvlNumber = 1;

// Получаем случайный цвет для слов в карточках
function createRandomIndexColor() {
    min = 0;
    max = 3;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Получаем случайное слово
function createRandomKeyWord() {
    let keys = Object.keys(words);
    let randomIndex = Math.floor(Math.random() * (keys.length - 0)) + 0;
    let randomWord = keys[randomIndex]
    return randomWord;
}

// Изменяем левую карту
function changeLeftCard() {
    leftCard.classList.add('switch-card');
    for (let key in words) {
        if (key == createRandomKeyWord()) {
            leftWord.textContent = key
        }
    }
    leftWord.style.color = colors[createRandomIndexColor()]
}

// Изменяем правую карту
function changeRightCard() {
    rightCard.classList.add('switch-card');

    for (let key in words) {
        if (key == createRandomKeyWord()) {
            rightWord.textContent = key
        }
    }
    rightWord.style.color = colors[createRandomIndexColor()]
}

// Проверяем ответ игрока и меняем карты
function checkTheAnswear(event) {
    let answear = '';
    let point = 0;
    console.log(point);

    if (rightWord.style.color == words[leftWord.textContent]) {
        answear = true;
    }
    else {
        answear = false;
    }
    // Удаляем классы active в конце анимации
    function removeActiveClass() {
        iconCheck.classList.remove('icon-active');
        iconCross.classList.remove('icon-active');
        rightCard.classList.remove('switch-card');
        leftCard.classList.remove('switch-card');

    }
    setTimeout(removeActiveClass, 500)
    // проверяем совпадает ли правильный ответ с нажатой кнопкой
    if (event.target.textContent == 'да' && answear == true || event.target.textContent == 'нет' && answear == false) {
        iconCheck.classList.add('icon-active');
        point++
        bonusPoint++
        lvlNumber++
    }
    else {
        iconCross.classList.add('icon-active');
        bonusPoint = 0;
        lvlNumber++
    }
    console.log(point);
    lvlCount.textContent = `${lvlNumber}-${lvlNumber + 1}`
    // бонусная система
    bonusLvl(bonusPoint, point)

    changeLeftCard()
    changeRightCard()
}


// Таймер игры
function timeCount() {
    let minutes = 0;
    let second = 0;

    setInterval(function () {
        time.textContent = `${minutes}:${second}`
        if (second == 59) {
            minutes++
        }
        if (second == 59) {
            second = 0;
        }
        second++
    }, 1000)
}
timeCount()

// Общее число очков игрока
let setPoint = 0;
// Бонусная система
function bonusLvl(bonusPoint, point) {
    let bonusIndex = 0;
    if (bonusPoint < 4) {
        for (item of bonusBoxs) {
            item.classList.remove('bonus-level-active');
        }
        bonusIndex = 1;
    }
    else if (bonusPoint = 4 && bonusPoint < 8) {
        bonusIndex = 2;
    }
    else if (bonusPoint = 8 && bonusPoint < 12) {
        bonusIndex = 3;
    }
    else if (bonusPoint = 12 && bonusPoint < 16) {
        bonusIndex = 4;
    }
    else if (bonusPoint = 16 && bonusPoint < 20) {
        bonusIndex = 5;
    }
    else if (bonusPoint > 20) {
        bonusIndex = 6;
    }
    console.log(bonusIndex);

    switch (bonusIndex) {
        case 1:
            bonusCount.textContent = 'x1'
            point = point;
            break;
        case 2:
            bonusBoxs[0].classList.add('bonus-level-active');
            bonusCount.textContent = 'x2'
            point = point * 2;
            break;
        case 3:
            bonusBoxs[1].classList.add('bonus-level-active');
            bonusCount.textContent = 'x3'
            point = point * 3;
            break;
        case 4:
            bonusBoxs[2].classList.add('bonus-level-active');
            bonusCount.textContent = 'x4'
            point = point * 4;
            break;
        case 5:
            bonusBoxs[3].classList.add('bonus-level-active');
            bonusCount.textContent = 'x5'
            point = point * 5;
            break;
        case 6:
            bonusBoxs[4].classList.add('bonus-level-active');
            bonusCount.textContent = 'x6'
            point = point * 6;
            break;
    }

    setPoint = setPoint + point
    gamePoint.textContent = setPoint;
}


buttonNo.onclick = checkTheAnswear;
buttonYes.onclick = checkTheAnswear;

