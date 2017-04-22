const path = require("path");
const webpack = require("webpack");

module.exports = {
    "entry": "./app/index.js",
    "output": {
        "path": __dirname,
        "filename": "public/bundle.js"
    },
    "module": {
        "loaders": [
            {
                "test": /.jsx?$/,
                "loader": "babel-loader",
                "exclude": /node_modules/,
                "query": {"presets": ["react"]}
            }
        ]
    }
};