import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"

// STYLES

const SiteInfoWrapper = styled.div`
  flex-grow: 1;
  color: white;
  margin: auto 0;
`

const SiteTitle = styled.div`
  font-weight: bold;
`

// STYLES

const SiteInfo = () => {
  const data = useStaticQuery(graphql`
    {
      allWordpressSiteMetadata {
        nodes {
          name
          description
        }
      }
    }
  `)

  return (
    <>
      <SiteInfoWrapper>
        <SiteTitle>{data.allWordpressSiteMetadata.nodes[0].name}</SiteTitle>
        <div>{data.allWordpressSiteMetadata.nodes[0].description}</div>
      </SiteInfoWrapper>
    </>
  )
}

export default SiteInfo
