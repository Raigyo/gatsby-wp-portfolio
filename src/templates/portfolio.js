import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import styled from "styled-components"

// STYLES

const FeaturedImage = styled.img`
  max-width: 300px;
  margin: 16px 0;
`

// \ STYLES

const Portfolio = ({ pageContext: { portfolio } }) => {
  return (
    <Layout>
      <SEO title={portfolio.title} />
      <div>
        <h1>{portfolio.title}</h1>
        <strong>Website url: </strong>
        <a
          href={portfolio.acf.portfolio_url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {portfolio.acf.portfolio_url}
        </a>
        <div>
          <FeaturedImage src={portfolio.featured_image_src} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: portfolio.content }} />
      </div>
    </Layout>
  )
}
export default Portfolio
