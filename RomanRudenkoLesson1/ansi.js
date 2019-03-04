const ansi = require('ansi');
const cursor = ansi(process.stdout);

cursor.hex('#AAAAAA').bold().bg.hex('#60B9CE');
let star = '*';
let cols = x = 7;
let cols2 = 1;
let j = 0;


for (let i = 1; i <= x; i++) {
    cursor.horizontalAbsolute(cols2).write(star);
    cursor.horizontalAbsolute(cols).write(star + '\n');
    cols--;
    cols2++;
}
console.log('\u0007'); // Играем звук
cursor.reset(); // Сбрасываем "стили"

