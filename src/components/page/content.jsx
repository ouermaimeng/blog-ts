/*
 * @Author: wangcaowei 
 * @Date: 2018-04-24 01:55:20 
 * @Last Modified by: wangcaowei 
 * @Last Modified time: 2018-04-24 01:55:20 
 */
import React, { Component } from "react";
import { connect } from "react-redux";
import { getArticleList } from "../../actions/action.js";
import asyncComponent from "../../bundle.js";
const Article = asyncComponent(() => import("../artic/article.jsx"));
class Content extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.getArticleList();
  }

  render() {
    let articles = this.props.articleList.map((ele, index) => {
      return <Article key={index} article={ele} />;
    });
    return <div className="blog-flex blog-flex-row-y">{articles}</div>;
  }
}
const mapStateToProps = (state, ownProps) => {
  return { articleList: state.article.articleList };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getArticleList: () => {
      dispatch(getArticleList());
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Content);
