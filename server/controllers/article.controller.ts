/*
 * @Author: wangcaowei
 * @Date: 2019-01-09 14:42:44
 * @Last Modified by: wangcaowei
 * @Last Modified time: 2019-07-05 11:43:52
 */
import { ParameterizedContext } from "koa";
import ArticleService from "../services/article";

export default {
  /**
   * @description 获取文章列表
   */
  async getArticleList(ctx: ParameterizedContext): Promise<void> {
    const content = await ArticleService.getArticleList();
    ctx.body = {
      status: ctx.state.status.ok,
      content
    };
  },
  /**
   * @description 根据id获取文章
   */
  async getArticleById(ctx: ParameterizedContext): Promise<void> {
    const { id } = ctx.request.body;
    const content = await ArticleService.getArticleList(id);
    ctx.body = {
      status: ctx.state.status.ok,
      content
    };
  },
  /**
   * @description 根据tag获取文章列表
   */
  async getArticleByTag(ctx: ParameterizedContext): Promise<void> {
    const body = ctx.request.body;
    const content = await ArticleService.getArticleByTag(body.id);
    ctx.body = {
      status: ctx.state.status.ok,
      content
    };
  },
  /**
   * @description 删除文章
   */
  async deleteArticleById(ctx: ParameterizedContext): Promise<void> {
    const { body } = ctx.request;
    const content = await ArticleService.deleteArticleById(body);
    ctx.body = {
      status: ctx.state.status.ok,
      content
    };
  },

  /**
   * @description 新增文章
   */
  async publish(ctx: ParameterizedContext): Promise<void> {
    const body = ctx.request.body;
    const content = await ArticleService.publish(body);
    ctx.body = {
      status: ctx.state.status.ok,
      content
    };
  },

  /**
   * @description 获取标签列表
   */
  async tagList(ctx: ParameterizedContext): Promise<void> {
    const content = await ArticleService.tagList();
    ctx.body = {
      status: ctx.state.status.ok,
      content
    };
  }
};
