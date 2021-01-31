const path = require(`path`)

// Implement the Gatsby API “createPages”. This is
// called after the Gatsby bootstrap is finished so you have
// access to any information necessary to programmatically
// create pages.
// Will create pages for WordPress pages (route : /{slug})
// Will create pages for WordPress posts (route : /post/{slug})
// Actions uses Redux
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  /* if empty index */
  // const { createPage, createRedirect } = actions
  // createRedirect({ fromPath: '/', toPath: '/home', redirectInBrowser: true, isPermanent: true })
  const {
    data: {
      allWpPost: { nodes: allPosts },
      allWpPage: { nodes: allPages },
      allWordpressWpApiMenusMenusItems: { nodes: allMenus },
    },
    // The “graphql” function allows us to run arbitrary
    // queries against the local WordPress graphql schema. Think of
    // it like the site has a built-in database constructed
    // from the fetched data that you can run queries against.
  } = await graphql(`
    {
      allWpPost(sort: { fields: [date] }) {
        nodes {
          title
          excerpt
          content
          slug
        }
      }
      allWpPage(sort: { fields: [date] }) {
        nodes {
          id
          slug
          status
          title
          content
        }
      }
      allWordpressWpApiMenusMenusItems {
        nodes {
          name
          count
          items {
            order
            title
            url
          }
        }
      }
    }
  `)
  // if (data.errors) {
  //   console.error(data.errors)
  // }

  // POSTS
  const postTemplate = path.resolve("./src/templates/post.js")
  allPosts.map(post => {
    // Gatsby uses Redux to manage its internal state.
    // Plugins and sites can use functions like "createPage"
    // to interact with Gatsby.
    createPage({
      // Each page is required to have a `path` as well
      // as a template component. The `context` is
      // optional but is often necessary so the template
      // can query data specific to each page.
      path: `/${post.slug}`,
      component: `/${postTemplate}`,
      // component: require.resolve(`./src/templates/post.js`),
      context: { post },
    })
  })

  // PAGES
  const pageTemplate = path.resolve("./src/templates/page.js")
  allPages.map(page => {
    createPage({
      path: `/${page.slug}`,
      //component: require.resolve(`./src/templates/page.js`),
      component: `/${pageTemplate}`,
      context: { page },
    })
  })

  // MENUS
  const menuTemplate = path.resolve("./src/templates/menu.js")
  allMenus.map(menu => {
    console.log("menu items: ", menu)
    createPage({
      path: `/${menu.slug}`,
      component: `/${menuTemplate}`,
      context: { menu },
    })
  })
}
