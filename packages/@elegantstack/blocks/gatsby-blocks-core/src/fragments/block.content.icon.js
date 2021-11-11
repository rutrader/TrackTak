import { graphql } from 'gatsby'

export const query = graphql`
  fragment BlockContentIcon on BlockContentIcon {
    src
    color
    bg
    size
  }
`
