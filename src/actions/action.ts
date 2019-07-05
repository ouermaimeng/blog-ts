/*
 * @Author: wangcaowei
 * @Date: 2017-08-18 12:58:58
 * @Last Modified by: wangcaowei
 * @Last Modified time: 2019-07-05 17:33:13
 */
import api from "../config/api";
import * as actionCreators from "./actionCreator";
import * as qs from "qs";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import request from "../request";
import * as interfaces from "../../interface/interface";
/**
 *
 * 发表文章
 * @param {interfaces.InsertArticle} article 文章内容
 * @returns
 */
export const publishArticle = (article: interfaces.InsertArticle) => {
  return request(api.publishArticle, {
    method: "post",
    body: qs.stringify(article)
  });
};

/**
 *
 * 获取tag对应的文章列表
 * @returns
 */
export const getArticleList = (tagId?: number): any => {
  return (dispatch: ThunkDispatch) => {
    request(api.getArticleList, {
      method: "post",
      body: qs.stringify({ tagId })
    }).then(data => {
      dispatch(actionCreators.getArticleList(data.content));
    });
  };
};

/**
 *
 * 获取所有标签列表
 * @param
 * @returns
 */
export const getTagList = (): any => {
  return (dispatch: ThunkDispatch): Promise<any> => {
    return request(api.getTagList).then(data => {
      dispatch(actionCreators.getTagList(data.content));
    });
  };
};

/**
 *
 *  根据id获取文章内容
 * @param
 * @returns
 */
export const getArticleById = (id: number): any => {
  return (dispatch: Dispatch) => {
    request(api.getArticleById, {
      method: "post",
      body: qs.stringify({ id })
    }).then(data => {
      dispatch(actionCreators.getArticleById(data.content[0]));
    });
  };
};

/**
 * @description 根据tagid获取列表
 */
export const getArticleByTag = (id: number): any => {
  return (dispatch: Dispatch) => {
    request(api.getArticleByTag, {
      method: "post",
      body: qs.stringify({ id })
    }).then(data => {
      dispatch(actionCreators.getArticleList(data.content));
    });
  };
};

/**
 * 检查用户名是否已经被注册
 *
 * @param {any} username
 * @returns
 */
export const checkRegist = (username: string) => {
  return request(api.checkRegist, {
    method: "POST",
    body: qs.stringify({ username })
  });
};

/**
 * 用户注册
 * @param
 * @returns
 */
export const regist = (userInfo: any) => {
  return request(api.regist, {
    method: "POST",
    body: qs.stringify(userInfo)
  });
};

/**
 * 登录
 *
 * @param {any} userInfo
 * @returns {Object} data
 */
export const login = (userInfo: any): any => {
  return (dispatch: Dispatch) => {
    return request(api.login, {
      method: "POST",
      body: qs.stringify(userInfo)
    }).then(data => {
      dispatch(actionCreators.saveUserInfo(data.content));
      localStorage.setItem("token", data.content.token);
      return data;
    });
  };
};

/**
 * 用户登出
 */
export const logOut = (): any => {
  localStorage.removeItem("token");
  return (dispatch: Dispatch) => {
    dispatch(actionCreators.saveUserInfo(null));
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
  }).then(data => data.content);
};

/**
 * @function 显示隐藏删除弹窗
 * @param {*} id 删除文章的id
 */
export const showDelete = (id?: number): any => {
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
export const deleteArticle = (username: string, password: string, id: number): any => {
  const data = { username, password, id };
  return request(api.deleteArticle, {
    method: "POST",
    body: qs.stringify(data)
  });
};
