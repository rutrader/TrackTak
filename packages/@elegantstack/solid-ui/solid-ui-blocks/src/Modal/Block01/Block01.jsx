import React, { useContext } from 'react'
import { Flex, Box } from 'theme-ui'
import Reveal from '@solid-ui-components/Reveal'
import Divider from '@solid-ui-components/Divider'
import Tabs from '@solid-ui-components/Tabs'
import Modal from '@solid-ui-components/Modal'
import ListItem from '@solid-ui-components/ListItem'
import { TabsContext } from '@solid-ui-components/Tabs'
import ContentText from '@solid-ui-components/ContentText'
import ContentImages from '@solid-ui-components/ContentImages'
import ContentMap from '@solid-ui-components/ContentMap'
import ContentForm from '@solid-ui-components/ContentForm'
import { ModalContext } from '@solid-ui-components/Modal'

const ModalBlock01 = ({ content, reverse }) => {
  const { activeModal } = useContext(ModalContext)
  const {
    activeTab: { index = 0 }
  } = useContext(TabsContext)

  const { identifier, text } = content

  if (activeModal && activeModal !== identifier) return null

  const images = content?.collection[index]?.images || content.images
  const map = content?.collection[index]?.map || content.map
  const hasMedia = images || map

  return (
    <Modal
      id={identifier}
      contentStyles={{
        maxWidth: hasMedia ? `narrow` : 500,
        p: 0
      }}
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
              flex: 1,
              minWidth: [null, null, null, 500],
              height: 750,
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
        {Array.isArray(content.collection) && (
          <Box sx={{ flex: 1, py: [3, 4], px: [3, 5] }}>
            <ContentText content={text} space={3} />
            <Tabs space={3} id={identifier}>
              {content.collection
                ?.filter(Boolean)
                ?.map(({ text, collection, form }, index) => (
                  <Reveal
                    key={`item-${index}`}
                    effect='fadeIn'
                    content={{ text }}
                  >
                    {text && (
                      <>
                        <Box sx={{ textAlign: `center` }}>
                          <ContentText content={text?.slice(1)} />
                        </Box>
                        <Divider space={3} />
                      </>
                    )}
                    {collection?.map((props, index) => (
                      <ListItem key={`item-${index}`} {...props} compact />
                    ))}
                    {form && (
                      <ContentForm
                        form={form}
                        id={`form.${identifier}.${
                          form.multiStep ? 'multi' : index
                        }`}
                      />
                    )}
                  </Reveal>
                ))}
            </Tabs>
          </Box>
        )}
      </Flex>
    </Modal>
  )
}

export default ModalBlock01
