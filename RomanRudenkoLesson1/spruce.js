const ansi = require('ansi');
const cursor = ansi(process.stdout);

cursor.hex('#AAAAAA').bold().bg.hex('#77D300');
let star = '^';
let cols = cols2 = trunk = 8; // Общая настройка высоты дерева
let j = 1;

for (let i = 1; i <= trunk; i++) {
    cursor.horizontalAbsolute(cols).write(star).horizontalAbsolute(trunk).write(star);
    cursor.horizontalAbsolute(cols2).write(star + '\n');
    cols--;
    cols2++;
}
cursor.reset(); // Сбрасываем "стили"