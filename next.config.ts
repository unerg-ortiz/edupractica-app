import createNextIntlPlugin from "next-intl/plugin";
import type { Config } from "tailwindcss";
import withMT from "@material-tailwind/react/utils/withMT";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {};

// Combine Material Tailwind and NextIntl
const combinedConfig = withMT({
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} as Config);

export default withNextIntl(nextConfig);
