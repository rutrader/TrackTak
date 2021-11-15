import React from 'react'
import { Helmet } from 'react-helmet'
import { utils } from '@tracktak/common'
import UseNowSection from '../landingPage/UseNowSection'
import { Box, Container, useTheme } from '@mui/material'
import Footer from '../landingPage/Footer'
import TestimonialsSection from '../landingPage/TestimonialsSection'
import OurTeamSection from '../landingPage/OurTeamSection'
import VideoSection from '../landingPage/VideoSection'
import ProcessSection from '../landingPage/ProcessSection'
import AboveTheFoldSection from '../landingPage/AboveTheFoldSection'
import withAuthenticatedRedirect from '../hocs/withAuthenticatedRedirect'

const Section = ({ sx, ...props }) => {
  return (
    <Box
      sx={{
        pb: 8.75,
        ...sx
      }}
      {...props}
    />
  )
}

const Home = () => {
  const theme = useTheme()

  return (
    <>
      <Helmet>
        <title>Tracktak | The spreadsheet for financial modelling</title>
        <link rel='canonical' href={`${utils.resourceName}`} />
        <meta
          name='description'
          content='Tracktak is a financial modeling tool that makes it easy for financial modellers and investors to value projects and companies.'
        />
      </Helmet>
      <Box
        sx={{
          [theme.breakpoints.down('sm')]: { pb: 14 },
          [theme.breakpoints.up(1235)]: { pb: 21 }
        }}
      >
        <AboveTheFoldSection />
      </Box>
      <Container maxWidth='lg'>
        <Section>
          <ProcessSection />
        </Section>
        <Section>
          <VideoSection />
        </Section>
        <Section>
          <OurTeamSection />
        </Section>
        <Section>
          <TestimonialsSection />
        </Section>
        <Section>
          <UseNowSection />
        </Section>
        <Footer />
      </Container>
    </>
  )
}

export default withAuthenticatedRedirect(Home)
