/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        BASE_URL: process.env.NEXTAUTH_URL,
    }
};

export default nextConfig;
