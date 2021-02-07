import React from "react"
import Layout from "../components/layout"
import { Link } from "gatsby"
import styled from "styled-components"
import SEO from "../components/seo"

// STYLES

const Pagination = styled.div`
  display: flex;
  justify-content: flex-end;
`

const PageNumberWrapper = styled.div`
  border: 1px solid #eee;
  background: ${props => (props.isCurrentPage ? "#eee" : "white")};
`

const PageNumber = styled(Link)`
  display: block;
  padding: 8px 16px;
`

// \ STYLES

const BlogPostList = ({ pageContext }) => {
  return (
    <Layout>
      {pageContext.posts.map(post => (
        <div key={post.date}>
          <SEO title={post.title} />
          <h3 dangerouslySetInnerHTML={{ __html: post.title }} />
          <small>{post.date}</small>
          <p dangerouslySetInnerHTML={{ __html: post.excerpt }} />
          <div>
            <Link to={`/post/${post.slug}`}>Read more</Link>
          </div>
        </div>
      ))}
      <Pagination>
        {Array.from({ length: pageContext.numberOfPages }, (_, index) => (
          <PageNumberWrapper
            key={index}
            isCurrentPage={index + 1 === pageContext.currentPage}
          >
            <PageNumber to={index === 0 ? "/blog" : `/blog/${index + 1}`}>
              {index + 1}
            </PageNumber>
          </PageNumberWrapper>
        ))}
      </Pagination>
    </Layout>
  )
}
export default BlogPostList
