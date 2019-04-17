/*
 * @Author: wangcaowei
 * @Date: 2019-01-07 16:52:55
 * @Last Modified by: wangcaowei
 * @Last Modified time: 2019-02-25 19:40:49
 */
import * as path from "path";
import sequelize from "../db/db";
import * as dbDef from "../models/db";
import {
    InsertArticle,
    DeleteArticle
} from "../../interface/interface";
import { matchUserAndPwd } from "../tool/utils";
const articles: dbDef.articlesModel = sequelize.import(
    path.join(__dirname, "../models/articles.ts")
);
const tags: dbDef.tagsModel = sequelize.import(
    path.join(__dirname, "../models/tags.ts")
);
const articletagrelate: dbDef.articletagrelateModel = sequelize.import(
    path.join(__dirname, "../models/articletagrelate.ts")
);

/**
 * @description 更新文章
 * @param params
 */
const updateArticle = async (params: InsertArticle) => {
    const id = params.id as number;
    return await sequelize.transaction(t =>
        articles.findById(id, { transaction: t }).then(async article => {
            if (!article) {
                throw new Error("没有对应id的文章");
            } else {
                // update article
                await article.update(
                    {
                        title: params.title,
                        content: params.content,
                        abstract: params.abstract,
                        updateTime: new Date()
                    },
                    { transaction: t }
                );
                // destroy relate
                await articletagrelate.destroy({
                    where: { articleid: id },
                    transaction: t
                });
                // create relate
                const articletagrelateData = params.tags.map(tagid => ({
                    articleid: id,
                    tagid
                }));
                await articletagrelate.bulkCreate(articletagrelateData, {
                    transaction: t
                });
            }
        })
    );
};
const createArticle = async (params: InsertArticle) => {
    const articleData = {
        ...params,
        createTime: new Date(),
        updateTime: new Date(),
    };
    // create
    delete articleData.id;
    return await sequelize.transaction(t =>
        articles.create(articleData, { transaction: t }).then(async article => {
            const articleid = article.id;
            const articletagrelateData = articleData.tags.map(tagid => ({
                articleid,
                tagid
            }));
            return await articletagrelate.bulkCreate(articletagrelateData, {
                transaction: t
            });
        })
    );
};

export default {
    /**
     * @description 获取文章列表
     */
    async getArticleList(articleId?: number): Promise<Array<{}>> {
        articles.belongsToMany(tags, { through: "articletagrelate" });
        tags.belongsToMany(articles, { through: "articletagrelate" });
        return await articles.findAll({
            include: [
                {
                    model: tags,
                    through: {
                        attributes: []
                    }
                }
            ],
            order: [["updateTime", "DESC"]],
            [articleId ? "where" : ""]: { id: articleId }
        });
    },
    /**
     * @description 根据tag获取文章列表
     * @param {number} tagId
     */
    async getArticleByTag(tagId: number): Promise<Array<{}>> {
        articles.belongsToMany(tags, { through: "articletagrelate" });
        tags.belongsToMany(articles, { through: "articletagrelate" });
        return await articles.findAll({
            include: [
                {
                    model: tags,
                    where: { id: tagId }
                }
            ],
            order: [["updateTime", "DESC"]]
        });
    },
    /**
     * @description 根据id删除文章
     */
    async deleteArticleById(params: DeleteArticle): Promise<any> {
        const res = await matchUserAndPwd(params.username, params.password);
        if (!res) throw new Error("用户名密码不匹配");
        return await sequelize.transaction(t =>
            articles
                .destroy({ where: { id: params.id }, transaction: t })
                .then(() =>
                    articletagrelate.destroy({
                        where: { articleid: params.id },
                        transaction: t
                    })
                )
        );
    },
    /**
     * @description 发布文章
     */
    async publish(params: InsertArticle) {
        const id = params.id;
        // update create
        return id && id > 0 ? updateArticle(params) : createArticle(params);
    },

    /**
     * @description taglist array
     * @returns {Array}
     */
    async tagList(): Promise<Array<{}>> {
        return await tags.findAll();
    }
};
