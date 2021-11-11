import { Button } from '@material-ui/core'
import React from 'react'
import { useTheme } from '@material-ui/core/styles'

const RoundButton = ({ sx, ...props }) => {
  const theme = useTheme()

  return (
    <Button
      sx={{
        borderRadius: 50,
        p: `${theme.spacing(2)} ${theme.spacing(5)}`,
        ...sx
      }}
      {...props}
    />
  )
}

export default RoundButton
