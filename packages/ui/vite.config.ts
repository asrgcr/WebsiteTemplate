import {defineConfig, ProxyOptions} from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from "@tailwindcss/vite";

const apiProxy: ProxyOptions = {
    target: "http://localhost:3000/api",
    changeOrigin: true,
    secure: false
}

// https://vite.dev/config/
export default defineConfig({
    build: { emptyOutDir: true , outDir: "../../build/ui"},
    plugins: [
        react(),
        tailwindcss()
    ],
    server:{
        open: true,
        port: 8080,
        host: "0.0.0.0",
        proxy: {
            "/api": apiProxy
        }
    }
})
