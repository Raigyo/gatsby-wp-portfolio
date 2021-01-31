import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

const Menu = ({ pageContext: { menu } }) => {
  return (
    <Layout>
      <SEO title={menu.items.title} />
      <div>
        <h1>{menu.items.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: menu.item.url }} />
      </div>
    </Layout>
  )
}
export default Menu
