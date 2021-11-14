import React from 'react'
import { Button, Stack, useMediaQuery, useTheme } from '@mui/material'
import AcUnitIcon from '@mui/icons-material/AcUnit'
import PersonIcon from '@mui/icons-material/Person'
import { useNavigate } from 'react-router-dom'

export const StyledButton = props => (
  <Button
    variant='contained'
    sx={{
      textTransform: 'none',
      flex: '1 0 auto'
    }}
    {...props}
  />
)

const MembershipButtons = ({ onEndMyMembershipClick = () => {} }) => {
  const navigate = useNavigate()
  const theme = useTheme()
  const isOnMobile = useMediaQuery(theme.breakpoints.up('sm'))

  const handleEndMyMembershipClick = () => {
    navigate('/cancel-plan')

    onEndMyMembershipClick()
  }

  const handleKeepMyBenefitsClick = () => {
    navigate('/')
  }

  return (
    <>
      <Stack
        direction='row'
        sx={{
          justifyContent: 'space-around',
          flexWrap: 'wrap',
          gap: isOnMobile ? theme.spacing(7) : theme.spacing(2)
        }}
      >
        <StyledButton
          startIcon={<PersonIcon />}
          onClick={handleKeepMyBenefitsClick}
        >
          Keep My Benefits
        </StyledButton>
        <StyledButton startIcon={<AcUnitIcon />}>
          Freeze Payment Plan
        </StyledButton>
        <StyledButton variant='outlined' onClick={handleEndMyMembershipClick}>
          End My Membership
        </StyledButton>
      </Stack>
    </>
  )
}

export default MembershipButtons
