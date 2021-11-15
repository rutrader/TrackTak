import React, { Children } from 'react'
import { useRecentPosts } from '@helpers-blog'
import getImageVariant from '@components/utils/getImageVariant'

const WithRecentPosts = ({ children, limit = 3 }) => {
  const recentPosts = useRecentPosts()

  if (!recentPosts || recentPosts.length === 0) return null

  const collection = recentPosts.map(post => ({
    container: {
      variant: 'cards.interactive',
      link: {
        type: 'PAGE',
        link: post.slug
      }
    },
    text: [
      {
        text: post.category.name,
        color: 'alphaDark'
      },
      {
        text: post.title,
        variant: 'h5'
      },
      {
        text: post.excerpt
      },
      {
        text: post.author.name,
        color: 'omegaDark'
      },
      {
        text: post.date
      },
      {
        text: `${post.timeToRead} min read`
      }
    ],
    images: [
      {
        alt: post.title,
        src: {
          childImageSharp: {
            gatsbyImageData: getImageVariant(post.thumbnail, 'vertical')
          }
        }
      }
    ],
    avatar: {
      src: {
        childImageSharp: {
          gatsbyImageData: getImageVariant(post.author.thumbnail, 'small')
        }
      }
    }
  }))

  const wrappedBlock = Children.map(children, child =>
    React.cloneElement(child, {
      ...child.props,
      content: {
        text: child.props?.text || null,
        buttons: child.props?.buttons || null,
        collection: collection.splice(0, limit)
      }
    })
  )

  return wrappedBlock
}

export default WithRecentPosts

WithRecentPosts.defaultProps = {
  limit: 3
}
