// Main layout component

import React from "react"
import MainMenu from "./MainMenu"
import styled, { createGlobalStyle } from "styled-components"

// STYLES

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i,800,800i');
  body, html{
    font-family: 'Open Sans', sans-serif;
    margin: 0 !important;
  }
`

const LayoutWrapper = styled.div`
  max-width: 960px;
  padding: 10px;
  margin: 0 auto;
`

// \ STYLES

const Layout = ({ children }) => (
  <div>
    <GlobalStyles />
    <MainMenu />
    <LayoutWrapper>{children}</LayoutWrapper>
  </div>
)

export default Layout
