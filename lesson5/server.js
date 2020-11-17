global.api = {};
const config = require('./config');

// Подключаем внешние библиотеки и кладем их в объект api
const libraries = config.libraries
libraries.map(function(m) {
    api[m] = require(m);
});

// Подключаем базу и кладем ее в объект api
const mysql = new api.sequelize(config.DB.database, config.DB.user, config.DB.password, config.DB.options);
api['db'] = mysql;

// Подключаем наши модули и кладем их в объект api
const modules = config.models.concat(config.controllers, config.routes);
modules.map(function(m) {
    let name = m.split('/')[m.split('/').length - 1];
    api[name] = require(m);
});


const app = api.express();

app.use(api.express.json());
app.use(api['body-parser']());
app.use(api['cookie-session']({
    name: 'session',
    keys: ['key1', 'key2'],
}))

api.consolidate.requires.handlebars = api.handlebars;
app.engine('hbs', api.consolidate.handlebars);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use('/news', api.NewsRoutes);

// app.get('/create/category',(req, res) => {
//     api.Category.create({ title: 'title category'})
//         .then(data => {
//             console.log('creating ok');
//         })
//         .catch(err=>console.log(err))
//     res.render('main', {});
// });

// app.get('/create/news',(req, res) => {
//     api.News.create({ title: 'title news', text: 'text news', categoryId: 1})
//         .then(data => {
//             console.log('creating ok');
//         })
//         .catch(err=>console.log(err))
//     res.render('main', {});
// });


app.use(function (req, res, next) {
    res.status(404).send('404.Page not found');
});

mysql.sync()
    .then(()=>{
        app.listen(3000, function(){
            console.log("Сервер ожидает подключения на порте 3000...");
        });
    })
    .catch(err=>console.log(err));

