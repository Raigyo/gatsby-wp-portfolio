// Retrieve wp metadata

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import Logo from "./Logo"

// STYLES

const SiteInfoWrapper = styled.div`
  flex-grow: 1;
  color: white;
  margin: auto 0;
  padding-left: 15px;
`

const SiteTitle = styled.div`
  font-weight: bold;
`

const SiteLogo = styled(Logo)`
  display: block;
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
      <SiteLogo />
      <SiteInfoWrapper>
        <SiteTitle>{data.allWordpressSiteMetadata.nodes[0].name}</SiteTitle>
        <div>{data.allWordpressSiteMetadata.nodes[0].description}</div>
      </SiteInfoWrapper>
    </>
  )
}

export default SiteInfo
