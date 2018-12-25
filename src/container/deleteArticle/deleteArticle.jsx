/*
 * @Author: wangcaowei 
 * @Date: 2018-06-28 02:39:37 
 * @Last Modified by: wangcaowei
 * @Last Modified time: 2018-07-25 01:01:00
 */
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import {
  Modal,
  Form,
  Icon,
  Input,
  Button,
  message,
} from "antd";
import {
  showDelete,
  deleteArticle
} from "../../actions/action";
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 }
  }
};
class DeleteArticle extends Component {
  constructor(props){
    super(props)
    this.state = {
      isLogin: true,
      svgVerify: null
    }
  }
  /**
   * @function 删除文章按钮
   */
  deleteBtn(){
    const { form,id,deleteArticle } = this.props;
    form.validateFields(async (err, userInfo) => {
      if(err) return;
        try {
          await deleteArticle(userInfo.username, userInfo.password,id)
          this.props.history.push("/")
          this.props.showDelete();
        } catch (error) {
          console.log(error)
        }
    })
  };

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
        <Form onSubmit={this.handleSubmit}>
          <FormItem {...formItemLayout}>
            {getFieldDecorator("username", {
              rules: [
                {
                  required: true,
                  message: "请输入用户名",
                  whitespace: true
                },
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
            <Button
              type="primary"
              htmlType="submit"
              type="danger"
              size="large"
              icon="delete"
              onClick = {()=>this.deleteBtn()}
              style={{width:'100%'}}
            >
              删除文章
            </Button>
          </FormItem>
        </Form>
      </Modal>
    );
  }
}
const mapStateToProps = (state) => {
  return { status: state.user.showLogin,deleteStatus:state.del.show,id:state.del.id };
};
const mapDispatchToProps = (dispatch) => {
  return {
    showDelete:() => dispatch(showDelete()),
    deleteArticle:(username,password,id)=>dispatch(deleteArticle(username,password,id))
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(
  Form.create()(DeleteArticle)
));