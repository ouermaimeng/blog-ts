/*
 * @Author: wangcaowei
 * @Date: 2017-08-18 16:54:56
 * @Last Modified by: wangcaowei
 * @Last Modified time: 2019-07-09 16:13:32
 */
const env = process.env.NODE_ENV;

interface Api {
  [key: string]: string;
}

const api: Api = {
  getVerifyCode: "/getVerifyCode", // 验证码
  checkRegist: "/checkRegist", // 用户名是否已经被注册
  login: "/login", // 登录
  regist: "/regist", // 注册
  publishArticle: "/publishArticle", // 发表
  getArticleList: "/getArticleList", // 获取文章列表
  getTagList: "/tag", // 获取标签列表
  getArticleById: "/getArticleById", // 根据id获取文章列表
  deleteArticle: "/deleteArticle", // 根据id删除对应的文章
  getArticleByTag: "/getArticleByTag" // 根据tagId获取文章列表
};
if (env === "development") {
  for (const [key, value] of Object.entries(api)) {
    api[key] = `/api${value}`;
  }
}
export default api;
