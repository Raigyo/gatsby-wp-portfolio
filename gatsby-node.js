const path = require(`path`)

// Implement the Gatsby API “createPages”. This is
// called after the Gatsby bootstrap is finished so you have
// access to any information necessary to programmatically
// create pages.
// Will create pages for WordPress pages (route : /{slug})
// Will create pages for WordPress posts (route : /post/{slug})
// Actions uses Redux
exports.createPages = async ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions
  createRedirect({
    fromPath: "/",
    toPath: "/home",
    redirectInBrowser: true,
    isPermanent: true,
  })
  // The “graphql” function allows us to run arbitrary
  // queries against the local WordPress graphql schema. Think of
  // it like the site has a built-in database constructed
  // from the fetched data that you can run queries against.
  await graphql(`
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
          acf {
            portfolio_url
          }
        }
      }
    }
  `)
    .then(res => {
      // // POSTS
      const postTemplate = path.resolve("./src/templates/post.js")
      res.data.allWpPost.nodes.map(post => {
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
          context: { post },
        })
      })
      // POSTS / Portfolio type
      const postPortfolioTemplate = path.resolve("./src/templates/portfolio.js")
      res.data.allWordpressWpPortfolio.nodes.map(portfolio => {
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
      res.data.allWpPage.nodes.map(page => {
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
      res.data.allWordpressWpApiMenusMenusItems.nodes.map(menu => {
        createPage({
          path: `/${menu.slug}`,
          component: `/${menuTemplate}`,
          context: { menu },
        })
      })
      // POSTS LIST / 2 per page
      const posts = res.data.allWpPost.nodes
      const postsPerPage = 2
      // 'ceil' round to the upper integer
      const numberOfPages = Math.ceil(posts.length / postsPerPage)
      const blogPostListTemplate = path.resolve(
        "./src/templates/blogPostList.js"
      )
      // prettier-ignore
      Array.from({ length: numberOfPages }).forEach((page, index) => {
      createPage({
        path: index === 0 ? "/blog" : `/blog/${index + 1}`,
        component: `/${blogPostListTemplate}`,
        context: {
          posts: posts.slice(
            index * postsPerPage,
            (index * postsPerPage + postsPerPage)
          ),
          numberOfPages,
          currentPage: index + 1,
        },
      })

      const pageTemplate = path.resolve("./src/templates/page.js")
      _.each(posts, post => {
        createPage({
          path: `/post/${post.node.slug}`,
          component: `/${pageTemplate}`,
          context: post.node,
        })
      })
    })
    }) // \.then

    .catch(err => console.log(err))
}
