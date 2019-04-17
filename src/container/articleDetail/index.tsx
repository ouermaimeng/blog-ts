/*
 * @Author: wangcaowei
 * @Date: 2018-02-07 17:37:39
 * @Last Modified by: wangcaowei
 * @Last Modified time: 2019-02-25 19:15:07
 */
import * as React from "react";
import { connect } from "react-redux";
import md from "../../config/markdownConfig";
import EditAndDel from "./editanddel";
import { Tag } from "antd";
import { Location, History } from "history";
import { Dispatch } from "redux";
import {
    getArticleList,
    getArticleById,
    showDelete
} from "../../actions/action";
import { ArticleAndTag, ArticleList,UserInfo } from "../../../interface/interface";
import style from "./index.module.scss";

interface Props {
    getArticleById: (id: number) => ArticleAndTag;
    getArticleList: (tagId: number) => ArticleList;
    showDelete: (id: number) => any;
    location: Location;
    history: History;
    article: ArticleAndTag;
    user:UserInfo|null
}

class ArticleDetail extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
    }

    componentDidMount() {
        const id = this.props.location.state.article.id;
        this.props.getArticleById(id);
    }

    getArticleByTagId(tagId: number) {
        this.props.getArticleList(tagId);
        this.props.history.push("/");
    }
    deleteArticle = () => {
        this.props.showDelete(this.props.article.id);
    };
    editArticle = () => {
        this.props.history.push({
            pathname: "/write-article",
            state: {
                article: this.props.article,
                edit: true
            }
        });
    };

    render() {
        const {article,user} = this.props;
        const tags =
            article.tags &&
            article.tags.map(tag => (
                <Tag
                    color="blue"
                    key={tag.id}
                    onClick={this.getArticleByTagId.bind(this, tag.id)}
                >
                    {tag.tag}
                </Tag>
            ));
        return Object.keys(article).length ? (
            <div className={style.articleDetail}>
                <h1>{article.title}</h1>
                <div
                    className={`${
                        style.articleInfo
                    } blog-flex blog-flex-justify`}
                >
                    <div>{tags}</div>
                    <div>
                        <span>
                            {" "}
                            创建日期:{" "}
                            {new Date(
                                article.createTime
                            ).toLocaleDateString()}{" "}
                        </span>{" "}
                        <span>
                            {" "}
                            修改日期 :{" "}
                            {new Date(
                                article.updateTime
                            ).toLocaleDateString()}{" "}
                        </span>
                    </div>
                </div>
                <div
                    className="markdown-body"
                    dangerouslySetInnerHTML={{
                        __html: md.render(article.content)
                    }}
                />
                <EditAndDel
                    editArticle={this.editArticle}
                    showDelete={this.deleteArticle}
                    user={user}
                />
            </div>
        ) : (
            <div>加载中...</div>
        );
    }
}
const mapStateToProps = (state: {
    publishArticle: { editorValue: any };
    article: { currentArticle: any };
    user: { user: any };
}) => {
    return {
        article: state.article.currentArticle,
        editorValue: state.publishArticle.editorValue,
        user: state.user.user
    };
};
const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        getArticleById: (id: number) => dispatch(getArticleById(id)),
        getArticleList: (tagId: number) => dispatch(getArticleList(tagId)),
        showDelete: (id: number) => dispatch(showDelete(id))
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ArticleDetail);
