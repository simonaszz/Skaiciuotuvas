let firstNumber = 0;
let secondNumber = 0;
let action = '+';
let answer = 0;

let input = document.getElementById('calc-input');

function onNumberClick(number) {
    input.value += number;
}

function onActionClick(clickedAction) {
    input.value += ' ' + clickedAction + ' ';
    action = clickedAction;
}