import React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"
import styled from "styled-components"

// STYLES

const PortfolioItemsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

const PortfolioItem = styled.div`
  width: 300px;
  border: 1px solid #efefef;
  padding: 16px;
  margin: 16px;
`

const PortfolioImage = styled.img`
  max-width: 100%;
`

// \ STYLES

const PortfolioItems = () => {
  const data = useStaticQuery(graphql`
    {
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

  return (
    <>
      <PortfolioItemsWrapper>
        {data.allWordpressWpPortfolio.nodes.map(item => (
          <PortfolioItem key={item.id}>
            <h2>{item.title}</h2>
            <PortfolioImage src={item.featured_image_src} alt="Thumbnail" />
            <div dangerouslySetInnerHTML={{ __html: item.excerpt }} />
            <Link to={`/${item.slug}`}>Read more</Link>
          </PortfolioItem>
        ))}
      </PortfolioItemsWrapper>
    </>
  )
}

export default PortfolioItems
