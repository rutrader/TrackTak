import {
  Box,
  Typography,
  Divider,
  Card,
  CardContent,
  Button,
  CardActionArea
} from '@mui/material'
import React from 'react'
import { Helmet } from 'react-helmet'
import { api, utils, useAuth } from '@tracktak/common'
import { templates } from '@tracktak/financial-model'
import { useNavigate } from 'react-router'
import logSpreadsheetEvent from '../shared/logSpreadsheetEvent'

const Templates = () => {
  const { userData, getAccessToken } = useAuth()
  const navigate = useNavigate()

  const navigateToSpreadsheet = (spreadsheet, name) => {
    navigate(`/${userData.name}/my-spreadsheets/${spreadsheet._id}`)

    logSpreadsheetEvent('Create', name)
  }

  const createTemplateSpreadsheetOnClick = async (templateFileName, name) => {
    const values = await Promise.all([
      getAccessToken(),
      api.getSpreadsheetTemplate(templateFileName)
    ])
    const token = values[0]
    const template = values[1].data.value

    const sheetData = {
      name,
      data: template
    }
    const response = await api.createSpreadsheet({ sheetData }, token?.jwtToken)

    navigateToSpreadsheet(response.data.spreadsheet, sheetData.name)
  }

  const createBlankSpreadsheetOnClick = async () => {
    const sheetData = {
      name: 'Untitled Spreadsheet',
      data: {
        sheets: {
          Default: {}
        }
      }
    }
    const token = await getAccessToken()
    const response = await api.createSpreadsheet({ sheetData }, token?.jwtToken)

    navigateToSpreadsheet(response.data.spreadsheet, sheetData.name)
  }

  return (
    <>
      <Helmet>
        <title>{utils.getTitle('Templates')}</title>
      </Helmet>
      <Typography textAlign='center' variant='h5' gutterBottom>
        Select a Financial Modelling Template
      </Typography>
      <Box
        sx={{
          my: 3,
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        {templates.map(({ templateFileName, name, description }) => {
          return (
            <Card
              key={templateFileName}
              variant='outlined'
              sx={{ maxWidth: 300 }}
            >
              <CardActionArea
                onClick={() =>
                  createTemplateSpreadsheetOnClick(templateFileName, name)
                }
              >
                <CardContent>
                  <Typography
                    lineHeight='initial'
                    variant='h6'
                    fontWeight='bold'
                    component='div'
                    gutterBottom
                  >
                    {name}
                  </Typography>
                  <Typography
                    sx={{ mb: 1.5 }}
                    variant='body2'
                    color='text.secondary'
                  >
                    {description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          )
        })}
      </Box>
      <Divider>
        <Typography variant='h5'>OR</Typography>
      </Divider>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: 3
        }}
      >
        <Button
          variant='contained'
          color='primary'
          size='large'
          sx={{
            textTransform: 'none',
            minWidth: 300
          }}
          onClick={createBlankSpreadsheetOnClick}
        >
          <Typography fontWeight='bold'>
            Create Empty Financial Spreadsheet
          </Typography>
        </Button>
      </Box>
    </>
  )
}

export default Templates
