import CopyWebpackPlugin from 'copy-webpack-plugin';
import { defineConfig } from 'dumi';
import path from 'path';
export default defineConfig({
  outputPath: 'docs-dist',
  favicons: ['./favicon/logo.png'],
  logo: './favicon/logo.png',
  themeConfig: {
    name: 'light-design',
    logo: './favicon/logo.png',
    socialLinks: {
      github: 'https://github.com/LiMuBai-ACE/light-design',
    },
    hideHomeNav: true,
  },
  alias: {
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
