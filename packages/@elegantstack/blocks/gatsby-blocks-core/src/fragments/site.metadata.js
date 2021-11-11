import { graphql } from 'gatsby'

export const query = graphql`
  fragment BlocksSiteMetadata on Site {
    siteMetadata {
      title
      name
      description
    }
  }
`
