const getToolbarElementIcons = toolbar => {
  return [
    {
      elements: [
        toolbar.iconElementsMap.undo.buttonContainer,
        toolbar.iconElementsMap.redo.buttonContainer
      ]
    },
    {
      elements: [toolbar.buttonElementsMap.textFormatPattern.buttonContainer]
    },
    {
      elements: [toolbar.buttonElementsMap.fontSize.buttonContainer]
    },
    {
      elements: [
        toolbar.iconElementsMap.bold.buttonContainer,
        toolbar.iconElementsMap.italic.buttonContainer,
        toolbar.iconElementsMap.underline.buttonContainer,
        toolbar.iconElementsMap.strikeThrough.buttonContainer,
        toolbar.iconElementsMap.fontColor.buttonContainer
      ]
    },
    {
      elements: [
        toolbar.iconElementsMap.backgroundColor.buttonContainer,
        toolbar.iconElementsMap.borders.buttonContainer,
        toolbar.iconElementsMap.merge.buttonContainer
      ]
    },
    {
      elements: [
        toolbar.iconElementsMap.horizontalTextAlign.buttonContainer,
        toolbar.iconElementsMap.verticalTextAlign.buttonContainer,
        toolbar.iconElementsMap.textWrap.buttonContainer
      ]
    },
    {
      elements: [
        toolbar.iconElementsMap.freeze.buttonContainer,
        toolbar.iconElementsMap.formula.buttonContainer,
        toolbar.iconElementsMap.functionHelper.buttonContainer
      ]
    },
    {
      elements: [toolbar.iconElementsMap.export.buttonContainer]
    },
    {
      elements: [toolbar.iconElementsMap.autosave.buttonContainer]
    }
  ]
}

export default getToolbarElementIcons
