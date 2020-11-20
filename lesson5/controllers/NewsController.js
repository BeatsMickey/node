module.exports = {

    getAllNews : function (req, res) {
        api.News.findAll()
            .then(data => {
                res.render('main', {});
            })
            .catch(err=>console.log(err))
    },

}