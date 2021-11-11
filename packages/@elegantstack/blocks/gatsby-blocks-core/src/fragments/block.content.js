import { graphql } from 'gatsby'

export const query = graphql`
  fragment BlockContent on BlockContent {
    ...BlockContentNode
    collection {
      ...BlockContentNode
      collection {
        ...BlockContentNode
      }
    }
  }
`
