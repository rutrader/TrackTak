import React from 'react'
import { Box, Typography } from '@mui/material'
import wikiContent from '../data/wikiContent'
import { Helmet } from 'react-helmet'
import { utils } from '@tracktak/common'
import SidePanel from '../components/SidePanel'

const removeNonHashableChars = str => {
  const newStr = utils.replaceSpaceWithHyphen(str)

  return newStr.replace(/\?|\(|\)|,|&/g, '')
}

const Docs = () => {
  const getSidePanelTabs = () => {
    return wikiContent.map(({ title }) => {
      return {
        title,
        to: `/how-to-do-a-dcf#${removeNonHashableChars(title)}`
      }
    })
  }

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
      <SidePanel tabs={getSidePanelTabs()}>
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
