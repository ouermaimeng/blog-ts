/*
 * @Author: wangcaowei
 * @Date: 2019-02-25 10:39:32
 * @Last Modified by: wangcaowei
 * @Last Modified time: 2019-02-25 18:31:26
 */

import { ParameterizedContext } from "koa";
import * as path from "path";
import { verifyToken } from "../services/token";
import sequelize from "../db/db";
import * as dbDef from "../models/db";
const user: dbDef.usersModel = sequelize.import(
    path.join(__dirname, "../models/users.ts")
);

export default {
    async isLogin(ctx: ParameterizedContext, next: any) {
        const { authorization } = ctx.request.header;
        const res = await verifyToken(authorization);
        if (res) {
            return await next();
        } else {
            throw new Error("未登录");
        }
    },
    // 能否写入
    async canWrite(ctx: ParameterizedContext, next: any) {
        const { userid } = ctx.request.body;
        const res = await user.findOne({ where: { id: userid } });
        if (!res) {
            throw new Error("未登录");
        } else if (!res.canwrite) {
            throw new Error("没有对应权限");
        } else {
            return await next();
        }
    }
};
