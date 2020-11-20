const express = require('express');
const cheerio = require('cheerio');
const axios = require('axios');
const cookieSession = require('cookie-session')

const bodyParser = require('body-parser');

const app = express();

app.use(express.json());
app.use(bodyParser());
app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2'],
}))

const templating = require('consolidate');
const handlebars = require('handlebars');
templating.requires.handlebars = handlebars;

handlebars.registerHelper('equal', function (value) {
    return (value === sitePrev || value === categoryPrev);
});

app.engine('hbs', templating.handlebars);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

const categories = { 'Футбол': 'football',
    'Баскетбол' : 'basketball',
    'Хоккей' : 'hockey'};
const sites = [
    'www.championat.com',
    'news.sportbox.ru'
];

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}
let sitePrev;
let categoryPrev;

app.get('/', (req, res) => {
    sitePrev = req.session.site;
    categoryPrev = req.session.category;
    res.render('main', { categories: categories, sites: sites});
});

// Иначе выдается 403 ошибка на некоторых сайтах
let options = {
    headers: {'User-agent': 'node.js'}
}

app.post('/news',(req, res) => {
    const r = req.body;
    req.session.category = categoryPrev = r.category;
    req.session.site = sitePrev = r.site;
    axios.get(`https://${r.site}/`, {}, options)
        .then((response) => {
            let $ = cheerio.load(response.data);
            let news = [];

            switch (r.site) {
                case 'www.championat.com':
                    $('.article-preview').each(function (i, element) {
                        if (($(element).find('.article-preview__tag').text()).trim() === getKeyByValue(categories, r.category)) {
                            news.push($(element).find('.article-preview__title').text().replace(/[\s{2,}]+/g, ' ').trim());
                        }
                    });
                    break;
                case 'news.sportbox.ru':
                    $('.sport-block').each(function (i, element) {
                        if (($(element).find('.sport-block__title').children().first().text()).trim() === getKeyByValue(categories, r.category)) {
                            let n = 0;
                            $(element).find('.sport-block__list').find('.title').each(function (i, el) {
                                news.push($(el).text().replace(/[\s{2,}]+/g, ' ').trim());
                            })
                        }
                    });
                    break;
            }
            res.render('main', { categories: categories, sites:  sites, news: news});
        }).catch((err) => {
        res.render('main', { categories: categories, sites:  sites, error: err});
        })
})

app.listen(3000, () => console.log('Listening on port 3000'));
