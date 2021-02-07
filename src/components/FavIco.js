import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Helmet } from "react-helmet"

const FavIco = () => {
  const data = useStaticQuery(graphql`
    {
      allWordpressWpFavicon {
        nodes {
          url
        }
      }
    }
  `)
  return (
    <>
      <Helmet>
        <link rel="icon" href={data.allWordpressWpFavicon.nodes[0].url} />
      </Helmet>
    </>
  )
}

export default FavIco
