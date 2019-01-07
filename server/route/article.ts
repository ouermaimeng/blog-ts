/*
 * @Author: wangcaowei
 * @Date: 2017-09-06 23:16:25
 * @Last Modified by: wangcaowei
 * @Last Modified time: 2019-01-07 17:26:56
 */
import router from "koa-router";
import article from "../services/article";
const route = new router();

route
  .post("/getArticleList", article.getArticleList)
  .post("/getArticleById", article.getArticleList)
  .post("/deleteArticle", article.deleteArticle)
  .post("/publishArticle", article.publish)
  .get("/tag", article.tagList);
export default route;
