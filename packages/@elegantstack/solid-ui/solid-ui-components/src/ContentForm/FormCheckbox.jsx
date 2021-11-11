import React from 'react'
import { Box, Label, Checkbox } from 'theme-ui'

const FormCheckbox = ({ id, placeholder, ...props }) => (
  <Label htmlFor={id}>
    <Box sx={{ position: `relative`, mr: 1 }}>
      <Checkbox {...props} />
    </Box>
    {placeholder?.text}
  </Label>
)

export default FormCheckbox
