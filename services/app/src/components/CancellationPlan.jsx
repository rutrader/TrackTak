import React from 'react'
import { IconButton, Typography, Box, useTheme } from '@mui/material'
import { Helmet } from 'react-helmet'
import { utils } from '@tracktak/common'
import { useNavigate } from 'react-router-dom'

const CancellationPlan = ({ route, iconArrow, header, bodyText }) => {
  const theme = useTheme()
  const navigate = useNavigate()

  return (
    <>
      <Helmet>
        <title>{utils.getTitle('Switching Plan')}</title>
      </Helmet>
      <Box>
        <IconButton
          color='primary'
          onClick={() => {
            navigate(route)
          }}
        >
          {iconArrow}
        </IconButton>
        <Typography
          sx={{
            display: 'flex',
            justifyContent: 'center',
            fontSize: '2.3rem',
            mb: 4
          }}
          color={theme.palette.primary.purple}
          fontWeight='bold'
          gutterBottom
        >
          {header}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          {bodyText}
        </Box>
      </Box>
    </>
  )
}

export default CancellationPlan
