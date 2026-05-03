/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  webpack(config, { isServer }) {
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push('firebase-admin');
    }
    return config;
  },
};

export default nextConfig;