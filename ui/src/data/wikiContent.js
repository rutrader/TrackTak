import React from "react";
import { Box, TextField, Typography } from "@material-ui/core";
import {
  cagrInYearsOneToFiveLabel,
  ebitTargetMarginInYearTenLabel,
} from "../components/ValueDrivingInputs";
import FormatInputToPercent from "../components/FormatInputToPercent";

const wikiContent = [
  {
    title: "What is a DCF?",
    text: `A Discounted Cash Flow (DCF) is a tool that helps investors find the intrinsic value of a cash flow producting asset.
      In simple terms it's there to help you find if a stocks current price is undervalued based on the real value of the stock.`,
  },
  {
    title: "Where does your data come from?",
    text: (
      <>
        We use the&nbsp;
        <a
          href="https://eodhistoricaldata.com"
          rel="noreferrer"
          target="_blank"
        >
          eodhistoricaldata
        </a>
        &nbsp;api.
      </>
    ),
  },
  {
    title: "How can I trust your DCF model?",
    text: (
      <>
        We base our model off of excel DCF templates by Aswath Damodaran. Aswath
        is a world renowned financial professor at NYU and is widely
        acknowledged as one of the best in the industry. You can see for your
        self by following along to his valuation courses on&nbsp;
        <a
          href="https://www.youtube.com/c/AswathDamodaranonValuation/playlists"
          rel="noreferrer"
          target="_blank"
        >
          youtube
        </a>
        &nbsp;or visting his&nbsp;
        <a
          href="http://pages.stern.nyu.edu/~adamodar"
          rel="noreferrer"
          target="_blank"
        >
          site
        </a>
        &nbsp;for all of the financial models.
      </>
    ),
  },
  {
    title: "Base Year, Years 1-10 & Terminal Year - Cells B1-M1",
    text: (
      <>
        <Typography paragraph>
          The base year stands for the current year you are in, specifically the
          Trailing Twelve Months (TTM). The reason why we use the TTM and not
          the annual financial results is because it's the most up to date
          financial information for the company.
        </Typography>
        <Typography paragraph>
          1, 2, 3... 10 stands for the subsequent yearly data. For example if
          you are valuing a company on the 21st November 2020 and the most
          recent TTM data was last released on the 20th October 2020 then next
          year (C1) will be from 21st November 2020 to 21st November 2021 and
          the same for the next years after that. So the years represent the
          subsequent years <b>after</b> the most recent financial results were
          released and not when you are doing the DCF.
        </Typography>
        <Typography paragraph>
          The terminal year is all of the years after year 10 up to infinity.
          It's not possible to model that far out into the future and even 10
          years is hard so we just assign a terminal year to solve this as best
          we can. The reason why it works doing it forever is because the
          discount rate eventually makes the termianl value worthless after so
          many years.
        </Typography>
      </>
    ),
  },
  {
    title: "Revenue Growth Rate - Cells C2-M2",
    text: (
      <>
        <Typography paragraph>
          The revenue growth rate is one of the main value drivers that really
          affects the estimated value per share. So it is really important that
          you choose a realistic growth rate for your DCF. We provide an input
          for you that looks like this:
        </Typography>
        <Box sx={{ my: 2 }}>
          <TextField
            label={cagrInYearsOneToFiveLabel}
            disabled
            defaultValue={0.18}
            InputProps={{
              inputComponent: FormatInputToPercent,
            }}
          />
        </Box>
        <Typography paragraph>
          Compound Annual Growth Rate (CAGR) is the average growth rate that you
          think will happen for the company from year 1-5. We then use this as
          the revenue growth for years 1-5. To figure out what to put in this
          input you need to check the companies previous revenue growth rates,
          the industry average compared to year 10 reveue growth and also your
          thoughts on the future of the company.
        </Typography>
        <Typography paragraph>
          From years 6-10 we slightly reduce the growth rate each year. This is
          to safe guard you against putting in an unreasonably large revenue
          growth rate. It's also more realistic in most cases due to companies
          growth slowing as their revenue becomes bigger and the company
          matures. The terminal growth is then set to be equal year 10's growth
          rate.
        </Typography>
      </>
    ),
  },
  {
    title: "EBIT Margin - Cells B4-M4",
    text: (
      <>
        <Typography paragraph>
          The Earnings Before Interest or Taxes (EBIT) Margin is the other main
          value driving input that heavily affects your DCF. We provide an input
          for you that looks like this:
        </Typography>
        <Box sx={{ my: 2 }}>
          <TextField
            label={ebitTargetMarginInYearTenLabel}
            disabled
            defaultValue={0.1}
            InputProps={{
              inputComponent: FormatInputToPercent,
            }}
          />
        </Box>
        <Typography paragraph>
          We use this input in Years 1-10 and set the terminal year to be equal
          to year 10 (L4). To figure out what to put in this input you need to
          check the companies current EBIT margin, the industries average EBIT
          margin and also your thoughts on what type of margin the company can
          acheive by year 10. This will differ grealy depending on how much of
          a&nbsp;
          <a
            rel="noreferrer"
            target="_blank"
            href="https://www.investopedia.com/terms/e/economicmoat.asp"
          >
            moat
          </a>
          &nbsp;your company has. For example, a company like Boeing is in a
          duopoly with Airbus so it should be able to hold it's current margins
          for a very long time.
        </Typography>
      </>
    ),
  },
];

export default wikiContent;
