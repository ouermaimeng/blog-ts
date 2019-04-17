/*
 * @Author: wangcaowei
 * @Date: 2019-01-15 14:56:13
 * @Last Modified by: wangcaowei
 * @Last Modified time: 2019-02-22 14:18:47
 */
import { ParameterizedContext } from "koa";
import UserService from "../services/user";
export default {
    async login(ctx: ParameterizedContext): Promise<any> {
        const { body } = ctx.request;
        const content = await UserService.login(body);
        ctx.body = {
            status: ctx.state.status.ok,
            content
        };
    },

    // 注册
    async regist(ctx: ParameterizedContext): Promise<void> {
        const { body } = ctx.request;
        const content = await UserService.regist(body);
        if (content) {
            ctx.body = {
                status: ctx.state.status.ok,
                content
            };
        } else {
            ctx.body = {
                status: ctx.state.status.wrong,
                msg: "注册失败"
            };
        }
    },

    // 检查用户名是否注册
    async checkRegist(ctx: any): Promise<void> {
        const { username } = ctx.request.body;
        const content = await UserService.checkRegist(username);
        ctx.body = {
            status: ctx.state.status.ok,
            content
        };
    }
};
