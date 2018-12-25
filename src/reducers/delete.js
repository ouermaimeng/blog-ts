/*
 * @Author: wangcaowei 
 * @Date: 2018-06-28 03:03:45 
 * @Last Modified by: wangcaowei
 * @Last Modified time: 2018-06-28 03:42:07
 */
const del = (state = { show: false, id: null }, action) => {
    switch (action.type) {
        case "SHOW_DELETE":
            return {...state, ...action.delete, show: !state.show }
        default:
            return state
    }
}
export default del;