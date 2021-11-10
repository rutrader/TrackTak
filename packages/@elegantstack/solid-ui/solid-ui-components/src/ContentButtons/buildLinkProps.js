import { Link as GLink } from 'gatsby'
import { Button, Link } from 'theme-ui'
import AppButton from '@solid-ui-components/AppButton'
import VideoButton from '@solid-ui-components/VideoButton'

const isValidHttpUrl = link => {
  let url
  const protocols = ['http:', 'https:', 'mailto:']
  try {
    url = new URL(link)
  } catch (_) {
    return false
  }
  return protocols.includes(url.protocol)
}

const buildLinkProps = ({
  content: { type, link, target, variant },
  setActiveModal,
  setActiveTab
}) => {
  // Button or Text Link ?
  const isInternalLink = link && !isValidHttpUrl(link)
  const isLinkVariant = variant?.startsWith('links.')

  let linkProps
  let Component = isLinkVariant ? Link : Button

  switch (type) {
    case 'VIDEO':
      Component = VideoButton
      linkProps = { link }
      break
    case 'APP':
      Component = AppButton
      linkProps = { link }
      break
    case 'MODAL':
      linkProps = {
        onClick: e => {
          e.preventDefault()
          setActiveModal(link)
        },
        href: '#'
      }
      break
    case 'TAB':
      linkProps = {
        tabindex: '0',
        onClick: () =>
          setActiveTab({
            identifier: link.split('.')[0],
            index: parseInt(link.split('.')[1])
          })
      }
      break
    case 'ANCHOR':
      linkProps = { href: link, as: 'a', offset: 150 }
      break
    case 'SUBMIT':
      linkProps = { type: 'submit' }
      break
    case 'PAGE':
      linkProps = {
        [isInternalLink ? 'to' : 'href']: link || undefined,
        as: isInternalLink ? GLink : 'a',
        target
      }
      break
    default:
      linkProps = {}
      break
  }

  linkProps.className = isLinkVariant
    ? 'button-group-link'
    : 'button-group-button'

  return { Component, linkProps }
}

export default buildLinkProps
