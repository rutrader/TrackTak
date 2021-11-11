export default {
  underline: {
    position: `relative`,
    '.tabs_tabList': {
      display: `flex`,
      justifyContent: `center`,
      m: 0,
      p: 0
    },
    '.tabs_tab': {
      variant: `text.h5`,
      fontWeight: `medium`,
      cursor: `pointer`,
      transition: `all 400ms ease`,
      color: `omegaDark`,
      borderBottomColor: `omegaLight`,
      borderBottomWidth: `md`,
      borderBottomStyle: `solid`,
      outline: `none`,
      px: 4,
      pb: 3,
      m: 0,
      ':not(.tabs_selectedTab):hover': {
        color: `omegaDarker`,
        borderBottomColor: `omegaDarker`
      }
    },
    '.tabs_selectedTab': {
      color: `alpha`,
      borderBottomColor: `alpha`
    },
    '.react-tabs__tab-panel:not([class$="--selected"])': {
      display: `none`
    }
  },
  pill: {
    position: `relative`,
    '.tabs_tabList': {
      display: `flex`,
      justifyContent: `center`,
      m: 0,
      p: 0
    },
    '.tabs_tab': {
      minWidth: [`auto`, 200],
      display: `flex`,
      alignItems: `center`,
      justifyContent: `center`,
      listStyle: `none`,
      cursor: `pointer`,
      transition: `all 400ms ease`,
      bg: `white`,
      color: `alpha`,
      boxShadow: `0 0 35px rgba(140,152,164,.2)`,
      outline: `none`,
      px: 4,
      py: 3,
      m: 0,
      ':last-of-type': {
        borderRadius: t => `0 ${t.radii.xl} ${t.radii.xl} 0`
      },
      ':first-of-type': {
        borderRadius: t => `${t.radii.xl}  0 0 ${t.radii.xl}`
      },
      ':not(.tabs_selectedTab):hover': {
        bg: `omegaDark`,
        color: `white`
      }
    },
    '.tabs_tab + .tabs_tab': {
      ml: `1px`
    },
    '.tabs_selectedTab': {
      bg: `alpha`,
      color: `white`
    }
  },
  dots: {
    position: `relative`,
    '.tabs_tabList': {
      display: `flex`,
      justifyContent: `center`,
      m: 0,
      p: 0
    },
    '.tabs_tab': {
      listStyle: `none`,
      size: `14px`,
      textIndent: `-9999px`,
      bg: `omega`,
      borderRadius: `full`,
      cursor: `pointer`,
      mx: 1,
      ':not(.tabs_selectedTab):hover': {
        bg: `omegaDarker`
      }
    },
    '.tabs_selectedTab': {
      bg: `alpha`
    }
  },
  arrowButton: {
    minWidth: `auto`,
    borderWidth: `sm`,
    borderRadius: `full`,
    boxShadow: `0 0 35px rgba(140,152,164,.425)`,
    position: `absolute`,
    top: `50%`,
    p: 3,
    mr: 2
  },
  arrowButtonRight: {
    right: 0,
    transform: `translate(-50%, 50%)`
  },
  arrowButtonLeft: {
    left: 0,
    transform: `translate(50%, 50%)`
  },
  arrow: {
    size: `10px`,
    borderBottom: `3px solid currentColor`,
    borderLeft: `3px solid currentColor`
  }
}
