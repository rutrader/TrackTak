import React, { Children, useState, useEffect, useRef, useContext } from 'react'
import PropTypes from 'prop-types'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { Box, Button } from 'theme-ui'
import Divider from '@solid-ui-components/Divider'
import { TabsContext } from '@solid-ui-components/Tabs'
import styles from './styles'

const StyledTabs = ({
  id,
  tabs,
  children,
  variant,
  space,
  position,
  autoplay,
  autoplayInterval,
  arrows,
  onChange,
  forceRender
}) => {
  const { activeTab, setActiveTab } = useContext(TabsContext)
  const [tabIndex, setTabIndex] = useState(0)
  const interval = useRef(null)

  const selectedIndex = id ? activeTab?.index || 0 : tabIndex
  const childrenArray = Children.toArray(children)
  const totalTabs = tabs?.length || childrenArray?.length

  useEffect(() => {
    interval.current =
      autoplay &&
      setInterval(() => {
        setTabIndex(tabIndex => {
          return tabIndex < totalTabs - 1 ? tabIndex + 1 : 0
        })
      }, autoplayInterval)
    return () => clearInterval(interval.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    return () =>
      id && setActiveTab(state => (state.identifier === id ? {} : state))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSelect = index => {
    clearInterval(interval.current)
    id ? setActiveTab({ identifier: id, index }) : setTabIndex(index)
    onChange && onChange(index)
  }

  const handleNext = () => {
    setTabIndex(tabIndex => {
      return tabIndex < totalTabs - 1 ? tabIndex + 1 : 0
    })
  }

  const handlePrev = () => {
    setTabIndex(tabIndex => {
      return tabIndex !== 0 ? tabIndex - 1 : totalTabs - 1
    })
  }

  const customTabButtons = () =>
    tabs.filter(Boolean).map((item, index) => (
      <Tab key={`item-${index}`} className='tabs_tab'>
        {item}
      </Tab>
    ))

  const contentTabButtons = () =>
    childrenArray.map(({ props }, index) =>
      variant === 'dots' ? (
        <Tab key={`item-${index}`} className='tabs_tab' />
      ) : (
        props?.content?.text?.[0] && (
          <Tab key={`item-${index}`} className='tabs_tab'>
            {props.content.text[0].text}
          </Tab>
        )
      )
    )

  const tabButtons = (
    <TabList className='tabs_tabList'>
      {tabs ? customTabButtons() : contentTabButtons()}
    </TabList>
  )

  return totalTabs ? (
    <Box sx={styles[variant]}>
      <Tabs
        selectedTabClassName='tabs_selectedTab'
        selectedIndex={selectedIndex}
        onSelect={handleSelect}
      >
        {position === 'top' && (
          <>
            {tabButtons}
            <Divider space={space} />
          </>
        )}
        {childrenArray.map((item, index) => (
          <TabPanel key={`item-${index}`} forceRender={forceRender}>
            {item}
          </TabPanel>
        ))}
        {position === 'bottom' && (
          <>
            <Divider space={space} />
            {tabButtons}
          </>
        )}
      </Tabs>
      {arrows && (
        <>
          <Button
            variant='white'
            sx={{ ...styles.arrowButton, ...styles.arrowButtonLeft }}
            onClick={handlePrev}
          >
            <Box sx={{ ...styles.arrow, transform: `rotate(45deg)` }} />
          </Button>
          <Button
            variant='white'
            sx={{ ...styles.arrowButton, ...styles.arrowButtonRight }}
            onClick={handleNext}
          >
            <Box sx={{ ...styles.arrow, transform: `rotate(225deg)` }} />
          </Button>
        </>
      )}
    </Box>
  ) : null
}

export default StyledTabs

StyledTabs.defaultProps = {
  variant: 'underline',
  position: 'top',
  autoplay: false,
  autoplayInterval: 4000,
  arrows: false,
  forceRender: false
}

StyledTabs.propTypes = {
  variant: PropTypes.oneOf(Object.keys(styles)),
  tabs: PropTypes.array
}
