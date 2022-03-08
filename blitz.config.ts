import { BlitzConfig, sessionMiddleware, simpleRolesIsAuthorized } from "blitz"

import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin"
const withVanillaExtract = createVanillaExtractPlugin()

const config: BlitzConfig = {
  middleware: [
    sessionMiddleware({
      cookiePrefix: "myAppName",
      isAuthorized: simpleRolesIsAuthorized,
    }),
  ],
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  /* Uncomment this to customize the webpack config
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    // Important: return the modified config
    return config
  },
  */
}
module.exports = withVanillaExtract(config)
