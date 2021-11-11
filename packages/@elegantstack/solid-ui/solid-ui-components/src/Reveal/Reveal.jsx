import React from 'react'
import PropTypes from 'prop-types'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import variants from './Reveal.variants'

const Reveal = ({
  effect,
  children,
  threshold,
  duration,
  delay,
  transition,
  animate,
  ...props
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold
  })

  return (
    <motion.div
      ref={ref}
      animate={inView && (animate || effect || undefined)}
      variants={variants}
      style={effect?.startsWith('fade') && { opacity: 0 }}
      transition={{
        duration,
        delay,
        ...transition
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default Reveal

Reveal.defaultProps = {
  effect: 'fadeInUp',
  threshold: 0.3,
  duration: 0.5,
  delay: 0,
  transition: null,
  animate: null
}

Reveal.propTypes = {
  effect: PropTypes.oneOf(Object.keys(variants))
}
