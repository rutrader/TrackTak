export default {
  float: {
    y: ['5%', '0%'],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      repeatType: 'reverse'
    }
  },
  floatFaster: {
    y: ['7%', '0%'],
    transition: {
      duration: 1.3,
      repeat: Infinity,
      repeatType: 'reverse'
    }
  },
  fadeIn: { opacity: [null, 1] },
  fadeInUp: { opacity: [null, 1], y: ['20%', '0%'] },
  fadeInDown: { opacity: [null, 1], y: ['-20%', '0%'] },
  fadeInLeft: { opacity: [null, 1], x: ['-20%', '0%'] },
  fadeInDeepLeft: { opacity: [null, 1], x: ['-40%', '0%'] },
  fadeInRight: { opacity: [null, 1], x: ['20%', '0%'] },
  fadeInDeepRight: { opacity: [null, 1], x: ['40%', '0%'] },
  fadeInGrow: { opacity: [null, 1], scale: [0.9, 1] },
  fadeInPop: { opacity: [null, 1], scale: [0.9, 1.1, 1] },
  fadeInBounce: {
    stiffness: 10000,
    opacity: [null, 1],
    scale: [0.3, 1.1, 0.9, 1.03, 0.97, 1]
  },
  fadeInRotate: {
    scale: [0.8, 1],
    rotate: [350, 360],
    opacity: [null, 1]
  }
}
