import React, { Fragment } from 'react'
import { Box } from '@mui/material'
import { functionHelperPrefix } from '@tracktak/powersheet'
import finFunctionHelperData from '../../financialData/finFunctionHelperData'
import { SearchTicker } from '@tracktak/common'

const MainHeader = props => (
  <h1 className={`${functionHelperPrefix}-main-header`} {...props} />
)
const Header = props => (
  <h3 className={`${functionHelperPrefix}-header`} {...props} />
)
const Code = props => (
  <code className={`${functionHelperPrefix}-code`} {...props} />
)
const List = props => (
  <ul className={`${functionHelperPrefix}-list`} {...props} />
)
const Paragraph = props => (
  <p className={`${functionHelperPrefix}-paragraph`} {...props} />
)

const TTFinancialHelperContent = setTicker => {
  return (
    <Box>
      <MainHeader>{finFunctionHelperData.header}</MainHeader>
      <Paragraph>{finFunctionHelperData.headerDescription}</Paragraph>
      <Header>Global Ticker</Header>
      <Paragraph>{finFunctionHelperData.globalContext}</Paragraph>
      <SearchTicker setTicker={setTicker} />
      <Header>Samples Usage</Header>
      {finFunctionHelperData.exampleUsages.map(syntax => {
        return (
          <p key={syntax}>
            <Code>{syntax}</Code>
          </p>
        )
      })}
      <Header>Syntax</Header>
      <p>
        <Code>{finFunctionHelperData.syntax}</Code>
      </p>
      <Paragraph>
        <Code>{finFunctionHelperData.optionalElement.syntaxName}</Code>&nbsp;-{' '}
        {finFunctionHelperData.optionalElement.description}
      </Paragraph>
      <List>
        {finFunctionHelperData.syntaxElements.map(
          ({ syntaxName, description }) => {
            return (
              <li key={syntaxName}>
                <p>
                  <Code>{syntaxName}</Code>&nbsp;- {description}
                </p>
              </li>
            )
          }
        )}
      </List>
      <Header>Attributes</Header>
      {finFunctionHelperData.attributes.map(({ header, attributeNames }) => {
        return (
          <Fragment key={header}>
            <h5>{header}</h5>
            <List>
              {attributeNames.map(attribute => {
                return (
                  <li key={attribute}>
                    <p>
                      <Code>{attribute}</Code>
                    </p>
                  </li>
                )
              })}
            </List>
          </Fragment>
        )
      })}
    </Box>
  )
}

export default TTFinancialHelperContent
