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
			'@zustand': `${path.resolve(__dirname, './src/zustand/')}`,
			'@zustand-test-utils': `${path.resolve(
				__dirname,
				'./tests/zustand-test-utils.ts'
			)}`,
		},
	},
});
