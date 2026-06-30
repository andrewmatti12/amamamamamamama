import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const repoName = 'amamamamamamama'

export default defineConfig({
  plugins: [react()],
  base: process.env.GITLAB_PAGES ? `/${repoName}/` : '/',
})
