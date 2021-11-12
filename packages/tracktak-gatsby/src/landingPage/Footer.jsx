import { Box, Typography, IconButton, Link } from '@mui/material'
import React from 'react'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import RedditIcon from '@mui/icons-material/Reddit'
import dayjs from 'dayjs'
import { tracktakLogoIcon, headerLinks } from '@tracktak/common'
import { Link as RouterLink } from 'gatsby'

const iconStyles = { width: '45px', height: '45px' }

const Footer = () => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Box sx={{ mb: 2 }}>
          <img src={tracktakLogoIcon} alt='tracktak' />
        </Box>
        <Box>
          <IconButton
            name='LinkedIn'
            component={Link}
            target='_blank'
            href='https://linkedin.com/company/tracktak'
          >
            <LinkedInIcon color='primary' sx={iconStyles} />
          </IconButton>
          <IconButton
            name='RedditIcon'
            component={Link}
            target='_blank'
            href='https://www.reddit.com/r/tracktak/'
          >
            <RedditIcon color='primary' sx={iconStyles} />
          </IconButton>
        </Box>
      </Box>
      <Box
        sx={{
          py: 3.8
        }}
      >
        <Typography align='center' paragraph gutterBottom>
          Data is provided by{' '}
          <Link
            rel='noreferrer'
            target='_blank'
            href='https://eodhistoricaldata.com/'
          >
            EODHistoricalData.com
          </Link>{' '}
          and may not be correct in all cases. We do not take any responsibility
          for incorrect data.
        </Typography>
        <Typography align='center'>
          © 2020 - {dayjs().format('YYYY')} tracktak ltd. All rights reserved.
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            mt: 2,
            flexWrap: 'wrap'
          }}
        >
          <Typography>
            <Link href='/cookie-policy'>Cookie Policy</Link>
          </Typography>
          <Typography>
            <Link href='/privacy-policy'>Privacy Policy</Link>
          </Typography>
          <Typography>
            <Link href='/terms-and-conditions'>Terms &amp; Conditions</Link>
          </Typography>
          {headerLinks.landingPageLinks.map(link => (
            <Typography key={link.to}>
              <Link component={RouterLink} to={link.to}>
                {link.text}
              </Link>
            </Typography>
          ))}
        </Box>
      </Box>
    </>
  )
}

export default Footer
