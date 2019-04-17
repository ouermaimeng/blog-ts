/*
 * @Author: wangcaowei
 * @Date: 2017-08-18 13:02:07
 * @Last Modified by: wangcaowei
 * @Last Modified time: 2019-02-25 19:06:50
 */
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Delete from "../deleteArticle/deleteArticle";
import BlogHeader from "../header/header";
import Login from "../login/login";
import { Layout } from "antd";
const { Header, Sider, Content } = Layout;
import "../../style/base.scss";

// Now you can dispatch navigation actions from anywhere!
// store.dispatch(push('/foo'))

class App extends React.Component<any, {}> {
    constructor(props: any) {
        super(props);
    }
    public render() {
        const user = this.props.user;
        return (
            <Layout className="index-root">
                <Login />
                <Delete />
                <Sider
                    className="sider blog-flex blog-flex-row-y blog-flex-x-center blog-flex-y-center "
                    width="500"
                >
                    <div className="left-nav blog-flex blog-flex-row-y blog-flex-x-center">
                        <img
                            src={require("../../static/userImages/defaultPic.jpg")}
                            alt=" 头像 "
                        />
                        {user && user.canwrite == 1 ? (
                            <Link to="/write-article">writing</Link>
                        ) : null}
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
const mapStateToProps = (state: any) => {
    return { user: state.user.user };
};
export default connect(mapStateToProps)(App);
