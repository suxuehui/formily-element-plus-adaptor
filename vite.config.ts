import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, "./src"),
      '@designable/shared': path.resolve(__dirname, "./src/designable/shared"),
      '@designable/core': path.resolve(__dirname, "./src/designable/core"),
      '@designable/formily-transformer': path.resolve(__dirname, "./src/designable/formily-transformer"),
      '@cps': path.resolve(__dirname, "./src/components"),
      '@pg': path.resolve(__dirname, "./src/playground"),
    },
    extensions: ['.js', '.ts', '.vue', '.tsx', '.json'],
  },
  build: {
    rollupOptions: {
      input: {
        // 配置所有页面路径，使得所有页面都会被打包
        playground: path.resolve(__dirname, './src/playground/index.html'),
        runtime: path.resolve(__dirname, './src/runtime/index.html'),
      },
      output: {
        assetFileNames: 'assets/[name]-[hash].[ext]', // 静态资源
        chunkFileNames: 'js/[name]-[hash].js', // 代码分割中产生的 chunk
        name: '[name].js',
      },
    }
  },
})
