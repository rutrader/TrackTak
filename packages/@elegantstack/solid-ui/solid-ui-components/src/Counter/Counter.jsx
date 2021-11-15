import React, { useEffect, useRef } from 'react'
import { animate } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const Counter = ({ from, to, delay, duration }) => {
  const nodeRef = useRef()

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5
  })

  const fromInt = parseInt(from)
  const toInt = parseInt(to)

  useEffect(() => {
    if (!inView) return

    const node = nodeRef.current

    const controls = animate(fromInt, toInt, {
      duration,
      delay,
      onUpdate(value) {
        node.textContent = value.toFixed(0)
      }
    })

    return () => controls.stop()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromInt, toInt, inView])

  return (
    <span ref={ref}>
      <span ref={nodeRef} />
    </span>
  )
}

export default Counter

Counter.defaultProps = {
  duration: 2,
  from: 0
}
