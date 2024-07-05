const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const HtmlInlineScriptWebpackPlugin = require('html-inline-script-webpack-plugin');

module.exports = merge(commonConfig, {
    mode: 'production',
    plugins: [
        new HtmlInlineScriptWebpackPlugin(),
    ],
});
