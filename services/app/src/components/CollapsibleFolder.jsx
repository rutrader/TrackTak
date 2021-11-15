import React, { useState } from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import Folder from '@mui/icons-material/Folder'
import GridOnIcon from '@mui/icons-material/GridOn'
import DeleteIcon from '@mui/icons-material/Delete'
import dayjs from 'dayjs'
import {
  Collapse,
  Table,
  TableBody,
  Box,
  ListItemIcon,
  IconButton,
  TableCell,
  TableRow
} from '@mui/material'

const CollapsibleFolder = ({
  handleDelete,
  handleRowClick,
  spreadsheet,
  spreadsheets
}) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <TableRow hover>
        <TableCell>
          <IconButton
            aria-label='expand row'
            size='small'
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component='th' scope='row'>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <ListItemIcon>
              <Folder />
            </ListItemIcon>
            {spreadsheet.sheetData.name}
          </Box>
        </TableCell>
        <TableCell align='right'>
          {dayjs(spreadsheet.lastModifiedTimestamp).format('DD MMM YY HH:mm')}
        </TableCell>
        <TableCell align='right'>
          <IconButton
            sx={{
              borderRadius: '2px',
              color: theme => theme.palette.alert
            }}
            onClick={e => {
              e.stopPropagation()
              handleDelete(spreadsheet)
            }}
            type='button'
          >
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      {spreadsheets.map(spreadsheet => {
        return (
          <TableRow>
            <TableCell sx={{ pb: 0, pt: 0, p: 0, borderBottom: 0 }} colSpan={6}>
              <Collapse in={open} timeout='auto' unmountOnExit>
                <Box>
                  <Table size='small' aria-label='purchases'>
                    <TableBody align='right'>
                      <TableRow
                        hover
                        onClick={() => handleRowClick(spreadsheet)}
                      >
                        <TableCell />
                        <TableCell component='th' scope='row'>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center'
                            }}
                          >
                            <ListItemIcon>
                              <GridOnIcon />
                            </ListItemIcon>
                            {spreadsheet.sheetData.name}
                          </Box>
                        </TableCell>
                        <TableCell align='right'>
                          {dayjs(spreadsheet.lastModifiedTimestamp).format(
                            'DD MMM YY HH:mm'
                          )}
                        </TableCell>
                        <TableCell align='right'>
                          <IconButton
                            sx={{
                              borderRadius: '2px',
                              color: theme => theme.palette.alert
                            }}
                            onClick={e => {
                              e.stopPropagation()
                              handleDelete(spreadsheet)
                            }}
                            type='button'
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Box>
              </Collapse>
            </TableCell>
          </TableRow>
        )
      })}
    </>
  )
}

export default CollapsibleFolder
