import { defineConfig } from 'dumi';
import path from 'path';

export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    name: 'light-design',
    socialLinks: {
      github: 'https://github.com/LiMuBai-ACE/light-design',
    },
    hideHomeNav: true,
  },
  alias: {
    'light-design': path.resolve(__dirname, 'src'),
    '@': path.resolve(__dirname, 'src'),
  },
});
