/*
 * @Author: wangcaowei
 * @Date: 2018-06-24 21:57:20
 * @Last Modified by: wangcaowei
 * @Last Modified time: 2019-02-13 17:48:16
 */
import * as os from "os"
// tslint:disable-next-line: no-var-requires
const kill = require("kill-port");
import {address} from "ip";
// mac 和其他
const APIPORT = os.type() == "Darwin" ? "8090" : "80";
const ip = address();
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
