/*
 * @Author: wangcaowei
 * @Date: 2019-08-15 11:04:15
 * @Last Modified by: wangcaowei
 * @Last Modified time: 2019-08-15 14:59:03
 */
// import { promises as fp } from "fs";
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../models/db.d.ts");
fs.readFile(filePath, { encoding: "utf8" }, (err: Error, data: string) => {
  const newStr = data.replace(/ id:/g, "  id?:");
  console.log(newStr);
  fs.writeFile(filePath, newStr, { encoding: "utf8" }, (err: Error) => console.log(err));
});
