/*
 * @Author: wangcaowei
 * @Date: 2019-01-15 10:56:57
 * @Last Modified by: wangcaowei
 * @Last Modified time: 2019-02-18 15:13:58
 */
import { BaseRequest,Context,ParameterizedContext } from "koa";
import Verify from "../services/verify";
export default {
    // 获取图片验证码
    async getVerifycode(ctx: ParameterizedContext): Promise<void> {
        const content = await Verify.getVerifycode(ctx);
        ctx.body = {
            status: ctx.state.status.ok,
            content
        };
    },
    // 验证验证码
    async validVerifyCode(ctx: ParameterizedContext, next: any): Promise<void> {
        const isEqual = await Verify.validVerifyCode(ctx);
        if (!isEqual) {
            ctx.body = {
                status: ctx.state.status.wrong,
                msg: "验证码错误"
            };
            return;
        }
        await next();
    }
};
