import React from 'react'
import { Box } from 'theme-ui'

const Divider = ({ space, color, ...props }) => (
  <Box
    sx={{
      minWidth: `auto`,
      borderTopStyle: `solid`,
      borderTopColor: color,
      borderTopWidth: 2,
      height: 0,
      my: [space < 0 ? space + 1 : space - 1, space],
      '& + &': {
        my: space
      },
      ...props
    }}
  />
)

export default Divider

Divider.defaultProps = {
  space: 4,
  color: `transparent`
}
