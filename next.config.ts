import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
    // Headers CORS para las rutas propias de Next.js (API Routes / Server Actions)
    async headers() {
        return [
            {
                source: "/api/:path*",
                headers: [
                    { key: "Access-Control-Allow-Origin", value: "*" },
                    { key: "Access-Control-Allow-Methods", value: "GET,POST,PUT,PATCH,DELETE,OPTIONS" },
                    { key: "Access-Control-Allow-Headers", value: "Content-Type, Authorization" },
                ],
            },
        ];
    },

    // Proxy reverso: redirige /backend/* → http://localhost:8000/*
    // Esto evita errores CORS en desarrollo al hacer las peticiones
    // desde el mismo origen (Next.js actúa como intermediario).
    async rewrites() {
        return [
            {
                source: "/backend/:path*",
                destination: "http://localhost:8000/:path*",
            },
        ];
    },
};

export default withNextIntl(nextConfig);
