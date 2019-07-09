/*
 * @Author: wangcaowei
 * @Date: 2017-08-18 16:58:14
 * @Last Modified by: wangcaowei
 * @Last Modified time: 2019-07-09 17:10:55
 */
import * as React from "react";
import { ChangeEvent, MouseEvent } from "react";
import { connect } from "react-redux";
import { Row, Col, Input, Button, Select } from "antd";
import * as qs from "qs";
import { publishArticle, getTagList, getArticleById } from "../../actions/action";
import md from "../../config/markdownConfig";
import { History } from "history";
import { TagsAttribute, ArticleAndTag, InsertArticle, UserInfo, Response, ArticlesAttribute } from "../../../interface/interface";
import { Dispatch } from "redux";
import style from "./index.module.scss";

const { TextArea } = Input;

interface Props {
  history: History;
  tagList: TagsAttribute[];
  userInfo: UserInfo;
  getTagList: () => Promise<any>;
  getArticleById: (id: number) => Promise<any>;
}
interface States {
  id: number | string;
  title: string; // 标题
  abstract: string; // 摘要
  tags: any[]; // 对应的tag
  content: string; // markdown
  button: boolean; // 是否能够提交
  html: string; // markdown => html
}

class NewArticle extends React.Component<Props, States> {
  constructor(props: Props) {
    super(props);
    const { state } = props.history.location;
    const article: ArticleAndTag = state && state.article;
    this.state = {
      id: article ? article.id : -1,
      title: article ? article.title : "",
      abstract: article ? article.abstract : "",
      tags: article ? article.tags.map(ele => ele.id) : [],
      content: article ? article.content : "",
      button: true, // 是否禁用按钮
      html: ""
    };
  }
  componentDidMount() {
    const { history, tagList, getTagList } = this.props;
    const { search } = history.location;
    const parseSearch = qs.parse(search, { ignoreQueryPrefix: true });
    !tagList.length && getTagList();
    console.log(parseSearch);
    parseSearch && this.initByEdit(parseSearch.id);
  }
  initByEdit = async (id: number): Promise<void> => {
    const res = await this.props.getArticleById(id);
    console.log(res);
  };
  // 编辑状态e为string 否则为event
  titleChange = (e: ChangeEvent<HTMLInputElement> | string) => {
    let title = typeof e === "string" ? e : e.target.value;
    this.setState({ title });
  };
  submitArticle = (e: MouseEvent): void => {
    e.preventDefault();
    const { id, title, content, abstract, tags } = this.state;
    const data: InsertArticle = {
      id: +id,
      title,
      content,
      abstract,
      tags,
      userid: this.props.userInfo.id
    };
    publishArticle(data).then(() => this.props.history.push("/"));
  };
  selectChange = (val: number[]) => {
    this.setState({
      tags: val.map(ele => this.props.tagList[ele - 1]).map(ele => ele.id)
    });
  };
  // 编辑状态e为string 否则为event
  textareaChange = (e: ChangeEvent<HTMLTextAreaElement> | string) => {
    let content = typeof e === "string" ? e : e.target.value;
    this.setState({
      html: md.render(content),
      content
    });
  };
  // 摘要textarea
  abstractTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    this.setState({ abstract: e.target.value });
  };
  render() {
    const Option = Select.Option;
    const { tagList } = this.props;
    const tagOptions = tagList.map(tag => (
      <Option value={tag.id} key={tag.id.toString()}>
        {tag.tag}
      </Option>
    ));
    const button = this.state.title && this.state.tags.length ? false : true;
    return (
      <div className={`${style.publishArticle} blog-flex blog-flex-row-y`}>
        <Input
          placeholder="...标题"
          style={{
            marginBottom: 10
          }}
          size="large"
          value={this.state.title}
          onChange={this.titleChange}
        />
        <Select
          mode="multiple"
          value={this.state.tags}
          style={{
            marginBottom: 10
          }}
          placeholder="选择标签"
          size="large"
          onChange={this.selectChange}
        >
          {tagOptions}
        </Select>
        <TextArea
          placeholder="文章的摘要.."
          value={this.state.abstract}
          style={{
            marginBottom: 10
          }}
          onChange={this.abstractTextareaChange}
        />
        <div className={style.editWrap}>
          <Row className={style.textBody}>
            <Col span={12}>
              <TextArea rows={20} value={this.state.content} onChange={this.textareaChange} />
            </Col>
            <Col span={12}>
              <div
                className={`${style.preview} markdown-body`}
                dangerouslySetInnerHTML={{
                  __html: this.state.html
                }}
              />
            </Col>
          </Row>
        </div>
        <div className={style.publishBtn}>
          <Button type="primary" disabled={button} icon="check-circle-o" onClick={this.submitArticle}>
            发布
          </Button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state: any) => {
  return { tagList: state.publishArticle.tagList, userInfo: state.user.user, currentArticle: state.article.currentArticle };
};
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    getTagList: (): Promise<[]> => dispatch(getTagList()),
    getArticleById: (id: number): Promise<Response<Array<ArticleAndTag>>> => dispatch(getArticleById(id))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { forwardRef: true }
)(NewArticle);
