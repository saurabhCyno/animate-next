import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // `/services/custom-tattoos` is now the permanent tattoo page.
      {
        source: "/services/custom-tattoos",
        destination: "/services/permanent-tattoo",
        permanent: true,
      },
      // Tolerate the plural spelling of the new route.
      {
        source: "/services/permanent-tattoos",
        destination: "/services/permanent-tattoo",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
