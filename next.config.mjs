/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    additionalData: `@import "app/_styles/_variables.scss";`,
  },
};

export default nextConfig;
