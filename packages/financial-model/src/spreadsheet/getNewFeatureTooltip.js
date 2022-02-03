import tippy, { sticky } from 'tippy.js'

const getNewFeatureTooltip = (tippyEl, textContent) => {
  tippyEl.classList.add('tippy-new-feature')

  const text = document.createElement('div')

  text.textContent = textContent

  const instance = tippy(tippyEl, {
    placement: 'top-start',
    theme: 'new-feature',
    offset: [0, 0],
    content: text,
    arrow: true,
    interactive: false,
    sticky: true,
    plugins: [sticky],
    showOnCreate: true,
    hideOnClick: false,
    onHide: () => {
      return false
    }
  })

  return instance
}

export default getNewFeatureTooltip
