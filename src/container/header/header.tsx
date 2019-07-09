/*
 * @Author: wangcaowei
 * @Date: 2018-04-24 01:54:25
 * @Last Modified by: wangcaowei
 * @Last Modified time: 2019-07-08 15:21:16
 */
import * as React from "react";
import { connect } from "react-redux";
import { logOut } from "../../actions/action";
import { showLogin } from "../../actions/actionCreator";
import { Button, Menu, Dropdown, Icon } from "antd";
import { UserInfo } from "../../../interface/interface";
import { Dispatch } from "redux";
import style from "./header.module.scss";

interface Props {
  logOut: () => any;
  user: UserInfo | null;
  showLogin: (status: boolean) => any;
  status: boolean;
}
const Header = (props: Props) => {
  const menu = (
    <Menu onClick={props.logOut}>
      <Menu.Item>
        <span>退出登录</span>
      </Menu.Item>
    </Menu>
  );
  return (
    <div className={style.blogHeader}>
      {props.user ? (
        <Dropdown overlay={menu} trigger={["click"]}>
          <span>
            你好!{props.user.username} <Icon type="down" />
          </span>
        </Dropdown>
      ) : (
        // tslint:disable-next-line: jsx-no-lambda
        <Button
          type="primary"
          // tslint:disable-next-line: jsx-no-lambda
          onClick={() => props.showLogin(props.status)}
        >
          登录
        </Button>
      )}
    </div>
  );
};

const mapStateToProps = (state: { user: { showLogin: any; user: any } }) => {
  return { status: state.user.showLogin, user: state.user.user };
};
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    logOut: () => dispatch(logOut() as any),
    showLogin: (currentStatus: boolean) => {
      dispatch(showLogin(currentStatus));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
