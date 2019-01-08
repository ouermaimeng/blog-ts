/*
 * @Author: wangcaowei
 * @Date: 2018-06-24 21:57:20
 * @Last Modified by: wangcaowei
 * @Last Modified time: 2019-01-08 15:10:36
 */
const os = require("os");
const kill = require("kill-port");
const ip = require("ip").address();
// mac 和其他
const APIPORT = os.type() == "Darwin" ? "8090" : "80";
const start = (app: any) =>
  app.listen(APIPORT, ip, () => {
    console.log(`server start port ${ip}:${APIPORT}`);
  });
export default (app: any) => {
  kill(APIPORT)
    .then(() => start(app))
    .catch((err: any) => {
      start(app);
    });
};
