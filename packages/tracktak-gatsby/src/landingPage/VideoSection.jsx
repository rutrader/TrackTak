import React from 'react'
import { Box, Hidden } from '@mui/material'
import gridDots from '../assets/grid-dots-purple.svg'
import YoutubeTutorial from '../components/YoutubeTutorial'

const VideoSection = () => {
  return (
    <Box
      sx={{
        position: 'relative'
      }}
    >
      <YoutubeTutorial />
      <Box>
        <Hidden mdDown implementation='css'>
          <img
            src={gridDots}
            alt=''
            style={{
              position: 'absolute',
              right: '-70px',
              bottom: '-50px',
              zIndex: -1
            }}
          />
        </Hidden>
      </Box>
    </Box>
  )
}

export default VideoSection
