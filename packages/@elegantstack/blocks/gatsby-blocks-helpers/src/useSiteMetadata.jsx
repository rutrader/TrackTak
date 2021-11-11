import { useStaticQuery, graphql } from 'gatsby'

const useSiteMetadata = () => {
  const { site } = useStaticQuery(siteMetadataQuery)
  return site.siteMetadata
}

const siteMetadataQuery = graphql`
  query BlocksSiteMetadataQuery {
    site {
      ...BlocksSiteMetadata
    }
  }
`
export default useSiteMetadata
