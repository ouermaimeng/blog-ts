const path = require("path")
/* config-overrides.js */
const typingsForCssModulesLoaderConf = {
    loader: "typings-for-css-modules-loader",
    options: {
        modules: true,
        namedExport: true,
        camelCase: true,
        scss: true
    }
};
// const tsImportPluginFactory = require('ts-import-plugin')
// const { getLoader } = require("react-app-rewired");
module.exports = function override(config, env) {
    //do stuff with the webpack config...
    config.module.rules.push(
        {
            test: /\.scss$/,
            exclude: path.join(__dirname,"./src/style"),
            rules: [
                {
                    use: ["style-loader", typingsForCssModulesLoaderConf]
                }
            ]
        },
        {
            // 位于src/commonStyles里的不使用css module
            test: /\.scss$/,
            include: path.join(__dirname,"./src/style"),
            rules: [
                {
                    use: ["style-loader", "css-loader", "sass-loader"]
                }
            ]
        }
    );
    console.dir(JSON.stringify(config.module.rules))
    // config.plugins.push(new webpack.WatchIgnorePlugin([/css\.d\.ts$/]));
    return config;
};
