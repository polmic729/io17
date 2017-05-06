const path = require("path");
let webpack = require("webpack");

module.exports = {
    context: __dirname,
    entry: [
        "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000",
        path.resolve(__dirname, "./src/client/scripts/client.js")
    ],
    output: {
        path: path.resolve(__dirname, "./dist"),
        publicPath: "/",
        filename: "bundle.js"
    },
    devtool: "#source-map",
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ],
    module: {
        loaders: [
            {
                test: /.js?$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                query: {
                    presets: ["react", "es2015"],
                    plugins: ["syntax-decorators", "transform-object-rest-spread"]
                }
            }
        ]
    }
};
