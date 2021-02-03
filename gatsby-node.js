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
      allWordpressWpPortfolio: { nodes: allPortfolioPosts },
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
          template {
            templateName
          }
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
      allWordpressWpPortfolio {
        nodes {
          id
          title
          slug
          excerpt
          content
          featured_image_src
        }
      }
    }
  `)

  // POSTS
  const postTemplate = path.resolve("./src/templates/post.js")
  allPosts.map(post => {
    // console.log("post items: ", post)
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

  // POSTS / Portfolio type
  const postPortfolioTemplate = path.resolve("./src/templates/portfolio.js")
  allPortfolioPosts.map(portfolio => {
    // console.log("portfolio items: ", portfolio)
    createPage({
      path: `/${portfolio.slug}`,
      component: `/${postPortfolioTemplate}`,
      context: { portfolio },
    })
  })

  // PAGES
  const pageTemplate = path.resolve("./src/templates/page.js")
  const portfolioUnderContentTemplate = path.resolve(
    "./src/templates/portfolioUnderContent.js"
  )
  allPages.map(page => {
    // console.log("page items: ", page)
    // console.log("page.template.templateName: ", page.template.templateName)
    createPage({
      path: `/${page.slug}`,
      component:
        page.template.templateName === "Portfolio Items Below Content"
          ? `/${portfolioUnderContentTemplate}`
          : `/${pageTemplate}`,
      context: { page },
    })
  })

  // MENUS
  const menuTemplate = path.resolve("./src/templates/menu.js")
  allMenus.map(menu => {
    // console.log("menu items: ", menu)
    createPage({
      path: `/${menu.slug}`,
      component: `/${menuTemplate}`,
      context: { menu },
    })
  })
}
