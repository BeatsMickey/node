module.exports = {
    libraries: ['mysql2', 'sequelize', 'express', 'axios', 'body-parser', 'cookie-session', 'cheerio', 'consolidate', 'handlebars'],
    models: ['News', 'Category'].map(function(m) {
        return './models/'+m;
    }),
    controllers: ['NewsController'].map(function(m) {
        return './controllers/'+m;
    }),
    routes: ['NewsRoutes'].map(function(m) {
        return './routes/'+m;
    }),
    DB: {
        database: 'node_news',
        user: 'root',
        password: 'winitaly2006love',
        options: {
            dialect: "mysql",
            host: "localhost",
        },
    }
};


