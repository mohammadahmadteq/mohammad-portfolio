import { sveltekit } from '@sveltejs/kit/vite';
import basicSsl from '@vitejs/plugin-basic-ssl';
import { defineConfig } from 'vite';

const useHttps = process.env.HTTPS === '1';

export default defineConfig({
	plugins: [sveltekit(), ...(useHttps ? [basicSsl()] : [])],
	server: {
		fs: {
			allow: ['static']
		}
	}
});
