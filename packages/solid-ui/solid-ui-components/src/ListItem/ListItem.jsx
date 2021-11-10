import React from 'react'
import { Flex, Box } from 'theme-ui'
import ContentText from '@solid-ui-components/ContentText'
import Icon from '@solid-ui-components/ContentIcon'

const ListItem = ({
  icon,
  iconProps,
  text,
  compact,
  vertical,
  center,
  middle //Centering for horizontal layout
}) => (
  <Flex
    sx={{
      flexDirection: vertical ? 'column' : 'row',
      alignItems: center ? `center` : `flex-start`,
      textAlign: center && vertical ? `center` : `unset`,
      justifyContent: middle ? `center` : `unset`
    }}
  >
    {icon?.src && (
      <Box
        sx={{
          display: `inline-flex`,
          flexShrink: 0,
          [vertical ? 'mb' : 'mr']: compact ? 2 : 3
        }}
      >
        <Icon
          content={icon}
          size='sm'
          p={compact ? 1 : undefined}
          {...iconProps}
        />
      </Box>
    )}
    <Box sx={{ alignSelf: vertical ? `auto` : `center` }}>
      <ContentText content={text} />
    </Box>
  </Flex>
)

ListItem.defaultProps = {
  iconProps: {}
}

export default ListItem
