/*
 * @Author: wangcaowei 
 * @Date: 2018-02-07 16:30:10 
 * @Last Modified by: wangcaowei
 * @Last Modified time: 2019-02-22 14:46:05
 */
import { createStore, applyMiddleware } from "redux";
import thunkMiddleWare from "redux-thunk";
import createReducers from "../reducers/index";
import { routerMiddleware } from "connected-react-router";
import createHistory from "history/createBrowserHistory";
import { composeWithDevTools } from "redux-devtools-extension"
const history = createHistory();
// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history);
export default createStore(
    // connectRouter(history)(combineReducers({...reducers })),
    createReducers(history),
    composeWithDevTools(applyMiddleware(middleware, thunkMiddleWare))
);