/*
 * @Author: wangcaowei
 * @Date: 2017-08-18 16:58:14
 * @Last Modified by: wangcaowei
 * @Last Modified time: 2018-10-10 01:40:41
 */
import React, {Component} from "react";
import {connect} from "react-redux";
import {Row, Col, Input, Button, Select} from "antd";
import {publishArticle, getTagList} from "../../actions/action.js";
import {markdown as md} from "../../config/markdownConfig.js";
import "./index.scss";

const {TextArea} = Input;

class NewArticle extends Component {
  constructor(props) {
    super(props);
    console.log(this.props)
    const {state} = props.history.location;
    const article = state && state.article;
    this.state = {
      title: article
        ? article.title
        : "",
      abstract: article
        ? article.abstract
        : "",
      selectTag: article
        ? article
          .tags
          .map(ele => ele.id)
        : [],
      markdown: article
        ? article.content
        : "",
      button: true, //是否禁用按钮
      html: ""
    };
  }
  componentDidMount() {
    const {state} = this.props.history.location;
    !this.props.tagList.length && this
      .props
      .getTagList();
    state && state.edit && this.textareaChange(state.article.content);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({value: nextProps.value})
  }

  titleChange = (e) => {
    this.setState({title: e.target.value});
  }
  submitArticle = (e) => {
    e.preventDefault();
    let data = {
      title: this.state.title,
      content: this.state.markdown,
      abstract: this.state.abstract,
      tag: this.state.selectTag
    };
    this
      .props
      .publishArticle(data)
      .then(() => this.props.history.push("/"))
  }
  selectChange = val => {
    console.log(val)
    this.setState({
      selectTag: val
        .map(ele => this.props.tagList[ele - 1])
        .map(ele => ele.id)
    });
  }
  // markdown textarea
  textareaChange = (e) => {
    const markdown = e.preventDefault
      ? e.target.value
      : e;
    this.setState({
      html: md.render(markdown),
      markdown
    });
  }
  // 摘要textarea
  abstractTextareaChange = (e) => {
    e.preventDefault();
    this.setState({abstract: e.target.value});
  }
  render() {
    let Option = Select.Option, {tagList} = this.props,
      tagOptions = tagList.map(tag => <Option value={tag.id} key={tag.id}>{tag.tag}</Option>),
      button = this.state.title && this.state.selectTag.length
        ? false
        : true;
    return (
      <div className="publish-article blog-flex blog-flex-row-y">
        <Input
          placeholder="...标题"
          style={{
          marginBottom: 10
        }}
          size="large"
          value={this.state.title}
          onChange={this.titleChange}/>
        <Select
          mode="multiple"
          value={this.state.selectTag}
          style={{
          marginBottom: 10
        }}
          placeholder="选择标签"
          size="large"
          onChange={this.selectChange}>
          {tagOptions}
        </Select>
        <TextArea
          placeholder="文章的摘要.."
          value={this.state.abstract}
          style={{
          marginBottom: 10
        }}
          onChange={this.abstractTextareaChange}/>
        <div className="edit-wrap ">
          <Row className="text-body">
            <Col span={12}>
              <TextArea rows={20} value={this.state.markdown} onChange={this.textareaChange}/>
            </Col>
            <Col span={12}>
              <div
                className="preview markdown-body"
                dangerouslySetInnerHTML={{
                __html: this.state.html
              }}/>
            </Col>
          </Row>
        </div>
        <div className="publish-btn">
          <Button
            type="primary"
            disabled={button}
            icon="check-circle-o"
            onClick={this.submitArticle}>
            发布
          </Button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {tagList: state.publishArticle.tagList};
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    publishArticle: data => dispatch(publishArticle(data)),
    getTagList: () => dispatch(getTagList())
  };
};
export default connect(mapStateToProps, mapDispatchToProps, null, {withRef: true})(NewArticle);
