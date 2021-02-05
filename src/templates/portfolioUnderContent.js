import React from "react"
import Layout from "../components/layout"
import PortfolioItems from "../components/PortfolioItems"
import SEO from "../components/seo"

const Page = ({ pageContext: { page } }) => {
  return (
    <Layout>
      <SEO title={page.title} />
      <h1>{page.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: page.content }} />
      <PortfolioItems />
    </Layout>
  )
}
export default Page
