/*
 * @Author: wangcaowei
 * @Date: 2017-08-18 16:59:35
 * @Last Modified by: wangcaowei
 * @Last Modified time: 2019-02-13 17:25:53
 */
import user from "./login";
import article from "./article";
import publishArticle from "./publishArticle";
import del from "./delete";
import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
export default (history: any) =>
    combineReducers({
        router: connectRouter(history),
        user,
        article,
        publishArticle,
        del
    });
