/*
 * @Author: wangcaowei
 * @Date: 2018-08-24 16:09:41
 * @Last Modified by: wangcaowei
 * @Last Modified time: 2018-09-20 11:26:09
 */

const pluginName = "webpackCdnPlugin";

class webpackCdnPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    compiler.hooks.compilation.tap(pluginName, compilation => {
      compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tapAsync(
        pluginName,
        (data, callback) => {
          data.html = this.getNewHtmlTemplate(data.html);
          callback(null, data);
        }
      );
    });
  }

  createTemplate(type, href) {
    if (type == "css") {
      return href.reduce(
        (pre, cur) => (pre += `<link href="${cur}" rel="stylesheet">`),
        ""
      );
    } else if (type == "js") {
      return href.reduce(
        (pre, cur) => (pre += `<script src="${cur}"></script>`),
        ""
      );
    }
  }

  getNewHtmlTemplate(originHtml) {
    if (this.options.constructor !== Object) {
      throw new Error("webpackCdnPlugin options need a pure Object");
    }
    let newHtmlTemplate = originHtml;
    for (const [key, value] of Object.entries(this.options)) {
      const stringByType = this.createTemplate(key, value);
      if (key === "css") {
        newHtmlTemplate = newHtmlTemplate.replace(
          /<head>/,
          `<head>${stringByType}\n`
        );
      } else if (key === "js") {
        newHtmlTemplate = newHtmlTemplate.replace(
          /<body>/,
          `<body>\n${stringByType}`
        );
      }
    }
    return newHtmlTemplate;
  }
}

module.exports = webpackCdnPlugin;
