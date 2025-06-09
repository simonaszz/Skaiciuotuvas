let firstNumber = 0;
let secondNumber = 0;
let action = '+';
let answer = 0;

let input = document.getElementById('calc-input');
let calculationSpan = document.getElementById('calculation');

let history = [];

function onNumberClick(number) {
    let parts = input.value.trim().split(' ');
    let lastPart = parts[parts.length - 1];

  
    if ((lastPart === '0' || lastPart === '')  && number !== '.') {
       
        if (lastPart === '0') {
         
            input.value = input.value.slice(0, -1) + number;

            return;
        } else if (lastPart === '') {
            input.value += number;
            return;
        }
    }

    input.value += number;
}


function onActionClick(clickedAction) {
    if (input.value === '' || input.value.endsWith(' ')) return;
    input.value += ' ' + clickedAction + ' ';
    action = clickedAction;
}

function onCountClick() {
    let splitted = input.value.trim().split(' ');

    if (splitted.length < 3) {
        alert("Trūksta duomenų.");
        return;
    }

    firstNumber = parseFloat(splitted[0]);
    action = splitted[1];
    secondNumber = parseFloat(splitted[2]);

    if (isNaN(firstNumber) || isNaN(secondNumber)) {
        alert("Neteisingi skaičiai.");
        return;
    }

    calculateAnswer();
    input.value = answer;
    calculationSpan.innerText = `${firstNumber} ${action} ${secondNumber}`;
    addToHistory();
}

function calculateAnswer() {
    switch (action) {
        case '+': answer = firstNumber + secondNumber; break;
        case '-': answer = firstNumber - secondNumber; break;
        case 'x': answer = firstNumber * secondNumber; break;
        case '/':
            answer = secondNumber !== 0 ? (firstNumber / secondNumber) : 'Dalyba iš 0';
            break;
    }
}

function onCleanClick() {
    firstNumber = 0;
    secondNumber = 0;
    action = '+';
    answer = 0;
    input.value = '';
    calculationSpan.innerText = '0';
}

function addToHistory() {
    if (typeof answer !== 'number')

        return;
    let historyItem = {
        firstNumber,
        action,
        secondNumber,
        answer
    };
    history.push(historyItem);
}

document.getElementById('show-history').onclick = function () {
    let formatted = history.map(x => `<p>${x.firstNumber} ${x.action} ${x.secondNumber} = ${x.answer}</p>`);
    let historyBlock = document.querySelector('.calculator .history-items');
    historyBlock.innerHTML = formatted.join('');
};