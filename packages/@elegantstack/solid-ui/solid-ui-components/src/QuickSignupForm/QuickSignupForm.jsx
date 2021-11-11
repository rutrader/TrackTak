import React from 'react'
import { Box, Input } from 'theme-ui'
import Divider from '@solid-ui-components/Divider'
import ContentButtons from '@solid-ui-components/ContentButtons'

const QuickSignupForm = ({ space, fields, buttons }) =>
  fields?.[0] && (
    <>
      <Divider space={space} />
      <Box
        variant='cards.primary'
        sx={{
          display: `inline-flex`,
          alignContent: `space-between`,
          bg: `contentBg`,
          borderRadius: `xl`,
          minWidth: [`auto`, 400],
          p: 2
        }}
      >
        <Input
          type='text'
          name={fields[0].identifier}
          placeholder={fields[0].placeholder?.text}
          sx={{
            bg: `transparent`,
            px: 3,
            py: 0,
            '::placeholder': {
              color: fields[0].placeholder?.color || `omegaDark`
            }
          }}
        />
        {buttons?.[0] && (
          <ContentButtons
            content={buttons}
            wrapperStyles={{ minWidth: `auto` }}
          />
        )}
      </Box>
    </>
  )

export default QuickSignupForm
