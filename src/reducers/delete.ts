/*
 * @Author: wangcaowei 
 * @Date: 2018-06-28 03:03:45 
 * @Last Modified by: wangcaowei
 * @Last Modified time: 2019-02-13 16:19:17
 */
const del = (state = { show: false, id: null }, action:any) => {
    switch (action.type) {
        case "SHOW_DELETE":
            return {...state, ...action.delete, show: !state.show }
        default:
            return state
    }
}
export default del;