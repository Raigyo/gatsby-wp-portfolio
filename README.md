# Gatsby portfolio using Wordpress as headless CMS and GraphQL

*January 2021*

> 🔨 From udemy '[Gatsby JS: Build Gatsby static sites with React & WordPress](https://www.udemy.com/course/gatsby-js-react-wordpress-graphql/)'.



![gatsby-logo](_readme-img/gatsby-logo.jpg)

## Concepts

See the original starter [readme.md](README-Gatsby-cli.md) for more informations about Gatsby.

## gatsby-node.js /templates

- [Post - hello-world](http://localhost:8000/post/hello-world)
- [Page - sample-page](http://localhost:8000/page/sample-page)

## Stack

[gatsby-source-wordpress-experimental](https://www.npmjs.com/package/gatsby-source-wordpress-experimental): This plugin is the official recommended way to use WordPress with Gatsby.

`npm -i gatsby-source-wordpress-experimental`

Install and activate both of the following plugins in a live WordPress instance:

- [WPGraphQL](https://wordpress.org/plugins/wp-graphql/)
- [WPGatsby](https://wordpress.org/plugins/wp-gatsby/)

In the *gatsby-config.js* of the starter you just set up, update the plugin options for gatsby-source-wordpress-experimental. Change the url option so that it points to your WordPress instance GraphQL url. This should be the full url of your GraphQL endpoint. Eg https://yoursite.com/graphql

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

## Useful links

- [Github repo for Gatsby wordpress theme - tomphill/wp-gatsby-js-theme-starter](https://github.com/tomphill/wp-gatsby-js-theme-starter)
- [Github repo for Gatsby site - tomphill/gatsby_myawesomeportfolio](https://github.com/tomphill/gatsby_myawesomeportfolio)
- [How to use WordPress with React](https://rapidapi.com/blog/wordpress-react-api/)
- [Basic WordPress & Gatsby Setup - Guide to Gatsby WordPress Starter Advanced with Previews, i18n and more](https://dev.to/nevernull/basic-wordpress-gatsby-setup-guide-to-gatsby-wordpress-starter-advanced-with-previews-i18n-and-more-44d8)
- [Creating a Gatsby Site with WordPress Data](https://css-tricks.com/creating-a-gatsby-site-with-wordpress-data/#section-2-porting-posts-and-pages-from-wordpress)
- [Sourcing from WordPress](https://www.gatsbyjs.com/docs/how-to/sourcing-data/sourcing-from-wordpress/)
- [Headless WordPress Dynamic pages with GatsbyJS](https://blog.abmsourav.com/headless-wordpress-dynamic-pages-with-gatsbyjs/)