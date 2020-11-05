// 1) Написать консольную игру "Орел или решка", в которой надо будет угадывать выпадающее число (1 или 2). В качестве аргумента программа может принимать имя файла для логирования результатов каждой партии.
const readline = require('readline');
const { promisify } = require('util');
const argv = require('minimist')(process.argv.slice(2));
const fs = require('fs');
const { Console } = require('console');


const logger = new Console(fs.createWriteStream('lesson2/' + argv.l, {flags:'a'}), fs.createWriteStream('lesson2/' + argv.l, {flags:'a'}));


readline.Interface.prototype.question[promisify.custom] = function(prompt) {
    return new Promise(resolve =>
        readline.Interface.prototype.question.call(this, prompt, resolve),
    );
};
readline.Interface.prototype.questionAsync = promisify(
    readline.Interface.prototype.question,
);

function randomCoin() {
    const coins = ['орел', 'решка'];
    const rand = Math.floor(Math.random() * coins.length);
    return coins[rand];
}

let randCoin;
(async () => {
    while (true) {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        randCoin = randomCoin();
        const answer = await rl.questionAsync(
            'Орел, решка или quit?: ',
        );
        if(answer === randCoin) {
            console.info('Угадали');
            logger.log('Победа');
        } else if (answer === 'quit'){
            console.info('Ну пока');
            rl.close();
            break;
        } else {
            console.info('Ну угадали');
            logger.log('Поражение');
        }
        rl.close();
    }
})();

// 2) Сделать программу-анализатор игровых логов. В качестве аргумента программа получает путь к файлу. Выведите игровую статистику: общее количество партий, количество выигранных / проигранных партий и их соотношение, максимальное число побед / проигрышей подряд.

// let str = fs.readFileSync(argv.p);
// let arr = str.toString().split('\n');
// arr.pop();
//
//
// let games = arr.length;
// let wins = 0;
// let lose = 0;
// let kd = 0;
// let maxLoseSeries = 0;
// let maxWinsSeries = 0;
// let tmp = 0;
// let maxWinsSeriesTmp = 0;
// let maxLoseSeriesTmp = 0;
//
// for (let i = 0; i < games; i++) {
//     if(arr[i] === 'Победа') {
//         wins++;
//         tmp++;
//         if(arr[i+1] !== 'Победа') {
//             if (tmp > maxWinsSeries) {
//                 maxWinsSeries = tmp;
//             }
//             tmp = 0;
//         }
//     } else if(arr[i] === 'Поражение') {
//         lose++
//         tmp++;
//         if(arr[i+1] !== 'Поражение') {
//             if (tmp > maxLoseSeries) {
//                 maxLoseSeries = tmp;
//             }
//             tmp = 0;
//         }
//     }
// }
//
// kd = wins / lose;
// console.log(`Игры: ${games}, Поражения: ${lose}, Победы: ${wins},Отношение побед к поражениям: ${kd}, Максимальная серия побед: ${maxWinsSeries}, Максимальная серия поражений: ${maxLoseSeries}`);