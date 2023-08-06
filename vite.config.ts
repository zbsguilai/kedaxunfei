
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import { viteCommonjs } from '@originjs/vite-plugin-commonjs' // 让浏览器支持commonjs语法
import inject from '@rollup/plugin-inject'
import path from 'path';
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', 'vue-router']//自动导入vue和vue-router相关函数
    }),
    inject({
      $: "jquery",  // 这里会自动载入 node_modules 中的 jquery
      jQuery: "jquery",
      "windows.jQuery": "jquery"
    }),
    viteCommonjs()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      'components': path.resolve(__dirname, 'src/components'),
    },
    extensions: ['.js', '.json', '.ts', '.vue'], // 使用路径别名时想要省略的后缀名，可以自己 增减
  },
  server: {
    port: 8070,
    host: true,
    open: true,
    proxy: {},
    hmr: true,  // 开启热更新
  }
})
