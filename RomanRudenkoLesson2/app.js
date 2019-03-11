/* 

Написать консольную игру "Орел или решка", в которой надо будет
угадывать выпадающее число (1 или 2). В качестве аргумента
программа может принимать имя файла для логирования
результатов каждой партии

*/

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });

console.log('Я загадаю число, где 1 - орел, а 2 - решка. Попытайся отгадать что я загадал!');
// 1 Необходимо рандомно загадывать значение 1 или 2
const randomize = () => {
    return Math.floor(Math.random() * 2 + 1);
}
// 2 Нужно проверять введеное пользователем значение с загаданным
rl.on('line', function(line){
    line = parseInt(line);
    (line === 1 || line === 2) ? (line === randomize() ? console.log('Вы угадали!') : console.log('Вы ошиблись')) : console.log('Введите правильное значение!');
  })
