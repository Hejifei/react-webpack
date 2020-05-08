const path = require('path')
const lodash = require('lodash')
const {removeModuleScopePlugin, addWebpackPlugin, override} = require('customize-cra');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");

const smp = new SpeedMeasurePlugin();

const IS_PRODUCTION = process.env.NODE_ENV === 'production'

// 查看打包后各包大小
const addAnalyzer = () => config => {
    if (!config.plugins) {
        config.plugins = [];
    }
    config.plugins.push(new BundleAnalyzerPlugin({
        analyzerPort: 1111, // 指定端口号
        openAnalyzer: false,
    }));

    return config;
};

// 速度分析
const addSpeedMeasure = () => config => {
    // const endProdConfig = merge(config, prodConfig);
    return smp.wrap(config);
}

// 移除引用文件必须是src文件夹下的限制
const removeModuleScope = () => config => {
    if (!config.plugins) {
        config.plugins = [];
    }
    removeModuleScopePlugin()(config);

    return config
}

/**
 * 缩小构建目标
 * exclude 排除node_modules下面的文件
 * include 只对src下面对文件使用
 * @returns {function(*=): *}
 */
const changeBuildModuleRule = () => config => {
    const ruleList = lodash.get(config, ['module', 'rules'])
    ruleList.push({
        test: /\.js|jsx$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, '../src'),
        use: ['babel-loader']
    })
    return config
}

const overrideList = [
    changeBuildModuleRule(),
    // removeModulceScope(),

]

overrideList.push(removeModuleScope())

/**
 * 生产环境
 */
if (IS_PRODUCTION) {
    overrideList.push(addSpeedMeasure())
} else {
    overrideList.push(addAnalyzer())
}


module.exports = override(...overrideList)
