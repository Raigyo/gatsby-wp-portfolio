# Gatsby portfolio using Wordpress as headless CMS and GraphQL

*January 2021*

> 🔨 From udemy '[Gatsby JS: Build Gatsby static sites with React & WordPress](https://www.udemy.com/course/gatsby-js-react-wordpress-graphql/)'.


![gatsby-logo](_readme-img/gatsby-logo.jpg)

## Concepts

See the original starter [readme.md](README-Gatsby-cli.md) for more informations about Gatsby.

## WP Json test

- [https://<WP-URL>/wp-json/wp/v2/posts](https://<WP-URL>/wp-json/wp/v2/posts)
- [https://<WP-URL>/wp-json/wp/v2/pages](https://<WP-URL>/wp-json/wp/v2/pages)

## Stack / Dependancies

- [gatsby-source-wordpress-experimental](https://www.npmjs.com/package/gatsby-source-wordpress-experimental): This plugin is the official recommended way to use WordPress with Gatsby.

`npm -i gatsby-source-wordpress-experimental`

In the *gatsby-config.js* of the starter you just set up, update the plugin options for gatsby-source-wordpress-experimental. Change the url option so that it points to your WordPress instance GraphQL url. This should be the full url of your GraphQL endpoint. Eg https://yoursite.com/graphql

**gatsby-config.js**

````js
    require("dotenv").config();
    // ...
    {
      resolve: `gatsby-source-wordpress-experimental`,
      options: {
        // the only required plugin option for WordPress is the GraphQL url.
        url:
          process.env.GATSBY_WORDPRESS_URL ||
          `<URL TO WORDPRESS BACKEND>/graphql`,
      },
    },
````
Note: [WPGraphQL](https://wordpress.org/plugins/wp-graphql/) & [WPGatsby](https://wordpress.org/plugins/wp-gatsby/) must be installed and activated in WP.

- [gatsby-source-wordpress](https://www.npmjs.com/package/gatsby-source-wordpress): Source plugin for pulling data into Gatsby from WordPress sites using the WordPress REST API.. The current version of this plugin will soon be deprecated.

`npm -i gatsby-source-wordpress`

Used to retrieve menus in WP.

**gatsby-config.js**

````js
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
      "**/*/*/menus",
      "**/*/*/menu-locations",
    ],
  },
},
````

## WP Plugins

- [WPGatsby](https://wordpress.org/plugins/wp-gatsby/): This plugin configures your WordPress site to be an optimized source for Gatsby.
- [WPGraphQL](https://wordpress.org/plugins/wp-graphql/): WPGraphQL is a free, open-source WordPress plugin that provides an extendable GraphQL schema and API for any WordPress site.
- [WP API Menus](https://wordpress.org/plugins/wp-api-menus/): This plugin extends the WordPress JSON REST API with new routes for WordPress registered menus. Ex: [https://<WP-URL>/wp-json/wp-api-menus/v2/menus](https://<WP-URL>/wp-json/wp-api-menus/v2/menus)

## Useful links

- [Github repo for Gatsby wordpress theme - tomphill/wp-gatsby-js-theme-starter](https://github.com/tomphill/wp-gatsby-js-theme-starter)
- [Github repo for Gatsby site - tomphill/gatsby_myawesomeportfolio](https://github.com/tomphill/gatsby_myawesomeportfolio)
- [How to use WordPress with React](https://rapidapi.com/blog/wordpress-react-api/)
- [Basic WordPress & Gatsby Setup - Guide to Gatsby WordPress Starter Advanced with Previews, i18n and more](https://dev.to/nevernull/basic-wordpress-gatsby-setup-guide-to-gatsby-wordpress-starter-advanced-with-previews-i18n-and-more-44d8)
- [Creating a Gatsby Site with WordPress Data](https://css-tricks.com/creating-a-gatsby-site-with-wordpress-data/#section-2-porting-posts-and-pages-from-wordpress)
- [Sourcing from WordPress](https://www.gatsbyjs.com/docs/how-to/sourcing-data/sourcing-from-wordpress/)
- [Headless WordPress Dynamic pages with GatsbyJS](https://blog.abmsourav.com/headless-wordpress-dynamic-pages-with-gatsbyjs/)
- [WP - All-in-One WP Migration Import Stuck Solved](https://webhostingadvices.com/all-in-one-wp-migration-import-stuck/)
- [Migrate a WordPress Site to the Jamstack Using Gatsby](https://egghead.io/lessons/gatsby-install-wpgraphql-and-wpgraphiql-plugins-in-wordpress-using-the-command-line)
- [gatsby-source-wordpress: Get menus](https://github.com/gatsbyjs/gatsby/issues/2426)