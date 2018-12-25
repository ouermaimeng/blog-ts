/*
 * @Author: wangcaowei 
 * @Date: 2018-03-01 03:01:48 
 * @Last Modified by: wangcaowei
 * @Last Modified time: 2018-05-20 04:54:20
 */
let initState = {
    showLogin: false,
    user: null
}
const user = (state = initState, action) => {
    switch (action.type) {
        case "SAVE_USER_INFO":
            return Object.assign({}, state, { user: action.user })
        case "SHOW_LOGIN":
            return Object.assign({}, state, { showLogin: !action.status })
        default:
            return state;
    }
};
export default user;