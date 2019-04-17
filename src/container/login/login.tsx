/*
 * @Author: wangcaowei
 * @Date: 2018-04-24 01:54:40
 * @Last Modified by: wangcaowei
 * @Last Modified time: 2019-02-15 12:59:12
 */
import * as React from "react";
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
import "./login.module.scss";
import { Dispatch } from "redux";
import { LoginOrRegist } from "../../../interface/interface";
const FormItem = Form.Item;
const formItemLayout = {
    labelCol: {
        sm: { span: 8 },
        xs: { span: 24 }
    },
    wrapperCol: {
        sm: { span: 16 },
        xs: { span: 24 }
    }
};

interface Props {
    status: boolean;
    login: (userInfo: LoginOrRegist) => any;
    showLogin: (status: boolean) => any;
    form: any;
}

class Login extends React.Component<Props, {}> {
    public state = {
        isLogin: true,
        svgVerify: ""
    };
    public componentWillReceiveProps(nextProps: Props) {
        if (!this.props.status && nextProps.status) {
            this.getVerifyCode();
        }
    }
    /**
     * @function 获取验证码
     */
    public getVerifyCode = async () => {
        const svgVerify = await getVerifyCode();
        this.setState({
            svgVerify
        });
    };

    /**
     * @function 表单提交
     * @param {Event} e event
     */
    public handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const { form, login } = this.props;
        form.validateFields(async (err: any, userInfo: LoginOrRegist) => {
            if (err) {
                return;
            }
            // 当前为登录时
            if (this.state.isLogin) {
                const returnUser = await login(userInfo);
                // 登录失败
                if (returnUser.code === 201) {
                    // 重新获取验证码
                    this.getVerifyCode();
                    message.error(returnUser.user);
                } else {
                    this.cancelModal();
                    form.resetFields();
                }
            } else {
                // 为注册时
                regist(userInfo).then((data: any) =>
                    message.success(data.content ? "注册成功" : "注册失败")
                );
            }
        });
    };
    /**
     * @function Login 登录
     */
    public checkRegist = async (
        rule: any,
        value: string,
        callback: any
    ) => {
        const isRegist = await checkRegist(value);
        const msg = isRegist.content ? "该名称已被注册" : "";
        if (msg) {
            callback(msg);
        }
    };
    /**
     * @function 取消modal
     */
    public cancelModal = () => {
        this.props.showLogin(this.props.status);
    };

    public render() {
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
                                    message: "请输入用户名",
                                    required: true,
                                    whitespace: true
                                },
                                {
                                    validator:
                                        !this.state.isLogin && this.checkRegist
                                }
                            ]
                        })(
                            <Input
                                prefix={
                                    <Icon
                                        type="user"
                                        style={{ color: "rgba(0,0,0,.25)" }}
                                    />
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
                                    <Icon
                                        type="lock"
                                        style={{ color: "rgba(0,0,0,.25)" }}
                                    />
                                }
                                size="large"
                                type="password"
                                placeholder="密码"
                            />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout}>
                        <Row
                            gutter={8}
                            className="blog-flex blog-flex-x-center"
                        >
                            <Col span={12}>
                                {getFieldDecorator("verifyCode", {
                                    rules: [
                                        {
                                            message: "验证码不能空",
                                            required: true
                                        }
                                    ]
                                })(
                                    <Input
                                        prefix={
                                            <Icon
                                                type="user"
                                                style={{
                                                    color: "rgba(0,0,0,.25)"
                                                }}
                                            />
                                        }
                                        size="large"
                                        placeholder="验证码"
                                    />
                                )}
                            </Col>
                            <Col
                                span={12}
                                dangerouslySetInnerHTML={{
                                    __html: this.state.svgVerify
                                }}
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
                            onClick={() =>
                                this.setState({ isLogin: !this.state.isLogin })
                            }
                        >
                            {this.state.isLogin ? "注册" : "登录"}
                        </a>
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}
const mapStateToProps = (state: { user: { showLogin: any } }) => {
    return { status: state.user.showLogin };
};
const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        login: (userInfo: LoginOrRegist) => dispatch(login(userInfo)),
        showLogin: (currentStatus: boolean) =>
            dispatch(showLogin(currentStatus))
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Form.create()(Login));
