/*
 * @Author: wangcaowei
 * @Date: 2017-08-18 16:59:35
 * @Last Modified by: wangcaowei
 * @Last Modified time: 2019-07-10 10:05:53
 */
import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";
import { History } from "history";
import user from "./login";
import article from "./article";
import publishArticle from "./publishArticle";
import del from "./delete";
export default (history: History) =>
  combineReducers({
    router: connectRouter(history),
    user,
    article,
    publishArticle,
    del
  });
