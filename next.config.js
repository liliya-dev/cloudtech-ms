/** @type {import('next').NextConfig} */

// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

const { withSentryConfig } = require("@sentry/nextjs");

const PicoSanity = require("picosanity");

const client = new PicoSanity({
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "development",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  apiVersion: "2021-03-25",
  useCdn: process.env.NODE_ENV === "production",
});

const moduleExports = {
  reactStrictMode: true,
  outputFileTracing: false, // https://github.com/getsentry/sentry-javascript/issues/4103
  async rewrites() {
    return {
      afterFiles: [
        { source: "/sitemap.xml", destination: "/api/sitemap" },
        { source: "/cms", destination: "/cms/index.html" },
        { source: "/cms/:path*", destination: "/cms/index.html" },
      ],
    };
  },
  async redirects() {
    const redirects = await client.fetch(
      `*[_type == "redirect"]{ source, destination, permanent }`
    );
    return redirects;
  },
  images: {
    domains: ["cdn.sanity.io", "images.unsplash.com"],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);
