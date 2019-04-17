/*
 * @Author: wangcaowei
 * @Date: 2018-03-01 01:36:41
 * @Last Modified by: wangcaowei
 * @Last Modified time: 2019-02-15 15:15:29
 */
import * as Router from "koa-router";
import User from "../controllers/user.controller";
import Verify from "../controllers/verify.controller";
const router: Router = new Router();
router
    .post("/checkRegist", User.checkRegist)
    .post("/login", Verify.validVerifyCode, User.login)
    .post("/regist", Verify.validVerifyCode, User.regist)
    .post("/getVerifyCode", Verify.getVerifycode);
export default router;
