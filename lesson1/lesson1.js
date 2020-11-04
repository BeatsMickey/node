const beep = require('beepbeep');
const chalk = require('chalk');

const messages = ['Hello', 'World', 'разными', 'цветами', 'и', 'c', 'соправождением', 'противных', 'звуков'];
const colors = ['red', 'green', 'yellow', 'blue', 'magenta', 'cyan'];
let elem = '';
let color = '';

function arrayRandElement(arr) {
    var rand = Math.floor(Math.random() * arr.length);
    return arr[rand];
}

let interval = setInterval(function() {
    if (messages.length === 0) {
        clearInterval(interval);
    } else {
        // вывод сообщения
        beep();
        elem = messages.shift();
        color = arrayRandElement(colors);
        console.log(chalk`{${color} ${elem}}`);
    }
}, 1000);





