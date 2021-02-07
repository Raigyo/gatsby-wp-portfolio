# JAMstack: Gatsby portfolio using Wordpress as headless CMS API and GraphQL

*January - February 2021*

> 🔨 Portfolio and blog project using a Wordpress as API. Datas are fetched with GraphQL and generated as a static website using Gatsby. From udemy '[Gatsby JS: Build Gatsby static sites with React & WordPress](https://www.udemy.com/course/gatsby-js-react-wordpress-graphql/)'.

See the static site generated on [Netlify](https://brave-tereshkova-73f0c7.netlify.app/home).

![gatsby-logo](_readme-img/gatsby-logo.jpg)

![gatsby-capture.png](_readme-img/gatsby-capture-0.png)

![wp-capture.png](_readme-img/wp-capture-01.png)

GatsbyJS is a React-based, GraphQL powered, static site generator.

It uses powerful preconfiguration to build a website that uses only static files for incredibly fast page loads, service workers, code splitting, server-side rendering, intelligent image loading, asset optimization, and data prefetching. All out of the box.

In this project Wordpress is used as API.

Gatsby is what we call **Jamstack**.

JavaScript

Dynamic functionalities are handled by JavaScript. There is no restriction on which framework or library you must use.

APIs

Server side operations are abstracted into reusable APIs and accessed over HTTPS with JavaScript. These can be third party services or your custom function.

Markup

Websites are served as static HTML files. These can be generated from source files, such as Markdown, using a Static Site Generator.

## Front-end: Gatsby

See the original starter [readme.md](README-Gatsby-cli.md) for more informations about Gatsby.

Gatsby retrieve some datas from WP using GraphQL, posts, pages, menus, custom content.

![gatsby-capture.png](_readme-img/gatsby-capture.png)

### Structure

````
/
|-- /.cache
|-- /plugins
|-- /public
|-- /src
    |-- /components
        |-- FavIco.js
        |-- layout.js
        |-- Logo.js
        |-- MainMenu.js
        |-- PortfolioItems.js
        |-- seo.js
        |-- SiteInfo.js
    |-- /pages
        |-- 404.js
        |-- index.js
    |-- /templates
        |-- blogPostList.js
        |-- menu.js
        |-- page.js
        |-- portfolio.js
        |-- portfolioUnderContent.js
        |-- post.js
|-- /static
|-- gatsby-config.js
|-- gatsby-node.js
|-- gatsby-ssr.js
|-- gatsby-browser.js
````

### Stack / Dependancies

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
- [styled-components](https://www.gatsbyjs.com/docs/how-to/styling/styled-components/): Styled Components lets you use actual CSS syntax inside your components. Styled Components is a variant on “CSS-in-JS”—which solves many of the problems with traditional CSS..

`npm install gatsby-plugin-styled-components styled-components babel-plugin-styled-components`

## Back-end: Wordpress

![wp-capture.png](_readme-img/wp-capture.png)

## Theme

We use the following content as theme: ./wp-content/themes/wp-gatsby-js-theme-starter-master

Zip it and import it as theme in WP.

It's a blank theme including template *portfolio_under_content.php* and some customized content in *functions.php* (cfr. infra).

### Type of contents

#### Pages

*Web and App Development*

- Title + content
- URL Slug: home

*Portfolio*

Several posts:

- Title + content
- URL Slug: portfolio
- Template: Portfolio items below content (created in WP using PHP, cfr. infra))

#### Posts

Several posts:

- Title + content
- Excerp

Note: in Wordpress, even if it generates excerpt automatically, we need to insert them because when we migrate the automatic version disappear.

#### Custom Fields (Advanced Custom Fields / ACF to REST-API ): Portfolio

- Field Label:
- Field Name
- Required: Yes
- Rules: Show this field group if Post Type is equal to Portfolio

![wp-custom-field.png](_readme-img/wp-custom-field.png)

#### Custom posts: Portfolio

- Title + content
- Excerp
- Image

#### Menus (Appearance/Menus)

- Menu Name: main-menu

*Home*

- Type: page
- Navigation Label: Home

Links to the pages of the website.

*Portfolio*

- Type: page
- Navigation Label: Portfolio

Links to the portfolio posts of the website.

*Blog*

- Type: Custom link
- Navigation Label: Blog
- URL: /blog

## Permalink Settings (Settings/Permalink)

Custom Structure: /post/%postname%/

## Logo and favicon

Add a logo and a favicon in *Appearance/Customize/Site identity*.

### WP Plugins

- [WPGatsby](https://wordpress.org/plugins/wp-gatsby/): This plugin configures your WordPress site to be an optimized source for Gatsby.
- [WPGraphQL](https://wordpress.org/plugins/wp-graphql/): WPGraphQL is a free, open-source WordPress plugin that provides an extendable GraphQL schema and API for any WordPress site.
- [WP API Menus](https://wordpress.org/plugins/wp-api-menus/): This plugin extends the WordPress JSON REST API with new routes for WordPress registered menus. Ex: [https://<WP-URL>/wp-json/wp-api-menus/v2/menus](https://<WP-URL>/wp-json/wp-api-menus/v2/menus)
- [Advanced Custom Fields](https://fr.wordpress.org/plugins/advanced-custom-fields/): Use the Advanced Custom Fields plugin to take full control of your WordPress edit screens & custom field data.
- [ACF to REST API](https://fr.wordpress.org/plugins/acf-to-rest-api/): Exposes Advanced Custom Fields Endpoints in the WordPress REST API.
- [Wordpress api logo plugin](https://github.com/tomphill/wp-rest-api-logo): Used to retrieve Logo defined in 'Appearance/Customize/Site identity/Logo).
- [Wordpress api favicon plugin](https://github.com/tomphill/wp-rest-api-favicon): Used to retrieve Favicon defined in 'Appearance/Customize/Site identity/Site icon).

### WP Json test

````
/wp-json/wp/v2/posts
/wp-json/wp/v2/pages
/wp-json/wp/v2/portfolio
/wp-json/wp-api-menus/v2/menus
/wp-json/wp/v2/favicon
/wp-json/wp/v2/logo
````

### WP: functions.php

We add custom posts content in WP (portfolio).

````php
<?php
add_theme_support( 'custom-logo' );
add_theme_support( 'menus' );
add_theme_support( 'post-thumbnails' );

function create_custom_portfolio_post_type(){
	register_post_type('portfolio',
					  array(
					  	'labels' => array(
							'name' => __('Portfolio'),
							'singular_name' => __('Portfolio')
            ),
              'public' => true,
						  'show_in_admin_bar' => true,
						  'show_in_rest' => true
					  ));
	add_post_type_support('portfolio', array('thumbnail', 'excerpt'));
}

add_action('init', 'create_custom_portfolio_post_type');

// Here we add the images of url of portfolio posts in JSON
// as featured_image_src
add_action( 'rest_api_init', 'add_thumbnail_to_JSON' );
function add_thumbnail_to_JSON() {
//Add featured image
register_rest_field(
    'porfolio', // Where to add the field (Here, blog posts. Could be an array)
    'featured_image_src', // Name of new field (You can call this anything)
    array(
        'get_callback'    => 'get_image_src',
        'update_callback' => null,
        'schema'          => null,
         )
    );
}

function get_image_src( $object, $field_name, $request ) {
  $feat_img_array = wp_get_attachment_image_src(
    $object['featured_media'], // Image attachment ID
    'full',  // Size.  Ex. "thumbnail", "large", "full", etc..
    true // Whether the image should be treated as an icon.
  );
  return $feat_img_array[0];
}
````

** gatsby-config.js **

````js
    {
      resolve: "gatsby-source-wordpress",
      options: {
        // ..
        includedRoutes: [
          // ...
          "**/*/*/portfolio",
        ],
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
- [WP - All-in-One WP Migration Import Stuck Solved](https://webhostingadvices.com/all-in-one-wp-migration-import-stuck/)
- [Migrate a WordPress Site to the Jamstack Using Gatsby](https://egghead.io/lessons/gatsby-install-wpgraphql-and-wpgraphiql-plugins-in-wordpress-using-the-command-line)
- [gatsby-source-wordpress: Get menus](https://github.com/gatsbyjs/gatsby/issues/2426)
- [Dynamic Routing in Gatsby](https://www.qed42.com/blog/dynamic-routing-gatsby#:~:text=Dynamic%20routing%20means%20there%20is,is%20associated%20with%20each%20link.)
- [Preview in Headless Wordpress with Gatsby](https://www.tonyle.dev/headless-wordpress-preview/)
- [Unsplash - The internet’s source of freely-usable images.](https://unsplash.com/)
- [WP Rest API: details of latest post including featured media url in one request?](https://wordpress.stackexchange.com/questions/241271/wp-rest-api-details-of-latest-post-including-featured-media-url-in-one-request)
- [Favicon & App Icon Generator](https://www.favicon-generator.org/)
- [Pagination in GatsbyJS](https://nickymeuleman.netlify.app/blog/gatsby-pagination)
- [How to set up Meta Tags with Gatsby Helmet](https://graphicscove.com/how-to-set-up-meta-tags-with-gatsby-helmet)