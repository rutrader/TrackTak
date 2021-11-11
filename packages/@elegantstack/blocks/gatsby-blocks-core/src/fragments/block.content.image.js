import { graphql } from 'gatsby'

export const query = graphql`
  fragment BlockContentImage on BlockContentImage {
    alt
    effects
    radius
    shadow
    border
    position {
      top
      bottom
      left
      right
    }
    width
    maxWidth
    src {
      extension
      publicURL
      childImageSharp {
        gatsbyImageData(
          placeholder: TRACED_SVG
          transformOptions: { cropFocus: NORTH }
          outputPixelDensities: [0.5, 1]
          quality: 90
        )
      }
    }
  }
`
