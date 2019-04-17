/*
 * @Author: wangcaowei
 * @Date: 2018-12-26 09:21:27
 * @Last Modified by: wangcaowei
 * @Last Modified time: 2019-01-08 11:08:03
 */
import Sequelize from "sequelize";
import { databaseConf } from "../config/config";

const sequelize = new Sequelize(
    databaseConf.database,
    databaseConf.user,
    databaseConf.password,
    {
        host: databaseConf.host,
        dialect: "mysql",
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
    }
);

export default sequelize;