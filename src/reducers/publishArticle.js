/*
 * @Author: wangcaowei 
 * @Date: 2018-08-25 13:42:01 
 * @Last Modified by: wangcaowei
 * @Last Modified time: 2018-03-01 03:02:58
 */
const publishArticle = (state = { tagList: [] }, action) => {
    switch (action.type) {
        /*
            永远都不应该去修改原来的state,
            应该返回一个新的state.
             MMP
           */
        case "GET_TAG_LIST":
            return Object.assign({}, state, { tagList: action.tagList });
        default:
            return state;
    }
};
export default publishArticle;