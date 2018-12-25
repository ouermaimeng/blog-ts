/*
 * @Author: wangcaowei
 * @Date: 2017-08-18 13:02:07
 * @Last Modified by: wangcaowei
 * @Last Modified time: 2018-09-25 16:23:31
 */
import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Layout } from "antd";
import BlogHeader from "../header/header.jsx";
import Login from "../login/login.jsx";
import Delete from "../deleteArticle/deleteArticle.jsx"
import "../../style/base.scss";
const { Header, Footer, Sider, Content } = Layout;

// Now you can dispatch navigation actions from anywhere!
// store.dispatch(push('/foo'))

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Layout className="index-root">
        <Login />
        <Delete />
        <Sider className="sider blog-flex blog-flex-row-y blog-flex-x-center blog-flex-y-center " width="500">
          <div className="left-nav blog-flex blog-flex-row-y blog-flex-x-center">
            <img src={require("../../static/userImages/defaultPic.jpg")} alt=" 头像 " />
            <Link to="/write-article">tetes</Link>
          </div>
        </Sider>
        <Layout className="right blog-flex blog-flex-y-center">
          <Header className="header">
            <BlogHeader />
          </Header>
          <Content className="content">{this.props.children}</Content>
        </Layout>
      </Layout>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return { status: state.showLogin };
};
export default connect(mapStateToProps)(App);
