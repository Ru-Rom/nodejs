// Консольный интерфейс (делалось в 2016 году по скачанному с торрентов курсу до вообще каких либо знаний в js, т.к. у ГБ с домашками ничего не изменилось за 3 года то просто сдаю эту работу..)
// API key: trnsl.1.1.20160516T140524Z.2ce2ec953baf99b3.d362c1e259e23c00ca11232358b128a0ec9372bc
const request = require('request');
const readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
console.log('Перевод с английского на русский:');


rl.on('line', function (text) {
    if (text != '') {
        translate(text);
    } else {
        console.log('Вы ничего не ввели..');
    }
});

function translate(text) {
    request('https://translate.yandex.net/api/v1.5/tr.json/translate?lang=en-ru&key=trnsl.1.1.20160516T140524Z.2ce2ec953baf99b3.d362c1e259e23c00ca11232358b128a0ec9372bc&text=' + text, function (error, response, answer) {
        if (!error && response.statusCode == 200) {
            translatedText = JSON.parse(answer)
            console.log(translatedText.text[0]); // т.к. Яндекс возвращает результат в виде массива в свойстве объекта, то мы сначала парсим выше JSON объект, в js объект, затем в этой строке обращаемся к свойству text и 0 элементу массива хранящегося в этом свойстве
        } else {
            console.log('Ошибка..');
        }
    })

}