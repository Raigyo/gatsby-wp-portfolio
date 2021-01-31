require("dotenv").config()

console.log(
  `This WordPress Endpoint is used: '${process.env.GATSBY_WORDPRESS_URL}'`
)

module.exports = {
  siteMetadata: {
    title: `Gatsby WordPress Starter`,
    description: `Kick off your next, great Gatsby project with this WordPress starter.`,
    author: `@tomphill`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-wordpress-experimental`,
      options: {
        // the only required plugin option for WordPress is the GraphQL url.
        url: `${process.env.GATSBY_WORDPRESS_URL}/graphql`,
      },
    },
    // {
    //   resolve: "gatsby-source-wordpress-menus",
    //   options: {
    //     wordpressUrl: process.env.GATSBY_WORDPRESS_URL,
    //     languages: ["fr", "en"],
    //     enableWpml: true,
    //     allowCache: true,
    //     maxCacheDurationSeconds: 60 * 60 * 24,
    //   },
    // },
    {
      resolve: "gatsby-source-wordpress",
      options: {
        minimizeDeprecationNotice: true,
        baseUrl: `${process.env.GATSBY_WORDPRESS_URL}`,
        protocol: "https",
        hostingWPCOM: false,
        useACF: false,
        verboseOutput: false,
        perPage: 100,
        concurrentRequests: 10,
        includedRoutes: [
          // "**/categories",
          // "**/posts",
          // "**/pages",
          // "**/media",
          // "**/tags",
          // "**/taxonomies",
          // "**/users",
          "**/*/*/menus",
          "**/*/*/menu-locations",
        ],
      },
    },
  ],
}
