import React from 'react'
import { Button } from '@mui/material'

const LinkButton = ({ sx, ...props }) => {
  return (
    <Button
      sx={{
        px: 2,
        width: '100%',
        textTransform: 'none',
        fontWeight: 'bold',
        color: theme => theme.palette.primary.mainTextColor,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
        height: 40,
        whiteSpace: 'nowrap',
        ...sx
      }}
      {...props}
    />
  )
}

export default LinkButton
