import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

const MainMenu = () => {
  const data = useStaticQuery(graphql`
    {
      allWordpressWpApiMenusMenusItems(filter: { name: { eq: "main-menu" } }) {
        nodes {
          name
          count
          items {
            order
            title
            url
            object_slug
          }
        }
      }
    }
  `)

  return (
    <>
      <div>
        {data.allWordpressWpApiMenusMenusItems.nodes[0].items.map(item => (
          <Link to={`/${item.object_slug}`} key={item.title}>
            {item.title}
          </Link>
        ))}
      </div>
    </>
  )
}

export default MainMenu
