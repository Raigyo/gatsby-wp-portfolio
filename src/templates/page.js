import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

const Page = ({ pageContext: { page } }) => {
  return (
    <Layout>
      <SEO title={page.title} />
      <div>
        <h1>{page.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: page.content }} />
      </div>
    </Layout>
  )
}
export default Page
