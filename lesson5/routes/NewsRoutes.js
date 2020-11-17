const newsRoutes = api.express.Router();

newsRoutes.use('/all', api.NewsController.getAllNews);

module.exports = newsRoutes;