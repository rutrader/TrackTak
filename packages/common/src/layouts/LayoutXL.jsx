import { Container } from '@mui/material'
import React from 'react'

const LayoutXL = ({ children, header }) => {
  return (
    <Container maxWidth='xl'>
      {header}
      {children}
    </Container>
  )
}

export default LayoutXL
