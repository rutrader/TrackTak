import { graphql } from 'gatsby'

export const query = graphql`
  fragment BlockContentText on BlockContentText {
    text
    textGroup
    color
    space
    variant
  }
`
