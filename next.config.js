/** @type {import('next').NextConfig} */
const webpack = require("webpack")
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["img.freepik.com", "lh3.googleusercontent.com"],
  },
  env: {
    NEXT_PUBLIC_SANITY_TOKEN:
      "skx5Cj1lfcng8RajcExditqrdNcydOfAv9Uv85kTmPZ7bqXVCCm1tF8ou97V9gzAuIjeE1tTCoJqJquNaj8Wg2StCkKciphdk4vrxezP0kaPotqfFft8OPTmv8Mp7SueHMTeryMYT7B3JQaDVybMwion1b1HKBwvvUDClaDXq5AI0QYUDMgg",
    NEXT_PUBLIC_GOOGLE_API_TOKEN:
      "432245280856-to3mstfg2ndujtrrl649h9l7dqj29q4s.apps.googleusercontent.com",
    NEXT_PUBLIC_BASE_URL: "http://localhost:3000",
  },
}

module.exports = nextConfig
