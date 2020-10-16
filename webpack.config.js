const HtmlWebpackPlugin = require ('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports ={
    module:{
        rules:[
            {
                test: /\.html$/,
                use:[
                    {
                        loader: "html-loader",
                        options: {minimize: true},
                    },
                ],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use:{
                    loader:"babel-loader",
                },
            },
            {
                test: /\.(scss|css)$/,
                use:["style-loader", "css-loader", "sass-loader"],
            },
            {
                test: /\.(png|jpg|svg|gif|jpeg|webp)$/,
                use: ["file-loader"],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename:"./index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "[name].scss",
            chunkFilename: "[id].css",
        })
    ]
}