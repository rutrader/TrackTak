import { graphql } from 'gatsby'

export const query = graphql`
  fragment BlockContentButtons on BlockContentButton {
    ...BlockContentButton
    collection {
      container {
        ...BlockContentContainer
      }
      buttons {
        ...BlockContentButton
        buttons {
          ...BlockContentButton
        }
      }
    }
    buttons {
      ...BlockContentButton
    }
  }
`
