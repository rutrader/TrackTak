import React from 'react'
import { Box, Input } from 'theme-ui'
import Icon from '@solid-ui-components/ContentIcon'

const FormInput = ({ placeholder, icon, ...props }) => (
  <Box variant='forms.field'>
    <Icon content={icon} size='xs' round ml='3' pl='2' />
    <Input
      {...props}
      type={props.type.toLowerCase()}
      placeholder={placeholder?.text}
    />
  </Box>
)
export default FormInput
