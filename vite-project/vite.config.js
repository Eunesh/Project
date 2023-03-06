import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy:{
      '/login': 'http://localhost:3000',
      '/register': 'http://localhost:3000',
      '/membership': 'http://localhost:3000',
      '/logout': 'http://localhost:3000',
      '/verify_payment': 'http://localhost:3000',
      '/membershipInfo': 'http://localhost:3000',
      '/expiredmembership': 'http://localhost:3000',
      
    }

  },
  plugins: [react()]
})
