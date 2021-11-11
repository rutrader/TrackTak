import React from 'react'
import { TextField } from '@material-ui/core'

const TTRoundInput = ({ isSmallInput, color, sx, ...props }) => {
  const isSecondary = color === 'secondary'
  const opacity = 0.23

  return (
    <TextField
      sx={{
        ...sx,
        '& .MuiInputBase-root': {
          height: isSmallInput ? '35px' : '62px',
          borderRadius: '33px',
          color: isSecondary ? '#fff' : '#000',
          transition: 'all 0.3s ease-out 0s',
          backgroundColor: isSecondary ? '#9B5FEC' : '#fff',
          '&.Mui-focused fieldset': {
            opacity
          },
          '&:hover fieldset': {
            opacity
          }
        },
        transition: theme => theme.transitions.create('width'),
        '& input': {
          height: 'inherit',
          boxSizing: 'border-box'
        },
        '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]': {
          paddingTop: 0,
          paddingBottom: 0
        }
      }}
      {...props}
    />
  )
}

export default TTRoundInput
