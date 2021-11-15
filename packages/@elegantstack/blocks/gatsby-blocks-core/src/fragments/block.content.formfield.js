import { graphql } from 'gatsby'

export const query = graphql`
  fragment BlockContentFormField on BlockContentFormField {
    identifier
    type
    value
    compact
    required
    placeholder {
      ...BlockContentText
    }
    icon {
      ...BlockContentIcon
    }
  }
`
