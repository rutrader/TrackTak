import React from 'react'
import { Link } from 'theme-ui'
import google from '../../assets/google-play-badge.svg'
import googleWhite from '../../assets/google-play-badge-white.svg'
import apple from '../../assets/apple-store-badge.svg'
import appleWhite from '../../assets/apple-store-badge-white.svg'

const styles = {
  button: {
    display: `inline-block`,
    width: [`150px`, `167px`],
    height: [`45px`, `50px`],
    backgroundRepeat: `no-repeat`,
    backgroundPosition: `center center`,
    backgroundSize: `contain`,
    backgroundColor: `transparent`,
    transition: `all 250ms ease`,
    p: 0,
    ':hover': {
      opacity: 0.8
    }
  },
  google: {
    backgroundImage: `url(${google})`
  },
  'google-white': {
    backgroundImage: `url(${googleWhite})`
  },
  apple: {
    backgroundImage: `url(${apple})`
  },
  'apple-white': {
    backgroundImage: `url(${appleWhite})`
  }
}

const AppButton = ({ variant, children, link }) => (
  <Link
    variant={null}
    sx={{
      ...styles.button,
      ...styles[variant]
    }}
    href={link}
    target='_blank'
    rel='noreferrer'
    alt={children}
    title={children}
  />
)

export default AppButton
