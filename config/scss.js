const path = require("path");
const typingsForCssModulesLoaderConf = {
    loader: 'typings-for-css-modules-loader',
    options: {
        modules: true,
        namedExport: true,
        camelCase: true,
        sass: true
    }
}
const ScssRules = [
    {
        test: /\.scss$/,
        exclude: path.join(__dirname,'src/style'),
        rules: [
            {
                use: ['style-loader', typingsForCssModulesLoaderConf]
            }
        ]
    },
    {
        // 位于src/commonStyles里的不使用css module
        test: /\.scss$/,
        include: path.join(__dirname,'src/style'),
        rules: [
            {
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    }
]
module.exports = ScssRules;