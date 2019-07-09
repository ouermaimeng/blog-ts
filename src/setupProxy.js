const proxy = require("http-proxy-middleware");

module.exports = app => {
  app.use(proxy("/api", { target: "http://192.168.6.252:80", pathRewrite: { "^/api": "" } }));
};
