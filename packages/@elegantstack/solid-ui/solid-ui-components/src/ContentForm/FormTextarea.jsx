import React from 'react'
import { Box, Textarea } from 'theme-ui'
import Icon from '@solid-ui-components/ContentIcon'

const FormTextarea = ({ placeholder, icon, ...props }) => (
  <Box variant='forms.field'>
    <Icon content={icon} size='xs' round ml='3' pl='2' mr='1' />
    <Textarea {...props} type='textarea' placeholder={placeholder?.text} />
  </Box>
)

export default FormTextarea
