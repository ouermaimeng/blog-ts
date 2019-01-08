/*
 * @Author: wangcaowei
 * @Date: 2017-08-18 16:56:49
 * @Last Modified by: wangcaowei
 * @Last Modified time: 2019-01-08 16:20:32
 */
import * as path from "path";
import * as koa from "koa";
import * as session from "koa-session";
import * as bodyParser from "koa-bodyparser";
import * as Koastatic from "koa-static";
import startServer from "./tool/server";
import errorHandler from "./services/error"
import article from "./route/article"
import user from "./route/user"
const app:koa = new koa();

const staticPath = "../dist";
app.use(Koastatic(path.join(__dirname, staticPath)));
app.keys = ["ouermaimeng"];
app.use(
    session(
        {
            key: "verifyCode", //default "koa:sess"
            maxAge: 60 * 1000 //设置session超时时间 一分钟
        },
        app
    )
);
app.use(errorHandler);
app.use(bodyParser());
app.use(user.routes());
app.use(article.routes());
startServer(app);
