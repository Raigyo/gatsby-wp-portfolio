# Gatsby JS

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
    {
      resolve: `gatsby-source-wordpress-experimental`,
      options: {
        // the only required plugin option for WordPress is the GraphQL url.
        url:
          process.env.WPGRAPHQL_URL ||
          `https://raigyo-dev.be/gatsby-portfolio/graphql`,
      },
    },
````

## Useful links

- [How to use WordPress with React](https://rapidapi.com/blog/wordpress-react-api/)