const request = require('request');
const cheerio = require('cheerio');

const url = 'https://habr.com/ru/top/weekly/';
const posts = [];

request(url, (error, response, html) => {
    if (!error && response.statusCode == 200) {
        let $ = cheerio.load(html);
        $('.post__title').each( function(index, element) {
            let dirtyString = $(this).text();
            let cleanString = dirtyString.replace(/\n/g,'');
            posts[index] = cleanString;
        });

        posts.forEach((element, index) => {
            console.log(++index + element);
          });

    } else {
        console.log('Ошибка ' + error);
    }
})

