
const Category = api.db.define("categories", {
    id: {
        type: api.sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: api.sequelize.STRING,
        allowNull: false
    }
});

Category.hasMany(api.News);

module.exports = Category;