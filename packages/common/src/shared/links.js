export const landingPageLinks = [
  { to: '/contact-us', text: 'Contact' },
  {
    to: '/about-us',
    text: 'About us'
  }
]

export const headerLinks = [
  { to: '/how-to-do-a-dcf', text: 'Documentation' },
  { to: '/blogs', text: 'Blogs' },
  ...landingPageLinks
]

if (process.env.GATSBY_PREMIUM_ENABLED === 'true') {
  headerLinks.push({
    to: '/pricing',
    text: 'Upgrade plan',
    relative: true
  })
}
