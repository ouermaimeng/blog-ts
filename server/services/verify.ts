/*
 * @Author: wangcaowei
 * @Date: 2019-01-15 10:51:24
 * @Last Modified by: wangcaowei
 * @Last Modified time: 2019-02-25 10:55:09
 */
import { ParameterizedContext } from "koa";
const captcha = require("svg-captcha");
export default {
    // 生成验证码
    async getVerifycode(ctx: ParameterizedContext): Promise<string> {
        const verifyInfo = captcha.create({ height: 40, fontSize: 35 });
        if (ctx.session) {
            ctx.session.verifyCode = verifyInfo.text.toUpperCase();
        }
        return verifyInfo.data;
    },
    // 验证验证码
    async validVerifyCode(ctx: any): Promise<Boolean> {
        const { verifyCode } = ctx.request.body;
        // 验证验证码是否正确
        if (ctx.session && ctx.session.verifyCode == verifyCode.toUpperCase()) {
            return true;
        } else {
            return false;
        }
    },
    // // 写入权限
    // async validCanWrite(ctx: ParameterizedContext): Promise<any> {
    //     const res = await user.findOne({ where: { id: userid } });
    //     return !res || !res.canwrite ? false : true;
    // }
};
