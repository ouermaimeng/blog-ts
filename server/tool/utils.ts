/*
 * @Author: wangcaowei
 * @Date: 2019-01-07 17:16:13
 * @Last Modified by: wangcaowei
 * @Last Modified time: 2019-04-19 15:17:25
 */
import * as path from "path";
import * as bcrypt from "bcrypt";
import * as dbDef from "../models/db";
import sequelize from "../db/db";
const user: dbDef.usersModel = sequelize.import("../models/users");

/**
 * @description 验证用户名密码是否匹配
 * @param username 用户名
 * @param password 密码
 * @returns {false | dbDef.usersInstance}
 */
export const matchUserAndPwd = async (
    username: string,
    password: string
): Promise<false | dbDef.usersInstance> => {
    const res = await user.findOne({ where: { username } });
    // 没有注册
    if (!res) return false;
    const isEqual = bcrypt.compare(password, res.password);
    // 账户名密码不匹配
    if (!isEqual) return false;
    return res;
};
