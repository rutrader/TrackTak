import React, { useState } from 'react'
import {
  Link,
  Typography,
  useTheme,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box
} from '@mui/material'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'

const questionsAndAnswers = [
  {
    question: 'What list of exchanges do you support?',
    answer: (
      <>
        We support more than 60 exchanges globally, for more information
        visit&nbsp;
        <Link
          rel='noreferrer'
          target='_blank'
          href='https://eodhistoricaldata.com/financial-apis/list-supported-exchanges/'
        >
          here
        </Link>
      </>
    )
  },
  {
    question: 'What does freezing your plan mean?',
    answer:
      'Need a break from investing? Your plan lets you freeze your membership for up to 1 or 3 months at no extra cost during 12-month period. The freeze will be applied from your next payment date, please make sure it is added at least 3-4 working days before this date. If you wish to unfreeze your plan sooner, you can! Unfreezing before the original end date, means there is a small charge amount will be added on to your next payment to cover the days. After you have used your 1 or 3-month allowance you no longer can freeze you plan within 12-month period.'
  },
  {
    question: 'Can I change my plan later?',
    answer:
      'You can upgrade or downgrade your API regions at any time. You can also change your billing frequency (monthly or yearly) at any time.'
  },
  {
    question: 'Can I get a refund?',
    answer:
      'Tracktak services are provided on a non-refundable basis. You can cancel your subscription at any time, and it will not auto-renew after the current billing period. Paid service will remain active for the duration of the paid period.'
  },
  {
    question: 'What if I want to cancel my plan?',
    answer:
      "We're sorry to see you go. Did you know you can freeze your plan? Freezing is included as part of your membership! If you still decide to leave Tracktak, you can cancel or downgrade before your next billing period with a single click from your account settings or by sending an email request to support@tracktak.com."
  },
  {
    question: 'Which currency will I be charged in?',
    answer: 'All payments are processed in United States Dollars (USD).'
  },
  {
    question: 'What kind of payment methods do you accept?',
    answer:
      'We accept any credit or debit card with a MasterCard, Visa, Discover Network, American Express, Diners Club International, or JCB logo. All credit card payments are securely processed through Stripe.'
  }
]

const StyledAccordionSummary = props => (
  <AccordionSummary
    expandIcon={
      <ArrowForwardIosSharpIcon sx={{ fontSize: '1.5rem' }} color='primary' />
    }
    sx={{
      padding: theme => `${theme.spacing(3)}  ${theme.spacing(3)} `,
      flexDirection: 'row-reverse',
      '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)'
      },
      '& .MuiAccordionSummary-content': {
        marginLeft: theme => theme.spacing(2)
      }
    }}
    {...props}
  />
)

const AccordionComponent = ({ question, answer }) => {
  const [expanded, setExpanded] = useState(false)

  const handleChange = (_, isExpanded) => {
    setExpanded(isExpanded)
  }

  return (
    <Accordion
      disableGutters
      elevation={0}
      expanded={expanded}
      onChange={handleChange}
    >
      <StyledAccordionSummary>
        <Typography sx={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
          {question}
        </Typography>
      </StyledAccordionSummary>
      <AccordionDetails
        sx={{
          padding: theme => theme.spacing(2)
        }}
      >
        <Typography color='textSecondary' sx={{ fontSize: '1.1rem' }}>
          {answer}
        </Typography>
      </AccordionDetails>
    </Accordion>
  )
}

const FrequentlyAskedQuestion = () => {
  const theme = useTheme()

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        mt: 5,
        mb: 5
      }}
    >
      <Typography
        color={theme.palette.primary.purple}
        sx={{ fontSize: '2.3rem' }}
        fontWeight='bold'
        gutterBottom
      >
        Questions you may have
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
        {questionsAndAnswers.map(({ question, answer }, index) => {
          return (
            <AccordionComponent
              question={question}
              answer={answer}
              key={index}
            />
          )
        })}
      </Box>
    </Box>
  )
}

export default FrequentlyAskedQuestion
