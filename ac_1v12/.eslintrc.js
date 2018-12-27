/**
 * Created by jerry on 2018/8/9.
 * eslint代码规范规则定义
 */
module.exports = {
  root: true,
  // 例外全局变量
  globals: {
    "window": true,
    "document": true,
    "$": true,
    "PRODUCTION": true,
    "H5COURSE_HEADURL": true,
    "LOG_SHOW": true
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module"
  },
  env: {
    browser: true,
    es6: true
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-zhcn.md
  extends: "standard",
  plugins: ["html"],
  // https://www.jianshu.com/p/1682b91756b1
  rules: {
    // 第一个值是错误级别，可以使下面的值之一：
    // "off" or 0 - 关闭规则
    // "warn" or 1 - 将规则视为一个警告（不会影响退出码）
    // "error" or 2 - 将规则视为一个错误 (退出码为1)

    "generator-star-spacing": "off", // allow async-await 生成器函数*的前后空格
    // allow debugger during development
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-unused-vars": "off", // 不要定义未使用的变量,暂时不开启
    "indent": "off", // 缩进不检查
    "quotes": [1, "single", "avoid-escape"], // 引号风格,统一单引号
    "object-property-newline": "off", //关闭强制将对象的属性放在不同的行上
    "brace-style": "off", // 大括号风格
    "no-multiple-empty-lines": [0, {"max": 20}], // 空行最多不能超过20行
    "no-console": "off", // 禁止用console关闭
    "semi": [2, "always"], // 强制分号结尾
    "spaced-comment": ["error", "never"],//注释风格要不要有空格什么的,
    "eqeqeq": "off", //必须使用全等关闭
    "space-before-function-paren": "off", //关闭函数定义时括号前面要不要有空格
    "eol-last": "off", //关闭文件末尾空一行,
    "camelcase": "off", //关闭驼峰命名法
  }
}