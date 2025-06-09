let firstNumber = 0;
let secondNumber = 0;
let action = '+';
let answer = 0;

let input = document.getElementById('calc-input');
let calculationSpan = document.getElementById('calculation');

let history = [];

function onNumberClick(number) {
    // Pakeičiam kablelį į tašką iškart, kad input'e būtų su tašku
    if (number === ',') number = '.';

    let parts = input.value.trim().split(' ');
    let lastPart = parts[parts.length - 1];

    if ((lastPart === '0' || lastPart === '') && number !== '.') {
        if (lastPart === '0') {
            input.value = input.value.slice(0, -1) + number;

            return;
        } else if (lastPart === '') {
            input.value += number;

            return;
        }
    }

    if (number === '.' && lastPart.includes('.'))

        return;
    input.value += number;
}






function onActionClick(clickedAction) {
    if (input.value === '')

        return;
    if (input.value.endsWith(' ')) {
        input.value = input.value.slice(0, -3);
    }
    input.value += ' ' + clickedAction + ' ';
    action = clickedAction;
}

function onCountClick() {
    let splitted = input.value.trim().split(' ');

    if (splitted.length < 3) {
        alert("Trūksta duomenų.");
        return;
    }

    firstNumber = parseFloat(splitted[0].replace(',', '.'));
    secondNumber = parseFloat(splitted[2].replace(',', '.'));

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

document.addEventListener('keydown', function (event) {
    const key = event.key;

    // Skaičiai 0–9
    if (!isNaN(key)) {
        onNumberClick(key);
    }
    // Dešimtainis taškas / kablelis
    if (key === '.' || key === ',') {
        onNumberClick(',');
    }
    // Veiksmai
    if (key === '+' || key === '-' || key === '/') {
        onActionClick(key);
    }
    if (key === '*') {
        onActionClick('x'); // leidžiam naudoti * bet konvertuojam į 'x'
    }
    // Enter = skaičiuoti
    if (key === 'Enter' || key === '=') {
        event.preventDefault(); // kad naršyklė nespaustų mygtuko
        onCountClick();
    }
    // Backspace = trinti paskutinį simbolį (nebūtina, bet galima)
    if (key === 'Backspace') {
        input.value = input.value.slice(0, -1);
    }
    // Escape = išvalyti
    if (key === 'Escape') {
        onCleanClick();
    }
});
