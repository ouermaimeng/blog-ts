/*
 * @Author: wangcaowei 
 * @Date: 2018-04-24 01:54:25 
 * @Last Modified by: wangcaowei
 * @Last Modified time: 2018-05-20 04:54:51
 */
import React, { Component } from "react";
import { connect } from "react-redux";
import { showLogin, logOut } from "../../actions/action";
import { Button, Menu, Dropdown, Icon } from "antd";
import "./header.scss";

const Header = props => {
  const menu = (
    <Menu onClick={props.logOut}>
      <Menu.Item key="0">
        <span>退出登录</span>
      </Menu.Item>
    </Menu>
  );
  return (
    <div className="blog-header">
      {props.user ? (
        <Dropdown overlay={menu} trigger={["click"]}>
          <span>
            你好!{props.user} <Icon type="down" />
          </span>
        </Dropdown>
      ) : (
        <Button type="primary" onClick={() => props.showLogin(props.status)}>
          登录
        </Button>
      )}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return { status: state.user.showLogin, user: state.user.user };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    showLogin: currentStatus => {
      dispatch(showLogin(currentStatus));
    },
    logOut: () => dispatch(logOut())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
