import { defineConfig } from 'dumi';
import path from 'path';

export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    name: 'light-design',
  },
  alias: {
    'light-design': path.resolve(__dirname, 'src'),
  },
});
