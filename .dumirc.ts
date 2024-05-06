import CopyWebpackPlugin from 'copy-webpack-plugin';
import { defineConfig } from 'dumi';
import path from 'path';
export default defineConfig({
  outputPath: 'docs-dist',
  favicons: ['/logo.png'],
  logo: '/logo.png',
  themeConfig: {
    name: 'light-design',
    logo: '/logo.png',
    socialLinks: {
      github: 'https://github.com/LiMuBai-ACE/light-design',
    },
    hideHomeNav: true,
  },
  alias: {
    'light-design': path.resolve(__dirname, 'src'),
    '@': path.resolve(__dirname, 'src'),
  },
  publicPath: '/',
  chainWebpack: (config) => {
    config.plugin('copy').use(CopyWebpackPlugin, [
      {
        patterns: [
          {
            from: path.resolve(__dirname, 'src/assets'),
            to: path.resolve(__dirname, 'docs-dist'),
          },
        ],
      },
    ]);
  },
});
