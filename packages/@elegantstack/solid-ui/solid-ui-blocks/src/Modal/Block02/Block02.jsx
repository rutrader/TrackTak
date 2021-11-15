import React from 'react'
import { Flex, Box } from 'theme-ui'
import Reveal from '@solid-ui-components/Reveal'
import Divider from '@solid-ui-components/Divider'
import Modal from '@solid-ui-components/Modal'
import ListItem from '@solid-ui-components/ListItem'
import ContentText from '@solid-ui-components/ContentText'
import ContentImages from '@solid-ui-components/ContentImages'
import ContentButtons from '@solid-ui-components/ContentButtons'
import ContentMap from '@solid-ui-components/ContentMap'
import ContentForm from '@solid-ui-components/ContentForm'

const ModalBlock02 = ({
  content: { identifier, text, images, map, collection, form, buttons },
  reverse
}) => {
  const hasMedia = images || map

  return (
    <Modal
      id={identifier}
      contentStyles={{ maxWidth: hasMedia ? `narrow` : 500, p: 0 }}
    >
      <Flex
        sx={{
          alignItems: `stretch`,
          flexDirection: [
            reverse ? `column-reverse` : `column`,
            reverse ? `row-reverse` : `row`
          ]
        }}
      >
        {hasMedia && (
          <Box
            sx={{
              display: [`none`, null, `block`],
              minWidth: [null, null, null, 500],
              flex: 1,
              position: `relative`,
              borderRadius: reverse ? `right` : `left`,
              overflow: `hidden`
            }}
          >
            {images && (
              <ContentImages
                content={{ images }}
                imageFit='cover'
                height='100%'
                reverse={reverse}
              />
            )}
            {map && (
              <Reveal
                effect={reverse ? 'fadeInRight' : 'fadeInLeft'}
                style={{ width: `100%`, height: `100%` }}
              >
                <ContentMap content={map} />
              </Reveal>
            )}
          </Box>
        )}
        <Box sx={{ flex: 1, p: 5 }}>
          {text && (
            <>
              <Box sx={{ textAlign: `center` }}>
                <ContentText content={text} />
              </Box>
              <Divider space={3} />
            </>
          )}
          {collection?.map((props, index) => (
            <ListItem key={`item-${index}`} {...props} compact />
          ))}
          {form && <ContentForm form={form} id={`form.${identifier}`} />}
          {buttons && (
            <>
              <Divider space={2} />
              <ContentButtons
                content={buttons}
                wrapperStyles={{ textAlign: `center` }}
              />
            </>
          )}
        </Box>
      </Flex>
    </Modal>
  )
}

export default ModalBlock02
