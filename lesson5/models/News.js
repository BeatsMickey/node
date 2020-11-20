
const News = api.db.define("news", {
            id: {
                type: api.sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            title: {
                type: api.sequelize.STRING,
                allowNull: false
            },
            text: {
                type: api.sequelize.TEXT,
                allowNull: false
            }
        })

module.exports = News;