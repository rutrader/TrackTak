import {
  Box,
  Typography,
  Divider,
  Card,
  CardContent,
  Button,
  CardActionArea
} from '@mui/material'
import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { api, utils, useAuth } from '@tracktak/common'
import { templates } from '@tracktak/financial-model'
import { useNavigate } from 'react-router'
import logSpreadsheetEvent from '../shared/logSpreadsheetEvent'
import SearchTickerDialog from './SearchTickerDialog'

const Templates = () => {
  const [showSearchTickerDialog, setShowSearchTickerDialog] = useState(false)
  const { userData, getAccessToken } = useAuth()
  const navigate = useNavigate()

  const handleShowSearchTickerDialog = () => {
    setShowSearchTickerDialog(true)
  }

  const handleCloseSearchTickerDialog = () => {
    setShowSearchTickerDialog(false)
  }

  const createBlankSpreadsheetOnClick = async () => {
    const sheetData = {
      name: 'Untitled Spreadsheet',
      data: {
        sheets: {
          0: {
            id: 0,
            sheetName: 'Sheet1'
          }
        }
      }
    }
    const token = await getAccessToken()
    const response = await api.createSpreadsheet({ sheetData }, token?.jwtToken)
    const spreadsheet = response.data.spreadsheet

    navigate(`/${userData.name}/my-spreadsheets/${spreadsheet._id}`)

    logSpreadsheetEvent('Create', sheetData.name)
  }

  return (
    <>
      <Helmet>
        <title>{utils.getTitle('Templates')}</title>
      </Helmet>
      <SearchTickerDialog
        open={showSearchTickerDialog}
        onClose={handleCloseSearchTickerDialog}
      />
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
        {templates.map(template => {
          return (
            <Card key={template.name} variant='outlined' sx={{ maxWidth: 300 }}>
              <CardActionArea onClick={handleShowSearchTickerDialog}>
                <CardContent>
                  <Typography
                    lineHeight='initial'
                    variant='h6'
                    fontWeight='bold'
                    component='div'
                    gutterBottom
                  >
                    {template.name}
                  </Typography>
                  <Typography
                    sx={{ mb: 1.5 }}
                    variant='body2'
                    color='text.secondary'
                  >
                    {template.description}
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
            Create Blank Financial Spreadsheet
          </Typography>
        </Button>
      </Box>
    </>
  )
}

export default Templates
