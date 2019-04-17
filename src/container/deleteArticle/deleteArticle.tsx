/*
 * @Author: wangcaowei
 * @Date: 2018-06-28 02:39:37
 * @Last Modified by: wangcaowei
 * @Last Modified time: 2019-02-25 19:24:51
 */
import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { RouteComponentProps } from "react-router";
import { Dispatch } from "redux";
import { Modal, Form, Icon, Input, Button } from "antd";
import { showDelete, deleteArticle } from "../../actions/action";
import { History } from "history";
const FormItem = Form.Item;
const formItemLayout = {
    labelCol: {
        sm: { span: 8 },
        xs: { span: 24 }
    },
    wrapperCol: {
        sm: { span: 24 },
        xs: { span: 24 }
    }
};
interface Props extends RouteComponentProps {
    form: any;
    id: number;
    deleteStatus: boolean;
    history: History;
    showDelete: () => any;
}
class DeleteArticle extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
        this.state = {
            isLogin: true,
            svgVerify: null
        };
    }
    /**
     * @function 删除文章按钮
     */
    deleteBtn = ()=> {
        // tslint:disable-next-line: no-shadowed-variable
        const { form, id } = this.props;
        form.validateFields(
            async (err: Error, userInfo: { username: any; password: any }) => {
                if (err) {
                    return;
                }
                try {
                    await deleteArticle(
                        userInfo.username,
                        userInfo.password,
                        id
                    );
                    this.props.history.push("/");
                    this.props.showDelete();
                } catch (error) {
                    // tslint:disable-next-line: no-console
                    console.log(error);
                }
            }
        );
    }

    /**
     * @function 取消modal
     */
    cancelModal = () => {
        this.props.showDelete();
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Modal
                title="删除文章"
                visible={this.props.deleteStatus}
                onCancel={this.cancelModal}
                footer={null}
                destroyOnClose={true}
            >
                <Form>
                    <FormItem {...formItemLayout}>
                        {getFieldDecorator("password", {
                            rules: [{ required: true, message: "请输入当前用户密码" }]
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
                        <Button
                            htmlType="submit"
                            type="danger"
                            size="large"
                            icon="delete"
                            onClick={this.deleteBtn}
                            style={{ width: "100%" }}
                        >
                            删除文章
                        </Button>
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}
const mapStateToProps = (state: {
    user: { showLogin: any };
    del: { show: any; id: any };
}) => {
    return {
        deleteStatus: state.del.show,
        id: state.del.id,
        status: state.user.showLogin
    };
};
const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        showDelete: () => dispatch(showDelete())
    };
};
export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Form.create()(DeleteArticle))
);
