import { graphql } from 'gatsby'

export const query = graphql`
  fragment BlockContentMap on BlockContentMap {
    lat
    lng
    zoom
  }
`
