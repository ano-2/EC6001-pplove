// vite 配置文件
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// 按需引入插件
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  // 插件
  plugins: [
    vue(),
    Components({ resolvers: [VantResolver()] }) // 按需引入 vant
  ],
  //
  server: {
    hmr: true,
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://43.139.223.94:8889/api/private/v1/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
