/*
 * @Author: wangcaowei
 * @Date: 2017-09-06 23:16:25
 * @Last Modified by: wangcaowei
 * @Last Modified time: 2019-02-25 18:29:33
 */
import * as Router from "koa-router";
import article from "../controllers/article.controller";
import middleware from "../tool/middleware";
const router: Router = new Router();

router
    .post("/getArticleList", article.getArticleList)
    .post("/getArticleByTag", article.getArticleByTag)
    .post("/getArticleById", article.getArticleById)
    .post("/deleteArticle", middleware.isLogin,middleware.canWrite, article.deleteArticleById)
    .post("/publishArticle", middleware.isLogin,middleware.canWrite, article.publish)
    .get("/tag", article.tagList);
export default router;
