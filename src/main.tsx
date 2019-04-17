/*
 * @Author: wangcaowei
 * @Date: 2017-08-18 13:02:07
 * @Last Modified by: wangcaowei
 * @Last Modified time: 2019-02-13 16:05:01
 */
import { ConnectedRouter } from "connected-react-router";
import createHistory from "history/createBrowserHistory";
import * as React from "react";
import { Provider } from "react-redux";
import store from "./config/redux";
import RouteMap from "./route/index";

export default () => (
    <Provider store={store}>
        <ConnectedRouter history={createHistory()}>
            <RouteMap />
        </ConnectedRouter>
    </Provider>
);
