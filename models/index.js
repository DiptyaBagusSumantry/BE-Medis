const dbConfig = require ('../config/config.js')
const Sequelize = require ('sequelize')
const User = require ('./UserModels.js')
// const Role = require('./Role.js')

const sequelizeInstance = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: 0,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    },
});

const db = {};
db.sequelizeInstance = sequelizeInstance
// db.Role = Role(sequelizeInstance)
db.User = User(sequelizeInstance)

//Role - User
// db.Role.hasMany(db.User, {
//     foreignKey: {
//         name: 'roleId',
//         type: Sequelize.UUID,
//         allowNull: false
//     }
// })

// db.User.belongsTo(db.Role, {
//     targetKey: 'id'
// })

module.exports = db
