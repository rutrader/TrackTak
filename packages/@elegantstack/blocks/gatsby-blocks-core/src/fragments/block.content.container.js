import { graphql } from 'gatsby'

export const query = graphql`
  fragment BlockContentContainer on BlockContentContainer {
    variant
    bg
    link {
      type
      link
      target
    }
  }
`
