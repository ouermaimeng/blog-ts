/*
 * @Author: wangcaowei
 * @Date: 2017-08-17 21:29:21
 * @Last Modified by: wangcaowei
 * @Last Modified time: 2019-07-24 11:57:26
 */
const { databaseConf } = require("../config/config.js");
const path = require("path");

// const sequelize = require('./dbb.js');
const childProcess = require("child_process");
/**
 *  备份数据库生成sql文件
 */
const dbBackUp = () => {
  try {
    childProcess.execSync(`mysqldump -u${databaseConf.user} -p${databaseConf.password} ${databaseConf.database} > ${__dirname}/data1.sql`);
  } catch (error) {
    console.log(error);
  }
};
module.exports.dbBackUp = dbBackUp;
/**
 * 向数据库导入备份的sql文件
 */
const execSqlFile = async () => {
  try {
    childProcess.execSync(`mysqldump -u${databaseConf.user} -p${databaseConf.password} ${databaseConf.database} < ${__dirname}/data.sql`);
  } catch (error) {
    console.log(error);
  }
};
module.exports.execSqlFile = execSqlFile;
/**
 * 根据数据库 生成对应的模型
 */
const createModelsFromDb = async () => {
  try {
    let modePath = path.join(__dirname, "../models");
    childProcess.execSync(`sequelize-auto -o ${modePath} -d ${databaseConf.database} -h ${databaseConf.host} -u ${databaseConf.user} -p 3306 -x ${databaseConf.password} -e mysql -z`);
  } catch (error) {
    console.log(error);
  }
};
module.exports.createModelsFromDb = createModelsFromDb;
createModelsFromDb();
