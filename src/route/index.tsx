/*
 * @Author: wangcaowei
 * @Date: 2018-02-07 18:32:16
 * @Last Modified by: wangcaowei
 * @Last Modified time: 2019-02-15 11:07:11
 */
import * as React from "react";
import * as ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import asyncComponent from "../bundle.js";

const Index = asyncComponent(() => import("../container/index/index"));
const Rightcontent = asyncComponent(() => import("../components/page/content"));
const NewArticle = asyncComponent(() =>
    import("../container/newArticle/newArticle")
);
const ArticleDetail = asyncComponent(() =>
    import("../container/articleDetail/index")
);
export default () => (
    <Router>
        {/* <ReactCSSTransitionGroup
                transitionName="fade"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={500}
            > */}
        <Switch>
            <Route path="/write-article" exact={true} component={NewArticle} />
            <Route
                path="/"
                render={() => (
                    <Index>
                        <Route exact={true} path="/" component={Rightcontent} />
                        <Route
                            exact={true}
                            path="/article-detail"
                            component={ArticleDetail}
                        />
                    </Index>
                )}
            />
        </Switch>
        {/* </ReactCSSTransitionGroup> */}
    </Router>
);