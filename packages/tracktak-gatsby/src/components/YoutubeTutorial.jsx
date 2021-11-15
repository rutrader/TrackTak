import React from 'react'
import YouTube from 'react-youtube'
import * as styles from '../shared/video.module.css'

const YoutubeTutorial = () => {
  return (
    <YouTube
      videoId='uQOG6k8A-zc'
      containerClassName={styles.videoWrapper}
      opts={{
        width: 1500,
        height: 600
      }}
    />
  )
}

export default YoutubeTutorial
