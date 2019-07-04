/*
 * @Author: wangcaowei
 * @Date: 2017-08-18 16:54:56
 * @Last Modified by: wangcaowei
 * @Last Modified time: 2019-02-18 14:17:40
 */
const api = {
  getVerifyCode: "/api/getVerifyCode", // 验证码
  checkRegist: "/api/checkRegist", // 用户名是否已经被注册
  login: "/api/login", // 登录
  regist: "/api/regist", // 注册
  publishArticle: "/api/publishArticle", // 发表
  getArticleList: "/api/getArticleList", // 获取文章列表
  getTagList: "/api/tag", // 获取标签列表
  getArticleById: "/api/getArticleById", // 根据id获取文章列表
  deleteArticle: "/api/deleteArticle", // 根据id删除对应的文章
  getArticleByTag: "/api/getArticleByTag" // 根据tagId获取文章列表
};
export default api;
