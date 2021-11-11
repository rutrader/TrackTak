import { graphql } from 'gatsby'

export const query = graphql`
  fragment BlockContentForm on BlockContentForm {
    action
    multiStep
    text {
      ...BlockContentText
    }
    fields {
      ...BlockContentFormField
    }
    buttons {
      ...BlockContentButton
    }
  }
`
