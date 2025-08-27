module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 37.5, // 设计稿宽度的1/10
      propList: ['*'], // 匹配所有属性
      unitPrecision: 5, // 保留的小数位数
      selectorBlackList: ['van-', 'html', 'body'], // 不进行px转rem的选择器前缀
      replace: true,
      mediaQuery: false,
      minPixelValue: 1 // 小于1px的不转换
    }
  }
}