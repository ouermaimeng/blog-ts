/*
 * @Author: wangcaowei
 * @Date: 2019-01-07 16:53:01
 * @Last Modified by: wangcaowei
 * @Last Modified time: 2019-07-24 14:48:10
 */
import * as path from "path";
import * as bcrypt from "bcrypt";
import sequelize from "../db/db";
import { LoginOrRegist, UserInfo } from "../../interface/interface";
import { matchUserAndPwd } from "../tool/utils";
import { createToken } from "./token";
import * as dbDef from "../models/db";
const user: dbDef.usersModel = sequelize.import("../models/users");
export default {
  //登录
  async login(params: LoginOrRegist): Promise<UserInfo> {
    const { username, password } = params;
    const res = await matchUserAndPwd(username, password);
    if (!res) throw new Error("用户名密码不匹配");
    const id: number = res.id as number;
    return {
      username,
      id,
      token: createToken(res),
      canwrite: res.canwrite
    };
  },
  //注册
  async regist(params: LoginOrRegist): Promise<Boolean> {
    const hash = await bcrypt.hash(params.password, 10);
    const data = { ...params, id: 123, password: hash, canwrite: 0 };
    const res = await user.create(data);
    return res ? true : false;
  },
  // 检查用户名是否注册
  async checkRegist(username: string): Promise<Boolean> {
    const res = await user.findOne({ where: { username } });
    return res ? true : false;
  }
};
