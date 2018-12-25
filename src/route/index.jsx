/*
 * @Author: wangcaowei
 * @Date: 2018-02-07 18:32:16
 * @Last Modified by: wangcaowei
 * @Last Modified time: 2018-07-25 00:56:32
 */
import React, {Component} from "react";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import asyncComponent from "../bundle.js";

const Index = asyncComponent(() => import ("../container/index/index.jsx"));
const Rightcontent = asyncComponent(() => import ("../components/page/content.jsx"));
const NewArticle = asyncComponent(() => import ("../container/newArticle//newArticle.jsx"));
const ArticleDetail = asyncComponent(() => import ("../container/articleDetail/index.jsx"));
export default() => (
  <Router>
    <div className="root">
      <ReactCSSTransitionGroup
        transitionName="fade"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}>
        <Switch>
          <Route path="/write-article" exact component={NewArticle}/>
          <Route
            path="/"
            render={() => (
            <Index>
              <Route exact path="/" component={Rightcontent}/>
              <Route exact path="/article-detail" component={ArticleDetail}/>
            </Index>
          )}/>
        </Switch>
      </ReactCSSTransitionGroup>
    </div>
  </Router>
);
