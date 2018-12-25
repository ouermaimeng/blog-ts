/*
 * @Author: wangcaowei 
 * @Date: 2017-09-10 21:20:10 
 * @Last Modified by: wangcaowei
 * @Last Modified time: 2018-08-20 10:41:09
 */

import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Tag } from "antd";
import { getArticleList } from "../../actions/action.js";
import { connect } from "react-redux";
import { markdown as md } from "../../config/markdownConfig.js";
import "./article.scss";
import "../../style/base.scss";

class Article extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let tags = this.props.article.tags.map(tag => (
      <Tag color="blue" key={tag.id} onClick={() => this.props.getArticleList(tag.id)}>
        {tag.tag}
      </Tag>
    ));
    return (
      <div>
        <div className="article">
          <p className="article-title blog-overflow-ellipsis">
            <Link
              to={{
                pathname: `/article-detail`,
                state: {
                  article: this.props.article
                }
              }}
            >
              {this.props.article.title}
            </Link>
          </p>
          <div className="article-tag">{tags}</div>
          <div className="article-content">
            <div
              className="blog-overflow-ellipsis"
              dangerouslySetInnerHTML={{
                __html: md.render(this.props.article.abstract)
              }}
            />
            <div className="article-info blog-flex blog-flex-justify">
              <span>{new Date(this.props.article.createTime).toLocaleDateString().replace(/\//g, "-")}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getArticleList: tagId => {
      dispatch(getArticleList(tagId));
    }
  };
};
export default connect(null, mapDispatchToProps)(Article);
