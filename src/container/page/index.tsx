/*
 * @Author: wangcaowei
 * @Date: 2018-04-24 01:55:20
 * @Last Modified by: wangcaowei
 * @Last Modified time: 2019-07-10 17:13:51
 */
import * as React from "react";
import { connect } from "react-redux";
import { getArticleList } from "../../actions/action";
import asyncComponent from "../../bundle.js";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { globalState } from "../../reducers/reduce.interface";
import { Props, MapDispatchProps, MapStateProps } from "./interface";
const Article = asyncComponent(() => import("../../components/artic/article"));

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
const mapStateToProps = (state: globalState): MapStateProps => {
  return { articleList: state.article.articleList };
};
const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, AnyAction>): MapDispatchProps => {
  return {
    getArticleList: (): Promise<void> => dispatch(getArticleList())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Content);
