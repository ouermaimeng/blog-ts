/*
 * @Author: wangcaowei
 * @Date: 2018-04-24 01:54:40
 * @Last Modified by: wangcaowei
 * @Last Modified time: 2018-11-16 11:26:15
 */
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Modal,
  Form,
  Icon,
  Input,
  Button,
  Checkbox,
  message,
  Row,
  Col
} from "antd";
import {
  showLogin,
  checkRegist,
  regist,
  login,
  getVerifyCode
} from "../../actions/action";
import "./login.scss";
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
};
class Login extends Component {
  state = {
    isLogin: true,
    svgVerify: null
  };
  componentWillReceiveProps(nextProps) {
    !this.props.status && nextProps.status && this.getVerifyCode();
  }
  /**
   * @function 获取验证码
   */
  getVerifyCode = async () => {
    const svgVerify = await getVerifyCode();
    this.setState({
      svgVerify
    });
  };

  /**
   * @function 表单提交
   * @param {Event} e event
   */
  handleSubmit = e => {
    e.preventDefault();
    const { form, login, regist } = this.props;
    form.validateFields(async (err, userInfo) => {
      if (err) return;
      // 当前为登录时
      if (this.state.isLogin) {
        const returnUser = await login(userInfo);
        // 登录失败
        if (returnUser.code == 201) {
          // 重新获取验证码
          this.getVerifyCode();
          message.error(returnUser.user);
        } else {
          this.cancelModal();
          form.resetFields();
        }
      } else {
        // 为注册时
        regist(userInfo).then(data => message.success(data.msg));
      }
    });
  };
  /**
   * @function Login 登录
   */
  checkRegist = async (rule, value, callback) => {
    const user = await checkRegist(value);
    const msg = user.userInfo ? "该名称已被注册" : "";
    msg && callback(msg);
  };
  /**
   * @function 取消modal
   */
  cancelModal = () => {
    this.props.showLogin(this.props.status);
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Modal
        title={this.state.isLogin ? "登录" : "注册"}
        visible={this.props.status}
        onCancel={this.cancelModal}
        footer={null}
      >
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem {...formItemLayout}>
            {getFieldDecorator("username", {
              rules: [
                {
                  required: true,
                  message: "请输入用户名",
                  whitespace: true
                },
                {
                  validator: !this.state.isLogin && this.checkRegist
                }
              ]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                size="large"
                placeholder="用户名"
              />
            )}
          </FormItem>
          <FormItem {...formItemLayout}>
            {getFieldDecorator("password", {
              rules: [{ required: true, message: "请输入密码" }]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                size="large"
                type="password"
                placeholder="密码"
              />
            )}
          </FormItem>
          <FormItem {...formItemLayout}>
            <Row gutter={8} className="blog-flex blog-flex-x-center">
              <Col span={12}>
                {getFieldDecorator("verifyCode", {
                  rules: [
                    {
                      required: true,
                      message: "验证码不能空"
                    }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    size="large"
                    placeholder="验证码"
                  />
                )}
              </Col>
              <Col
                span={12}
                dangerouslySetInnerHTML={{ __html: this.state.svgVerify }}
                onClick={() => this.getVerifyCode()}
                style={{ cursor: "pointer", height: "40px" }}
              />
            </Row>
          </FormItem>
          <FormItem {...formItemLayout}>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              {this.state.isLogin ? "登录" : "注册"}
            </Button>
          </FormItem>
          <FormItem>
            <Checkbox> Remember me </Checkbox>
            <a className="login-form-forgot" href="">
              忘记密码?
            </a>
            Or
            <a
              href="javascript:;"
              onClick={() => this.setState({ isLogin: !this.state.isLogin })}
            >
              {this.state.isLogin ? "注册" : "登录"}
            </a>
          </FormItem>
        </Form>
      </Modal>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return { status: state.user.showLogin };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    showLogin: currentStatus => dispatch(showLogin(currentStatus)),
    login: userInfo => dispatch(login(userInfo)),
    regist: userInfo => dispatch(regist(userInfo))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(Login));
