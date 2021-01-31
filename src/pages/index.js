import React from "react"
import { Link, graphql } from "gatsby" //highlight-line
import Layout from "../components/layout"
import SEO from "../components/seo"

/* If empty index page use: */
// export default function(){return null};
/* give your main page the name 'home' as url slog in WP */

export default function Home({ data }) {
  return (
    <Layout>
      <SEO title="home" />
      <h1>My WordPress Blog</h1>
      <h2>Posts</h2>
      {data.allWpPost.nodes.map(node => (
        <div key={node.slug}>
          {/* highlight-start */}
          <Link to={node.slug}>
            <p>{node.title}</p>
          </Link>
          {/* highlight-end */}
          <div dangerouslySetInnerHTML={{ __html: node.excerpt }} />
        </div>
      ))}
      <h2>Pages</h2>
      {data.allWpPage.nodes.map(node => (
        <div key={node.slug}>
          <Link to={node.slug}>
            <p>{node.title}</p>
          </Link>
        </div>
      ))}
      <h2>Menus</h2>
      {data.allWordpressWpApiMenusMenusItems.nodes.map(node => (
        <div key={node.slug}>
          <Link to={node.slug}>
            <p>{node.title}</p>
          </Link>
        </div>
      ))}
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    allWpPost(sort: { fields: [date] }) {
      nodes {
        title
        excerpt
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
`
