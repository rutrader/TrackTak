import React from 'react'
import { LinkButton, useAuth } from '@tracktak/common'
import { Box, useTheme } from '@mui/material'
import { Link } from 'gatsby'

const HeaderGoToButton = () => {
  const { isAuthenticated } = useAuth()
  const theme = useTheme()
  const buttonSx = { height: 48, color: theme.palette.primary.contrastText }

  return (
    <Box
      sx={{
        mr: '-24px',
        mt: '-4px',
        mb: '-4px'
      }}
    >
      {isAuthenticated ? (
        <LinkButton
          onClick={() => {
            window.location.href = process.env.APP_SUBDOMAIN_URL
          }}
          variant='contained'
          sx={buttonSx}
        >
          Go to Dashboard
        </LinkButton>
      ) : (
        <LinkButton
          to='/sign-up'
          component={Link}
          variant='contained'
          sx={buttonSx}
        >
          Go to Spreadsheet
        </LinkButton>
      )}
    </Box>
  )
}

export default HeaderGoToButton
