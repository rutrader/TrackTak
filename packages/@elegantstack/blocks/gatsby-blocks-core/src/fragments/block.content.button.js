import { graphql } from 'gatsby'

export const query = graphql`
  fragment BlockContentButton on BlockContentButton {
    type
    text
    link
    target
    variant
    width
    bg
    icon {
      ...BlockContentIcon
    }
  }
`
