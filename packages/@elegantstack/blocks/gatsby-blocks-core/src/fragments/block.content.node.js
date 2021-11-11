import { graphql } from 'gatsby'

export const query = graphql`
  fragment BlockContentNode on BlockContent {
    identifier
    page
    container {
      ...BlockContentContainer
    }
    text {
      ...BlockContentText
    }
    images {
      ...BlockContentImage
    }
    avatar {
      ...BlockContentImage
    }
    icon {
      ...BlockContentIcon
    }
    map {
      ...BlockContentMap
    }
    buttons {
      ...BlockContentButtons
    }
    form {
      ...BlockContentForm
    }
  }
`
