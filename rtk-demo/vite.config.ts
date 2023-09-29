/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	test: {
		environment: 'jsdom',
		setupFiles: ['./tests/setup.ts'],
		globals: true,
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src/'),
			'@redux': `${path.resolve(__dirname, './src/redux/')}`,
			'@features': `${path.resolve(__dirname, './src/redux/features/')}`,
			'@store': `${path.resolve(__dirname, './src/redux/store.ts')}`,
			'@redux-test-utils': `${path.resolve(__dirname, './tests/redux-test-utils.tsx')}`,
		},
	},
});
