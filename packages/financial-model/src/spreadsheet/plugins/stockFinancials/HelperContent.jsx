import React, { Fragment } from 'react'
import { Box } from '@mui/material'
import { functionHelperPrefix } from '@tracktak/powersheet'
import functionHelperData from './functionHelperData'
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

const HelperContent = setTicker => {
  return (
    <Box>
      <MainHeader>{functionHelperData.header}</MainHeader>
      <Paragraph>{functionHelperData.headerDescription}</Paragraph>
      <Header>Aliases</Header>
      <List>
        {functionHelperData.aliases.map(alias => {
          return (
            <li key={alias}>
              <p>{alias}</p>
            </li>
          )
        })}
      </List>
      <Header>Global Ticker</Header>
      <Paragraph>{functionHelperData.globalContext}</Paragraph>
      <SearchTicker setTicker={setTicker} />
      <Header>Samples Usage</Header>
      {functionHelperData.exampleUsages.map(syntax => {
        return (
          <p key={syntax}>
            <Code>{syntax}</Code>
          </p>
        )
      })}
      <Header>Syntax</Header>
      <p>
        <Code>{functionHelperData.syntax}</Code>
      </p>
      <Paragraph>
        <Code>{functionHelperData.optionalElement.syntaxName}</Code>&nbsp;-{' '}
        {functionHelperData.optionalElement.description}
      </Paragraph>
      <List>
        {functionHelperData.syntaxElements.map(
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
      {functionHelperData.attributes.map(({ header, attributeNames }) => {
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

export default HelperContent
