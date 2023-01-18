import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import envCompatible from 'vite-plugin-env-compatible';

export default defineConfig(({ mode }) => {
  let env = loadEnv(mode, process.cwd(), 'REACT_APP');

  // Optional: Populate NODE_ENV with the current mode (development/production)
  env.NODE_ENV = mode;

  const envWithProcessPrefix = {
    'process.env': `${JSON.stringify(env)}`,
  };

  return {
    define: envWithProcessPrefix,
    envPrefix: 'REACT_APP_',
    resolve: {
      alias: [
        {
          find: 'assets',
          replacement: path.resolve(__dirname, 'src/assets'),
        },
        {
          find: 'components',
          replacement: path.resolve(__dirname, 'src/components'),
        },
        {
          find: 'config',
          replacement: path.resolve(__dirname, 'src/config'),
        },
        {
          find: 'context',
          replacement: path.resolve(__dirname, 'src/context'),
        },
        {
          find: 'helpers',
          replacement: path.resolve(__dirname, 'src/helpers'),
        },
        {
          find: 'hooks',
          replacement: path.resolve(__dirname, 'src/hooks'),
        },
        {
          find: 'i18n',
          replacement: path.resolve(__dirname, 'src/i18n'),
        },
        {
          find: 'model',
          replacement: path.resolve(__dirname, 'src/model'),
        },
        {
          find: 'pages',
          replacement: path.resolve(__dirname, 'src/pages'),
        },
        {
          find: 'reducers',
          replacement: path.resolve(__dirname, 'src/reducers'),
        },
        {
          find: 'theme',
          replacement: path.resolve(__dirname, 'src/theme'),
        },
      ],
    },
    plugins: [react(), envCompatible],
    server: {
      open: true,
    },
  };
});
