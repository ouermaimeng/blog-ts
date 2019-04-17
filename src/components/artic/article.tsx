/*
 * @Author: wangcaowei
 * @Date: 2017-09-10 21:20:10
 * @Last Modified by: wangcaowei
 * @Last Modified time: 2019-02-18 14:18:11
 */

import { Tag } from "antd";
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { ArticleAndTag } from "../../../interface/interface";
import { getArticleByTag } from "../../actions/action";
import md from "../../config/markdownConfig";
import { Dispatch } from "redux";
import "../../style/base.scss";
// tslint:disable-next-line: no-var-requires
// const style = require("./article.module.scss");
import style from "./article.module.scss"

interface Props {
    getArticleByTag: (id: number) => any;
    article: ArticleAndTag;
}
class Article extends React.Component<Props, {}> {
    render() {
        const tags = this.props.article.tags.map(tag => (
            <Tag
                color="blue"
                key={tag.id}
                // tslint:disable-next-line: jsx-no-lambda
                onClick={() => this.props.getArticleByTag(tag.id)}
            >
                {tag.tag}
            </Tag>
        ));
        return (
            <div>
                <div className={style.article}>
                    <p className={`${style.articleTitle} blog-overflow-ellipsis`}>
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
                    <div className={style.articleTag}>{tags}</div>
                    <div className={style.articleContent}>
                        <div
                            className="blog-overflow-ellipsis"
                            dangerouslySetInnerHTML={{
                                __html: md.render(this.props.article.abstract)
                            }}
                        />
                        <div className={`${style.articleInfo} blog-flex blog-flex-justify`}>
                            <span>
                                {new Date(this.props.article.createTime)
                                    .toLocaleDateString()
                                    .replace(/\//g, "-")}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        getArticleByTag: (tagId: number) => {
            dispatch(getArticleByTag(tagId) as any);
        }
    };
};
export default connect(
    null,
    mapDispatchToProps
)(Article);
