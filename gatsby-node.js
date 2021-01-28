const path = require(`path`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const {
    data: {
      allWpPost: { nodes: allPosts },
      allWpPage: { nodes: allPages },
    },
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
    }
  `)
  // if (data.errors) {
  //   console.error(data.errors)
  // }

  //const { allWpPost } = wpData.data
  //console.log(wpData.data)
  allPosts.map(post => {
    createPage({
      path: `/${post.slug}`,
      component: require.resolve(`./src/templates/post.js`),
      context: { post },
    })
  })
  allPages.map(page => {
    createPage({
      path: `/${page.slug}`,
      component: require.resolve(`./src/templates/page.js`),
      context: { page },
    })
  })
}
