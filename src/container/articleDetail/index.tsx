/*
 * @Author: wangcaowei
 * @Date: 2018-02-07 17:37:39
 * @Last Modified by: wangcaowei
 * @Last Modified time: 2019-07-10 16:56:55
 */
import * as React from "react";
import { connect } from "react-redux";
import md from "../../config/markdownConfig";
import EditAndDel from "./editanddel";
import { Tag } from "antd";
import { AnyAction } from "redux";
import * as qs from "qs";
import { getArticleList, getArticleById, showDelete } from "../../actions/action";
import style from "./index.module.scss";
import { ThunkDispatch } from "redux-thunk";
import { globalState } from "../../reducers/reduce.interface";
import { Props } from "./interface";

class ArticleDetail extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }
  componentDidMount() {
    const { history, getArticleById } = this.props;
    const search = qs.parse(history.location.search, { ignoreQueryPrefix: true });
    getArticleById(search.id);
  }

  getArticleByTagId(tagId: number) {
    this.props.getArticleList(tagId);
    this.props.history.push("/");
  }
  deleteArticle = (id: number) => {
    this.props.showDelete(id);
  };
  editArticle = (id: number) => {
    const { history, article } = this.props;
    history.push({
      pathname: "/write-article",
      search: qs.stringify({
        id
      })
    });
  };

  render() {
    const { article, user } = this.props;
    const tags =
      article &&
      article.tags.map(tag => (
        <Tag color="blue" key={tag.id} onClick={this.getArticleByTagId.bind(this, tag.id)}>
          {tag.tag}
        </Tag>
      ));
    return article ? (
      <div className={style.articleDetail}>
        <h1>{article.title}</h1>
        <div className={`${style.articleInfo} blog-flex blog-flex-justify`}>
          <div>{tags}</div>
          <div>
            <span> 创建日期: {new Date(article.createTime).toLocaleDateString()} </span> <span> 修改日期 : {new Date(article.updateTime).toLocaleDateString()} </span>
          </div>
        </div>
        <div
          className="markdown-body"
          dangerouslySetInnerHTML={{
            __html: md.render(article.content)
          }}
        />
        <EditAndDel articleId={article.id} editArticle={this.editArticle} showDelete={this.deleteArticle} user={user} />
      </div>
    ) : (
      <div>加载中...</div>
    );
  }
}
const mapStateToProps = (state: globalState) => {
  return {
    article: state.article.currentArticle,
    user: state.user.user
  };
};
const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
  return {
    getArticleById: (id: number): Promise<void> => dispatch(getArticleById(id)),
    getArticleList: (tagId: number): Promise<void> => dispatch(getArticleList(tagId)),
    showDelete: (id: number) => dispatch(showDelete(id))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleDetail);
