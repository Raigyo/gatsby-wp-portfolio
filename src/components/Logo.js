import React from "react"
import { useStaticQuery, graphql } from "gatsby"

const Logo = () => {
  const data = useStaticQuery(graphql`
    {
      allWordpressWpLogo {
        nodes {
          url
        }
      }
    }
  `)
  return (
    <>
      <div>
        <img src={data.allWordpressWpLogo.nodes[0].url} alt="logo" />
      </div>
    </>
  )
}

export default Logo
