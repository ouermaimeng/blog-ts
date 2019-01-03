/*
 * @Author: wangcaowei
 * @Date: 2017-08-17 21:29:21
 * @Last Modified by: wangcaowei
 * @Last Modified time: 2019-01-03 17:30:26
 */
const path = require('path')
const { databaseConf } = require('../config/config')
const sequelize = require('./db');
const childProcess = require('child_process')
const fs = require('pn/fs');

/**
 *  备份数据库生成sql文件
 */
const dbBackUp = () => {
    try {
        childProcess.execSync(`mysqldump -u${databaseConf.user} -p${databaseConf.password} ${databaseConf.database} > ${__dirname}/data.sql`)
    } catch (error) {
        console.log(error)
    }
}

/**
 * 向数据库导入备份的sql文件
 */
const execSqlFile = async() => {
    try {
        const sqlString = await fs.readFile(__dirname + '/data.sql', 'utf-8');
        const res = await sequelize.query(sqlString)
    } catch (error) {
        console.log(error);
    }
}

/**
 * 根据数据库 生成对应的模型
 */
const createModelsFromDb = async() => {
    try {
        let modePath = path.join(__dirname, '../models')
        childProcess.execSync(`sequelize-auto -o ${modePath} -d ${databaseConf.database} -h ${databaseConf.host} -u ${databaseConf.user} -p 3306 -x ${databaseConf.password} -e mysql -z`);
    } catch (error) {
        console.log(error)
    }
}
createModelsFromDb()