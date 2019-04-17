/*
 * @Author: wangcaowei
 * @Date: 2019-01-15 19:56:42
 * @Last Modified by: wangcaowei
 * @Last Modified time: 2019-02-25 15:41:41
 */
import * as jsonwebtoken from "jsonwebtoken";
import { tokenConf } from "../config/config";

// create token
export const createToken = (data: Object): string => {
    const plainObject = JSON.parse(JSON.stringify(data));
    return jsonwebtoken.sign(plainObject, tokenConf.secret, {
        expiresIn: tokenConf.userValidDate
    });
};

// verify token
export const verifyToken = async (token: string): Promise<Boolean> => {
    try {
        await jsonwebtoken.verify(token, tokenConf.secret);
        return true;
    } catch (error) {
        return false;
    }
};
