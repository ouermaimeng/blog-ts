/*
 * @Author: wangcaowei
 * @Date: 2017-08-21 20:58:40
 * @Last Modified by: wangcaowei
 * @Last Modified time: 2018-05-01 14:50:47
 */
const Sequelize = require('sequelize');
const { databaseConf } = require('../config/config')
const sequelize = new Sequelize(databaseConf.database, databaseConf.user, databaseConf.password, {
    hose: databaseConf.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    dialectOptions: {
        multipleStatements: true //同时执行多条sql 语句
    },
    define: {
        timestamps: false
    },
    logging: false
})
module.exports = sequelize;