import React from 'react'
import { Box } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import ClearIcon from '@mui/icons-material/Clear'
import { red } from '@mui/material/colors'

const RegionStatus = ({ iconSvg, regionName, enabled }) => {
  return (
    <Box
      display='flex'
      alignItems='center'
      sx={{
        width: '100%',
        gap: theme => theme.spacing(1),
        mb: theme => theme.spacing(1)
      }}
    >
      <Box
        sx={{
          height: '33px',
          minWidth: '33px'
        }}
      >
        <img
          src={iconSvg}
          alt=''
          style={{
            width: 30,
            height: 30
          }}
        />
      </Box>
      {regionName}
      <Box
        sx={{
          marginLeft: 'auto'
        }}
      >
        {enabled ? (
          <CheckIcon color='primary' />
        ) : (
          <ClearIcon sx={{ color: red[500] }} />
        )}
      </Box>
    </Box>
  )
}

export default RegionStatus
