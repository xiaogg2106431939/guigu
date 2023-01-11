const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  //关闭打包后的map文件
  productionSourceMap:false,
  transpileDependencies: true,
  devServer:{
    proxy:{
      "/api":{
        target:"http://gmall-h5-api.atguigu.cn",
        ws:false
      }
    }
  }
})
