const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const EncodingPlugin = require('webpack-encoding-plugin');

module.exports = {
    name : "Hyper casual analytics hosting",
    mode : "production",
    entry: {
        "export_fillit_with_line_pics" : [
            "./node_modules/ps-scripting-es5shim/bundle/main.bundle.js",
            "./src/main/fillit/ExportWithLinePics.ts"
        ]
    },
    output: {
        filename: "[name].jsx",
        path: __dirname + "/hc/"
    },
    module: {
        rules: [
            {test: /\.tsx?$/, use: "ts-loader"}
        ]
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    optimization: {
        minimize: true,
        minimizer : [new UglifyJsPlugin({
            extractComments: true,
            uglifyOptions: {
                output : {
                    ascii_only : true
                }
            }
        })],
        concatenateModules: true
    }
    
}