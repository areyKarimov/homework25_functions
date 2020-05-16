const INPUT = document.querySelectorAll('.task__value');
const BTN = document.querySelectorAll('.task__trigger');
const ANSWERAREA = document.querySelectorAll('.task__answer');




const VALIDATOR = (value) => {
    return !isNaN(+value) && value.length > 0 ? true : false;
}

const task1 = (value1, value2) => {
    if (VALIDATOR(value1) && VALIDATOR(value2)){
        if (value1 < value2) {
            return [...ANSWERAREA][0].innerHTML = "-1";
        } else if (value1 === value2){
            return [...ANSWERAREA][0].innerHTML = "0";
        } else{
            return [...ANSWERAREA][0].innerHTML = "1";
        }
    } else{
        alert('Введите пожалуйста числа');
    } 
}

const task2 = (value) => {
    if (VALIDATOR(value)){
        let fract = (num) => {
            if (num < 2) {
                return num;
            };
            return num * fract(num - 1);
        }
        return [...ANSWERAREA][1].innerHTML = "Фрактал от Вашего числа = " + fract(value);
    } else{
        alert('Введите пожалуйста числа');
    } 
}

const task3 = (...arr) => {
    if (arr.some(el => !el)){
        return alert('Введите числа');
    }
    return [...ANSWERAREA][2].innerHTML = "Ваше число - " + arr.join('');
}

const task4 = (value1, value2) => {
    if (value1 <= 0 || value2 <= 0) {
        return (value1 > value2) ? ([...ANSWERAREA][3].innerHTML = "Площадь фигуры = " + value1 ** 2) : ([...ANSWERAREA][3].innerHTML = "Площадь фигуры = " + value2 ** 2);
    }
    return [...ANSWERAREA][3].innerHTML = "Площадь фигуры = " + (value1 * value2);
}


let perfectDivisor = (number) => {
    let res = [];
    let i = Math.round(number / 2)
    for (i ; i > 0; i--) {
        if (number % i === 0){
            res.push(i);
        }
    }
    const sumOfDivisors = (arr) =>{
        return arr.reduce((acc, divisor) => acc += divisor);
    }
    if (sumOfDivisors(res) == number) {
        return true;
    }
    return false;
}


const task5 = (value) => {
    if (VALIDATOR(value)){
        if(value == 1) {
            return [...ANSWERAREA][4].innerHTML = "Число не совершенно...";
        }
        console.log(perfectDivisor(value))
        if (perfectDivisor(value)){
            return [...ANSWERAREA][4].innerHTML = "Число совершенно!";
        }
         return [...ANSWERAREA][4].innerHTML = "Число не совершенно...";
    } else{
        return alert('Введите пожалуйста числа');
    } 
}

const task6 = (value1, value2) => {
    if (VALIDATOR(value1) && VALIDATOR(value2)){
        const perfectNumbs = (num1, num2) =>{
            let res = [];
            let min;
            let max;
            if (num1 > num2) {
                min = num2;
                max = num1;
            } else{
                min = num1;
                max = num2;
            }
            for (let i = max; i > min; i--){
                if (perfectDivisor(i)){
                    res.push(i);
                };
            };
            return res;
        } 
        return [...ANSWERAREA][5].innerHTML = "Совершенные числа в указаном диапазоне -" + perfectNumbs(value1, value2).join(', ');
    } else{
        alert('Введите пожалуйста числа');
    } 
}


const checkTime = (hour, min, sec) => {
    if (hour.length !== 2 || +hour >= 0) {
        return false;
    }
    if (min.length !== 2 || +min > 60) {
        return false;
    }
    if (sec.length !== 2 || +sec > 60) {
        return false;
    }
    return true;
}

const timeInSec = (hour, min, sec) => {
    return +hour * 3600 + +min * 60 + +sec;
}

const secInTime = (sec, arr = []) => {
    const isLenghtAbouTwo = (num) => {
        if (String(num).length < 2) {
            arr.unshift(String('0' + String(+num)));
        } else{
            arr.unshift((String(+num)));
        }
    }
    if (arr.length < 2){
        if (sec < 60){
            isLenghtAbouTwo(sec);
            return secInTime(Math.floor(sec / 60), arr);    
        }
        isLenghtAbouTwo(sec % 60);
        return secInTime(Math.floor(sec / 60), arr);
    }
    isLenghtAbouTwo(sec);
    return arr.join(':');
}


const task7 = (value1 = '00', value2 = '00', value3 = '00') => {
    if (!checkTime(value1, value2, value3)){
        return [...ANSWERAREA][6].innerHTML = 'Ведите коректно дату (часы : 00-бесконечно; минуты : 00-60; секунды : 00-60)';
    }
    return [...ANSWERAREA][6].innerHTML = `${value1}:${value2}:${value3}`;
}

const task8 = (value1 = '00', value2 = '00', value3 = '00') => {
    if (!checkTime(value1, value2, value3)){
        return [...ANSWERAREA][7].innerHTML = 'Ведите коректно дату (часы : 00-бесконечно; минуты : 00-60; секунды : 00-60)';
    }
    return [...ANSWERAREA][7].innerHTML ='Количество секунд равно = ' + timeInSec(value1, value2, value3);
}

const task9 = (value) => {
    if (VALIDATOR(value)){
        return [...ANSWERAREA][8].innerHTML ='Ваше время - ' + secInTime(value);
    } else{
        return alert('Введите пожалуйста число');
    }  
}

const task10 = (value1, value2) => {
    const regexForTime = /^[0-9]{2,}[: /.][0-5]{1}[0-9]{1}[: /.][0-5]{1,1}[0-9]{1,1}/;
    if (!value1.match(regexForTime) || !value2.match(regexForTime)) {
        return [...ANSWERAREA][9].innerHTML = 'Проверьте правильность введения дат';
    }
    let time1 = value1.match(regexForTime)[0];
    let time2 = value2.match(regexForTime)[0];
    let sec1 = timeInSec(...time1.split(':'));
    let sec2 = timeInSec(...time2.split(':'));
    if (sec1 > sec2) {
        return [...ANSWERAREA][9].innerHTML = 'Разница дат - ' + secInTime(sec1 - sec2);
    } else {
        return [...ANSWERAREA][9].innerHTML = 'Разница дат - ' + secInTime(sec2 - sec1);
    }
    
}


window.document.addEventListener('click', event => {
    switch (event.target) {
        case [...BTN][0]: 
            task1([...INPUT][0].value, [...INPUT][1].value);
            break;
        case [...BTN][1]: 
            task2([...INPUT][2].value);
            break;
        case [...BTN][2]: 
            task3([...INPUT][3].value, [...INPUT][4].value, [...INPUT][5].value);
            break;
        case [...BTN][3]: 
            task4([...INPUT][6].value, [...INPUT][7].value);
            break;
        case [...BTN][4]: 
            task5([...INPUT][8].value);
            break;
        case [...BTN][5]: 
            task6([...INPUT][9].value, [...INPUT][10].value);
            break;
        case [...BTN][6]: 
            task7([...INPUT][11].value, [...INPUT][12].value, [...INPUT][13].value);
            break;
        case [...BTN][7]: 
            task8([...INPUT][14].value, [...INPUT][15].value, [...INPUT][16].value);
            break;
        case [...BTN][8]: 
            task9([...INPUT][17].value);
            break;
        case [...BTN][9]: 
            task10([...INPUT][18].value, [...INPUT][19].value);
            break;
    }
});