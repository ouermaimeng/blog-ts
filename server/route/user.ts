/*
 * @Author: wangcaowei 
 * @Date: 2018-03-01 01:36:41 
 * @Last Modified by: wangcaowei
 * @Last Modified time: 2019-01-08 16:19:56
 */
import * as Router from "koa-router"
import user from "../services/user"
import utils from "../tool/utils";
import verify from "../tool/verify"
const router :Router = new Router();
router
    .post("/checkRegist", async (ctx, next) => {
        const userInfo = await utils.getUserByUserName(ctx.request.body.username)
        ctx.body = {
            status: ctx.state.status.ok,
            userInfo
        };
    })
    .post("/login", verify.validVerifyCode, user.login)
    .post("/regist", verify.validVerifyCode, user.regist)
    .post("/getVerifyCode", verify.getVerifycode);
export default router;