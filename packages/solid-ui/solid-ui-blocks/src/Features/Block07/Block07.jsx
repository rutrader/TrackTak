import React from 'react'
import { Container, Box } from 'theme-ui'
import Reveal from '@solid-ui-components/Reveal'
import Divider from '@solid-ui-components/Divider'
import ContentContainer from '@solid-ui-components/ContentContainer'
import ContentText from '@solid-ui-components/ContentText'
import ListItem from '@solid-ui-components/ListItem'
import WithDefaultContent from '@solid-ui-blocks/WithDefaultContent'

const FeaturesBlock07 = ({ content: { text, collection, icon } }) => {
  return (
    <Container sx={{ textAlign: `left` }}>
      <Reveal effect={'fadeInUp'}>
        <ContentContainer variant='cards.paper' sx={{ position: `relative` }}>
          <ContentText
            content={text}
            sx={{ textAlign: `center` }}
            mb='0'
            mx='auto'
          />
          {collection && (
            <>
              <Divider space={2} />
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  flexDirection: 'column',
                  maxHeight: 300
                }}
              >
                {collection.map((props, index) => (
                  <ListItem
                    key={`item-${index}`}
                    {...props}
                    icon={icon}
                    compact
                  />
                ))}
              </Box>
            </>
          )}
        </ContentContainer>
      </Reveal>
    </Container>
  )
}

export default WithDefaultContent(FeaturesBlock07)
