/*
 * @Author: wangcaowei
 * @Date: 2017-08-18 13:02:07
 * @Last Modified by: wangcaowei
 * @Last Modified time: 2018-07-24 22:29:32
 */
import React, { Component } from "react";
import { Provider } from "react-redux";
import RouteMap from "./route/index.jsx";
import store from "./config/redux.js";
import { ConnectedRouter } from "connected-react-router";
import createHistory from "history/createBrowserHistory";
import utils from "./util/util"

window.utils = utils;
export default () => (
  <Provider store={store}>
    <ConnectedRouter history={createHistory()}>
      <RouteMap />
    </ConnectedRouter>
  </Provider>
);
