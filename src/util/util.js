/*
 * @Author: wangcaowei 
 * @Date: 2018-05-01 15:16:36 
 * @Last Modified by: wangcaowei
 * @Last Modified time: 2018-05-01 18:00:57
 */
export default {
    /**
     * 去抖
     * @param {Function} method 需要执行的函数
     * @param {context} context this
     * @param {Array} params 函数参数
     * @param {Number} time 延迟时间
     */
    debounce(method, context, params = [], time = 300) {
        clearTimeout(method.timer);
        method.timer = setTimeout(() => {
            method.apply(context, params);
        }, time);
    }
};