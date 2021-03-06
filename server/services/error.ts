/*
 * @Author: wangcaowei
 * @Date: 2019-01-07 17:26:09
 * @Last Modified by: wangcaowei
 * @Last Modified time: 2019-02-25 18:19:51
 */
import * as path from "path";
import * as log from "log4js";
import status from "../config/status";
// 日志
log.configure({
    appenders: {
        cheese: {
            type: "file",
            filename: path.join(__dirname, "../log/log.log")
        }
    },
    categories: { default: { appenders: ["cheese"], level: "trace" } }
});
const logger = log.getLogger("blog");
/**
 * 错误处理
 *
 * @param {any} ctx
 * @param {any} next
 */
export default async (ctx: any, next: any) => {
    try {
        ctx.state.status = status;
        await next();
    } catch (e) {
        console.log(e)
        logger.trace(e.stack);
        if (!ctx.status) {
            ctx.status = 500;
        }
        ctx.body = {
            status: ctx.state.status.wrong,
            msg:
                (e.errors && e.errors[0].message) ||
                (e.message && e.message) ||
                "服务器异常"
        };
    }
};
