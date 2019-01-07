/*
 * @Author: wangcaowei
 * @Date: 2017-08-18 16:56:49
 * @Last Modified by: wangcaowei
 * @Last Modified time: 2019-01-07 17:28:19
 */
import path from "path";
import koa from "koa";
import startServer from "./tool/server";
import session from "koa-session";
import bodyParser from "koa-bodyparser";
import Koastatic from "koa-static";
import errorHandler from "./services/error"
import article from "./route/article"
import user from "./route/user"
const app = new koa();

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
