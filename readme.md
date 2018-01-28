### Vue多页webpack配置

#### 新建项目

1. 新建vue-multi-page-webpack文件夹，直接`npm init -f`

2. 安装依赖
   1. `npm i --save vue vuex vue-router`
   2. `npm i --save-dev babel-core babel-loader babel-preset-env` 安装babel使用ES6及更高级的写法，这里直接安装preset，同时创建.babelrc文件配置转换规则，更多详细内容参考[Babel](https://babeljs.cn/)
   3. `npm i eslint eslint-loader eslint-plugin-html eslint-plugin-vue --save-dev`好的开发流程当然少不了eslint，创建.eslintrc这里同时引入eslint，更多详细内容参考[ESLint](http://eslint.cn/)
   4. `npm i postcss postcss-cssnext postcss-import postcss-loader postcss-nested postcss-px2rem --save-dev` 安装postcss相关的依赖
   5. 安装各种loader`npm i vue-loader css-loader style-loader file-loader html-loader url-loader --save-dev`
   6. 然后是一些plugin及webpack相关的，`npm i uglifyjs-webpack-plugin webpack webpack-dev-middleware webpack-hot-middleware html-webpack-plugin  --save-dev`

3.
