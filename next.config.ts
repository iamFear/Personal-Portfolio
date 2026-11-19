import type { NextConfig } from "next";

export default {
  output: "export",
  trailingSlash: true,
  poweredByHeader: false,
  experimental: { globalNotFound: true },
} satisfies NextConfig;
