import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import styled from "styled-components"
import SiteInfo from "./SiteInfo"

// STYLES

const MainMenuWrapper = styled.div`
  display: flex;
  background-color: rgb(3, 27, 77);
`

const MainMenuInner = styled.div`
  max-width: 960px;
  margin: 0 auto;
  display: flex;
  width: 960px;
  height: 100%;
`

// Used with <LINK> component and passed as props
const MenuItem = styled(Link)`
  color: white;
  display: block;
  padding: 16px 16px;
`

// \ STYLES

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
      <MainMenuWrapper>
        <MainMenuInner>
          <SiteInfo />
          {data.allWordpressWpApiMenusMenusItems.nodes[0].items.map(item => (
            <MenuItem to={`/${item.object_slug}`} key={item.title}>
              {item.title}
            </MenuItem>
          ))}
        </MainMenuInner>
      </MainMenuWrapper>
    </>
  )
}

export default MainMenu
