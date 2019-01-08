/*
 * @Author: wangcaowei
 * @Date: 2017-09-06 23:16:25
 * @Last Modified by: wangcaowei
 * @Last Modified time: 2019-01-08 16:20:05
 */
import * as Router from "koa-router";
import * as article from "../services/article";
const router :Router = new Router();

router
    .post("/getArticleList", article.getArticleList)
    .post("/getArticleById", article.getArticleList)
    .post("/deleteArticle", article.deleteArticle)
    .post("/publishArticle", article.publish)
    .get("/tag", article.tagList);
export default router;
