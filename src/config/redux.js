/*
 * @Author: wangcaowei 
 * @Date: 2018-02-07 16:30:10 
 * @Last Modified by: wangcaowei
 * @Last Modified time: 2018-07-24 22:35:42
 */
import React, { Component } from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleWare from "redux-thunk";
import reducers from "../reducers/index.js";
import { routerMiddleware, connectRouter } from "connected-react-router";
import createHistory from "history/createBrowserHistory";

const history = createHistory();
// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history);
export default createStore(
    connectRouter(history)(combineReducers({...reducers })),
    applyMiddleware(middleware, thunkMiddleWare)
);