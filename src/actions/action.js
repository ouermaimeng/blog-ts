/*
 * @Author: wangcaowei
 * @Date: 2017-08-18 12:58:58
 * @Last Modified by: wangcaowei
 * @Last Modified time: 2018-11-27 09:10:53
 */
import api from "../config/api";
import type from "./type";
import { message } from "antd";
const qs = require("qs");
const common = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
  },
  credentials: `same-origin` //不加 fetch默认会忽略请求返回的set-cookie的响应头
};
/**
 * @function 简单的封装
 * @param {string} url
 * @param {Object} data 参数
 */
const request = (url, data = {}) => {
  return fetch(url, { ...data, ...common })
    .then(res => res.json())
    .then(res => {
      if (res.status == "OK") {
        return res;
      } else {
        message.error(res.msg);
        if (res.status == "WRONG") {
          return Promise.reject(res);
        }
      }
    });
};

/**
 *
 * 发表文章
 * @param {any} article 文章内容
 * @returns
 */
export const publishArticle = article => {
  return dispatch => {
    //开始请求
    return request(api.publishArticle, {
      method: "post",
      body: qs.stringify(article)
    });
  };
};

/**
 *
 * 获取tag对应的文章列表
 * @returns
 */
export const getArticleList = tagId => {
  return dispatch => {
    request(api.getArticleList, {
      method: "post",
      body: qs.stringify({ tagId })
    }).then(data => {
      dispatch({ type: type.GET_ALL_LIST, articleList: data.articleList });
    });
  };
};

/**
 *
 * 获取所有标签列表
 * @param
 * @returns
 */
export const getTagList = () => {
  return dispatch => {
    request(api.getTagList).then(data => {
      dispatch({ type: type.GET_TAG_LIST, tagList: data.tagList });
    });
  };
};

/**
 *
 *  根据id获取文章内容
 * @param
 * @returns
 */

export const getArticleById = id => {
  return dispatch => {
    request(api.getArticleById, {
      method: "post",
      body: qs.stringify({ id })
    }).then(data => {
      dispatch({
        type: type.GET_ARTICLE_BY_ID,
        currentArticle: data.articleList[0]
      });
    });
  };
};

/**
 *显示隐藏login
 * @param
 * @returns
 */

export const showLogin = currentStatus => ({
  type: type.SHOW_LOGIN,
  status: currentStatus
});
/**
 * 检查用户名是否已经被注册
 *
 * @param {any} username
 * @returns
 */
export const checkRegist = username => {
  return request(api.checkRegist, {
    method: "POST",
    body: qs.stringify({ username })
  });
};
/**
 *用户注册
 * @param
 * @returns
 */
export const regist = userInfo => {
  return dispatch => {
    return request(api.regist, {
      method: "POST",
      body: qs.stringify(userInfo)
    });
  };
};
/**
 * 保存用户登录后的信息
 *
 * @param {any} userInfo
 */
export const saveUserInfo = username => ({
  type: type.SAVE_USER_INFO,
  user: username
});
/**
 * 登录
 *
 * @param {any} userInfo
 * @returns {Object} data
 */
export const login = userInfo => {
  return dispatch => {
    return request(api.login, {
      method: "POST",
      body: qs.stringify(userInfo)
    }).then(data => {
      dispatch(saveUserInfo(data.user));
      localStorage.setItem("token", data.token);
      return data;
    });
  };
};
/**
 * 用户登出
 */
export const logOut = () => {
  localStorage.removeItem("token");
  return dispatch => {
    dispatch(saveUserInfo(null));
  };
};
/**
 * 获取验证码
 *
 * @returns {SVGAElement}
 */
export const getVerifyCode = () => {
  return request(api.getVerifyCode, {
    method: "POST"
  }).then(data => data.svgVerify);
};

/**
 * @function 显示隐藏删除弹窗
 * @param {*} id 删除文章的id
 */
export const showDelete = (id = null) => {
  return {
    type: "SHOW_DELETE",
    delete: {
      id
    }
  };
};
/**
 * @function 删除指定文章
 * @param {*} username 用户名
 * @param {*} password 密码
 * @param {*} id 文章id
 */
export const deleteArticle = (username, password, id) => {
  const data = { username, password, id };
  return dispatch => {
    return request(api.deleteArticle, {
      method: "POST",
      body: qs.stringify(data)
    });
  };
};
