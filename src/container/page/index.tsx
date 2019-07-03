/*
 * @Author: wangcaowei
 * @Date: 2018-04-24 01:55:20
 * @Last Modified by: wangcaowei
 * @Last Modified time: 2019-07-03 16:06:10
 */
import * as React from "react";
import { connect } from "react-redux";
import { getArticleList } from "../../actions/action";
import asyncComponent from "../../bundle.js";
import { Dispatch } from "redux";
import { ArticleList } from "../../../interface/interface";
const Article = asyncComponent(() => import("../../components/artic/article"));
interface Props {
  getArticleList: () => ArticleList;
  articleList: ArticleList;
}

class Content extends React.Component<Props, {}> {
  constructor(props: any) {
    super(props);
  }

  public componentWillMount() {
    this.props.getArticleList();
  }

  public render() {
    const articles = this.props.articleList.map((ele, index) => {
      return <Article key={index} article={ele} />;
    });
    return <div className="blog-flex blog-flex-row-y">{articles}</div>;
  }
}
const mapStateToProps = (state: { article: { articleList: ArticleList } }) => {
  return { articleList: state.article.articleList };
};
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    getArticleList: () => {
      dispatch(getArticleList());
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Content);
