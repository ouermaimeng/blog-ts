/*
 * @Author: wangcaowei 
 * @Date: 2017-08-18 11:23:10 
 * @Last Modified by: wangcaowei
 * @Last Modified time: 2019-02-13 16:19:18
 */
const article = (state = { articleList: [], currentArticle: {} }, action:any) => {
    switch (action.type) {
        case "GET_ALL_LIST":
            return Object.assign({}, state, { articleList: action.articleList });
        case "GET_ARTICLE_BY_ID":
            return Object.assign({}, state, { currentArticle: action.currentArticle });
        default:
            return state;
    }
};
export default article;