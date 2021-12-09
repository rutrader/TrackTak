import React, { forwardRef } from 'react'
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material'
import wikiContent from '../data/wikiContent'
import { Helmet } from 'react-helmet'
import { utils, SidePanel } from '@tracktak/common'
import { navigate } from 'gatsby'
import { AnchorLink } from 'gatsby-plugin-anchor-links'

const removeNonHashableChars = str => {
  const newStr = utils.replaceSpaceWithHyphen(str)

  return newStr.replace(/\?|\(|\)|,|&/g, '')
}

const tabs = wikiContent.map(({ title }) => {
  return {
    title,
    to: `/how-to-do-a-dcf#${removeNonHashableChars(title)}`
  }
})

const Docs = () => {
  return (
    <>
      <Helmet>
        <title>
          {utils.getTitle('How to do a Discounted Cash Flow (DCF)')}
        </title>
        <link rel='canonical' href={`${utils.resourceName}/how-to-do-a-dcf`} />
        <meta
          name='description'
          content='Learn how to do a full DCF with projections of cash flows, terminal value and WACC.'
        />
      </Helmet>
      <SidePanel
        sidePanelTabs={
          <List>
            {tabs.map(({ title, to }) => {
              return (
                <ListItem
                  key={title}
                  component={forwardRef((props, ref) => (
                    <AnchorLink {...props} gatsbyLinkProps={{ ref }} />
                  ))}
                  onAnchorLinkClick={() => {
                    navigate(to)
                  }}
                  to={to}
                  button
                >
                  <ListItemText primary={title} />
                </ListItem>
              )
            })}
          </List>
        }
      >
        {wikiContent.map(({ title, text }, i) => {
          return (
            <Box key={i}>
              <Typography
                variant='h6'
                gutterBottom
                id={removeNonHashableChars(title)}
              >
                {title}
              </Typography>
              <Typography component='div' paragraph>
                {text}
              </Typography>
            </Box>
          )
        })}
      </SidePanel>
    </>
  )
}
export default Docs
