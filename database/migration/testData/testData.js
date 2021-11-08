const test = [
  {
    sheetData: {
      data: {
        datas: [
          {
            name: "Required Inputs",
            freeze: "A1",
            styles: [
              {
                format: "percent",
              },
              {},
              {},
              {
                format: "currency",
              },
              {
                format: "number",
              },
              {
                bgcolor: "rgba(47, 219, 171, 0.4)",
                format: "percent",
              },
              {
                bgcolor: "rgba(47, 219, 171, 0.4)",
                format: "number",
              },
              {
                bgcolor: "#ffe59a",
              },
            ],
            merges: [],
            rows: {
              0: {
                cells: {
                  1: {
                    style: 5,
                    comment:
                      "Compound Annual Growth Rate - look at: a. Revenue growth in your company in recent years b. Your company's revenues, relative to the overall market size and larger players in the sector.",
                  },
                  3: {
                    style: 7,
                  },
                },
              },
              1: {
                height: 35,
                cells: {
                  1: {
                    style: 5,
                    comment:
                      "Start by looking at your company's current pre-tax operating margin but also look at the average for your industry.",
                  },
                  3: {
                    style: 7,
                  },
                },
              },
              2: {
                cells: {
                  1: {
                    style: 6,
                    comment:
                      "The forecasted number of years until the company’s current Operating Margin will converge on the target Operating Margin. For example, if today's year is 2021 and the year of convergence is 5 then it will converge in year 2026.",
                  },
                },
              },
              3: {
                cells: {
                  1: {
                    style: 6,
                    comment:
                      "The efficiency of how much the company has to reinvest the business to grow. The formula is Revenue / Invested Capital. The higher the number the more efficient the company is. The default value is set to the industry average as this is usually a good starting point. You should also look at the previous years sales to capital ratio's in the above table to fine tune this value. In the DCF output we compute how much the company is going to reinvest to keep the business growing in future years. The higher you set this number, the more efficiently the business is growing and the higher the value of your growth.",
                  },
                },
              },
            },
            cols: {
              0: {
                width: 170,
              },
              1: {
                width: 75,
              },
              3: {
                width: 305,
              },
            },
            validations: [],
            autofilter: {},
            cellsSerialized: {
              0: {
                0: "CAGR in Years 1-5 *",
                3: "Fill out the green input cells to generate your DCF",
              },
              1: {
                0: "Operating Target Margin in\nYear 10 *",
                3: "Numbers are in millions, expect per share amounts",
              },
              2: {
                0: "Year of Convergence *",
              },
              3: {
                0: "Sales to Capital Ratio *",
                1: '=FIN("sales/Capital")',
              },
            },
          },
          {
            name: "Optional Inputs",
            freeze: "A1",
            styles: [
              {
                format: "percent",
              },
              {},
              {},
              {
                format: "currency",
              },
              {
                format: "number",
              },
              {
                align: "center",
                underline: true,
                font: {
                  bold: true,
                },
              },
              {
                format: "million-currency",
              },
              {
                format: "million",
              },
            ],
            merges: ["A1:B1", "C1:D1", "E1:F1", "G1:H1", "I1:J1"],
            rows: {
              0: {
                cells: {
                  0: {
                    merge: [0, 1],
                    style: 5,
                  },
                  2: {
                    style: 5,
                    merge: [0, 1],
                  },
                  4: {
                    style: 5,
                    merge: [0, 1],
                  },
                  6: {
                    style: 5,
                    merge: [0, 1],
                  },
                  8: {
                    style: 5,
                    merge: [0, 1],
                  },
                },
              },
              1: {
                cells: {
                  1: {
                    style: 0,
                    comment:
                      "If you don't enter an input we will use a synthetic pre-tax cost of debt. You can override this by entering your own calculated pre-tax cost of debt here if you want.",
                  },
                  3: {
                    style: 3,
                    comment:
                      "Debt which is convertible to equity at some point in time. This is found in the financial statements",
                  },
                  5: {
                    style: 4,
                    comment:
                      "Shares of a company’s stock with dividends that are paid out to shareholders before common stock dividends are issued, i.e they have priority. This is found in the financial statements.",
                  },
                  7: {
                    style: 4,
                    comment:
                      "The same as shares outstanding but specifically for the employees options outstanding instead. If the company does have employee options outstanding, enter the total number here, vested and non vested, in the money and out of the money. This is found in the financial statements.",
                  },
                  9: {
                    style: 3,
                    comment:
                      "Any losses from the previous years that the company is carrying over to this year. It allows the company to reduce it's taxable income for the current year. This is found in the financial statements.",
                  },
                },
              },
              2: {
                cells: {
                  1: {
                    style: 4,
                    comment:
                      "Years until all of the companies outstanding debt matures on average. Generally found in the footnotes to the financial statements.",
                  },
                  3: {
                    style: 3,
                    comment:
                      "The same as normal interest expense but for Convertible Debt. This is found in the financial statements.",
                  },
                  5: {
                    style: 3,
                    comment:
                      "The same as normal price per share but for Preferred Stock. This is found in the financial statements.",
                  },
                  7: {
                    style: 3,
                    comment:
                      "Enter the weighted average strike price of the employee options outstanding. This is found in the financial statements.",
                  },
                  9: {
                    style: 3,
                    comment:
                      "Also known as 'cross holdings in other companies'. This is the earnings that don't (and will never) show up as part of the operating income. The most common non-operating assets are minority cross-holdings in other companies (which are not consolidated). You can find the book value of these holdings on the balance sheet, but best practice is to convert it to the market value. (Apply a price to book ratio, based on the sector that the company is in to the book value).",
                  },
                },
              },
              3: {
                cells: {
                  3: {
                    style: 4,
                    comment:
                      "The same as normal maturity of debt but for Convertible Debt. This is found in the financial statements.",
                  },
                  5: {
                    style: 3,
                    comment:
                      "How much dividends are payed out on average per share each year. This is found in the financial statements.",
                  },
                  7: {
                    style: 4,
                    comment:
                      "The weighted average maturity of the employee options outstanding. This is found in the financial statements.",
                  },
                  9: {
                    style: 0,
                    comment:
                      "Many young, growth companies fail, especially if they have trouble raising cash. Many distressed companies fail because they have trouble making debt payments. This is a tough input to estimate but try to use the agencies credit rating if the company has one, if not then use the synthetic credit rating default spread as a guide.",
                  },
                },
              },
              4: {
                cells: {
                  3: {
                    style: 3,
                    comment:
                      "This is the equity part of the convertible debt. If the debt is publicly traded you can find it's market value on cbonds.com or similar. If it's not then we recommend just using the Book Value of Convertible Debt from cell D2 here as well.",
                  },
                  9: {
                    style: 0,
                    comment:
                      "If the company fails then sometimes there will be assets that get sold off (usually at fire sale prices) or cash left over to distribute to shareholders. This is only true if all liabilites have been paid first as shareholders are last in line if a company goes bankrupt. Sometimes however, companies will continue to run themselves into the ground with more debt to continue giving the executives a job and therefore will never have proceeds to distribute to shareholders.",
                  },
                },
              },
            },
            cols: {
              0: {
                width: 155,
              },
              1: {
                width: 75,
              },
              2: {
                width: 230,
              },
              3: {
                width: 85,
              },
              4: {
                width: 175,
              },
              5: {
                width: 85,
              },
              6: {
                width: 195,
              },
              7: {
                width: 85,
              },
              8: {
                width: 250,
              },
              9: {
                width: 85,
              },
              len: 26,
            },
            validations: [],
            autofilter: {},
            cellsSerialized: {
              0: {
                0: "Normal Debt",
                2: "Convertible Debt",
                4: "Preferred Stock",
                6: "Employee Options",
                8: "Other",
              },
              1: {
                0: "Pre-tax Cost of Debt",
                2: "Book Value of Convertible Debt",
                4: "Number of Preferred Shares",
                6: "Employee Options Outstanding",
                8: "Net Operating Loss",
              },
              2: {
                0: "Average Maturity of Debt",
                2: "Interest Expense on Convertible Debt",
                4: "Market Price Per Share",
                6: "Average Strike Price",
                8: "Non-operating assets",
              },
              3: {
                2: "Maturity of Convertible Debt",
                4: "Annual Dividend Per Share",
                6: "Average Maturity",
                8: "Probability of Failure",
              },
              4: {
                2: "Market Value of Convertible Debt",
                8: "Proceeds as a Percentage of Book value",
              },
            },
          },
          {
            name: "DCF Valuation",
            freeze: "A1",
            styles: [
              {
                format: "percent",
              },
              {},
              {},
              {
                format: "currency",
              },
              {
                format: "number",
              },
              {
                format: "currency",
                color: "#43cea2",
              },
              {
                font: {
                  bold: true,
                },
              },
              {
                font: {
                  bold: true,
                  size: 14,
                },
              },
              {
                font: {
                  bold: true,
                  size: 14,
                },
                align: "center",
              },
              {
                font: {
                  bold: true,
                  size: 18,
                },
                align: "center",
              },
              {
                font: {
                  bold: false,
                },
              },
              {
                font: {
                  bold: true,
                  size: 18,
                },
                align: "left",
              },
              {
                strike: true,
              },
              {
                strike: false,
              },
              {
                strike: false,
                font: {
                  name: "Source Sans Pro",
                },
              },
              {
                strike: false,
                font: {
                  name: "Arial",
                },
              },
              {
                font: {
                  bold: true,
                  size: 12,
                },
              },
              {
                font: {
                  bold: false,
                  size: 12,
                },
              },
              {
                font: {
                  bold: true,
                  size: 12,
                },
                align: "center",
              },
              {
                textwrap: true,
              },
              {
                font: {
                  bold: true,
                },
                format: "number",
              },
              {
                font: {
                  bold: false,
                  size: 10,
                },
              },
              {
                font: {
                  bold: true,
                },
                align: "center",
              },
              {
                font: {
                  bold: false,
                },
                format: "number",
              },
              {
                font: {
                  bold: true,
                  size: 10,
                },
              },
              {
                font: {
                  size: 14,
                },
              },
              {
                font: {
                  bold: true,
                  size: 12,
                },
                align: "left",
              },
              {
                align: "center",
              },
              {
                align: "left",
              },
              {
                textwrap: false,
              },
              {
                font: {
                  size: 12,
                },
              },
              {
                format: "million-currency",
              },
              {
                format: "normal",
              },
              {
                format: "normal",
                color: "#43cea2",
              },
              {
                color: "#fdc101",
              },
              {
                color: "#7f7f7f",
              },
              {
                color: "#ffc001",
              },
              {
                color: "#000100",
              },
              {
                color: "#000100",
                bgcolor: "#fff2cd",
              },
              {
                color: "#000100",
                bgcolor: "#ffe59a",
              },
              {
                format: "currency",
                color: "#00b04e",
              },
              {
                format: "million",
              },
              {
                color: "#000100",
                bgcolor: "#ffffff",
              },
            ],
            merges: [
              "A1:B1",
              "A6:B6",
              "A2:B2",
              "A3:B3",
              "D2:E2",
              "D8:E8",
              "D3:W6",
            ],
            rows: {
              0: {
                cells: {
                  0: {
                    merge: [0, 1],
                    style: 8,
                  },
                  1: {
                    style: 8,
                  },
                  2: {
                    style: 42,
                  },
                  3: {
                    style: 42,
                  },
                  4: {
                    style: 42,
                  },
                },
              },
              1: {
                cells: {
                  0: {
                    merge: [0, 1],
                    style: 27,
                  },
                  1: {
                    style: 27,
                  },
                  3: {
                    merge: [0, 1],
                    style: 16,
                  },
                  4: {
                    style: 16,
                  },
                },
              },
              2: {
                cells: {
                  0: {
                    merge: [0, 1],
                    style: 27,
                  },
                  1: {
                    style: 27,
                  },
                  3: {
                    merge: [3, 19],
                    style: 19,
                  },
                  4: {
                    style: 19,
                  },
                  5: {
                    style: 19,
                  },
                  6: {
                    style: 19,
                  },
                  7: {
                    style: 19,
                  },
                  8: {
                    style: 19,
                  },
                  9: {
                    style: 19,
                  },
                  10: {
                    style: 19,
                  },
                  11: {
                    style: 19,
                  },
                  12: {
                    style: 19,
                  },
                  13: {
                    style: 19,
                  },
                  14: {
                    style: 19,
                  },
                  15: {
                    style: 19,
                  },
                  16: {
                    style: 19,
                  },
                  17: {
                    style: 19,
                  },
                  18: {
                    style: 19,
                  },
                  19: {
                    style: 19,
                  },
                  20: {
                    style: 19,
                  },
                  21: {
                    style: 19,
                  },
                  22: {
                    style: 19,
                  },
                },
              },
              3: {
                cells: {
                  0: {
                    style: 23,
                  },
                  1: {
                    style: 4,
                    comment:
                      "Refers to a company's total stock currently held by public investors, including share blocks held by institutional investors and restricted shares owned by the company’s officers and insiders.",
                  },
                  2: {
                    style: 29,
                  },
                  3: {
                    style: 19,
                  },
                  4: {
                    style: 19,
                  },
                  5: {
                    style: 19,
                  },
                  6: {
                    style: 19,
                  },
                  7: {
                    style: 19,
                  },
                  8: {
                    style: 19,
                  },
                  9: {
                    style: 19,
                  },
                  10: {
                    style: 19,
                  },
                  11: {
                    style: 19,
                  },
                  12: {
                    style: 19,
                  },
                  13: {
                    style: 19,
                  },
                  14: {
                    style: 19,
                  },
                  15: {
                    style: 19,
                  },
                  16: {
                    style: 19,
                  },
                  17: {
                    style: 19,
                  },
                  18: {
                    style: 19,
                  },
                  19: {
                    style: 19,
                  },
                  20: {
                    style: 19,
                  },
                  21: {
                    style: 19,
                  },
                  22: {
                    style: 19,
                  },
                },
              },
              4: {
                cells: {
                  2: {
                    style: 29,
                  },
                  3: {
                    style: 19,
                  },
                  4: {
                    style: 19,
                  },
                  5: {
                    style: 19,
                  },
                  6: {
                    style: 19,
                  },
                  7: {
                    style: 19,
                  },
                  8: {
                    style: 19,
                  },
                  9: {
                    style: 19,
                  },
                  10: {
                    style: 19,
                  },
                  11: {
                    style: 19,
                  },
                  12: {
                    style: 19,
                  },
                  13: {
                    style: 19,
                  },
                  14: {
                    style: 19,
                  },
                  15: {
                    style: 19,
                  },
                  16: {
                    style: 19,
                  },
                  17: {
                    style: 19,
                  },
                  18: {
                    style: 19,
                  },
                  19: {
                    style: 19,
                  },
                  20: {
                    style: 19,
                  },
                  21: {
                    style: 19,
                  },
                  22: {
                    style: 19,
                  },
                },
              },
              5: {
                cells: {
                  0: {
                    merge: [0, 1],
                    style: 26,
                  },
                  1: {
                    style: 26,
                  },
                  2: {
                    style: 29,
                  },
                  3: {
                    style: 19,
                  },
                  4: {
                    style: 19,
                  },
                  5: {
                    style: 19,
                  },
                  6: {
                    style: 19,
                  },
                  7: {
                    style: 19,
                  },
                  8: {
                    style: 19,
                  },
                  9: {
                    style: 19,
                  },
                  10: {
                    style: 19,
                  },
                  11: {
                    style: 19,
                  },
                  12: {
                    style: 19,
                  },
                  13: {
                    style: 19,
                  },
                  14: {
                    style: 19,
                  },
                  15: {
                    style: 19,
                  },
                  16: {
                    style: 19,
                  },
                  17: {
                    style: 19,
                  },
                  18: {
                    style: 19,
                  },
                  19: {
                    style: 19,
                  },
                  20: {
                    style: 19,
                  },
                  21: {
                    style: 19,
                  },
                  22: {
                    style: 19,
                  },
                },
              },
              6: {
                cells: {
                  3: {
                    style: 19,
                  },
                  4: {
                    style: 19,
                  },
                  5: {
                    style: 19,
                  },
                  6: {
                    style: 19,
                  },
                  7: {
                    style: 19,
                  },
                  8: {
                    style: 19,
                  },
                  9: {
                    style: 19,
                  },
                  10: {
                    style: 19,
                  },
                  11: {
                    style: 19,
                  },
                  12: {
                    style: 19,
                  },
                },
              },
              7: {
                cells: {
                  1: {
                    style: 0,
                  },
                  3: {
                    merge: [0, 1],
                    style: 16,
                  },
                  4: {
                    style: 16,
                  },
                },
              },
              8: {
                cells: {
                  1: {
                    style: 0,
                  },
                  4: {
                    style: 6,
                  },
                  5: {
                    style: 6,
                  },
                  6: {
                    style: 6,
                  },
                  7: {
                    style: 6,
                  },
                  8: {
                    style: 6,
                  },
                  9: {
                    style: 6,
                  },
                  10: {
                    style: 6,
                  },
                  11: {
                    style: 6,
                  },
                  12: {
                    style: 6,
                  },
                  13: {
                    style: 6,
                  },
                  14: {
                    style: 6,
                  },
                  15: {
                    style: 6,
                  },
                  16: {
                    style: 6,
                  },
                  17: {
                    style: 6,
                  },
                  18: {
                    style: 6,
                  },
                  19: {
                    style: 6,
                  },
                  20: {
                    style: 6,
                  },
                  21: {
                    style: 6,
                  },
                  22: {
                    style: 6,
                  },
                  23: {
                    style: 6,
                  },
                  24: {
                    style: 6,
                  },
                  25: {
                    style: 6,
                  },
                },
              },
              9: {
                cells: {
                  1: {
                    style: 0,
                  },
                  3: {
                    style: 6,
                  },
                  4: {
                    style: 31,
                  },
                  5: {
                    style: 31,
                  },
                  6: {
                    style: 31,
                  },
                  7: {
                    style: 31,
                  },
                  8: {
                    style: 31,
                  },
                  9: {
                    style: 31,
                  },
                  10: {
                    style: 31,
                  },
                  11: {
                    style: 31,
                  },
                  12: {
                    style: 31,
                  },
                  13: {
                    style: 31,
                  },
                  14: {
                    style: 31,
                  },
                  15: {
                    style: 31,
                  },
                  16: {
                    style: 31,
                  },
                  17: {
                    style: 31,
                  },
                  18: {
                    style: 31,
                  },
                  19: {
                    style: 31,
                  },
                  20: {
                    style: 31,
                  },
                  21: {
                    style: 31,
                  },
                  22: {
                    style: 31,
                  },
                  23: {
                    style: 31,
                  },
                  24: {
                    style: 31,
                  },
                  25: {
                    style: 31,
                  },
                },
              },
              10: {
                cells: {
                  1: {
                    style: 4,
                  },
                  3: {
                    style: 6,
                  },
                  4: {
                    style: 31,
                  },
                  5: {
                    style: 31,
                  },
                  6: {
                    style: 31,
                  },
                  7: {
                    style: 31,
                  },
                  8: {
                    style: 31,
                  },
                  9: {
                    style: 31,
                  },
                  10: {
                    style: 31,
                  },
                  11: {
                    style: 31,
                  },
                  12: {
                    style: 31,
                  },
                  13: {
                    style: 31,
                  },
                  14: {
                    style: 31,
                  },
                  15: {
                    style: 31,
                  },
                  16: {
                    style: 31,
                  },
                  17: {
                    style: 31,
                  },
                  18: {
                    style: 31,
                  },
                  19: {
                    style: 31,
                  },
                  20: {
                    style: 31,
                  },
                  21: {
                    style: 31,
                  },
                  22: {
                    style: 31,
                  },
                  23: {
                    style: 31,
                  },
                  24: {
                    style: 31,
                  },
                  25: {
                    style: 31,
                  },
                },
              },
              11: {
                cells: {
                  1: {
                    style: 0,
                  },
                  3: {
                    style: 6,
                  },
                  4: {
                    style: 0,
                  },
                  5: {
                    style: 0,
                  },
                  6: {
                    style: 0,
                  },
                  7: {
                    style: 0,
                  },
                  8: {
                    style: 0,
                  },
                  9: {
                    style: 0,
                  },
                  10: {
                    style: 0,
                  },
                  11: {
                    style: 0,
                  },
                  12: {
                    style: 0,
                  },
                  13: {
                    style: 0,
                  },
                  14: {
                    style: 0,
                  },
                  15: {
                    style: 0,
                  },
                  16: {
                    style: 0,
                  },
                  17: {
                    style: 0,
                  },
                  18: {
                    style: 0,
                  },
                  19: {
                    style: 0,
                  },
                  20: {
                    style: 0,
                  },
                  21: {
                    style: 0,
                  },
                  22: {
                    style: 0,
                  },
                  23: {
                    style: 0,
                  },
                  24: {
                    style: 0,
                  },
                  25: {
                    style: 0,
                  },
                },
              },
              12: {
                cells: {
                  1: {
                    style: 4,
                  },
                  3: {
                    style: 6,
                    comment:
                      "Also known as Total Stock Holder Equity. The amount of assets remaining after all of it's liabilities have been paid. This is because Assets = Liabilities + Equity.",
                  },
                  4: {
                    style: 31,
                  },
                  5: {
                    style: 31,
                  },
                  6: {
                    style: 31,
                  },
                  7: {
                    style: 31,
                  },
                  8: {
                    style: 31,
                  },
                  9: {
                    style: 31,
                  },
                  10: {
                    style: 31,
                  },
                  11: {
                    style: 31,
                  },
                  12: {
                    style: 31,
                  },
                  13: {
                    style: 31,
                  },
                  14: {
                    style: 31,
                  },
                  15: {
                    style: 31,
                  },
                  16: {
                    style: 31,
                  },
                  17: {
                    style: 31,
                  },
                  18: {
                    style: 31,
                  },
                  19: {
                    style: 31,
                  },
                  20: {
                    style: 31,
                  },
                  21: {
                    style: 31,
                  },
                  22: {
                    style: 31,
                  },
                  23: {
                    style: 31,
                  },
                  24: {
                    style: 31,
                  },
                  25: {
                    style: 31,
                  },
                },
              },
              13: {
                cells: {
                  1: {
                    style: 4,
                  },
                  3: {
                    style: 6,
                    comment:
                      "The total amount of debt the company owes which is recorded in the books of the company. We include capital lease obligations in this number as lease obligations are a form of debt.",
                  },
                  4: {
                    style: 31,
                  },
                  5: {
                    style: 31,
                  },
                  6: {
                    style: 31,
                  },
                  7: {
                    style: 31,
                  },
                  8: {
                    style: 31,
                  },
                  9: {
                    style: 31,
                  },
                  10: {
                    style: 31,
                  },
                  11: {
                    style: 31,
                  },
                  12: {
                    style: 31,
                  },
                  13: {
                    style: 31,
                  },
                  14: {
                    style: 31,
                  },
                  15: {
                    style: 31,
                  },
                  16: {
                    style: 31,
                  },
                  17: {
                    style: 31,
                  },
                  18: {
                    style: 31,
                  },
                  19: {
                    style: 31,
                  },
                  20: {
                    style: 31,
                  },
                  21: {
                    style: 31,
                  },
                  22: {
                    style: 31,
                  },
                  23: {
                    style: 31,
                  },
                  24: {
                    style: 31,
                  },
                  25: {
                    style: 31,
                  },
                },
              },
              14: {
                cells: {
                  3: {
                    style: 6,
                    comment:
                      "The amount of capital that has been invested into the business. The formula is (Book Value of Equity + Book Value of Debt) - Cash & Short Term Investments. We minus the cash out because cash is not an investment as it returns nothing.",
                  },
                  4: {
                    style: 31,
                  },
                  5: {
                    style: 31,
                  },
                  6: {
                    style: 31,
                  },
                  7: {
                    style: 31,
                  },
                  8: {
                    style: 31,
                  },
                  9: {
                    style: 31,
                  },
                  10: {
                    style: 31,
                  },
                  11: {
                    style: 31,
                  },
                  12: {
                    style: 31,
                  },
                  13: {
                    style: 31,
                  },
                  14: {
                    style: 31,
                  },
                  15: {
                    style: 31,
                  },
                  16: {
                    style: 31,
                  },
                  17: {
                    style: 31,
                  },
                  18: {
                    style: 31,
                  },
                  19: {
                    style: 31,
                  },
                  20: {
                    style: 31,
                  },
                  21: {
                    style: 31,
                  },
                  22: {
                    style: 31,
                  },
                  23: {
                    style: 31,
                  },
                  24: {
                    style: 31,
                  },
                  25: {
                    style: 31,
                  },
                },
              },
              15: {
                cells: {
                  3: {
                    style: 6,
                  },
                  4: {
                    style: 4,
                  },
                  5: {
                    style: 4,
                  },
                  6: {
                    style: 4,
                  },
                  7: {
                    style: 4,
                  },
                  8: {
                    style: 4,
                  },
                  9: {
                    style: 4,
                  },
                  10: {
                    style: 4,
                  },
                  11: {
                    style: 4,
                  },
                  12: {
                    style: 4,
                  },
                  13: {
                    style: 4,
                  },
                  14: {
                    style: 4,
                  },
                  15: {
                    style: 4,
                  },
                  16: {
                    style: 4,
                  },
                  17: {
                    style: 4,
                  },
                  18: {
                    style: 4,
                  },
                  19: {
                    style: 4,
                  },
                  20: {
                    style: 4,
                  },
                  21: {
                    style: 4,
                  },
                  22: {
                    style: 4,
                  },
                  23: {
                    style: 4,
                  },
                  24: {
                    style: 4,
                  },
                  25: {
                    style: 4,
                  },
                },
              },
              17: {
                cells: {
                  0: {
                    style: 16,
                  },
                },
              },
              18: {
                cells: {
                  1: {
                    style: 6,
                  },
                  2: {
                    style: 20,
                  },
                  3: {
                    style: 20,
                  },
                  4: {
                    style: 20,
                  },
                  5: {
                    style: 20,
                  },
                  6: {
                    style: 20,
                  },
                  7: {
                    style: 20,
                  },
                  8: {
                    style: 20,
                  },
                  9: {
                    style: 20,
                  },
                  10: {
                    style: 20,
                  },
                  11: {
                    style: 20,
                  },
                  12: {
                    style: 6,
                  },
                },
              },
              19: {
                cells: {
                  0: {
                    style: 6,
                  },
                  1: {
                    style: 3,
                  },
                  2: {
                    style: 3,
                  },
                  3: {
                    style: 3,
                  },
                  4: {
                    style: 3,
                  },
                  5: {
                    style: 3,
                  },
                  6: {
                    style: 3,
                  },
                  7: {
                    style: 3,
                  },
                  8: {
                    style: 3,
                  },
                  9: {
                    style: 3,
                  },
                  10: {
                    style: 3,
                  },
                  11: {
                    style: 3,
                  },
                  12: {
                    style: 3,
                  },
                },
              },
              20: {
                cells: {
                  0: {
                    style: 6,
                  },
                  1: {
                    style: 0,
                  },
                  2: {
                    style: 0,
                  },
                  3: {
                    style: 0,
                  },
                  4: {
                    style: 0,
                  },
                  5: {
                    style: 0,
                  },
                  6: {
                    style: 0,
                  },
                  7: {
                    style: 0,
                  },
                  8: {
                    style: 0,
                  },
                  9: {
                    style: 0,
                  },
                  10: {
                    style: 0,
                  },
                  11: {
                    style: 0,
                  },
                  12: {
                    style: 0,
                  },
                },
                height: 25,
              },
              21: {
                cells: {
                  0: {
                    style: 6,
                  },
                  1: {
                    style: 3,
                  },
                  2: {
                    style: 3,
                  },
                  3: {
                    style: 3,
                  },
                  4: {
                    style: 3,
                  },
                  5: {
                    style: 3,
                  },
                  6: {
                    style: 3,
                  },
                  7: {
                    style: 3,
                  },
                  8: {
                    style: 3,
                  },
                  9: {
                    style: 3,
                  },
                  10: {
                    style: 3,
                  },
                  11: {
                    style: 3,
                  },
                  12: {
                    style: 3,
                  },
                },
              },
              22: {
                cells: {
                  0: {
                    style: 6,
                  },
                  1: {
                    style: 0,
                  },
                  2: {
                    style: 0,
                  },
                  3: {
                    style: 0,
                  },
                  4: {
                    style: 0,
                  },
                  5: {
                    style: 0,
                  },
                  6: {
                    style: 0,
                  },
                  7: {
                    style: 0,
                  },
                  8: {
                    style: 0,
                  },
                  9: {
                    style: 0,
                  },
                  10: {
                    style: 0,
                  },
                  11: {
                    style: 0,
                  },
                  12: {
                    style: 0,
                  },
                },
              },
              23: {
                cells: {
                  0: {
                    style: 6,
                  },
                  1: {
                    style: 3,
                  },
                  2: {
                    style: 3,
                  },
                  3: {
                    style: 3,
                  },
                  4: {
                    style: 3,
                  },
                  5: {
                    style: 3,
                  },
                  6: {
                    style: 3,
                  },
                  7: {
                    style: 3,
                  },
                  8: {
                    style: 3,
                  },
                  9: {
                    style: 3,
                  },
                  10: {
                    style: 3,
                  },
                  11: {
                    style: 3,
                  },
                  12: {
                    style: 3,
                  },
                },
              },
              24: {
                cells: {
                  0: {
                    style: 6,
                  },
                  1: {
                    style: 3,
                  },
                  2: {
                    style: 3,
                  },
                  3: {
                    style: 3,
                  },
                  4: {
                    style: 3,
                  },
                  5: {
                    style: 3,
                  },
                  6: {
                    style: 3,
                  },
                  7: {
                    style: 3,
                  },
                  8: {
                    style: 3,
                  },
                  9: {
                    style: 3,
                  },
                  10: {
                    style: 3,
                  },
                  11: {
                    style: 3,
                  },
                  12: {
                    style: 3,
                  },
                },
              },
              25: {
                cells: {
                  0: {
                    style: 6,
                  },
                  1: {
                    style: 3,
                  },
                  2: {
                    style: 3,
                  },
                  3: {
                    style: 3,
                  },
                  4: {
                    style: 3,
                  },
                  5: {
                    style: 3,
                  },
                  6: {
                    style: 3,
                  },
                  7: {
                    style: 3,
                  },
                  8: {
                    style: 3,
                  },
                  9: {
                    style: 3,
                  },
                  10: {
                    style: 3,
                  },
                  11: {
                    style: 3,
                  },
                  12: {
                    style: 3,
                  },
                },
              },
              26: {
                cells: {
                  0: {
                    style: 6,
                  },
                  1: {
                    style: 3,
                  },
                  2: {
                    style: 3,
                  },
                  3: {
                    style: 3,
                  },
                  4: {
                    style: 3,
                  },
                  5: {
                    style: 3,
                  },
                  6: {
                    style: 3,
                  },
                  7: {
                    style: 3,
                  },
                  8: {
                    style: 3,
                  },
                  9: {
                    style: 3,
                  },
                  10: {
                    style: 3,
                  },
                  11: {
                    style: 3,
                  },
                  12: {
                    style: 3,
                  },
                },
              },
              27: {
                cells: {
                  0: {
                    style: 6,
                  },
                },
              },
              28: {
                cells: {
                  0: {
                    style: 6,
                  },
                  1: {
                    style: 0,
                  },
                  2: {
                    style: 0,
                  },
                  3: {
                    style: 0,
                  },
                  4: {
                    style: 0,
                  },
                  5: {
                    style: 0,
                  },
                  6: {
                    style: 0,
                  },
                  7: {
                    style: 0,
                  },
                  8: {
                    style: 0,
                  },
                  9: {
                    style: 0,
                  },
                  10: {
                    style: 0,
                  },
                  11: {
                    style: 0,
                  },
                  12: {
                    style: 0,
                  },
                },
              },
              29: {
                cells: {
                  0: {
                    style: 6,
                  },
                  1: {
                    style: 4,
                  },
                  2: {
                    style: 4,
                  },
                  3: {
                    style: 4,
                  },
                  4: {
                    style: 4,
                  },
                  5: {
                    style: 4,
                  },
                  6: {
                    style: 4,
                  },
                  7: {
                    style: 4,
                  },
                  8: {
                    style: 4,
                  },
                  9: {
                    style: 4,
                  },
                  10: {
                    style: 4,
                  },
                  11: {
                    style: 4,
                  },
                  12: {
                    style: 4,
                  },
                },
                height: 25,
              },
              30: {
                cells: {
                  0: {
                    style: 6,
                  },
                  1: {
                    style: 3,
                  },
                  2: {
                    style: 3,
                  },
                  3: {
                    style: 3,
                  },
                  4: {
                    style: 3,
                  },
                  5: {
                    style: 3,
                  },
                  6: {
                    style: 3,
                  },
                  7: {
                    style: 3,
                  },
                  8: {
                    style: 3,
                  },
                  9: {
                    style: 3,
                  },
                  10: {
                    style: 3,
                  },
                  11: {
                    style: 3,
                  },
                  12: {
                    style: 3,
                  },
                },
              },
              31: {
                cells: {
                  0: {
                    style: 6,
                  },
                  2: {
                    style: 4,
                  },
                  3: {
                    style: 4,
                  },
                  4: {
                    style: 4,
                  },
                  5: {
                    style: 4,
                  },
                  6: {
                    style: 4,
                  },
                  7: {
                    style: 4,
                  },
                  8: {
                    style: 4,
                  },
                  9: {
                    style: 4,
                  },
                  10: {
                    style: 4,
                  },
                  11: {
                    style: 4,
                  },
                },
              },
              32: {
                cells: {
                  0: {
                    style: 6,
                  },
                  1: {
                    style: 4,
                  },
                  2: {
                    style: 4,
                  },
                  3: {
                    style: 4,
                  },
                  4: {
                    style: 4,
                  },
                  5: {
                    style: 4,
                  },
                  6: {
                    style: 4,
                  },
                  7: {
                    style: 4,
                  },
                  8: {
                    style: 4,
                  },
                  9: {
                    style: 4,
                  },
                  10: {
                    style: 4,
                  },
                  11: {
                    style: 4,
                  },
                  12: {
                    style: 4,
                  },
                },
              },
              33: {
                cells: {
                  0: {
                    style: 6,
                  },
                  1: {
                    style: 3,
                  },
                  2: {
                    style: 3,
                  },
                  3: {
                    style: 3,
                  },
                  4: {
                    style: 3,
                  },
                  5: {
                    style: 3,
                  },
                  6: {
                    style: 3,
                  },
                  7: {
                    style: 3,
                  },
                  8: {
                    style: 3,
                  },
                  9: {
                    style: 3,
                  },
                  10: {
                    style: 3,
                  },
                  11: {
                    style: 3,
                  },
                  12: {
                    style: 3,
                  },
                },
              },
              34: {
                cells: {
                  0: {
                    style: 6,
                  },
                  1: {
                    style: 0,
                  },
                  2: {
                    style: 0,
                  },
                  3: {
                    style: 0,
                  },
                  4: {
                    style: 0,
                  },
                  5: {
                    style: 0,
                  },
                  6: {
                    style: 0,
                  },
                  7: {
                    style: 0,
                  },
                  8: {
                    style: 0,
                  },
                  9: {
                    style: 0,
                  },
                  10: {
                    style: 0,
                  },
                  11: {
                    style: 0,
                  },
                  12: {
                    style: 0,
                  },
                },
              },
              35: {
                cells: {
                  0: {
                    style: 6,
                  },
                  1: {
                    style: 0,
                  },
                  2: {
                    style: 32,
                  },
                  3: {
                    style: 32,
                  },
                  4: {
                    style: 32,
                  },
                  5: {
                    style: 32,
                  },
                  6: {
                    style: 32,
                  },
                  7: {
                    style: 32,
                  },
                  8: {
                    style: 32,
                  },
                  9: {
                    style: 32,
                  },
                  10: {
                    style: 32,
                  },
                  11: {
                    style: 32,
                  },
                  12: {
                    style: 32,
                  },
                },
              },
              36: {
                cells: {
                  0: {
                    style: 6,
                  },
                  1: {
                    style: 3,
                  },
                  2: {
                    style: 32,
                  },
                  3: {
                    style: 32,
                  },
                  4: {
                    style: 32,
                  },
                  5: {
                    style: 32,
                  },
                  6: {
                    style: 32,
                  },
                  7: {
                    style: 32,
                  },
                  8: {
                    style: 32,
                  },
                  9: {
                    style: 32,
                  },
                  10: {
                    style: 32,
                  },
                  11: {
                    style: 32,
                  },
                  12: {
                    style: 32,
                  },
                },
              },
              37: {
                cells: {
                  0: {
                    style: 6,
                  },
                  1: {
                    style: 0,
                  },
                  2: {
                    style: 32,
                  },
                  3: {
                    style: 32,
                  },
                  4: {
                    style: 32,
                  },
                  5: {
                    style: 32,
                  },
                  6: {
                    style: 32,
                  },
                  7: {
                    style: 32,
                  },
                  8: {
                    style: 32,
                  },
                  9: {
                    style: 32,
                  },
                  10: {
                    style: 32,
                  },
                  11: {
                    style: 32,
                  },
                  12: {
                    style: 32,
                  },
                },
              },
              38: {
                cells: {
                  0: {
                    style: 6,
                  },
                  1: {
                    style: 3,
                  },
                  2: {
                    style: 32,
                  },
                  3: {
                    style: 32,
                  },
                  4: {
                    style: 32,
                  },
                  5: {
                    style: 32,
                  },
                  6: {
                    style: 32,
                  },
                  7: {
                    style: 32,
                  },
                  8: {
                    style: 32,
                  },
                  9: {
                    style: 32,
                  },
                  10: {
                    style: 32,
                  },
                  11: {
                    style: 32,
                  },
                  12: {
                    style: 32,
                  },
                },
              },
              39: {
                cells: {
                  0: {
                    style: 6,
                  },
                  1: {
                    style: 3,
                  },
                  2: {
                    style: 32,
                  },
                  3: {
                    style: 32,
                  },
                  4: {
                    style: 32,
                  },
                  5: {
                    style: 32,
                  },
                  6: {
                    style: 32,
                  },
                  7: {
                    style: 32,
                  },
                  8: {
                    style: 32,
                  },
                  9: {
                    style: 32,
                  },
                  10: {
                    style: 32,
                  },
                  11: {
                    style: 32,
                  },
                  12: {
                    style: 32,
                  },
                },
              },
              40: {
                cells: {
                  0: {
                    style: 6,
                  },
                  1: {
                    style: 3,
                  },
                  2: {
                    style: 32,
                  },
                  3: {
                    style: 32,
                  },
                  4: {
                    style: 32,
                  },
                  5: {
                    style: 32,
                  },
                  6: {
                    style: 32,
                  },
                  7: {
                    style: 32,
                  },
                  8: {
                    style: 32,
                  },
                  9: {
                    style: 32,
                  },
                  10: {
                    style: 32,
                  },
                  11: {
                    style: 32,
                  },
                  12: {
                    style: 32,
                  },
                },
              },
              41: {
                cells: {
                  0: {
                    style: 6,
                  },
                  1: {
                    style: 3,
                  },
                  2: {
                    style: 32,
                  },
                  3: {
                    style: 32,
                  },
                  4: {
                    style: 32,
                  },
                  5: {
                    style: 32,
                  },
                  6: {
                    style: 32,
                  },
                  7: {
                    style: 32,
                  },
                  8: {
                    style: 32,
                  },
                  9: {
                    style: 32,
                  },
                  10: {
                    style: 32,
                  },
                  11: {
                    style: 32,
                  },
                  12: {
                    style: 32,
                  },
                },
              },
              42: {
                cells: {
                  0: {
                    style: 6,
                  },
                  1: {
                    style: 0,
                  },
                  2: {
                    style: 32,
                  },
                  3: {
                    style: 32,
                  },
                  4: {
                    style: 32,
                  },
                  5: {
                    style: 32,
                  },
                  6: {
                    style: 32,
                  },
                  7: {
                    style: 32,
                  },
                  8: {
                    style: 32,
                  },
                  9: {
                    style: 32,
                  },
                  10: {
                    style: 32,
                  },
                  11: {
                    style: 32,
                  },
                  12: {
                    style: 32,
                  },
                },
              },
              43: {
                cells: {
                  0: {
                    style: 6,
                  },
                  1: {
                    style: 3,
                  },
                  2: {
                    style: 32,
                  },
                  3: {
                    style: 32,
                  },
                  4: {
                    style: 32,
                  },
                  5: {
                    style: 32,
                  },
                  6: {
                    style: 32,
                  },
                  7: {
                    style: 32,
                  },
                  8: {
                    style: 32,
                  },
                  9: {
                    style: 32,
                  },
                  10: {
                    style: 32,
                  },
                  11: {
                    style: 32,
                  },
                  12: {
                    style: 32,
                  },
                },
              },
              44: {
                cells: {
                  0: {
                    style: 6,
                  },
                  1: {
                    style: 3,
                  },
                  2: {
                    style: 32,
                  },
                  3: {
                    style: 32,
                  },
                  4: {
                    style: 32,
                  },
                  5: {
                    style: 32,
                  },
                  6: {
                    style: 32,
                  },
                  7: {
                    style: 32,
                  },
                  8: {
                    style: 32,
                  },
                  9: {
                    style: 32,
                  },
                  10: {
                    style: 32,
                  },
                  11: {
                    style: 32,
                  },
                  12: {
                    style: 32,
                  },
                },
              },
              45: {
                cells: {
                  0: {
                    style: 6,
                  },
                  1: {
                    style: 3,
                  },
                  2: {
                    style: 32,
                  },
                  3: {
                    style: 32,
                  },
                  4: {
                    style: 32,
                  },
                  5: {
                    style: 32,
                  },
                  6: {
                    style: 32,
                  },
                  7: {
                    style: 32,
                  },
                  8: {
                    style: 32,
                  },
                  9: {
                    style: 32,
                  },
                  10: {
                    style: 32,
                  },
                  11: {
                    style: 32,
                  },
                  12: {
                    style: 32,
                  },
                },
              },
              46: {
                cells: {
                  0: {
                    style: 6,
                  },
                  1: {
                    style: 3,
                  },
                  2: {
                    style: 32,
                  },
                  3: {
                    style: 32,
                  },
                  4: {
                    style: 32,
                  },
                  5: {
                    style: 32,
                  },
                  6: {
                    style: 32,
                  },
                  7: {
                    style: 32,
                  },
                  8: {
                    style: 32,
                  },
                  9: {
                    style: 32,
                  },
                  10: {
                    style: 32,
                  },
                  11: {
                    style: 32,
                  },
                  12: {
                    style: 32,
                  },
                },
              },
              47: {
                cells: {
                  0: {
                    style: 6,
                  },
                  1: {
                    style: 3,
                  },
                  2: {
                    style: 32,
                  },
                  3: {
                    style: 32,
                  },
                  4: {
                    style: 32,
                  },
                  5: {
                    style: 32,
                  },
                  6: {
                    style: 32,
                  },
                  7: {
                    style: 32,
                  },
                  8: {
                    style: 32,
                  },
                  9: {
                    style: 32,
                  },
                  10: {
                    style: 32,
                  },
                  11: {
                    style: 32,
                  },
                  12: {
                    style: 32,
                  },
                },
              },
              48: {
                cells: {
                  0: {
                    style: 6,
                  },
                  1: {
                    style: 3,
                  },
                  2: {
                    style: 32,
                  },
                  3: {
                    style: 32,
                  },
                  4: {
                    style: 32,
                  },
                  5: {
                    style: 32,
                  },
                  6: {
                    style: 32,
                  },
                  7: {
                    style: 32,
                  },
                  8: {
                    style: 32,
                  },
                  9: {
                    style: 32,
                  },
                  10: {
                    style: 32,
                  },
                  11: {
                    style: 32,
                  },
                  12: {
                    style: 32,
                  },
                },
              },
              49: {
                cells: {
                  0: {
                    style: 6,
                  },
                  1: {
                    style: 3,
                  },
                  2: {
                    style: 32,
                  },
                  3: {
                    style: 32,
                  },
                  4: {
                    style: 32,
                  },
                  5: {
                    style: 32,
                  },
                  6: {
                    style: 32,
                  },
                  7: {
                    style: 32,
                  },
                  8: {
                    style: 32,
                  },
                  9: {
                    style: 32,
                  },
                  10: {
                    style: 32,
                  },
                  11: {
                    style: 32,
                  },
                  12: {
                    style: 32,
                  },
                },
              },
              50: {
                cells: {
                  0: {
                    style: 6,
                  },
                  1: {
                    style: 3,
                  },
                  2: {
                    style: 32,
                  },
                  3: {
                    style: 32,
                  },
                  4: {
                    style: 32,
                  },
                  5: {
                    style: 32,
                  },
                  6: {
                    style: 32,
                  },
                  7: {
                    style: 32,
                  },
                  8: {
                    style: 32,
                  },
                  9: {
                    style: 32,
                  },
                  10: {
                    style: 32,
                  },
                  11: {
                    style: 32,
                  },
                  12: {
                    style: 32,
                  },
                },
              },
              51: {
                cells: {
                  0: {
                    style: 6,
                  },
                  1: {
                    style: 3,
                  },
                  2: {
                    style: 32,
                  },
                  3: {
                    style: 32,
                  },
                  4: {
                    style: 32,
                  },
                  5: {
                    style: 32,
                  },
                  6: {
                    style: 32,
                  },
                  7: {
                    style: 32,
                  },
                  8: {
                    style: 32,
                  },
                  9: {
                    style: 32,
                  },
                  10: {
                    style: 32,
                  },
                  11: {
                    style: 32,
                  },
                  12: {
                    style: 32,
                  },
                },
              },
              52: {
                cells: {
                  0: {
                    style: 6,
                  },
                  1: {
                    style: 3,
                  },
                  2: {
                    style: 32,
                  },
                  3: {
                    style: 32,
                  },
                  4: {
                    style: 32,
                  },
                  5: {
                    style: 32,
                  },
                  6: {
                    style: 32,
                  },
                  7: {
                    style: 32,
                  },
                  8: {
                    style: 32,
                  },
                  9: {
                    style: 32,
                  },
                  10: {
                    style: 32,
                  },
                  11: {
                    style: 32,
                  },
                  12: {
                    style: 32,
                  },
                },
              },
              53: {
                cells: {
                  0: {
                    style: 6,
                  },
                  1: {
                    style: 40,
                  },
                  2: {
                    style: 32,
                  },
                  3: {
                    style: 32,
                  },
                  4: {
                    style: 32,
                  },
                  5: {
                    style: 32,
                  },
                  6: {
                    style: 32,
                  },
                  7: {
                    style: 32,
                  },
                  8: {
                    style: 32,
                  },
                  9: {
                    style: 32,
                  },
                  10: {
                    style: 32,
                  },
                  11: {
                    style: 32,
                  },
                  12: {
                    style: 32,
                  },
                },
              },
              54: {
                cells: {
                  0: {
                    style: 6,
                  },
                  1: {
                    style: 0,
                  },
                  2: {
                    style: 32,
                  },
                  3: {
                    style: 32,
                  },
                  4: {
                    style: 32,
                  },
                  5: {
                    style: 32,
                  },
                  6: {
                    style: 32,
                  },
                  7: {
                    style: 32,
                  },
                  8: {
                    style: 32,
                  },
                  9: {
                    style: 32,
                  },
                  10: {
                    style: 32,
                  },
                  11: {
                    style: 32,
                  },
                  12: {
                    style: 32,
                  },
                },
              },
              55: {
                cells: {
                  1: {
                    style: 32,
                  },
                },
              },
              56: {
                cells: {
                  1: {
                    style: 32,
                  },
                },
              },
              57: {
                cells: {
                  1: {
                    style: 32,
                  },
                },
              },
              58: {
                cells: {
                  1: {
                    style: 32,
                  },
                },
              },
              59: {
                cells: {
                  1: {
                    style: 32,
                  },
                },
              },
              60: {
                cells: {
                  1: {
                    style: 32,
                  },
                },
              },
              61: {
                cells: {
                  1: {
                    style: 32,
                  },
                },
              },
              62: {
                cells: {
                  1: {
                    style: 32,
                  },
                },
              },
              63: {
                cells: {
                  1: {
                    style: 32,
                  },
                },
              },
              64: {
                cells: {
                  1: {
                    style: 32,
                  },
                },
              },
              65: {
                cells: {
                  1: {
                    style: 32,
                  },
                },
              },
              66: {
                cells: {
                  1: {
                    style: 33,
                  },
                },
              },
              67: {
                cells: {
                  1: {
                    style: 32,
                  },
                },
              },
              68: {
                cells: {
                  1: {
                    style: 32,
                  },
                },
              },
              69: {
                cells: {
                  1: {
                    style: 32,
                  },
                },
              },
            },
            cols: {
              0: {
                width: 196,
              },
              1: {
                width: 130,
              },
              2: {
                width: 108,
              },
              3: {
                width: 150,
              },
            },
            validations: [],
            autofilter: {},
            cellsSerialized: {
              0: {
                0: '=FIN("name")',
              },
              1: {
                0: '=FIN("code")&"."&FIN("exchange")',
                3: "Business Description",
              },
              2: {
                0: '=FIN("price")&" "&FIN("currencyCode")',
                3: '=FIN("description")',
              },
              3: {
                0: "Shares Outstanding",
                1: "='API Millions Data'!$B$6",
              },
              5: {
                0: "Industry Averages Overview",
              },
              6: {
                0: "Category",
                1: '=FIN("industryName")',
              },
              7: {
                0: "CAGR Past Five Years",
                1: '=FIN("annualAverageCAGRLastFiveYears")',
                3: "Financials Overview",
              },
              8: {
                0: "Pre-tax Operating Margin (TTM)",
                1: '=FIN("preTaxOperatingMarginUnadjusted")',
                4: "TTM",
                5: '=FIN("date",,"01/01/2000")',
              },
              9: {
                0: "ROIC (TTM)",
                1: '=FIN("afterTaxROIC")',
                3: "Revenue",
                4: '=FIN("revenue")',
                5: '=FIN("revenue",,"01/01/2000")',
              },
              10: {
                0: "Sales to Capital Ratio",
                1: '=FIN("sales/Capital")',
                3: "Operating Income",
                4: '=FIN("operatingIncome")',
                5: '=FIN("operatingIncome",,"01/01/2000")',
              },
              11: {
                0: "WACC",
                1: '=FIN("costOfCapital")',
                3: "Operating Margin",
                4: '=FIN("operatingMargin")',
                5: '=FIN("operatingMargin",,"01/01/2000")',
              },
              12: {
                0: "Unlevered Beta",
                1: '=FIN("unleveredBeta")',
                3: "Book Value of Equity",
                4: '=FIN("bookValueOfEquity")',
                5: '=FIN("bookValueOfEquity",,"01/01/2000")',
              },
              13: {
                0: "Levered Beta",
                1: '=FIN("equityLeveredBeta")',
                3: "Book Value of Debt",
                4: '=FIN("bookValueOfDebt")',
                5: '=FIN("bookValueOfDebt",,"01/01/2000")',
              },
              14: {
                3: "Invested Capital",
                4: '=FIN("investedCapital")',
                5: '=FIN("investedCapital",,"01/01/2000")',
              },
              15: {
                3: "Sales to Capital Ratio",
                4: '=FIN("salesToCapitalRatio")',
                5: '=FIN("salesToCapitalRatio",,"01/01/2000")',
              },
              17: {
                0: "DCF Valuaton",
              },
              18: {
                1: "Base Year",
                2: 1,
                3: 2,
                4: 3,
                5: 4,
                6: 5,
                7: 6,
                8: 7,
                9: 8,
                10: 9,
                11: 10,
                12: "Terminal Year",
              },
              19: {
                0: "Revenues",
                1: "='API Millions Data'!$B$1",
                2: "=B20*(1+'Required Inputs'!$B$1)",
                3: "=C20*(1+'Required Inputs'!$B$1)",
                4: "=D20*(1+'Required Inputs'!$B$1)",
                5: "=E20*(1+'Required Inputs'!$B$1)",
                6: "=F20*(1+'Required Inputs'!$B$1)",
                7: "=G20*(1+'Required Inputs'!$B$1 - (('Required Inputs'!$B$1-FIN(\"riskFreeRate\")) / 5))",
                8: "=H20*(1+'Required Inputs'!$B$1 - (('Required Inputs'!$B$1-FIN(\"riskFreeRate\")) / 5) * 2)",
                9: "=I20*(1+'Required Inputs'!$B$1 - (('Required Inputs'!$B$1-FIN(\"riskFreeRate\")) / 5) * 3)",
                10: "=J20*(1+'Required Inputs'!$B$1 - (('Required Inputs'!$B$1-FIN(\"riskFreeRate\")) / 5) * 4)",
                11: "=K20*(1+'Required Inputs'!$B$1 - (('Required Inputs'!$B$1-FIN(\"riskFreeRate\")) / 5) * 5)",
                12: '=L20*(1+FIN("riskFreeRate"))',
              },
              20: {
                0: "Operating Margin",
                1: "=B22/B20",
                2: "=IF(C19 > 'Required Inputs'!$B$3, 'Required Inputs'!$B$2, 'Required Inputs'!$B$2 - (('Required Inputs'!$B$2 - B21) / 'Required Inputs'!$B$3) * ('Required Inputs'!$B$3 - C19))",
                3: "=IF(D19 > 'Required Inputs'!$B$3, 'Required Inputs'!$B$2, 'Required Inputs'!$B$2 - (('Required Inputs'!$B$2 - B21) / 'Required Inputs'!$B$3) * ('Required Inputs'!$B$3 - D19))",
                4: "=IF(E19 > 'Required Inputs'!$B$3, 'Required Inputs'!$B$2, 'Required Inputs'!$B$2 - (('Required Inputs'!$B$2 - B21) / 'Required Inputs'!$B$3) * ('Required Inputs'!$B$3 - E19))",
                5: "=IF(F19 > 'Required Inputs'!$B$3, 'Required Inputs'!$B$2, 'Required Inputs'!$B$2 - (('Required Inputs'!$B$2 - B21) / 'Required Inputs'!$B$3) * ('Required Inputs'!$B$3 - F19))",
                6: "=IF(G19 > 'Required Inputs'!$B$3, 'Required Inputs'!$B$2, 'Required Inputs'!$B$2 - (('Required Inputs'!$B$2 - B21) / 'Required Inputs'!$B$3) * ('Required Inputs'!$B$3 - G19))",
                7: "=IF(H19 > 'Required Inputs'!$B$3, 'Required Inputs'!$B$2, 'Required Inputs'!$B$2 - (('Required Inputs'!$B$2 - B21) / 'Required Inputs'!$B$3) * ('Required Inputs'!$B$3 - H19))",
                8: "=IF(I19 > 'Required Inputs'!$B$3, 'Required Inputs'!$B$2, 'Required Inputs'!$B$2 - (('Required Inputs'!$B$2 - B21) / 'Required Inputs'!$B$3) * ('Required Inputs'!$B$3 - I19))",
                9: "=IF(J19 > 'Required Inputs'!$B$3, 'Required Inputs'!$B$2, 'Required Inputs'!$B$2 - (('Required Inputs'!$B$2 - B21) / 'Required Inputs'!$B$3) * ('Required Inputs'!$B$3 - J19))",
                10: "=IF(K19 > 'Required Inputs'!$B$3, 'Required Inputs'!$B$2, 'Required Inputs'!$B$2 - (('Required Inputs'!$B$2 - B21) / 'Required Inputs'!$B$3) * ('Required Inputs'!$B$3 - K19))",
                11: "=IF(L19 > 'Required Inputs'!$B$3, 'Required Inputs'!$B$2, 'Required Inputs'!$B$2 - (('Required Inputs'!$B$2 - B21) / 'Required Inputs'!$B$3) * ('Required Inputs'!$B$3 - L19))",
                12: "=L21",
              },
              21: {
                0: "Operating Income",
                1: "=IFERROR('API Millions Data'!$B$2, 0)",
                2: "=C21*C20",
                3: "=D21*D20",
                4: "=E21*E20",
                5: "=F21*F20",
                6: "=G21*G20",
                7: "=H21*H20",
                8: "=I21*I20",
                9: "=J21*J20",
                10: "=K21*K20",
                11: "=L21*L20",
                12: "=M21*M20",
              },
              22: {
                0: "Tax Rate",
                1: '=FIN("pastThreeYearsAverageEffectiveTaxRate")',
                2: "=B23",
                3: "=C23",
                4: "=D23",
                5: "=E23",
                6: "=F23",
                7: "=G23+(M23-G23)/5",
                8: "=H23+(M23-G23)/5",
                9: "=I23+(M23-G23)/5",
                10: "=J23+(M23-G23)/5",
                11: "=K23+(M23-G23)/5",
                12: '=FIN("marginalTaxRate")',
              },
              23: {
                0: "NOPAT",
                1: "=IF(B22 > 0, B22 * (1-B23), B22)",
                2: "=IF(C22 > 0, IF(C22 < B27, C22, C22 - (C22 - B27) * C23), C22)",
                3: "=IF(D22 > 0, IF(D22 < C27, D22, D22 - (D22 - C27) * D23), D22)",
                4: "=IF(E22 > 0, IF(E22 < D27, E22, E22 - (E22 - D27) * E23), E22)",
                5: "=IF(F22 > 0, IF(F22 < E27, F22, F22 - (F22 - E27) * F23), F22)",
                6: "=IF(G22 > 0, IF(G22 < F27, G22, G22 - (G22 - F27) * G23), G22)",
                7: "=IF(H22 > 0, IF(H22 < G27, H22, H22 - (H22 - G27) * H23), H22)",
                8: "=IF(I22 > 0, IF(I22 < H27, I22, I22 - (I22 - H27) * I23), I22)",
                9: "=IF(J22 > 0, IF(J22 < I27, J22, J22 - (J22 - I27) * J23), J22)",
                10: "=IF(K22 > 0, IF(K22 < J27, K22, K22 - (K22 - J27) * K23), K22)",
                11: "=IF(L22 > 0, IF(L22 < K27, L22, L22 - (L22 - K27) * L23), L22)",
                12: "=M22*(1-M23)",
              },
              24: {
                0: "- Reinvestment",
                2: "=IF(C20 > B20, (C20-B20) / C33, 0)",
                3: "=(D20-C20)/D33",
                4: "=(E20-D20)/E33",
                5: "=(F20-E20)/F33",
                6: "=(G20-F20)/G33",
                7: "=(H20-G20)/H33",
                8: "=(I20-H20)/I33",
                9: "=(J20-I20)/J33",
                10: "=(K20-J20)/K33",
                11: "=(L20-K20)/L33",
                12: '=IF(FIN("riskFreeRate") > 0, (FIN("riskFreeRate") / M35) * M24, 0)',
              },
              25: {
                0: "FCFF",
                2: "=C24 - C25",
                3: "=D24 - D25",
                4: "=E24 - E25",
                5: "=F24 - F25",
                6: "=G24 - G25",
                7: "=H24 - H25",
                8: "=I24 - I25",
                9: "=J24 - J25",
                10: "=K24 - K25",
                11: "=L24 - L25",
                12: "=M24 - M25",
              },
              26: {
                0: "NOL",
                1: "='Optional Inputs'!J2",
                2: "=IF(C22 < 0, B27 - C22, IF(B27 > C22, B27 - C22, 0))",
                3: "=IF(D22 < 0, C27 - D22, IF(C27 > D22, C27 - D22, 0))",
                4: "=IF(E22 < 0, D27 - E22, IF(D27 > E22, D27 - E22, 0))",
                5: "=IF(F22 < 0, E27 - F22, IF(E27 > F22, E27 - F22, 0))",
                6: "=IF(G22 < 0, F27 - G22, IF(F27 > G22, F27 - G22, 0))",
                7: "=IF(H22 < 0, G27 - H22, IF(G27 > H22, G27 - H22, 0))",
                8: "=IF(I22 < 0, H27 - I22, IF(H27 > I22, H27 - I22, 0))",
                9: "=IF(J22 < 0, I27 - J22, IF(I27 > J22, I27 - J22, 0))",
                10: "=IF(K22 < 0, J27 - K22, IF(J27 > K22, J27 - K22, 0))",
                11: "=IF(L22 < 0, K27 - L22, IF(K27 > L22, K27 - L22, 0))",
                12: "=IF(M22 < 0, L27 - M22, IF(L27 > M22, L27 - M22, 0))",
              },
              28: {
                0: "Cost of Capital",
                2: "='Cost of Capital'!$G$18",
                3: "=C29",
                4: "=D29",
                5: "=E29",
                6: "=F29",
                7: "=G29-(G29-M29)/5",
                8: "=H29-(G29-M29)/5",
                9: "=I29-(G29-M29)/5",
                10: "=J29-(G29-M29)/5",
                11: "=K29-(G29-M29)/5",
                12: '=FIN("matureMarketEquityRiskPremium") + FIN("riskFreeRate")',
              },
              29: {
                0: "Cumulated Discount Factor",
                2: "=1/(1+C29)",
                3: "=C30*(1/(1+D29))",
                4: "=D30*(1/(1+E29))",
                5: "=E30*(1/(1+F29))",
                6: "=F30*(1/(1+G29))",
                7: "=G30*(1/(1+H29))",
                8: "=H30*(1/(1+I29))",
                9: "=I30*(1/(1+J29))",
                10: "=J30*(1/(1+K29))",
                11: "=K30*(1/(1+L29))",
              },
              30: {
                0: "PV (FCFF)",
                2: "=C26*C30",
                3: "=D26*D30",
                4: "=E26*E30",
                5: "=F26*F30",
                6: "=G26*G30",
                7: "=H26*H30",
                8: "=I26*I30",
                9: "=J26*J30",
                10: "=K26*K30",
                11: "=L26*L30",
              },
              32: {
                0: "Sales to Capital Ratio",
                2: "='Required Inputs'!$B$4",
                3: "=C33",
                4: "=D33",
                5: "=E33",
                6: "=F33",
                7: "=G33",
                8: "=H33",
                9: "=I33",
                10: "=J33",
                11: "=K33",
              },
              33: {
                0: "Invested Capital",
                1: "=IFERROR('API Millions Data'!$B$5, 0)",
                2: "=B34+C25",
                3: "=C34+D25",
                4: "=D34+E25",
                5: "=E34+F25",
                6: "=F34+G25",
                7: "=G34+H25",
                8: "=H34+I25",
                9: "=I34+J25",
                10: "=J34+K25",
                11: "=K34+L25",
              },
              34: {
                0: "ROIC",
                1: "=B24/B34",
                2: "=C24/C34",
                3: "=D24/D34",
                4: "=E24/E34",
                5: "=F24/F34",
                6: "=G24/G34",
                7: "=H24/H34",
                8: "=I24/I34",
                9: "=J24/J34",
                10: "=K24/K34",
                11: "=L24/L34",
                12: "=L29",
              },
              36: {
                0: "Terminal Cash Flow",
                1: "=M26",
              },
              37: {
                0: "Terminal Cost of Capital",
                1: "=M29",
              },
              38: {
                0: "Terminal Value",
                1: '=B37/(B38-FIN("riskFreeRate"))',
              },
              39: {
                0: "PV (Terminal Value)",
                1: "=B39*L30",
              },
              40: {
                0: "PV (CF Over Next 10 Years",
                1: "=SUM(C31, D31, E31, F31, G31, H31, I31, J31, K31, L31)",
              },
              41: {
                0: "Sum of PV",
                1: "=B40+B41",
              },
              42: {
                0: "Probability of Failure",
                1: "='Optional Inputs'!J4",
              },
              43: {
                0: "Proceeds if the Firm Fails",
                1: "=(('API Millions Data'!$B$3)+('API Millions Data'!$B$4))*'Optional Inputs'!J5",
              },
              44: {
                0: "Operating Assets",
                1: "=B42*(1-B43)+B44*B43",
              },
              45: {
                0: "- Debt",
                1: "=IFERROR('API Millions Data'!$B$4, 0)",
              },
              46: {
                0: "- Minority Interests",
                1: "=IFERROR('API Millions Data'!$B$7, 0)",
              },
              47: {
                0: "+ Cash",
                1: "=IFERROR('API Millions Data'!$B$8, 0)",
              },
              48: {
                0: "+ Non-Operating Assets",
                1: "='Optional Inputs'!J3",
              },
              49: {
                0: "Equity",
                1: "=B45-B46-B47+B48+B49",
              },
              50: {
                0: "- Options",
                1: "='Employee Options'!$B$17",
              },
              51: {
                0: "Common Stock Equity",
                1: "=B50-B51",
              },
              52: {
                0: "Current Price",
                1: '=FIN("price")',
              },
              53: {
                0: "Estimated Value Per Share",
                1: "=IF(B52/'API Millions Data'!$B$6 < 0, 0, B52/'API Millions Data'!$B$6)",
              },
              54: {
                0: "Margin of Safety",
                1: "=IFERROR((B54-B53)/B54, 0)",
              },
            },
          },
          {
            name: "Financial Statements",
            freeze: "B2",
            styles: [
              {
                font: {
                  bold: true,
                },
              },
              {
                font: {
                  bold: true,
                  size: 14,
                },
              },
              {
                font: {
                  bold: true,
                  size: 14,
                },
                align: "center",
              },
              {
                font: {
                  size: 14,
                },
              },
              {
                font: {
                  bold: true,
                },
                align: "center",
              },
              {
                font: {
                  bold: true,
                },
                format: "currency",
              },
              {
                format: "currency",
              },
              {
                font: {
                  bold: true,
                },
                format: "normal",
              },
              {
                font: {
                  bold: true,
                },
                format: "percent",
              },
              {
                format: "percent",
              },
              {
                font: {
                  bold: true,
                },
                format: "million-currency",
              },
              {
                format: "million-currency",
              },
              {
                format: "normal",
              },
              {
                font: {
                  bold: true,
                  size: 14,
                },
                align: "center",
                format: "million-currency",
              },
              {
                font: {
                  bold: false,
                  size: 14,
                },
                align: "center",
                format: "million-currency",
              },
              {
                font: {
                  bold: false,
                  size: 10,
                },
                align: "center",
                format: "million-currency",
              },
              {
                font: {
                  bold: false,
                  size: 10,
                },
                align: "left",
                format: "million-currency",
              },
              {
                font: {
                  bold: true,
                  size: 10,
                },
                align: "left",
                format: "million-currency",
              },
              {
                font: {
                  bold: true,
                  size: 14,
                },
                format: "normal",
              },
              {
                font: {
                  bold: true,
                  size: 14,
                },
                format: "normal",
                align: "center",
              },
              {
                font: {
                  bold: true,
                  size: 10,
                },
                align: "center",
                format: "million-currency",
              },
              {
                font: {
                  bold: false,
                },
              },
              {
                font: {
                  bold: false,
                  size: 14,
                },
                align: "center",
              },
              {
                font: {
                  bold: false,
                },
                format: "million-currency",
              },
              {
                font: {
                  bold: false,
                },
                format: "percent",
              },
              {
                font: {
                  bold: false,
                },
                format: "normal",
              },
              {
                font: {
                  bold: false,
                  size: 14,
                },
                format: "normal",
                align: "center",
              },
              {
                font: {
                  bold: true,
                  size: 10,
                },
                align: "left",
                format: "normal",
              },
              {
                font: {
                  bold: true,
                },
                format: "normal",
                textwrap: true,
              },
              {
                font: {
                  bold: true,
                  size: 14,
                },
                format: "normal",
                align: "center",
                textwrap: true,
              },
              {
                font: {
                  bold: true,
                  size: 10,
                },
                align: "left",
                format: "normal",
                textwrap: true,
              },
              {
                font: {
                  bold: true,
                },
                format: "million-currency",
                textwrap: true,
              },
              {
                font: {
                  bold: false,
                  size: 14,
                },
                format: "normal",
                align: "center",
                textwrap: true,
              },
              {
                font: {
                  bold: false,
                  size: 10,
                },
                format: "normal",
                align: "center",
                textwrap: true,
              },
              {
                font: {
                  bold: true,
                  size: 14,
                },
                format: "normal",
                textwrap: true,
              },
              {
                font: {
                  bold: true,
                  size: 10,
                },
                align: "left",
                format: "million-currency",
                textwrap: true,
              },
              {
                font: {
                  bold: true,
                  size: 14,
                },
                format: "million-currency",
                align: "center",
                textwrap: true,
              },
              {
                font: {
                  bold: false,
                  size: 14,
                },
                format: "million-currency",
                align: "center",
                textwrap: true,
              },
              {
                font: {
                  bold: false,
                  size: 10,
                },
                format: "million-currency",
                align: "center",
                textwrap: true,
              },
              {
                font: {
                  bold: false,
                  size: 10,
                },
                format: "million-currency",
                align: "left",
                textwrap: true,
              },
              {
                font: {
                  bold: true,
                },
                format: "percent",
                textwrap: true,
              },
              {
                font: {
                  bold: true,
                  size: 14,
                },
                format: "million-currency",
                textwrap: true,
              },
              {
                font: {
                  bold: false,
                  size: 14,
                },
                format: "normal",
                textwrap: true,
              },
              {
                font: {
                  bold: false,
                  size: 10,
                },
                format: "normal",
                textwrap: true,
              },
              {
                font: {
                  bold: true,
                  size: 10,
                },
                format: "normal",
                textwrap: true,
              },
              {
                font: {
                  bold: true,
                  size: 10,
                },
                format: "million-currency",
                textwrap: true,
              },
            ],
            merges: [],
            rows: {
              0: {
                cells: {
                  0: {
                    style: 28,
                  },
                  1: {
                    style: 7,
                  },
                  2: {
                    style: 7,
                  },
                  3: {
                    style: 7,
                  },
                  4: {
                    style: 7,
                  },
                  5: {
                    style: 7,
                  },
                  6: {
                    style: 7,
                  },
                  7: {
                    style: 7,
                  },
                  8: {
                    style: 7,
                  },
                  9: {
                    style: 7,
                  },
                  10: {
                    style: 7,
                  },
                  11: {
                    style: 7,
                  },
                  12: {
                    style: 7,
                  },
                  13: {
                    style: 7,
                  },
                  14: {
                    style: 7,
                  },
                  15: {
                    style: 7,
                  },
                  16: {
                    style: 7,
                  },
                  17: {
                    style: 7,
                  },
                  18: {
                    style: 7,
                  },
                  19: {
                    style: 7,
                  },
                  20: {
                    style: 7,
                  },
                  21: {
                    style: 7,
                  },
                  22: {
                    style: 7,
                  },
                  23: {
                    style: 7,
                  },
                  24: {
                    style: 7,
                  },
                  25: {
                    style: 7,
                  },
                },
                height: 25,
              },
              1: {
                cells: {
                  0: {
                    style: 29,
                  },
                  1: {
                    style: 12,
                  },
                  2: {
                    style: 12,
                  },
                  3: {
                    style: 12,
                  },
                  4: {
                    style: 12,
                  },
                  5: {
                    style: 12,
                  },
                  6: {
                    style: 12,
                  },
                  7: {
                    style: 12,
                  },
                  8: {
                    style: 12,
                  },
                  9: {
                    style: 12,
                  },
                  10: {
                    style: 12,
                  },
                  11: {
                    style: 12,
                  },
                  12: {
                    style: 12,
                  },
                  13: {
                    style: 12,
                  },
                  14: {
                    style: 12,
                  },
                  15: {
                    style: 12,
                  },
                  16: {
                    style: 12,
                  },
                  17: {
                    style: 12,
                  },
                  18: {
                    style: 12,
                  },
                  19: {
                    style: 12,
                  },
                  20: {
                    style: 12,
                  },
                  21: {
                    style: 12,
                  },
                  22: {
                    style: 12,
                  },
                  23: {
                    style: 12,
                  },
                  24: {
                    style: 12,
                  },
                  25: {
                    style: 12,
                  },
                },
                height: 25,
              },
              2: {
                cells: {
                  0: {
                    style: 28,
                  },
                  1: {
                    style: 11,
                  },
                  2: {
                    style: 11,
                  },
                  3: {
                    style: 11,
                  },
                  4: {
                    style: 11,
                  },
                  5: {
                    style: 11,
                  },
                  6: {
                    style: 11,
                  },
                  7: {
                    style: 11,
                  },
                  8: {
                    style: 11,
                  },
                  9: {
                    style: 11,
                  },
                  10: {
                    style: 11,
                  },
                  11: {
                    style: 11,
                  },
                  12: {
                    style: 11,
                  },
                  13: {
                    style: 11,
                  },
                  14: {
                    style: 11,
                  },
                  15: {
                    style: 11,
                  },
                  16: {
                    style: 11,
                  },
                  17: {
                    style: 11,
                  },
                  18: {
                    style: 11,
                  },
                  19: {
                    style: 11,
                  },
                  20: {
                    style: 11,
                  },
                  21: {
                    style: 11,
                  },
                  22: {
                    style: 11,
                  },
                  23: {
                    style: 11,
                  },
                  24: {
                    style: 11,
                  },
                  25: {
                    style: 11,
                  },
                },
                height: 25,
              },
              3: {
                cells: {
                  0: {
                    style: 28,
                  },
                  1: {
                    style: 11,
                  },
                  2: {
                    style: 11,
                  },
                  3: {
                    style: 11,
                  },
                  4: {
                    style: 11,
                  },
                  5: {
                    style: 11,
                  },
                  6: {
                    style: 11,
                  },
                  7: {
                    style: 11,
                  },
                  8: {
                    style: 11,
                  },
                  9: {
                    style: 11,
                  },
                  10: {
                    style: 11,
                  },
                  11: {
                    style: 11,
                  },
                  12: {
                    style: 11,
                  },
                  13: {
                    style: 11,
                  },
                  14: {
                    style: 11,
                  },
                  15: {
                    style: 11,
                  },
                  16: {
                    style: 11,
                  },
                  17: {
                    style: 11,
                  },
                  18: {
                    style: 11,
                  },
                  19: {
                    style: 11,
                  },
                  20: {
                    style: 11,
                  },
                  21: {
                    style: 11,
                  },
                  22: {
                    style: 11,
                  },
                  23: {
                    style: 11,
                  },
                  24: {
                    style: 11,
                  },
                  25: {
                    style: 11,
                  },
                },
              },
              4: {
                cells: {
                  0: {
                    style: 28,
                  },
                  1: {
                    style: 11,
                  },
                  2: {
                    style: 11,
                  },
                  3: {
                    style: 11,
                  },
                  4: {
                    style: 11,
                  },
                  5: {
                    style: 11,
                  },
                  6: {
                    style: 11,
                  },
                  7: {
                    style: 11,
                  },
                  8: {
                    style: 11,
                  },
                  9: {
                    style: 11,
                  },
                  10: {
                    style: 11,
                  },
                  11: {
                    style: 11,
                  },
                  12: {
                    style: 11,
                  },
                  13: {
                    style: 11,
                  },
                  14: {
                    style: 11,
                  },
                  15: {
                    style: 11,
                  },
                  16: {
                    style: 11,
                  },
                  17: {
                    style: 11,
                  },
                  18: {
                    style: 11,
                  },
                  19: {
                    style: 11,
                  },
                  20: {
                    style: 11,
                  },
                  21: {
                    style: 11,
                  },
                  22: {
                    style: 11,
                  },
                  23: {
                    style: 11,
                  },
                  24: {
                    style: 11,
                  },
                  25: {
                    style: 11,
                  },
                },
              },
              5: {
                cells: {
                  0: {
                    style: 28,
                  },
                  1: {
                    style: 9,
                  },
                  2: {
                    style: 9,
                  },
                  3: {
                    style: 9,
                  },
                  4: {
                    style: 9,
                  },
                  5: {
                    style: 9,
                  },
                  6: {
                    style: 9,
                  },
                  7: {
                    style: 9,
                  },
                  8: {
                    style: 9,
                  },
                  9: {
                    style: 9,
                  },
                  10: {
                    style: 9,
                  },
                  11: {
                    style: 9,
                  },
                  12: {
                    style: 9,
                  },
                  13: {
                    style: 9,
                  },
                  14: {
                    style: 9,
                  },
                  15: {
                    style: 9,
                  },
                  16: {
                    style: 9,
                  },
                  17: {
                    style: 9,
                  },
                  18: {
                    style: 9,
                  },
                  19: {
                    style: 9,
                  },
                  20: {
                    style: 9,
                  },
                  21: {
                    style: 9,
                  },
                  22: {
                    style: 9,
                  },
                  23: {
                    style: 9,
                  },
                  24: {
                    style: 9,
                  },
                  25: {
                    style: 9,
                  },
                },
                height: 25,
              },
              6: {
                cells: {
                  0: {
                    style: 28,
                  },
                  1: {
                    style: 12,
                  },
                  2: {
                    style: 12,
                  },
                  3: {
                    style: 12,
                  },
                  4: {
                    style: 12,
                  },
                  5: {
                    style: 12,
                  },
                  6: {
                    style: 12,
                  },
                  7: {
                    style: 12,
                  },
                  8: {
                    style: 12,
                  },
                  9: {
                    style: 12,
                  },
                  10: {
                    style: 12,
                  },
                  11: {
                    style: 12,
                  },
                  12: {
                    style: 12,
                  },
                  13: {
                    style: 12,
                  },
                  14: {
                    style: 12,
                  },
                  15: {
                    style: 12,
                  },
                  16: {
                    style: 12,
                  },
                  17: {
                    style: 12,
                  },
                  18: {
                    style: 12,
                  },
                  19: {
                    style: 12,
                  },
                  20: {
                    style: 12,
                  },
                  21: {
                    style: 12,
                  },
                  22: {
                    style: 12,
                  },
                  23: {
                    style: 12,
                  },
                  24: {
                    style: 12,
                  },
                  25: {
                    style: 12,
                  },
                },
              },
              7: {
                cells: {
                  0: {
                    style: 28,
                  },
                  1: {
                    style: 11,
                  },
                  2: {
                    style: 11,
                  },
                  3: {
                    style: 11,
                  },
                  4: {
                    style: 11,
                  },
                  5: {
                    style: 11,
                  },
                  6: {
                    style: 11,
                  },
                  7: {
                    style: 11,
                  },
                  8: {
                    style: 11,
                  },
                  9: {
                    style: 11,
                  },
                  10: {
                    style: 11,
                  },
                  11: {
                    style: 11,
                  },
                  12: {
                    style: 11,
                  },
                  13: {
                    style: 11,
                  },
                  14: {
                    style: 11,
                  },
                  15: {
                    style: 11,
                  },
                  16: {
                    style: 11,
                  },
                  17: {
                    style: 11,
                  },
                  18: {
                    style: 11,
                  },
                  19: {
                    style: 11,
                  },
                  20: {
                    style: 11,
                  },
                  21: {
                    style: 11,
                  },
                  22: {
                    style: 11,
                  },
                  23: {
                    style: 11,
                  },
                  24: {
                    style: 11,
                  },
                  25: {
                    style: 11,
                  },
                },
              },
              8: {
                cells: {
                  0: {
                    style: 28,
                  },
                  1: {
                    style: 11,
                  },
                  2: {
                    style: 11,
                  },
                  3: {
                    style: 11,
                  },
                  4: {
                    style: 11,
                  },
                  5: {
                    style: 11,
                  },
                  6: {
                    style: 11,
                  },
                  7: {
                    style: 11,
                  },
                  8: {
                    style: 11,
                  },
                  9: {
                    style: 11,
                  },
                  10: {
                    style: 11,
                  },
                  11: {
                    style: 11,
                  },
                  12: {
                    style: 11,
                  },
                  13: {
                    style: 11,
                  },
                  14: {
                    style: 11,
                  },
                  15: {
                    style: 11,
                  },
                  16: {
                    style: 11,
                  },
                  17: {
                    style: 11,
                  },
                  18: {
                    style: 11,
                  },
                  19: {
                    style: 11,
                  },
                  20: {
                    style: 11,
                  },
                  21: {
                    style: 11,
                  },
                  22: {
                    style: 11,
                  },
                  23: {
                    style: 11,
                  },
                  24: {
                    style: 11,
                  },
                  25: {
                    style: 11,
                  },
                },
                height: 25,
              },
              9: {
                cells: {
                  0: {
                    style: 28,
                  },
                  1: {
                    style: 11,
                  },
                  2: {
                    style: 11,
                  },
                  3: {
                    style: 11,
                  },
                  4: {
                    style: 11,
                  },
                  5: {
                    style: 11,
                  },
                  6: {
                    style: 11,
                  },
                  7: {
                    style: 11,
                  },
                  8: {
                    style: 11,
                  },
                  9: {
                    style: 11,
                  },
                  10: {
                    style: 11,
                  },
                  11: {
                    style: 11,
                  },
                  12: {
                    style: 11,
                  },
                  13: {
                    style: 11,
                  },
                  14: {
                    style: 11,
                  },
                  15: {
                    style: 11,
                  },
                  16: {
                    style: 11,
                  },
                  17: {
                    style: 11,
                  },
                  18: {
                    style: 11,
                  },
                  19: {
                    style: 11,
                  },
                  20: {
                    style: 11,
                  },
                  21: {
                    style: 11,
                  },
                  22: {
                    style: 11,
                  },
                  23: {
                    style: 11,
                  },
                  24: {
                    style: 11,
                  },
                  25: {
                    style: 11,
                  },
                },
              },
              10: {
                cells: {
                  0: {
                    style: 28,
                  },
                  1: {
                    style: 11,
                  },
                  2: {
                    style: 11,
                  },
                  3: {
                    style: 11,
                  },
                  4: {
                    style: 11,
                  },
                  5: {
                    style: 11,
                  },
                  6: {
                    style: 11,
                  },
                  7: {
                    style: 11,
                  },
                  8: {
                    style: 11,
                  },
                  9: {
                    style: 11,
                  },
                  10: {
                    style: 11,
                  },
                  11: {
                    style: 11,
                  },
                  12: {
                    style: 11,
                  },
                  13: {
                    style: 11,
                  },
                  14: {
                    style: 11,
                  },
                  15: {
                    style: 11,
                  },
                  16: {
                    style: 11,
                  },
                  17: {
                    style: 11,
                  },
                  18: {
                    style: 11,
                  },
                  19: {
                    style: 11,
                  },
                  20: {
                    style: 11,
                  },
                  21: {
                    style: 11,
                  },
                  22: {
                    style: 11,
                  },
                  23: {
                    style: 11,
                  },
                  24: {
                    style: 11,
                  },
                  25: {
                    style: 11,
                  },
                },
              },
              11: {
                cells: {
                  0: {
                    style: 28,
                  },
                  1: {
                    style: 11,
                  },
                  2: {
                    style: 11,
                  },
                  3: {
                    style: 11,
                  },
                  4: {
                    style: 11,
                  },
                  5: {
                    style: 11,
                  },
                  6: {
                    style: 11,
                  },
                  7: {
                    style: 11,
                  },
                  8: {
                    style: 11,
                  },
                  9: {
                    style: 11,
                  },
                  10: {
                    style: 11,
                  },
                  11: {
                    style: 11,
                  },
                  12: {
                    style: 11,
                  },
                  13: {
                    style: 11,
                  },
                  14: {
                    style: 11,
                  },
                  15: {
                    style: 11,
                  },
                  16: {
                    style: 11,
                  },
                  17: {
                    style: 11,
                  },
                  18: {
                    style: 11,
                  },
                  19: {
                    style: 11,
                  },
                  20: {
                    style: 11,
                  },
                  21: {
                    style: 11,
                  },
                  22: {
                    style: 11,
                  },
                  23: {
                    style: 11,
                  },
                  24: {
                    style: 11,
                  },
                  25: {
                    style: 11,
                  },
                },
                height: 25,
              },
              12: {
                cells: {
                  0: {
                    style: 28,
                  },
                  1: {
                    style: 11,
                  },
                  2: {
                    style: 11,
                  },
                  3: {
                    style: 11,
                  },
                  4: {
                    style: 11,
                  },
                  5: {
                    style: 11,
                  },
                  6: {
                    style: 11,
                  },
                  7: {
                    style: 11,
                  },
                  8: {
                    style: 11,
                  },
                  9: {
                    style: 11,
                  },
                  10: {
                    style: 11,
                  },
                  11: {
                    style: 11,
                  },
                  12: {
                    style: 11,
                  },
                  13: {
                    style: 11,
                  },
                  14: {
                    style: 11,
                  },
                  15: {
                    style: 11,
                  },
                  16: {
                    style: 11,
                  },
                  17: {
                    style: 11,
                  },
                  18: {
                    style: 11,
                  },
                  19: {
                    style: 11,
                  },
                  20: {
                    style: 11,
                  },
                  21: {
                    style: 11,
                  },
                  22: {
                    style: 11,
                  },
                  23: {
                    style: 11,
                  },
                  24: {
                    style: 11,
                  },
                  25: {
                    style: 11,
                  },
                },
              },
              13: {
                cells: {
                  0: {
                    style: 28,
                  },
                  1: {
                    style: 9,
                  },
                  2: {
                    style: 9,
                  },
                  3: {
                    style: 9,
                  },
                  4: {
                    style: 9,
                  },
                  5: {
                    style: 9,
                  },
                  6: {
                    style: 9,
                  },
                  7: {
                    style: 9,
                  },
                  8: {
                    style: 9,
                  },
                  9: {
                    style: 9,
                  },
                  10: {
                    style: 9,
                  },
                  11: {
                    style: 9,
                  },
                  12: {
                    style: 9,
                  },
                  13: {
                    style: 9,
                  },
                  14: {
                    style: 9,
                  },
                  15: {
                    style: 9,
                  },
                  16: {
                    style: 9,
                  },
                  17: {
                    style: 9,
                  },
                  18: {
                    style: 9,
                  },
                  19: {
                    style: 9,
                  },
                  20: {
                    style: 9,
                  },
                  21: {
                    style: 9,
                  },
                  22: {
                    style: 9,
                  },
                  23: {
                    style: 9,
                  },
                  24: {
                    style: 9,
                  },
                  25: {
                    style: 9,
                  },
                },
              },
              14: {
                cells: {
                  0: {
                    style: 28,
                  },
                  1: {
                    style: 12,
                  },
                  2: {
                    style: 12,
                  },
                  3: {
                    style: 12,
                  },
                  4: {
                    style: 12,
                  },
                  5: {
                    style: 12,
                  },
                  6: {
                    style: 12,
                  },
                  7: {
                    style: 12,
                  },
                  8: {
                    style: 12,
                  },
                  9: {
                    style: 12,
                  },
                  10: {
                    style: 12,
                  },
                  11: {
                    style: 12,
                  },
                  12: {
                    style: 12,
                  },
                  13: {
                    style: 12,
                  },
                  14: {
                    style: 12,
                  },
                  15: {
                    style: 12,
                  },
                  16: {
                    style: 12,
                  },
                  17: {
                    style: 12,
                  },
                  18: {
                    style: 12,
                  },
                  19: {
                    style: 12,
                  },
                  20: {
                    style: 12,
                  },
                  21: {
                    style: 12,
                  },
                  22: {
                    style: 12,
                  },
                  23: {
                    style: 12,
                  },
                  24: {
                    style: 12,
                  },
                  25: {
                    style: 12,
                  },
                },
              },
              15: {
                cells: {
                  0: {
                    style: 28,
                  },
                  1: {
                    style: 11,
                  },
                  2: {
                    style: 11,
                  },
                  3: {
                    style: 11,
                  },
                  4: {
                    style: 11,
                  },
                  5: {
                    style: 11,
                  },
                  6: {
                    style: 11,
                  },
                  7: {
                    style: 11,
                  },
                  8: {
                    style: 11,
                  },
                  9: {
                    style: 11,
                  },
                  10: {
                    style: 11,
                  },
                  11: {
                    style: 11,
                  },
                  12: {
                    style: 11,
                  },
                  13: {
                    style: 11,
                  },
                  14: {
                    style: 11,
                  },
                  15: {
                    style: 11,
                  },
                  16: {
                    style: 11,
                  },
                  17: {
                    style: 11,
                  },
                  18: {
                    style: 11,
                  },
                  19: {
                    style: 11,
                  },
                  20: {
                    style: 11,
                  },
                  21: {
                    style: 11,
                  },
                  22: {
                    style: 11,
                  },
                  23: {
                    style: 11,
                  },
                  24: {
                    style: 11,
                  },
                  25: {
                    style: 11,
                  },
                },
              },
              16: {
                cells: {
                  0: {
                    style: 28,
                  },
                  1: {
                    style: 11,
                  },
                  2: {
                    style: 11,
                  },
                  3: {
                    style: 11,
                  },
                  4: {
                    style: 11,
                  },
                  5: {
                    style: 11,
                  },
                  6: {
                    style: 11,
                  },
                  7: {
                    style: 11,
                  },
                  8: {
                    style: 11,
                  },
                  9: {
                    style: 11,
                  },
                  10: {
                    style: 11,
                  },
                  11: {
                    style: 11,
                  },
                  12: {
                    style: 11,
                  },
                  13: {
                    style: 11,
                  },
                  14: {
                    style: 11,
                  },
                  15: {
                    style: 11,
                  },
                  16: {
                    style: 11,
                  },
                  17: {
                    style: 11,
                  },
                  18: {
                    style: 11,
                  },
                  19: {
                    style: 11,
                  },
                  20: {
                    style: 11,
                  },
                  21: {
                    style: 11,
                  },
                  22: {
                    style: 11,
                  },
                  23: {
                    style: 11,
                  },
                  24: {
                    style: 11,
                  },
                  25: {
                    style: 11,
                  },
                },
              },
              17: {
                cells: {
                  0: {
                    style: 28,
                  },
                  1: {
                    style: 11,
                  },
                  2: {
                    style: 11,
                  },
                  3: {
                    style: 11,
                  },
                  4: {
                    style: 11,
                  },
                  5: {
                    style: 11,
                  },
                  6: {
                    style: 11,
                  },
                  7: {
                    style: 11,
                  },
                  8: {
                    style: 11,
                  },
                  9: {
                    style: 11,
                  },
                  10: {
                    style: 11,
                  },
                  11: {
                    style: 11,
                  },
                  12: {
                    style: 11,
                  },
                  13: {
                    style: 11,
                  },
                  14: {
                    style: 11,
                  },
                  15: {
                    style: 11,
                  },
                  16: {
                    style: 11,
                  },
                  17: {
                    style: 11,
                  },
                  18: {
                    style: 11,
                  },
                  19: {
                    style: 11,
                  },
                  20: {
                    style: 11,
                  },
                  21: {
                    style: 11,
                  },
                  22: {
                    style: 11,
                  },
                  23: {
                    style: 11,
                  },
                  24: {
                    style: 11,
                  },
                  25: {
                    style: 11,
                  },
                },
              },
              18: {
                cells: {
                  0: {
                    style: 28,
                  },
                  1: {
                    style: 11,
                  },
                  2: {
                    style: 11,
                  },
                  3: {
                    style: 11,
                  },
                  4: {
                    style: 11,
                  },
                  5: {
                    style: 11,
                  },
                  6: {
                    style: 11,
                  },
                  7: {
                    style: 11,
                  },
                  8: {
                    style: 11,
                  },
                  9: {
                    style: 11,
                  },
                  10: {
                    style: 11,
                  },
                  11: {
                    style: 11,
                  },
                  12: {
                    style: 11,
                  },
                  13: {
                    style: 11,
                  },
                  14: {
                    style: 11,
                  },
                  15: {
                    style: 11,
                  },
                  16: {
                    style: 11,
                  },
                  17: {
                    style: 11,
                  },
                  18: {
                    style: 11,
                  },
                  19: {
                    style: 11,
                  },
                  20: {
                    style: 11,
                  },
                  21: {
                    style: 11,
                  },
                  22: {
                    style: 11,
                  },
                  23: {
                    style: 11,
                  },
                  24: {
                    style: 11,
                  },
                  25: {
                    style: 11,
                  },
                },
              },
              19: {
                cells: {
                  0: {
                    style: 28,
                  },
                  1: {
                    style: 11,
                  },
                  2: {
                    style: 11,
                  },
                  3: {
                    style: 11,
                  },
                  4: {
                    style: 11,
                  },
                  5: {
                    style: 11,
                  },
                  6: {
                    style: 11,
                  },
                  7: {
                    style: 11,
                  },
                  8: {
                    style: 11,
                  },
                  9: {
                    style: 11,
                  },
                  10: {
                    style: 11,
                  },
                  11: {
                    style: 11,
                  },
                  12: {
                    style: 11,
                  },
                  13: {
                    style: 11,
                  },
                  14: {
                    style: 11,
                  },
                  15: {
                    style: 11,
                  },
                  16: {
                    style: 11,
                  },
                  17: {
                    style: 11,
                  },
                  18: {
                    style: 11,
                  },
                  19: {
                    style: 11,
                  },
                  20: {
                    style: 11,
                  },
                  21: {
                    style: 11,
                  },
                  22: {
                    style: 11,
                  },
                  23: {
                    style: 11,
                  },
                  24: {
                    style: 11,
                  },
                  25: {
                    style: 11,
                  },
                },
              },
              20: {
                cells: {
                  0: {
                    style: 28,
                  },
                  1: {
                    style: 12,
                  },
                  2: {
                    style: 12,
                  },
                  3: {
                    style: 12,
                  },
                  4: {
                    style: 12,
                  },
                  5: {
                    style: 12,
                  },
                  6: {
                    style: 12,
                  },
                  7: {
                    style: 12,
                  },
                  8: {
                    style: 12,
                  },
                  9: {
                    style: 12,
                  },
                  10: {
                    style: 12,
                  },
                  11: {
                    style: 12,
                  },
                  12: {
                    style: 12,
                  },
                  13: {
                    style: 12,
                  },
                  14: {
                    style: 12,
                  },
                  15: {
                    style: 12,
                  },
                  16: {
                    style: 12,
                  },
                  17: {
                    style: 12,
                  },
                  18: {
                    style: 12,
                  },
                  19: {
                    style: 12,
                  },
                  20: {
                    style: 12,
                  },
                  21: {
                    style: 12,
                  },
                  22: {
                    style: 12,
                  },
                  23: {
                    style: 12,
                  },
                  24: {
                    style: 12,
                  },
                  25: {
                    style: 12,
                  },
                },
              },
              21: {
                cells: {
                  0: {
                    style: 28,
                  },
                  1: {
                    style: 11,
                  },
                  2: {
                    style: 11,
                  },
                  3: {
                    style: 11,
                  },
                  4: {
                    style: 11,
                  },
                  5: {
                    style: 11,
                  },
                  6: {
                    style: 11,
                  },
                  7: {
                    style: 11,
                  },
                  8: {
                    style: 11,
                  },
                  9: {
                    style: 11,
                  },
                  10: {
                    style: 11,
                  },
                  11: {
                    style: 11,
                  },
                  12: {
                    style: 11,
                  },
                  13: {
                    style: 11,
                  },
                  14: {
                    style: 11,
                  },
                  15: {
                    style: 11,
                  },
                  16: {
                    style: 11,
                  },
                  17: {
                    style: 11,
                  },
                  18: {
                    style: 11,
                  },
                  19: {
                    style: 11,
                  },
                  20: {
                    style: 11,
                  },
                  21: {
                    style: 11,
                  },
                  22: {
                    style: 11,
                  },
                  23: {
                    style: 11,
                  },
                  24: {
                    style: 11,
                  },
                  25: {
                    style: 11,
                  },
                },
              },
              22: {
                cells: {
                  0: {
                    style: 28,
                  },
                  1: {
                    style: 9,
                  },
                  2: {
                    style: 9,
                  },
                  3: {
                    style: 9,
                  },
                  4: {
                    style: 9,
                  },
                  5: {
                    style: 9,
                  },
                  6: {
                    style: 9,
                  },
                  7: {
                    style: 9,
                  },
                  8: {
                    style: 9,
                  },
                  9: {
                    style: 9,
                  },
                  10: {
                    style: 9,
                  },
                  11: {
                    style: 9,
                  },
                  12: {
                    style: 9,
                  },
                  13: {
                    style: 9,
                  },
                  14: {
                    style: 9,
                  },
                  15: {
                    style: 9,
                  },
                  16: {
                    style: 9,
                  },
                  17: {
                    style: 9,
                  },
                  18: {
                    style: 9,
                  },
                  19: {
                    style: 9,
                  },
                  20: {
                    style: 9,
                  },
                  21: {
                    style: 9,
                  },
                  22: {
                    style: 9,
                  },
                  23: {
                    style: 9,
                  },
                  24: {
                    style: 9,
                  },
                  25: {
                    style: 9,
                  },
                },
              },
              23: {
                cells: {
                  0: {
                    style: 28,
                  },
                  1: {
                    style: 11,
                  },
                  2: {
                    style: 11,
                  },
                  3: {
                    style: 11,
                  },
                  4: {
                    style: 11,
                  },
                  5: {
                    style: 11,
                  },
                  6: {
                    style: 11,
                  },
                  7: {
                    style: 11,
                  },
                  8: {
                    style: 11,
                  },
                  9: {
                    style: 11,
                  },
                  10: {
                    style: 11,
                  },
                  11: {
                    style: 11,
                  },
                  12: {
                    style: 11,
                  },
                  13: {
                    style: 11,
                  },
                  14: {
                    style: 11,
                  },
                  15: {
                    style: 11,
                  },
                  16: {
                    style: 11,
                  },
                  17: {
                    style: 11,
                  },
                  18: {
                    style: 11,
                  },
                  19: {
                    style: 11,
                  },
                  20: {
                    style: 11,
                  },
                  21: {
                    style: 11,
                  },
                  22: {
                    style: 11,
                  },
                  23: {
                    style: 11,
                  },
                  24: {
                    style: 11,
                  },
                  25: {
                    style: 11,
                  },
                },
              },
              24: {
                cells: {
                  0: {
                    style: 28,
                  },
                  1: {
                    style: 11,
                  },
                  2: {
                    style: 11,
                  },
                  3: {
                    style: 11,
                  },
                  4: {
                    style: 11,
                  },
                  5: {
                    style: 11,
                  },
                  6: {
                    style: 11,
                  },
                  7: {
                    style: 11,
                  },
                  8: {
                    style: 11,
                  },
                  9: {
                    style: 11,
                  },
                  10: {
                    style: 11,
                  },
                  11: {
                    style: 11,
                  },
                  12: {
                    style: 11,
                  },
                  13: {
                    style: 11,
                  },
                  14: {
                    style: 11,
                  },
                  15: {
                    style: 11,
                  },
                  16: {
                    style: 11,
                  },
                  17: {
                    style: 11,
                  },
                  18: {
                    style: 11,
                  },
                  19: {
                    style: 11,
                  },
                  20: {
                    style: 11,
                  },
                  21: {
                    style: 11,
                  },
                  22: {
                    style: 11,
                  },
                  23: {
                    style: 11,
                  },
                  24: {
                    style: 11,
                  },
                  25: {
                    style: 11,
                  },
                },
              },
              25: {
                cells: {
                  0: {
                    style: 28,
                  },
                  1: {
                    style: 11,
                  },
                  2: {
                    style: 11,
                  },
                  3: {
                    style: 11,
                  },
                  4: {
                    style: 11,
                  },
                  5: {
                    style: 11,
                  },
                  6: {
                    style: 11,
                  },
                  7: {
                    style: 11,
                  },
                  8: {
                    style: 11,
                  },
                  9: {
                    style: 11,
                  },
                  10: {
                    style: 11,
                  },
                  11: {
                    style: 11,
                  },
                  12: {
                    style: 11,
                  },
                  13: {
                    style: 11,
                  },
                  14: {
                    style: 11,
                  },
                  15: {
                    style: 11,
                  },
                  16: {
                    style: 11,
                  },
                  17: {
                    style: 11,
                  },
                  18: {
                    style: 11,
                  },
                  19: {
                    style: 11,
                  },
                  20: {
                    style: 11,
                  },
                  21: {
                    style: 11,
                  },
                  22: {
                    style: 11,
                  },
                  23: {
                    style: 11,
                  },
                  24: {
                    style: 11,
                  },
                  25: {
                    style: 11,
                  },
                },
              },
              26: {
                cells: {
                  0: {
                    style: 28,
                  },
                  1: {
                    style: 11,
                  },
                  2: {
                    style: 11,
                  },
                  3: {
                    style: 11,
                  },
                  4: {
                    style: 11,
                  },
                  5: {
                    style: 11,
                  },
                  6: {
                    style: 11,
                  },
                  7: {
                    style: 11,
                  },
                  8: {
                    style: 11,
                  },
                  9: {
                    style: 11,
                  },
                  10: {
                    style: 11,
                  },
                  11: {
                    style: 11,
                  },
                  12: {
                    style: 11,
                  },
                  13: {
                    style: 11,
                  },
                  14: {
                    style: 11,
                  },
                  15: {
                    style: 11,
                  },
                  16: {
                    style: 11,
                  },
                  17: {
                    style: 11,
                  },
                  18: {
                    style: 11,
                  },
                  19: {
                    style: 11,
                  },
                  20: {
                    style: 11,
                  },
                  21: {
                    style: 11,
                  },
                  22: {
                    style: 11,
                  },
                  23: {
                    style: 11,
                  },
                  24: {
                    style: 11,
                  },
                  25: {
                    style: 11,
                  },
                },
              },
              27: {
                cells: {
                  0: {
                    style: 28,
                  },
                  1: {
                    style: 11,
                  },
                  2: {
                    style: 11,
                  },
                  3: {
                    style: 11,
                  },
                  4: {
                    style: 11,
                  },
                  5: {
                    style: 11,
                  },
                  6: {
                    style: 11,
                  },
                  7: {
                    style: 11,
                  },
                  8: {
                    style: 11,
                  },
                  9: {
                    style: 11,
                  },
                  10: {
                    style: 11,
                  },
                  11: {
                    style: 11,
                  },
                  12: {
                    style: 11,
                  },
                  13: {
                    style: 11,
                  },
                  14: {
                    style: 11,
                  },
                  15: {
                    style: 11,
                  },
                  16: {
                    style: 11,
                  },
                  17: {
                    style: 11,
                  },
                  18: {
                    style: 11,
                  },
                  19: {
                    style: 11,
                  },
                  20: {
                    style: 11,
                  },
                  21: {
                    style: 11,
                  },
                  22: {
                    style: 11,
                  },
                  23: {
                    style: 11,
                  },
                  24: {
                    style: 11,
                  },
                  25: {
                    style: 11,
                  },
                },
                height: 36,
              },
              28: {
                cells: {
                  0: {
                    style: 28,
                  },
                  1: {
                    style: 11,
                  },
                  2: {
                    style: 11,
                  },
                  3: {
                    style: 11,
                  },
                  4: {
                    style: 11,
                  },
                  5: {
                    style: 11,
                  },
                  6: {
                    style: 11,
                  },
                  7: {
                    style: 11,
                  },
                  8: {
                    style: 11,
                  },
                  9: {
                    style: 11,
                  },
                  10: {
                    style: 11,
                  },
                  11: {
                    style: 11,
                  },
                  12: {
                    style: 11,
                  },
                  13: {
                    style: 11,
                  },
                  14: {
                    style: 11,
                  },
                  15: {
                    style: 11,
                  },
                  16: {
                    style: 11,
                  },
                  17: {
                    style: 11,
                  },
                  18: {
                    style: 11,
                  },
                  19: {
                    style: 11,
                  },
                  20: {
                    style: 11,
                  },
                  21: {
                    style: 11,
                  },
                  22: {
                    style: 11,
                  },
                  23: {
                    style: 11,
                  },
                  24: {
                    style: 11,
                  },
                  25: {
                    style: 11,
                  },
                },
                height: 34,
              },
              29: {
                cells: {
                  0: {
                    style: 28,
                  },
                  1: {
                    style: 9,
                  },
                  2: {
                    style: 9,
                  },
                  3: {
                    style: 9,
                  },
                  4: {
                    style: 9,
                  },
                  5: {
                    style: 9,
                  },
                  6: {
                    style: 9,
                  },
                  7: {
                    style: 9,
                  },
                  8: {
                    style: 9,
                  },
                  9: {
                    style: 9,
                  },
                  10: {
                    style: 9,
                  },
                  11: {
                    style: 9,
                  },
                  12: {
                    style: 9,
                  },
                  13: {
                    style: 9,
                  },
                  14: {
                    style: 9,
                  },
                  15: {
                    style: 9,
                  },
                  16: {
                    style: 9,
                  },
                  17: {
                    style: 9,
                  },
                  18: {
                    style: 9,
                  },
                  19: {
                    style: 9,
                  },
                  20: {
                    style: 9,
                  },
                  21: {
                    style: 9,
                  },
                  22: {
                    style: 9,
                  },
                  23: {
                    style: 9,
                  },
                  24: {
                    style: 9,
                  },
                  25: {
                    style: 9,
                  },
                },
              },
              30: {
                cells: {
                  0: {
                    style: 28,
                  },
                  1: {
                    style: 12,
                  },
                  2: {
                    style: 12,
                  },
                  3: {
                    style: 12,
                  },
                  4: {
                    style: 12,
                  },
                  5: {
                    style: 12,
                  },
                  6: {
                    style: 12,
                  },
                  7: {
                    style: 12,
                  },
                  8: {
                    style: 12,
                  },
                  9: {
                    style: 12,
                  },
                  10: {
                    style: 12,
                  },
                  11: {
                    style: 12,
                  },
                  12: {
                    style: 12,
                  },
                  13: {
                    style: 12,
                  },
                  14: {
                    style: 12,
                  },
                  15: {
                    style: 12,
                  },
                  16: {
                    style: 12,
                  },
                  17: {
                    style: 12,
                  },
                  18: {
                    style: 12,
                  },
                  19: {
                    style: 12,
                  },
                  20: {
                    style: 12,
                  },
                  21: {
                    style: 12,
                  },
                  22: {
                    style: 12,
                  },
                  23: {
                    style: 12,
                  },
                  24: {
                    style: 12,
                  },
                  25: {
                    style: 12,
                  },
                },
              },
              31: {
                cells: {
                  0: {
                    style: 28,
                  },
                  1: {
                    style: 11,
                  },
                  2: {
                    style: 11,
                  },
                  3: {
                    style: 11,
                  },
                  4: {
                    style: 11,
                  },
                  5: {
                    style: 11,
                  },
                  6: {
                    style: 11,
                  },
                  7: {
                    style: 11,
                  },
                  8: {
                    style: 11,
                  },
                  9: {
                    style: 11,
                  },
                  10: {
                    style: 11,
                  },
                  11: {
                    style: 11,
                  },
                  12: {
                    style: 11,
                  },
                  13: {
                    style: 11,
                  },
                  14: {
                    style: 11,
                  },
                  15: {
                    style: 11,
                  },
                  16: {
                    style: 11,
                  },
                  17: {
                    style: 11,
                  },
                  18: {
                    style: 11,
                  },
                  19: {
                    style: 11,
                  },
                  20: {
                    style: 11,
                  },
                  21: {
                    style: 11,
                  },
                  22: {
                    style: 11,
                  },
                  23: {
                    style: 11,
                  },
                  24: {
                    style: 11,
                  },
                  25: {
                    style: 11,
                  },
                },
              },
              32: {
                cells: {
                  0: {
                    style: 28,
                  },
                  1: {
                    style: 11,
                  },
                  2: {
                    style: 11,
                  },
                  3: {
                    style: 11,
                  },
                  4: {
                    style: 11,
                  },
                  5: {
                    style: 11,
                  },
                  6: {
                    style: 11,
                  },
                  7: {
                    style: 11,
                  },
                  8: {
                    style: 11,
                  },
                  9: {
                    style: 11,
                  },
                  10: {
                    style: 11,
                  },
                  11: {
                    style: 11,
                  },
                  12: {
                    style: 11,
                  },
                  13: {
                    style: 11,
                  },
                  14: {
                    style: 11,
                  },
                  15: {
                    style: 11,
                  },
                  16: {
                    style: 11,
                  },
                  17: {
                    style: 11,
                  },
                  18: {
                    style: 11,
                  },
                  19: {
                    style: 11,
                  },
                  20: {
                    style: 11,
                  },
                  21: {
                    style: 11,
                  },
                  22: {
                    style: 11,
                  },
                  23: {
                    style: 11,
                  },
                  24: {
                    style: 11,
                  },
                  25: {
                    style: 11,
                  },
                },
              },
              33: {
                cells: {
                  0: {
                    style: 30,
                  },
                  1: {
                    style: 11,
                  },
                  2: {
                    style: 11,
                  },
                  3: {
                    style: 11,
                  },
                  4: {
                    style: 11,
                  },
                  5: {
                    style: 11,
                  },
                  6: {
                    style: 11,
                  },
                  7: {
                    style: 11,
                  },
                  8: {
                    style: 11,
                  },
                  9: {
                    style: 11,
                  },
                  10: {
                    style: 11,
                  },
                  11: {
                    style: 11,
                  },
                  12: {
                    style: 11,
                  },
                  13: {
                    style: 11,
                  },
                  14: {
                    style: 11,
                  },
                  15: {
                    style: 11,
                  },
                  16: {
                    style: 11,
                  },
                  17: {
                    style: 11,
                  },
                  18: {
                    style: 11,
                  },
                  19: {
                    style: 11,
                  },
                  20: {
                    style: 11,
                  },
                  21: {
                    style: 11,
                  },
                  22: {
                    style: 11,
                  },
                  23: {
                    style: 11,
                  },
                  24: {
                    style: 11,
                  },
                  25: {
                    style: 11,
                  },
                },
              },
              34: {
                cells: {
                  0: {
                    style: 28,
                  },
                  1: {
                    style: 11,
                  },
                  2: {
                    style: 11,
                  },
                  3: {
                    style: 11,
                  },
                  4: {
                    style: 11,
                  },
                  5: {
                    style: 11,
                  },
                  6: {
                    style: 11,
                  },
                  7: {
                    style: 11,
                  },
                  8: {
                    style: 11,
                  },
                  9: {
                    style: 11,
                  },
                  10: {
                    style: 11,
                  },
                  11: {
                    style: 11,
                  },
                  12: {
                    style: 11,
                  },
                  13: {
                    style: 11,
                  },
                  14: {
                    style: 11,
                  },
                  15: {
                    style: 11,
                  },
                  16: {
                    style: 11,
                  },
                  17: {
                    style: 11,
                  },
                  18: {
                    style: 11,
                  },
                  19: {
                    style: 11,
                  },
                  20: {
                    style: 11,
                  },
                  21: {
                    style: 11,
                  },
                  22: {
                    style: 11,
                  },
                  23: {
                    style: 11,
                  },
                  24: {
                    style: 11,
                  },
                  25: {
                    style: 11,
                  },
                },
              },
              35: {
                cells: {
                  0: {
                    style: 28,
                  },
                  1: {
                    style: 11,
                  },
                  2: {
                    style: 11,
                  },
                  3: {
                    style: 11,
                  },
                  4: {
                    style: 11,
                  },
                  5: {
                    style: 11,
                  },
                  6: {
                    style: 11,
                  },
                  7: {
                    style: 11,
                  },
                  8: {
                    style: 11,
                  },
                  9: {
                    style: 11,
                  },
                  10: {
                    style: 11,
                  },
                  11: {
                    style: 11,
                  },
                  12: {
                    style: 11,
                  },
                  13: {
                    style: 11,
                  },
                  14: {
                    style: 11,
                  },
                  15: {
                    style: 11,
                  },
                  16: {
                    style: 11,
                  },
                  17: {
                    style: 11,
                  },
                  18: {
                    style: 11,
                  },
                  19: {
                    style: 11,
                  },
                  20: {
                    style: 11,
                  },
                  21: {
                    style: 11,
                  },
                  22: {
                    style: 11,
                  },
                  23: {
                    style: 11,
                  },
                  24: {
                    style: 11,
                  },
                  25: {
                    style: 11,
                  },
                },
              },
              36: {
                cells: {
                  0: {
                    style: 28,
                  },
                  1: {
                    style: 11,
                  },
                  2: {
                    style: 11,
                  },
                  3: {
                    style: 11,
                  },
                  4: {
                    style: 11,
                  },
                  5: {
                    style: 11,
                  },
                  6: {
                    style: 11,
                  },
                  7: {
                    style: 11,
                  },
                  8: {
                    style: 11,
                  },
                  9: {
                    style: 11,
                  },
                  10: {
                    style: 11,
                  },
                  11: {
                    style: 11,
                  },
                  12: {
                    style: 11,
                  },
                  13: {
                    style: 11,
                  },
                  14: {
                    style: 11,
                  },
                  15: {
                    style: 11,
                  },
                  16: {
                    style: 11,
                  },
                  17: {
                    style: 11,
                  },
                  18: {
                    style: 11,
                  },
                  19: {
                    style: 11,
                  },
                  20: {
                    style: 11,
                  },
                  21: {
                    style: 11,
                  },
                  22: {
                    style: 11,
                  },
                  23: {
                    style: 11,
                  },
                  24: {
                    style: 11,
                  },
                  25: {
                    style: 11,
                  },
                },
              },
              37: {
                cells: {
                  0: {
                    style: 33,
                  },
                  1: {
                    style: 12,
                  },
                  2: {
                    style: 12,
                  },
                  3: {
                    style: 12,
                  },
                  4: {
                    style: 12,
                  },
                  5: {
                    style: 12,
                  },
                  6: {
                    style: 12,
                  },
                  7: {
                    style: 12,
                  },
                  8: {
                    style: 12,
                  },
                  9: {
                    style: 12,
                  },
                  10: {
                    style: 12,
                  },
                  11: {
                    style: 12,
                  },
                  12: {
                    style: 12,
                  },
                  13: {
                    style: 12,
                  },
                  14: {
                    style: 12,
                  },
                  15: {
                    style: 12,
                  },
                  16: {
                    style: 12,
                  },
                  17: {
                    style: 12,
                  },
                  18: {
                    style: 12,
                  },
                  19: {
                    style: 12,
                  },
                  20: {
                    style: 12,
                  },
                  21: {
                    style: 12,
                  },
                  22: {
                    style: 12,
                  },
                  23: {
                    style: 12,
                  },
                  24: {
                    style: 12,
                  },
                  25: {
                    style: 12,
                  },
                },
              },
              38: {
                cells: {
                  0: {
                    style: 34,
                  },
                  1: {
                    style: 12,
                  },
                  2: {
                    style: 12,
                  },
                  3: {
                    style: 12,
                  },
                  4: {
                    style: 12,
                  },
                  5: {
                    style: 12,
                  },
                  6: {
                    style: 12,
                  },
                  7: {
                    style: 12,
                  },
                  8: {
                    style: 12,
                  },
                  9: {
                    style: 12,
                  },
                  10: {
                    style: 12,
                  },
                  11: {
                    style: 12,
                  },
                  12: {
                    style: 12,
                  },
                  13: {
                    style: 12,
                  },
                  14: {
                    style: 12,
                  },
                  15: {
                    style: 12,
                  },
                  16: {
                    style: 12,
                  },
                  17: {
                    style: 12,
                  },
                  18: {
                    style: 12,
                  },
                  19: {
                    style: 12,
                  },
                  20: {
                    style: 12,
                  },
                  21: {
                    style: 12,
                  },
                  22: {
                    style: 12,
                  },
                  23: {
                    style: 12,
                  },
                  24: {
                    style: 12,
                  },
                  25: {
                    style: 12,
                  },
                },
              },
              39: {
                cells: {
                  0: {
                    style: 28,
                  },
                  1: {
                    style: 11,
                  },
                  2: {
                    style: 11,
                  },
                  3: {
                    style: 11,
                  },
                  4: {
                    style: 11,
                  },
                  5: {
                    style: 11,
                  },
                  6: {
                    style: 11,
                  },
                  7: {
                    style: 11,
                  },
                  8: {
                    style: 11,
                  },
                  9: {
                    style: 11,
                  },
                  10: {
                    style: 11,
                  },
                  11: {
                    style: 11,
                  },
                  12: {
                    style: 11,
                  },
                  13: {
                    style: 11,
                  },
                  14: {
                    style: 11,
                  },
                  15: {
                    style: 11,
                  },
                  16: {
                    style: 11,
                  },
                  17: {
                    style: 11,
                  },
                  18: {
                    style: 11,
                  },
                  19: {
                    style: 11,
                  },
                  20: {
                    style: 11,
                  },
                  21: {
                    style: 11,
                  },
                  22: {
                    style: 11,
                  },
                  23: {
                    style: 11,
                  },
                  24: {
                    style: 11,
                  },
                  25: {
                    style: 11,
                  },
                },
              },
              40: {
                cells: {
                  0: {
                    style: 28,
                  },
                  1: {
                    style: 11,
                  },
                  2: {
                    style: 11,
                  },
                  3: {
                    style: 11,
                  },
                  4: {
                    style: 11,
                  },
                  5: {
                    style: 11,
                  },
                  6: {
                    style: 11,
                  },
                  7: {
                    style: 11,
                  },
                  8: {
                    style: 11,
                  },
                  9: {
                    style: 11,
                  },
                  10: {
                    style: 11,
                  },
                  11: {
                    style: 11,
                  },
                  12: {
                    style: 11,
                  },
                  13: {
                    style: 11,
                  },
                  14: {
                    style: 11,
                  },
                  15: {
                    style: 11,
                  },
                  16: {
                    style: 11,
                  },
                  17: {
                    style: 11,
                  },
                  18: {
                    style: 11,
                  },
                  19: {
                    style: 11,
                  },
                  20: {
                    style: 11,
                  },
                  21: {
                    style: 11,
                  },
                  22: {
                    style: 11,
                  },
                  23: {
                    style: 11,
                  },
                  24: {
                    style: 11,
                  },
                  25: {
                    style: 11,
                  },
                },
              },
              41: {
                cells: {
                  0: {
                    style: 28,
                  },
                  1: {
                    style: 11,
                  },
                  2: {
                    style: 11,
                  },
                  3: {
                    style: 11,
                  },
                  4: {
                    style: 11,
                  },
                  5: {
                    style: 11,
                  },
                  6: {
                    style: 11,
                  },
                  7: {
                    style: 11,
                  },
                  8: {
                    style: 11,
                  },
                  9: {
                    style: 11,
                  },
                  10: {
                    style: 11,
                  },
                  11: {
                    style: 11,
                  },
                  12: {
                    style: 11,
                  },
                  13: {
                    style: 11,
                  },
                  14: {
                    style: 11,
                  },
                  15: {
                    style: 11,
                  },
                  16: {
                    style: 11,
                  },
                  17: {
                    style: 11,
                  },
                  18: {
                    style: 11,
                  },
                  19: {
                    style: 11,
                  },
                  20: {
                    style: 11,
                  },
                  21: {
                    style: 11,
                  },
                  22: {
                    style: 11,
                  },
                  23: {
                    style: 11,
                  },
                  24: {
                    style: 11,
                  },
                  25: {
                    style: 11,
                  },
                },
              },
              42: {
                cells: {
                  0: {
                    style: 28,
                  },
                  1: {
                    style: 11,
                  },
                  2: {
                    style: 11,
                  },
                  3: {
                    style: 11,
                  },
                  4: {
                    style: 11,
                  },
                  5: {
                    style: 11,
                  },
                  6: {
                    style: 11,
                  },
                  7: {
                    style: 11,
                  },
                  8: {
                    style: 11,
                  },
                  9: {
                    style: 11,
                  },
                  10: {
                    style: 11,
                  },
                  11: {
                    style: 11,
                  },
                  12: {
                    style: 11,
                  },
                  13: {
                    style: 11,
                  },
                  14: {
                    style: 11,
                  },
                  15: {
                    style: 11,
                  },
                  16: {
                    style: 11,
                  },
                  17: {
                    style: 11,
                  },
                  18: {
                    style: 11,
                  },
                  19: {
                    style: 11,
                  },
                  20: {
                    style: 11,
                  },
                  21: {
                    style: 11,
                  },
                  22: {
                    style: 11,
                  },
                  23: {
                    style: 11,
                  },
                  24: {
                    style: 11,
                  },
                  25: {
                    style: 11,
                  },
                },
              },
              43: {
                cells: {
                  0: {
                    style: 28,
                  },
                  1: {
                    style: 11,
                  },
                  2: {
                    style: 11,
                  },
                  3: {
                    style: 11,
                  },
                  4: {
                    style: 11,
                  },
                  5: {
                    style: 11,
                  },
                  6: {
                    style: 11,
                  },
                  7: {
                    style: 11,
                  },
                  8: {
                    style: 11,
                  },
                  9: {
                    style: 11,
                  },
                  10: {
                    style: 11,
                  },
                  11: {
                    style: 11,
                  },
                  12: {
                    style: 11,
                  },
                  13: {
                    style: 11,
                  },
                  14: {
                    style: 11,
                  },
                  15: {
                    style: 11,
                  },
                  16: {
                    style: 11,
                  },
                  17: {
                    style: 11,
                  },
                  18: {
                    style: 11,
                  },
                  19: {
                    style: 11,
                  },
                  20: {
                    style: 11,
                  },
                  21: {
                    style: 11,
                  },
                  22: {
                    style: 11,
                  },
                  23: {
                    style: 11,
                  },
                  24: {
                    style: 11,
                  },
                  25: {
                    style: 11,
                  },
                },
              },
              44: {
                cells: {
                  0: {
                    style: 28,
                  },
                  1: {
                    style: 11,
                  },
                  2: {
                    style: 11,
                  },
                  3: {
                    style: 11,
                  },
                  4: {
                    style: 11,
                  },
                  5: {
                    style: 11,
                  },
                  6: {
                    style: 11,
                  },
                  7: {
                    style: 11,
                  },
                  8: {
                    style: 11,
                  },
                  9: {
                    style: 11,
                  },
                  10: {
                    style: 11,
                  },
                  11: {
                    style: 11,
                  },
                  12: {
                    style: 11,
                  },
                  13: {
                    style: 11,
                  },
                  14: {
                    style: 11,
                  },
                  15: {
                    style: 11,
                  },
                  16: {
                    style: 11,
                  },
                  17: {
                    style: 11,
                  },
                  18: {
                    style: 11,
                  },
                  19: {
                    style: 11,
                  },
                  20: {
                    style: 11,
                  },
                  21: {
                    style: 11,
                  },
                  22: {
                    style: 11,
                  },
                  23: {
                    style: 11,
                  },
                  24: {
                    style: 11,
                  },
                  25: {
                    style: 11,
                  },
                },
              },
              45: {
                cells: {
                  0: {
                    style: 28,
                  },
                  1: {
                    style: 11,
                  },
                  2: {
                    style: 11,
                  },
                  3: {
                    style: 11,
                  },
                  4: {
                    style: 11,
                  },
                  5: {
                    style: 11,
                  },
                  6: {
                    style: 11,
                  },
                  7: {
                    style: 11,
                  },
                  8: {
                    style: 11,
                  },
                  9: {
                    style: 11,
                  },
                  10: {
                    style: 11,
                  },
                  11: {
                    style: 11,
                  },
                  12: {
                    style: 11,
                  },
                  13: {
                    style: 11,
                  },
                  14: {
                    style: 11,
                  },
                  15: {
                    style: 11,
                  },
                  16: {
                    style: 11,
                  },
                  17: {
                    style: 11,
                  },
                  18: {
                    style: 11,
                  },
                  19: {
                    style: 11,
                  },
                  20: {
                    style: 11,
                  },
                  21: {
                    style: 11,
                  },
                  22: {
                    style: 11,
                  },
                  23: {
                    style: 11,
                  },
                  24: {
                    style: 11,
                  },
                  25: {
                    style: 11,
                  },
                },
              },
              46: {
                cells: {
                  0: {
                    style: 28,
                  },
                  1: {
                    style: 11,
                  },
                  2: {
                    style: 11,
                  },
                  3: {
                    style: 11,
                  },
                  4: {
                    style: 11,
                  },
                  5: {
                    style: 11,
                  },
                  6: {
                    style: 11,
                  },
                  7: {
                    style: 11,
                  },
                  8: {
                    style: 11,
                  },
                  9: {
                    style: 11,
                  },
                  10: {
                    style: 11,
                  },
                  11: {
                    style: 11,
                  },
                  12: {
                    style: 11,
                  },
                  13: {
                    style: 11,
                  },
                  14: {
                    style: 11,
                  },
                  15: {
                    style: 11,
                  },
                  16: {
                    style: 11,
                  },
                  17: {
                    style: 11,
                  },
                  18: {
                    style: 11,
                  },
                  19: {
                    style: 11,
                  },
                  20: {
                    style: 11,
                  },
                  21: {
                    style: 11,
                  },
                  22: {
                    style: 11,
                  },
                  23: {
                    style: 11,
                  },
                  24: {
                    style: 11,
                  },
                  25: {
                    style: 11,
                  },
                },
              },
              47: {
                cells: {
                  0: {
                    style: 28,
                  },
                  1: {
                    style: 11,
                  },
                  2: {
                    style: 11,
                  },
                  3: {
                    style: 11,
                  },
                  4: {
                    style: 11,
                  },
                  5: {
                    style: 11,
                  },
                  6: {
                    style: 11,
                  },
                  7: {
                    style: 11,
                  },
                  8: {
                    style: 11,
                  },
                  9: {
                    style: 11,
                  },
                  10: {
                    style: 11,
                  },
                  11: {
                    style: 11,
                  },
                  12: {
                    style: 11,
                  },
                  13: {
                    style: 11,
                  },
                  14: {
                    style: 11,
                  },
                  15: {
                    style: 11,
                  },
                  16: {
                    style: 11,
                  },
                  17: {
                    style: 11,
                  },
                  18: {
                    style: 11,
                  },
                  19: {
                    style: 11,
                  },
                  20: {
                    style: 11,
                  },
                  21: {
                    style: 11,
                  },
                  22: {
                    style: 11,
                  },
                  23: {
                    style: 11,
                  },
                  24: {
                    style: 11,
                  },
                  25: {
                    style: 11,
                  },
                },
              },
              48: {
                cells: {
                  0: {
                    style: 28,
                  },
                  1: {
                    style: 11,
                  },
                  2: {
                    style: 11,
                  },
                  3: {
                    style: 11,
                  },
                  4: {
                    style: 11,
                  },
                  5: {
                    style: 11,
                  },
                  6: {
                    style: 11,
                  },
                  7: {
                    style: 11,
                  },
                  8: {
                    style: 11,
                  },
                  9: {
                    style: 11,
                  },
                  10: {
                    style: 11,
                  },
                  11: {
                    style: 11,
                  },
                  12: {
                    style: 11,
                  },
                  13: {
                    style: 11,
                  },
                  14: {
                    style: 11,
                  },
                  15: {
                    style: 11,
                  },
                  16: {
                    style: 11,
                  },
                  17: {
                    style: 11,
                  },
                  18: {
                    style: 11,
                  },
                  19: {
                    style: 11,
                  },
                  20: {
                    style: 11,
                  },
                  21: {
                    style: 11,
                  },
                  22: {
                    style: 11,
                  },
                  23: {
                    style: 11,
                  },
                  24: {
                    style: 11,
                  },
                  25: {
                    style: 11,
                  },
                },
              },
              49: {
                cells: {
                  0: {
                    style: 28,
                  },
                  1: {
                    style: 11,
                  },
                  2: {
                    style: 11,
                  },
                  3: {
                    style: 11,
                  },
                  4: {
                    style: 11,
                  },
                  5: {
                    style: 11,
                  },
                  6: {
                    style: 11,
                  },
                  7: {
                    style: 11,
                  },
                  8: {
                    style: 11,
                  },
                  9: {
                    style: 11,
                  },
                  10: {
                    style: 11,
                  },
                  11: {
                    style: 11,
                  },
                  12: {
                    style: 11,
                  },
                  13: {
                    style: 11,
                  },
                  14: {
                    style: 11,
                  },
                  15: {
                    style: 11,
                  },
                  16: {
                    style: 11,
                  },
                  17: {
                    style: 11,
                  },
                  18: {
                    style: 11,
                  },
                  19: {
                    style: 11,
                  },
                  20: {
                    style: 11,
                  },
                  21: {
                    style: 11,
                  },
                  22: {
                    style: 11,
                  },
                  23: {
                    style: 11,
                  },
                  24: {
                    style: 11,
                  },
                  25: {
                    style: 11,
                  },
                },
              },
              50: {
                cells: {
                  0: {
                    style: 28,
                  },
                  1: {
                    style: 11,
                  },
                  2: {
                    style: 11,
                  },
                  3: {
                    style: 11,
                  },
                  4: {
                    style: 11,
                  },
                  5: {
                    style: 11,
                  },
                  6: {
                    style: 11,
                  },
                  7: {
                    style: 11,
                  },
                  8: {
                    style: 11,
                  },
                  9: {
                    style: 11,
                  },
                  10: {
                    style: 11,
                  },
                  11: {
                    style: 11,
                  },
                  12: {
                    style: 11,
                  },
                  13: {
                    style: 11,
                  },
                  14: {
                    style: 11,
                  },
                  15: {
                    style: 11,
                  },
                  16: {
                    style: 11,
                  },
                  17: {
                    style: 11,
                  },
                  18: {
                    style: 11,
                  },
                  19: {
                    style: 11,
                  },
                  20: {
                    style: 11,
                  },
                  21: {
                    style: 11,
                  },
                  22: {
                    style: 11,
                  },
                  23: {
                    style: 11,
                  },
                  24: {
                    style: 11,
                  },
                  25: {
                    style: 11,
                  },
                },
              },
              51: {
                cells: {
                  0: {
                    style: 28,
                  },
                  1: {
                    style: 11,
                  },
                  2: {
                    style: 11,
                  },
                  3: {
                    style: 11,
                  },
                  4: {
                    style: 11,
                  },
                  5: {
                    style: 11,
                  },
                  6: {
                    style: 11,
                  },
                  7: {
                    style: 11,
                  },
                  8: {
                    style: 11,
                  },
                  9: {
                    style: 11,
                  },
                  10: {
                    style: 11,
                  },
                  11: {
                    style: 11,
                  },
                  12: {
                    style: 11,
                  },
                  13: {
                    style: 11,
                  },
                  14: {
                    style: 11,
                  },
                  15: {
                    style: 11,
                  },
                  16: {
                    style: 11,
                  },
                  17: {
                    style: 11,
                  },
                  18: {
                    style: 11,
                  },
                  19: {
                    style: 11,
                  },
                  20: {
                    style: 11,
                  },
                  21: {
                    style: 11,
                  },
                  22: {
                    style: 11,
                  },
                  23: {
                    style: 11,
                  },
                  24: {
                    style: 11,
                  },
                  25: {
                    style: 11,
                  },
                },
              },
              52: {
                cells: {
                  0: {
                    style: 28,
                  },
                  1: {
                    style: 11,
                  },
                  2: {
                    style: 11,
                  },
                  3: {
                    style: 11,
                  },
                  4: {
                    style: 11,
                  },
                  5: {
                    style: 11,
                  },
                  6: {
                    style: 11,
                  },
                  7: {
                    style: 11,
                  },
                  8: {
                    style: 11,
                  },
                  9: {
                    style: 11,
                  },
                  10: {
                    style: 11,
                  },
                  11: {
                    style: 11,
                  },
                  12: {
                    style: 11,
                  },
                  13: {
                    style: 11,
                  },
                  14: {
                    style: 11,
                  },
                  15: {
                    style: 11,
                  },
                  16: {
                    style: 11,
                  },
                  17: {
                    style: 11,
                  },
                  18: {
                    style: 11,
                  },
                  19: {
                    style: 11,
                  },
                  20: {
                    style: 11,
                  },
                  21: {
                    style: 11,
                  },
                  22: {
                    style: 11,
                  },
                  23: {
                    style: 11,
                  },
                  24: {
                    style: 11,
                  },
                  25: {
                    style: 11,
                  },
                },
              },
              53: {
                cells: {
                  0: {
                    style: 28,
                  },
                  1: {
                    style: 11,
                  },
                  2: {
                    style: 11,
                  },
                  3: {
                    style: 11,
                  },
                  4: {
                    style: 11,
                  },
                  5: {
                    style: 11,
                  },
                  6: {
                    style: 11,
                  },
                  7: {
                    style: 11,
                  },
                  8: {
                    style: 11,
                  },
                  9: {
                    style: 11,
                  },
                  10: {
                    style: 11,
                  },
                  11: {
                    style: 11,
                  },
                  12: {
                    style: 11,
                  },
                  13: {
                    style: 11,
                  },
                  14: {
                    style: 11,
                  },
                  15: {
                    style: 11,
                  },
                  16: {
                    style: 11,
                  },
                  17: {
                    style: 11,
                  },
                  18: {
                    style: 11,
                  },
                  19: {
                    style: 11,
                  },
                  20: {
                    style: 11,
                  },
                  21: {
                    style: 11,
                  },
                  22: {
                    style: 11,
                  },
                  23: {
                    style: 11,
                  },
                  24: {
                    style: 11,
                  },
                  25: {
                    style: 11,
                  },
                },
              },
              54: {
                cells: {
                  0: {
                    style: 28,
                  },
                  1: {
                    style: 11,
                  },
                  2: {
                    style: 11,
                  },
                  3: {
                    style: 11,
                  },
                  4: {
                    style: 11,
                  },
                  5: {
                    style: 11,
                  },
                  6: {
                    style: 11,
                  },
                  7: {
                    style: 11,
                  },
                  8: {
                    style: 11,
                  },
                  9: {
                    style: 11,
                  },
                  10: {
                    style: 11,
                  },
                  11: {
                    style: 11,
                  },
                  12: {
                    style: 11,
                  },
                  13: {
                    style: 11,
                  },
                  14: {
                    style: 11,
                  },
                  15: {
                    style: 11,
                  },
                  16: {
                    style: 11,
                  },
                  17: {
                    style: 11,
                  },
                  18: {
                    style: 11,
                  },
                  19: {
                    style: 11,
                  },
                  20: {
                    style: 11,
                  },
                  21: {
                    style: 11,
                  },
                  22: {
                    style: 11,
                  },
                  23: {
                    style: 11,
                  },
                  24: {
                    style: 11,
                  },
                  25: {
                    style: 11,
                  },
                },
              },
              55: {
                cells: {
                  0: {
                    style: 28,
                  },
                  1: {
                    style: 11,
                  },
                  2: {
                    style: 11,
                  },
                  3: {
                    style: 11,
                  },
                  4: {
                    style: 11,
                  },
                  5: {
                    style: 11,
                  },
                  6: {
                    style: 11,
                  },
                  7: {
                    style: 11,
                  },
                  8: {
                    style: 11,
                  },
                  9: {
                    style: 11,
                  },
                  10: {
                    style: 11,
                  },
                  11: {
                    style: 11,
                  },
                  12: {
                    style: 11,
                  },
                  13: {
                    style: 11,
                  },
                  14: {
                    style: 11,
                  },
                  15: {
                    style: 11,
                  },
                  16: {
                    style: 11,
                  },
                  17: {
                    style: 11,
                  },
                  18: {
                    style: 11,
                  },
                  19: {
                    style: 11,
                  },
                  20: {
                    style: 11,
                  },
                  21: {
                    style: 11,
                  },
                  22: {
                    style: 11,
                  },
                  23: {
                    style: 11,
                  },
                  24: {
                    style: 11,
                  },
                  25: {
                    style: 11,
                  },
                },
              },
              56: {
                cells: {
                  0: {
                    style: 28,
                  },
                  1: {
                    style: 11,
                  },
                  2: {
                    style: 11,
                  },
                  3: {
                    style: 11,
                  },
                  4: {
                    style: 11,
                  },
                  5: {
                    style: 11,
                  },
                  6: {
                    style: 11,
                  },
                  7: {
                    style: 11,
                  },
                  8: {
                    style: 11,
                  },
                  9: {
                    style: 11,
                  },
                  10: {
                    style: 11,
                  },
                  11: {
                    style: 11,
                  },
                  12: {
                    style: 11,
                  },
                  13: {
                    style: 11,
                  },
                  14: {
                    style: 11,
                  },
                  15: {
                    style: 11,
                  },
                  16: {
                    style: 11,
                  },
                  17: {
                    style: 11,
                  },
                  18: {
                    style: 11,
                  },
                  19: {
                    style: 11,
                  },
                  20: {
                    style: 11,
                  },
                  21: {
                    style: 11,
                  },
                  22: {
                    style: 11,
                  },
                  23: {
                    style: 11,
                  },
                  24: {
                    style: 11,
                  },
                  25: {
                    style: 11,
                  },
                },
              },
              57: {
                cells: {
                  0: {
                    style: 28,
                  },
                  1: {
                    style: 11,
                  },
                  2: {
                    style: 11,
                  },
                  3: {
                    style: 11,
                  },
                  4: {
                    style: 11,
                  },
                  5: {
                    style: 11,
                  },
                  6: {
                    style: 11,
                  },
                  7: {
                    style: 11,
                  },
                  8: {
                    style: 11,
                  },
                  9: {
                    style: 11,
                  },
                  10: {
                    style: 11,
                  },
                  11: {
                    style: 11,
                  },
                  12: {
                    style: 11,
                  },
                  13: {
                    style: 11,
                  },
                  14: {
                    style: 11,
                  },
                  15: {
                    style: 11,
                  },
                  16: {
                    style: 11,
                  },
                  17: {
                    style: 11,
                  },
                  18: {
                    style: 11,
                  },
                  19: {
                    style: 11,
                  },
                  20: {
                    style: 11,
                  },
                  21: {
                    style: 11,
                  },
                  22: {
                    style: 11,
                  },
                  23: {
                    style: 11,
                  },
                  24: {
                    style: 11,
                  },
                  25: {
                    style: 11,
                  },
                },
              },
              58: {
                cells: {
                  0: {
                    style: 28,
                  },
                  1: {
                    style: 11,
                  },
                  2: {
                    style: 11,
                  },
                  3: {
                    style: 11,
                  },
                  4: {
                    style: 11,
                  },
                  5: {
                    style: 11,
                  },
                  6: {
                    style: 11,
                  },
                  7: {
                    style: 11,
                  },
                  8: {
                    style: 11,
                  },
                  9: {
                    style: 11,
                  },
                  10: {
                    style: 11,
                  },
                  11: {
                    style: 11,
                  },
                  12: {
                    style: 11,
                  },
                  13: {
                    style: 11,
                  },
                  14: {
                    style: 11,
                  },
                  15: {
                    style: 11,
                  },
                  16: {
                    style: 11,
                  },
                  17: {
                    style: 11,
                  },
                  18: {
                    style: 11,
                  },
                  19: {
                    style: 11,
                  },
                  20: {
                    style: 11,
                  },
                  21: {
                    style: 11,
                  },
                  22: {
                    style: 11,
                  },
                  23: {
                    style: 11,
                  },
                  24: {
                    style: 11,
                  },
                  25: {
                    style: 11,
                  },
                },
              },
              59: {
                cells: {
                  0: {
                    style: 28,
                  },
                  1: {
                    style: 11,
                  },
                  2: {
                    style: 11,
                  },
                  3: {
                    style: 11,
                  },
                  4: {
                    style: 11,
                  },
                  5: {
                    style: 11,
                  },
                  6: {
                    style: 11,
                  },
                  7: {
                    style: 11,
                  },
                  8: {
                    style: 11,
                  },
                  9: {
                    style: 11,
                  },
                  10: {
                    style: 11,
                  },
                  11: {
                    style: 11,
                  },
                  12: {
                    style: 11,
                  },
                  13: {
                    style: 11,
                  },
                  14: {
                    style: 11,
                  },
                  15: {
                    style: 11,
                  },
                  16: {
                    style: 11,
                  },
                  17: {
                    style: 11,
                  },
                  18: {
                    style: 11,
                  },
                  19: {
                    style: 11,
                  },
                  20: {
                    style: 11,
                  },
                  21: {
                    style: 11,
                  },
                  22: {
                    style: 11,
                  },
                  23: {
                    style: 11,
                  },
                  24: {
                    style: 11,
                  },
                  25: {
                    style: 11,
                  },
                },
              },
              60: {
                cells: {
                  0: {
                    style: 28,
                  },
                  1: {
                    style: 11,
                  },
                  2: {
                    style: 11,
                  },
                  3: {
                    style: 11,
                  },
                  4: {
                    style: 11,
                  },
                  5: {
                    style: 11,
                  },
                  6: {
                    style: 11,
                  },
                  7: {
                    style: 11,
                  },
                  8: {
                    style: 11,
                  },
                  9: {
                    style: 11,
                  },
                  10: {
                    style: 11,
                  },
                  11: {
                    style: 11,
                  },
                  12: {
                    style: 11,
                  },
                  13: {
                    style: 11,
                  },
                  14: {
                    style: 11,
                  },
                  15: {
                    style: 11,
                  },
                  16: {
                    style: 11,
                  },
                  17: {
                    style: 11,
                  },
                  18: {
                    style: 11,
                  },
                  19: {
                    style: 11,
                  },
                  20: {
                    style: 11,
                  },
                  21: {
                    style: 11,
                  },
                  22: {
                    style: 11,
                  },
                  23: {
                    style: 11,
                  },
                  24: {
                    style: 11,
                  },
                  25: {
                    style: 11,
                  },
                },
              },
              61: {
                cells: {
                  0: {
                    style: 28,
                  },
                  1: {
                    style: 11,
                  },
                  2: {
                    style: 11,
                  },
                  3: {
                    style: 11,
                  },
                  4: {
                    style: 11,
                  },
                  5: {
                    style: 11,
                  },
                  6: {
                    style: 11,
                  },
                  7: {
                    style: 11,
                  },
                  8: {
                    style: 11,
                  },
                  9: {
                    style: 11,
                  },
                  10: {
                    style: 11,
                  },
                  11: {
                    style: 11,
                  },
                  12: {
                    style: 11,
                  },
                  13: {
                    style: 11,
                  },
                  14: {
                    style: 11,
                  },
                  15: {
                    style: 11,
                  },
                  16: {
                    style: 11,
                  },
                  17: {
                    style: 11,
                  },
                  18: {
                    style: 11,
                  },
                  19: {
                    style: 11,
                  },
                  20: {
                    style: 11,
                  },
                  21: {
                    style: 11,
                  },
                  22: {
                    style: 11,
                  },
                  23: {
                    style: 11,
                  },
                  24: {
                    style: 11,
                  },
                  25: {
                    style: 11,
                  },
                },
              },
              62: {
                cells: {
                  0: {
                    style: 28,
                  },
                  1: {
                    style: 11,
                  },
                  2: {
                    style: 11,
                  },
                  3: {
                    style: 11,
                  },
                  4: {
                    style: 11,
                  },
                  5: {
                    style: 11,
                  },
                  6: {
                    style: 11,
                  },
                  7: {
                    style: 11,
                  },
                  8: {
                    style: 11,
                  },
                  9: {
                    style: 11,
                  },
                  10: {
                    style: 11,
                  },
                  11: {
                    style: 11,
                  },
                  12: {
                    style: 11,
                  },
                  13: {
                    style: 11,
                  },
                  14: {
                    style: 11,
                  },
                  15: {
                    style: 11,
                  },
                  16: {
                    style: 11,
                  },
                  17: {
                    style: 11,
                  },
                  18: {
                    style: 11,
                  },
                  19: {
                    style: 11,
                  },
                  20: {
                    style: 11,
                  },
                  21: {
                    style: 11,
                  },
                  22: {
                    style: 11,
                  },
                  23: {
                    style: 11,
                  },
                  24: {
                    style: 11,
                  },
                  25: {
                    style: 11,
                  },
                },
              },
              63: {
                cells: {
                  0: {
                    style: 28,
                  },
                  1: {
                    style: 11,
                  },
                  2: {
                    style: 11,
                  },
                  3: {
                    style: 11,
                  },
                  4: {
                    style: 11,
                  },
                  5: {
                    style: 11,
                  },
                  6: {
                    style: 11,
                  },
                  7: {
                    style: 11,
                  },
                  8: {
                    style: 11,
                  },
                  9: {
                    style: 11,
                  },
                  10: {
                    style: 11,
                  },
                  11: {
                    style: 11,
                  },
                  12: {
                    style: 11,
                  },
                  13: {
                    style: 11,
                  },
                  14: {
                    style: 11,
                  },
                  15: {
                    style: 11,
                  },
                  16: {
                    style: 11,
                  },
                  17: {
                    style: 11,
                  },
                  18: {
                    style: 11,
                  },
                  19: {
                    style: 11,
                  },
                  20: {
                    style: 11,
                  },
                  21: {
                    style: 11,
                  },
                  22: {
                    style: 11,
                  },
                  23: {
                    style: 11,
                  },
                  24: {
                    style: 11,
                  },
                  25: {
                    style: 11,
                  },
                },
              },
              64: {
                cells: {
                  0: {
                    style: 28,
                  },
                  1: {
                    style: 11,
                  },
                  2: {
                    style: 11,
                  },
                  3: {
                    style: 11,
                  },
                  4: {
                    style: 11,
                  },
                  5: {
                    style: 11,
                  },
                  6: {
                    style: 11,
                  },
                  7: {
                    style: 11,
                  },
                  8: {
                    style: 11,
                  },
                  9: {
                    style: 11,
                  },
                  10: {
                    style: 11,
                  },
                  11: {
                    style: 11,
                  },
                  12: {
                    style: 11,
                  },
                  13: {
                    style: 11,
                  },
                  14: {
                    style: 11,
                  },
                  15: {
                    style: 11,
                  },
                  16: {
                    style: 11,
                  },
                  17: {
                    style: 11,
                  },
                  18: {
                    style: 11,
                  },
                  19: {
                    style: 11,
                  },
                  20: {
                    style: 11,
                  },
                  21: {
                    style: 11,
                  },
                  22: {
                    style: 11,
                  },
                  23: {
                    style: 11,
                  },
                  24: {
                    style: 11,
                  },
                  25: {
                    style: 11,
                  },
                },
              },
              65: {
                cells: {
                  0: {
                    style: 28,
                  },
                  1: {
                    style: 11,
                  },
                  2: {
                    style: 11,
                  },
                  3: {
                    style: 11,
                  },
                  4: {
                    style: 11,
                  },
                  5: {
                    style: 11,
                  },
                  6: {
                    style: 11,
                  },
                  7: {
                    style: 11,
                  },
                  8: {
                    style: 11,
                  },
                  9: {
                    style: 11,
                  },
                  10: {
                    style: 11,
                  },
                  11: {
                    style: 11,
                  },
                  12: {
                    style: 11,
                  },
                  13: {
                    style: 11,
                  },
                  14: {
                    style: 11,
                  },
                  15: {
                    style: 11,
                  },
                  16: {
                    style: 11,
                  },
                  17: {
                    style: 11,
                  },
                  18: {
                    style: 11,
                  },
                  19: {
                    style: 11,
                  },
                  20: {
                    style: 11,
                  },
                  21: {
                    style: 11,
                  },
                  22: {
                    style: 11,
                  },
                  23: {
                    style: 11,
                  },
                  24: {
                    style: 11,
                  },
                  25: {
                    style: 11,
                  },
                },
              },
              66: {
                cells: {
                  0: {
                    style: 28,
                  },
                  1: {
                    style: 11,
                  },
                  2: {
                    style: 11,
                  },
                  3: {
                    style: 11,
                  },
                  4: {
                    style: 11,
                  },
                  5: {
                    style: 11,
                  },
                  6: {
                    style: 11,
                  },
                  7: {
                    style: 11,
                  },
                  8: {
                    style: 11,
                  },
                  9: {
                    style: 11,
                  },
                  10: {
                    style: 11,
                  },
                  11: {
                    style: 11,
                  },
                  12: {
                    style: 11,
                  },
                  13: {
                    style: 11,
                  },
                  14: {
                    style: 11,
                  },
                  15: {
                    style: 11,
                  },
                  16: {
                    style: 11,
                  },
                  17: {
                    style: 11,
                  },
                  18: {
                    style: 11,
                  },
                  19: {
                    style: 11,
                  },
                  20: {
                    style: 11,
                  },
                  21: {
                    style: 11,
                  },
                  22: {
                    style: 11,
                  },
                  23: {
                    style: 11,
                  },
                  24: {
                    style: 11,
                  },
                  25: {
                    style: 11,
                  },
                },
                height: 38,
              },
              67: {
                cells: {
                  0: {
                    style: 28,
                  },
                  1: {
                    style: 11,
                  },
                  2: {
                    style: 11,
                  },
                  3: {
                    style: 11,
                  },
                  4: {
                    style: 11,
                  },
                  5: {
                    style: 11,
                  },
                  6: {
                    style: 11,
                  },
                  7: {
                    style: 11,
                  },
                  8: {
                    style: 11,
                  },
                  9: {
                    style: 11,
                  },
                  10: {
                    style: 11,
                  },
                  11: {
                    style: 11,
                  },
                  12: {
                    style: 11,
                  },
                  13: {
                    style: 11,
                  },
                  14: {
                    style: 11,
                  },
                  15: {
                    style: 11,
                  },
                  16: {
                    style: 11,
                  },
                  17: {
                    style: 11,
                  },
                  18: {
                    style: 11,
                  },
                  19: {
                    style: 11,
                  },
                  20: {
                    style: 11,
                  },
                  21: {
                    style: 11,
                  },
                  22: {
                    style: 11,
                  },
                  23: {
                    style: 11,
                  },
                  24: {
                    style: 11,
                  },
                  25: {
                    style: 11,
                  },
                },
              },
              68: {
                cells: {
                  0: {
                    style: 28,
                  },
                  1: {
                    style: 11,
                  },
                  2: {
                    style: 11,
                  },
                  3: {
                    style: 11,
                  },
                  4: {
                    style: 11,
                  },
                  5: {
                    style: 11,
                  },
                  6: {
                    style: 11,
                  },
                  7: {
                    style: 11,
                  },
                  8: {
                    style: 11,
                  },
                  9: {
                    style: 11,
                  },
                  10: {
                    style: 11,
                  },
                  11: {
                    style: 11,
                  },
                  12: {
                    style: 11,
                  },
                  13: {
                    style: 11,
                  },
                  14: {
                    style: 11,
                  },
                  15: {
                    style: 11,
                  },
                  16: {
                    style: 11,
                  },
                  17: {
                    style: 11,
                  },
                  18: {
                    style: 11,
                  },
                  19: {
                    style: 11,
                  },
                  20: {
                    style: 11,
                  },
                  21: {
                    style: 11,
                  },
                  22: {
                    style: 11,
                  },
                  23: {
                    style: 11,
                  },
                  24: {
                    style: 11,
                  },
                  25: {
                    style: 11,
                  },
                },
              },
              69: {
                cells: {
                  0: {
                    style: 28,
                  },
                  1: {
                    style: 11,
                  },
                  2: {
                    style: 11,
                  },
                  3: {
                    style: 11,
                  },
                  4: {
                    style: 11,
                  },
                  5: {
                    style: 11,
                  },
                  6: {
                    style: 11,
                  },
                  7: {
                    style: 11,
                  },
                  8: {
                    style: 11,
                  },
                  9: {
                    style: 11,
                  },
                  10: {
                    style: 11,
                  },
                  11: {
                    style: 11,
                  },
                  12: {
                    style: 11,
                  },
                  13: {
                    style: 11,
                  },
                  14: {
                    style: 11,
                  },
                  15: {
                    style: 11,
                  },
                  16: {
                    style: 11,
                  },
                  17: {
                    style: 11,
                  },
                  18: {
                    style: 11,
                  },
                  19: {
                    style: 11,
                  },
                  20: {
                    style: 11,
                  },
                  21: {
                    style: 11,
                  },
                  22: {
                    style: 11,
                  },
                  23: {
                    style: 11,
                  },
                  24: {
                    style: 11,
                  },
                  25: {
                    style: 11,
                  },
                },
              },
              70: {
                cells: {
                  0: {
                    style: 28,
                  },
                  1: {
                    style: 11,
                  },
                  2: {
                    style: 11,
                  },
                  3: {
                    style: 11,
                  },
                  4: {
                    style: 11,
                  },
                  5: {
                    style: 11,
                  },
                  6: {
                    style: 11,
                  },
                  7: {
                    style: 11,
                  },
                  8: {
                    style: 11,
                  },
                  9: {
                    style: 11,
                  },
                  10: {
                    style: 11,
                  },
                  11: {
                    style: 11,
                  },
                  12: {
                    style: 11,
                  },
                  13: {
                    style: 11,
                  },
                  14: {
                    style: 11,
                  },
                  15: {
                    style: 11,
                  },
                  16: {
                    style: 11,
                  },
                  17: {
                    style: 11,
                  },
                  18: {
                    style: 11,
                  },
                  19: {
                    style: 11,
                  },
                  20: {
                    style: 11,
                  },
                  21: {
                    style: 11,
                  },
                  22: {
                    style: 11,
                  },
                  23: {
                    style: 11,
                  },
                  24: {
                    style: 11,
                  },
                  25: {
                    style: 11,
                  },
                },
              },
              71: {
                cells: {
                  0: {
                    style: 30,
                  },
                  1: {
                    style: 11,
                  },
                  2: {
                    style: 11,
                  },
                  3: {
                    style: 11,
                  },
                  4: {
                    style: 11,
                  },
                  5: {
                    style: 11,
                  },
                  6: {
                    style: 11,
                  },
                  7: {
                    style: 11,
                  },
                  8: {
                    style: 11,
                  },
                  9: {
                    style: 11,
                  },
                  10: {
                    style: 11,
                  },
                  11: {
                    style: 11,
                  },
                  12: {
                    style: 11,
                  },
                  13: {
                    style: 11,
                  },
                  14: {
                    style: 11,
                  },
                  15: {
                    style: 11,
                  },
                  16: {
                    style: 11,
                  },
                  17: {
                    style: 11,
                  },
                  18: {
                    style: 11,
                  },
                  19: {
                    style: 11,
                  },
                  20: {
                    style: 11,
                  },
                  21: {
                    style: 11,
                  },
                  22: {
                    style: 11,
                  },
                  23: {
                    style: 11,
                  },
                  24: {
                    style: 11,
                  },
                  25: {
                    style: 11,
                  },
                },
              },
              72: {
                cells: {
                  0: {
                    style: 28,
                  },
                  1: {
                    style: 11,
                  },
                  2: {
                    style: 11,
                  },
                  3: {
                    style: 11,
                  },
                  4: {
                    style: 11,
                  },
                  5: {
                    style: 11,
                  },
                  6: {
                    style: 11,
                  },
                  7: {
                    style: 11,
                  },
                  8: {
                    style: 11,
                  },
                  9: {
                    style: 11,
                  },
                  10: {
                    style: 11,
                  },
                  11: {
                    style: 11,
                  },
                  12: {
                    style: 11,
                  },
                  13: {
                    style: 11,
                  },
                  14: {
                    style: 11,
                  },
                  15: {
                    style: 11,
                  },
                  16: {
                    style: 11,
                  },
                  17: {
                    style: 11,
                  },
                  18: {
                    style: 11,
                  },
                  19: {
                    style: 11,
                  },
                  20: {
                    style: 11,
                  },
                  21: {
                    style: 11,
                  },
                  22: {
                    style: 11,
                  },
                  23: {
                    style: 11,
                  },
                  24: {
                    style: 11,
                  },
                  25: {
                    style: 11,
                  },
                },
              },
              73: {
                cells: {
                  0: {
                    style: 28,
                  },
                  1: {
                    style: 11,
                  },
                  2: {
                    style: 11,
                  },
                  3: {
                    style: 11,
                  },
                  4: {
                    style: 11,
                  },
                  5: {
                    style: 11,
                  },
                  6: {
                    style: 11,
                  },
                  7: {
                    style: 11,
                  },
                  8: {
                    style: 11,
                  },
                  9: {
                    style: 11,
                  },
                  10: {
                    style: 11,
                  },
                  11: {
                    style: 11,
                  },
                  12: {
                    style: 11,
                  },
                  13: {
                    style: 11,
                  },
                  14: {
                    style: 11,
                  },
                  15: {
                    style: 11,
                  },
                  16: {
                    style: 11,
                  },
                  17: {
                    style: 11,
                  },
                  18: {
                    style: 11,
                  },
                  19: {
                    style: 11,
                  },
                  20: {
                    style: 11,
                  },
                  21: {
                    style: 11,
                  },
                  22: {
                    style: 11,
                  },
                  23: {
                    style: 11,
                  },
                  24: {
                    style: 11,
                  },
                  25: {
                    style: 11,
                  },
                },
              },
              74: {
                cells: {
                  0: {
                    style: 28,
                  },
                  1: {
                    style: 11,
                  },
                  2: {
                    style: 11,
                  },
                  3: {
                    style: 11,
                  },
                  4: {
                    style: 11,
                  },
                  5: {
                    style: 11,
                  },
                  6: {
                    style: 11,
                  },
                  7: {
                    style: 11,
                  },
                  8: {
                    style: 11,
                  },
                  9: {
                    style: 11,
                  },
                  10: {
                    style: 11,
                  },
                  11: {
                    style: 11,
                  },
                  12: {
                    style: 11,
                  },
                  13: {
                    style: 11,
                  },
                  14: {
                    style: 11,
                  },
                  15: {
                    style: 11,
                  },
                  16: {
                    style: 11,
                  },
                  17: {
                    style: 11,
                  },
                  18: {
                    style: 11,
                  },
                  19: {
                    style: 11,
                  },
                  20: {
                    style: 11,
                  },
                  21: {
                    style: 11,
                  },
                  22: {
                    style: 11,
                  },
                  23: {
                    style: 11,
                  },
                  24: {
                    style: 11,
                  },
                  25: {
                    style: 11,
                  },
                },
              },
              75: {
                cells: {
                  0: {
                    style: 30,
                  },
                  1: {
                    style: 12,
                  },
                  2: {
                    style: 12,
                  },
                  3: {
                    style: 12,
                  },
                  4: {
                    style: 12,
                  },
                  5: {
                    style: 12,
                  },
                  6: {
                    style: 12,
                  },
                  7: {
                    style: 12,
                  },
                  8: {
                    style: 12,
                  },
                  9: {
                    style: 12,
                  },
                  10: {
                    style: 12,
                  },
                  11: {
                    style: 12,
                  },
                  12: {
                    style: 12,
                  },
                  13: {
                    style: 12,
                  },
                  14: {
                    style: 12,
                  },
                  15: {
                    style: 12,
                  },
                  16: {
                    style: 12,
                  },
                  17: {
                    style: 12,
                  },
                  18: {
                    style: 12,
                  },
                  19: {
                    style: 12,
                  },
                  20: {
                    style: 12,
                  },
                  21: {
                    style: 12,
                  },
                  22: {
                    style: 12,
                  },
                  23: {
                    style: 12,
                  },
                  24: {
                    style: 12,
                  },
                  25: {
                    style: 12,
                  },
                },
              },
              76: {
                cells: {
                  0: {
                    style: 34,
                  },
                  1: {
                    style: 12,
                  },
                  2: {
                    style: 12,
                  },
                  3: {
                    style: 12,
                  },
                  4: {
                    style: 12,
                  },
                  5: {
                    style: 12,
                  },
                  6: {
                    style: 12,
                  },
                  7: {
                    style: 12,
                  },
                  8: {
                    style: 12,
                  },
                  9: {
                    style: 12,
                  },
                  10: {
                    style: 12,
                  },
                  11: {
                    style: 12,
                  },
                  12: {
                    style: 12,
                  },
                  13: {
                    style: 12,
                  },
                  14: {
                    style: 12,
                  },
                  15: {
                    style: 12,
                  },
                  16: {
                    style: 12,
                  },
                  17: {
                    style: 12,
                  },
                  18: {
                    style: 12,
                  },
                  19: {
                    style: 12,
                  },
                  20: {
                    style: 12,
                  },
                  21: {
                    style: 12,
                  },
                  22: {
                    style: 12,
                  },
                  23: {
                    style: 12,
                  },
                  24: {
                    style: 12,
                  },
                  25: {
                    style: 12,
                  },
                },
              },
              77: {
                cells: {
                  0: {
                    style: 28,
                  },
                  1: {
                    style: 11,
                  },
                  2: {
                    style: 11,
                  },
                  3: {
                    style: 11,
                  },
                  4: {
                    style: 11,
                  },
                  5: {
                    style: 11,
                  },
                  6: {
                    style: 11,
                  },
                  7: {
                    style: 11,
                  },
                  8: {
                    style: 11,
                  },
                  9: {
                    style: 11,
                  },
                  10: {
                    style: 11,
                  },
                  11: {
                    style: 11,
                  },
                  12: {
                    style: 11,
                  },
                  13: {
                    style: 11,
                  },
                  14: {
                    style: 11,
                  },
                  15: {
                    style: 11,
                  },
                  16: {
                    style: 11,
                  },
                  17: {
                    style: 11,
                  },
                  18: {
                    style: 11,
                  },
                  19: {
                    style: 11,
                  },
                  20: {
                    style: 11,
                  },
                  21: {
                    style: 11,
                  },
                  22: {
                    style: 11,
                  },
                  23: {
                    style: 11,
                  },
                  24: {
                    style: 11,
                  },
                  25: {
                    style: 11,
                  },
                },
              },
              78: {
                cells: {
                  0: {
                    style: 28,
                  },
                  1: {
                    style: 11,
                  },
                  2: {
                    style: 11,
                  },
                  3: {
                    style: 11,
                  },
                  4: {
                    style: 11,
                  },
                  5: {
                    style: 11,
                  },
                  6: {
                    style: 11,
                  },
                  7: {
                    style: 11,
                  },
                  8: {
                    style: 11,
                  },
                  9: {
                    style: 11,
                  },
                  10: {
                    style: 11,
                  },
                  11: {
                    style: 11,
                  },
                  12: {
                    style: 11,
                  },
                  13: {
                    style: 11,
                  },
                  14: {
                    style: 11,
                  },
                  15: {
                    style: 11,
                  },
                  16: {
                    style: 11,
                  },
                  17: {
                    style: 11,
                  },
                  18: {
                    style: 11,
                  },
                  19: {
                    style: 11,
                  },
                  20: {
                    style: 11,
                  },
                  21: {
                    style: 11,
                  },
                  22: {
                    style: 11,
                  },
                  23: {
                    style: 11,
                  },
                  24: {
                    style: 11,
                  },
                  25: {
                    style: 11,
                  },
                },
              },
              79: {
                cells: {
                  0: {
                    style: 44,
                  },
                  1: {
                    style: 11,
                  },
                  2: {
                    style: 11,
                  },
                  3: {
                    style: 11,
                  },
                  4: {
                    style: 11,
                  },
                  5: {
                    style: 11,
                  },
                  6: {
                    style: 11,
                  },
                  7: {
                    style: 11,
                  },
                  8: {
                    style: 11,
                  },
                  9: {
                    style: 11,
                  },
                  10: {
                    style: 11,
                  },
                  11: {
                    style: 11,
                  },
                  12: {
                    style: 11,
                  },
                  13: {
                    style: 11,
                  },
                  14: {
                    style: 11,
                  },
                  15: {
                    style: 11,
                  },
                  16: {
                    style: 11,
                  },
                  17: {
                    style: 11,
                  },
                  18: {
                    style: 11,
                  },
                  19: {
                    style: 11,
                  },
                  20: {
                    style: 11,
                  },
                  21: {
                    style: 11,
                  },
                  22: {
                    style: 11,
                  },
                  23: {
                    style: 11,
                  },
                  24: {
                    style: 11,
                  },
                  25: {
                    style: 11,
                  },
                },
              },
              80: {
                cells: {
                  0: {
                    style: 28,
                  },
                  1: {
                    style: 11,
                  },
                  2: {
                    style: 11,
                  },
                  3: {
                    style: 11,
                  },
                  4: {
                    style: 11,
                  },
                  5: {
                    style: 11,
                  },
                  6: {
                    style: 11,
                  },
                  7: {
                    style: 11,
                  },
                  8: {
                    style: 11,
                  },
                  9: {
                    style: 11,
                  },
                  10: {
                    style: 11,
                  },
                  11: {
                    style: 11,
                  },
                  12: {
                    style: 11,
                  },
                  13: {
                    style: 11,
                  },
                  14: {
                    style: 11,
                  },
                  15: {
                    style: 11,
                  },
                  16: {
                    style: 11,
                  },
                  17: {
                    style: 11,
                  },
                  18: {
                    style: 11,
                  },
                  19: {
                    style: 11,
                  },
                  20: {
                    style: 11,
                  },
                  21: {
                    style: 11,
                  },
                  22: {
                    style: 11,
                  },
                  23: {
                    style: 11,
                  },
                  24: {
                    style: 11,
                  },
                  25: {
                    style: 11,
                  },
                },
              },
              81: {
                cells: {
                  0: {
                    style: 28,
                  },
                  1: {
                    style: 11,
                  },
                  2: {
                    style: 11,
                  },
                  3: {
                    style: 11,
                  },
                  4: {
                    style: 11,
                  },
                  5: {
                    style: 11,
                  },
                  6: {
                    style: 11,
                  },
                  7: {
                    style: 11,
                  },
                  8: {
                    style: 11,
                  },
                  9: {
                    style: 11,
                  },
                  10: {
                    style: 11,
                  },
                  11: {
                    style: 11,
                  },
                  12: {
                    style: 11,
                  },
                  13: {
                    style: 11,
                  },
                  14: {
                    style: 11,
                  },
                  15: {
                    style: 11,
                  },
                  16: {
                    style: 11,
                  },
                  17: {
                    style: 11,
                  },
                  18: {
                    style: 11,
                  },
                  19: {
                    style: 11,
                  },
                  20: {
                    style: 11,
                  },
                  21: {
                    style: 11,
                  },
                  22: {
                    style: 11,
                  },
                  23: {
                    style: 11,
                  },
                  24: {
                    style: 11,
                  },
                  25: {
                    style: 11,
                  },
                },
              },
              82: {
                cells: {
                  0: {
                    style: 28,
                  },
                  1: {
                    style: 11,
                  },
                  2: {
                    style: 11,
                  },
                  3: {
                    style: 11,
                  },
                  4: {
                    style: 11,
                  },
                  5: {
                    style: 11,
                  },
                  6: {
                    style: 11,
                  },
                  7: {
                    style: 11,
                  },
                  8: {
                    style: 11,
                  },
                  9: {
                    style: 11,
                  },
                  10: {
                    style: 11,
                  },
                  11: {
                    style: 11,
                  },
                  12: {
                    style: 11,
                  },
                  13: {
                    style: 11,
                  },
                  14: {
                    style: 11,
                  },
                  15: {
                    style: 11,
                  },
                  16: {
                    style: 11,
                  },
                  17: {
                    style: 11,
                  },
                  18: {
                    style: 11,
                  },
                  19: {
                    style: 11,
                  },
                  20: {
                    style: 11,
                  },
                  21: {
                    style: 11,
                  },
                  22: {
                    style: 11,
                  },
                  23: {
                    style: 11,
                  },
                  24: {
                    style: 11,
                  },
                  25: {
                    style: 11,
                  },
                },
              },
              83: {
                cells: {
                  0: {
                    style: 28,
                  },
                  1: {
                    style: 11,
                  },
                  2: {
                    style: 11,
                  },
                  3: {
                    style: 11,
                  },
                  4: {
                    style: 11,
                  },
                  5: {
                    style: 11,
                  },
                  6: {
                    style: 11,
                  },
                  7: {
                    style: 11,
                  },
                  8: {
                    style: 11,
                  },
                  9: {
                    style: 11,
                  },
                  10: {
                    style: 11,
                  },
                  11: {
                    style: 11,
                  },
                  12: {
                    style: 11,
                  },
                  13: {
                    style: 11,
                  },
                  14: {
                    style: 11,
                  },
                  15: {
                    style: 11,
                  },
                  16: {
                    style: 11,
                  },
                  17: {
                    style: 11,
                  },
                  18: {
                    style: 11,
                  },
                  19: {
                    style: 11,
                  },
                  20: {
                    style: 11,
                  },
                  21: {
                    style: 11,
                  },
                  22: {
                    style: 11,
                  },
                  23: {
                    style: 11,
                  },
                  24: {
                    style: 11,
                  },
                  25: {
                    style: 11,
                  },
                },
              },
              84: {
                cells: {
                  0: {
                    style: 28,
                  },
                  1: {
                    style: 11,
                  },
                  2: {
                    style: 11,
                  },
                  3: {
                    style: 11,
                  },
                  4: {
                    style: 11,
                  },
                  5: {
                    style: 11,
                  },
                  6: {
                    style: 11,
                  },
                  7: {
                    style: 11,
                  },
                  8: {
                    style: 11,
                  },
                  9: {
                    style: 11,
                  },
                  10: {
                    style: 11,
                  },
                  11: {
                    style: 11,
                  },
                  12: {
                    style: 11,
                  },
                  13: {
                    style: 11,
                  },
                  14: {
                    style: 11,
                  },
                  15: {
                    style: 11,
                  },
                  16: {
                    style: 11,
                  },
                  17: {
                    style: 11,
                  },
                  18: {
                    style: 11,
                  },
                  19: {
                    style: 11,
                  },
                  20: {
                    style: 11,
                  },
                  21: {
                    style: 11,
                  },
                  22: {
                    style: 11,
                  },
                  23: {
                    style: 11,
                  },
                  24: {
                    style: 11,
                  },
                  25: {
                    style: 11,
                  },
                },
                height: 31,
              },
              85: {
                cells: {
                  0: {
                    style: 28,
                  },
                  1: {
                    style: 11,
                  },
                  2: {
                    style: 11,
                  },
                  3: {
                    style: 11,
                  },
                  4: {
                    style: 11,
                  },
                  5: {
                    style: 11,
                  },
                  6: {
                    style: 11,
                  },
                  7: {
                    style: 11,
                  },
                  8: {
                    style: 11,
                  },
                  9: {
                    style: 11,
                  },
                  10: {
                    style: 11,
                  },
                  11: {
                    style: 11,
                  },
                  12: {
                    style: 11,
                  },
                  13: {
                    style: 11,
                  },
                  14: {
                    style: 11,
                  },
                  15: {
                    style: 11,
                  },
                  16: {
                    style: 11,
                  },
                  17: {
                    style: 11,
                  },
                  18: {
                    style: 11,
                  },
                  19: {
                    style: 11,
                  },
                  20: {
                    style: 11,
                  },
                  21: {
                    style: 11,
                  },
                  22: {
                    style: 11,
                  },
                  23: {
                    style: 11,
                  },
                  24: {
                    style: 11,
                  },
                  25: {
                    style: 11,
                  },
                },
                height: 25,
              },
              86: {
                cells: {
                  0: {
                    style: 28,
                  },
                  1: {
                    style: 11,
                  },
                  2: {
                    style: 11,
                  },
                  3: {
                    style: 11,
                  },
                  4: {
                    style: 11,
                  },
                  5: {
                    style: 11,
                  },
                  6: {
                    style: 11,
                  },
                  7: {
                    style: 11,
                  },
                  8: {
                    style: 11,
                  },
                  9: {
                    style: 11,
                  },
                  10: {
                    style: 11,
                  },
                  11: {
                    style: 11,
                  },
                  12: {
                    style: 11,
                  },
                  13: {
                    style: 11,
                  },
                  14: {
                    style: 11,
                  },
                  15: {
                    style: 11,
                  },
                  16: {
                    style: 11,
                  },
                  17: {
                    style: 11,
                  },
                  18: {
                    style: 11,
                  },
                  19: {
                    style: 11,
                  },
                  20: {
                    style: 11,
                  },
                  21: {
                    style: 11,
                  },
                  22: {
                    style: 11,
                  },
                  23: {
                    style: 11,
                  },
                  24: {
                    style: 11,
                  },
                  25: {
                    style: 11,
                  },
                },
                height: 35,
              },
              87: {
                cells: {
                  0: {
                    style: 28,
                  },
                  1: {
                    style: 11,
                  },
                  2: {
                    style: 11,
                  },
                  3: {
                    style: 11,
                  },
                  4: {
                    style: 11,
                  },
                  5: {
                    style: 11,
                  },
                  6: {
                    style: 11,
                  },
                  7: {
                    style: 11,
                  },
                  8: {
                    style: 11,
                  },
                  9: {
                    style: 11,
                  },
                  10: {
                    style: 11,
                  },
                  11: {
                    style: 11,
                  },
                  12: {
                    style: 11,
                  },
                  13: {
                    style: 11,
                  },
                  14: {
                    style: 11,
                  },
                  15: {
                    style: 11,
                  },
                  16: {
                    style: 11,
                  },
                  17: {
                    style: 11,
                  },
                  18: {
                    style: 11,
                  },
                  19: {
                    style: 11,
                  },
                  20: {
                    style: 11,
                  },
                  21: {
                    style: 11,
                  },
                  22: {
                    style: 11,
                  },
                  23: {
                    style: 11,
                  },
                  24: {
                    style: 11,
                  },
                  25: {
                    style: 11,
                  },
                },
                height: 35,
              },
              88: {
                cells: {
                  0: {
                    style: 28,
                  },
                  1: {
                    style: 11,
                  },
                  2: {
                    style: 11,
                  },
                  3: {
                    style: 11,
                  },
                  4: {
                    style: 11,
                  },
                  5: {
                    style: 11,
                  },
                  6: {
                    style: 11,
                  },
                  7: {
                    style: 11,
                  },
                  8: {
                    style: 11,
                  },
                  9: {
                    style: 11,
                  },
                  10: {
                    style: 11,
                  },
                  11: {
                    style: 11,
                  },
                  12: {
                    style: 11,
                  },
                  13: {
                    style: 11,
                  },
                  14: {
                    style: 11,
                  },
                  15: {
                    style: 11,
                  },
                  16: {
                    style: 11,
                  },
                  17: {
                    style: 11,
                  },
                  18: {
                    style: 11,
                  },
                  19: {
                    style: 11,
                  },
                  20: {
                    style: 11,
                  },
                  21: {
                    style: 11,
                  },
                  22: {
                    style: 11,
                  },
                  23: {
                    style: 11,
                  },
                  24: {
                    style: 11,
                  },
                  25: {
                    style: 11,
                  },
                },
              },
              89: {
                cells: {
                  0: {
                    style: 28,
                  },
                  1: {
                    style: 11,
                  },
                  2: {
                    style: 11,
                  },
                  3: {
                    style: 11,
                  },
                  4: {
                    style: 11,
                  },
                  5: {
                    style: 11,
                  },
                  6: {
                    style: 11,
                  },
                  7: {
                    style: 11,
                  },
                  8: {
                    style: 11,
                  },
                  9: {
                    style: 11,
                  },
                  10: {
                    style: 11,
                  },
                  11: {
                    style: 11,
                  },
                  12: {
                    style: 11,
                  },
                  13: {
                    style: 11,
                  },
                  14: {
                    style: 11,
                  },
                  15: {
                    style: 11,
                  },
                  16: {
                    style: 11,
                  },
                  17: {
                    style: 11,
                  },
                  18: {
                    style: 11,
                  },
                  19: {
                    style: 11,
                  },
                  20: {
                    style: 11,
                  },
                  21: {
                    style: 11,
                  },
                  22: {
                    style: 11,
                  },
                  23: {
                    style: 11,
                  },
                  24: {
                    style: 11,
                  },
                  25: {
                    style: 11,
                  },
                },
                height: 42,
              },
              90: {
                cells: {
                  0: {
                    style: 28,
                  },
                  1: {
                    style: 11,
                  },
                  2: {
                    style: 11,
                  },
                  3: {
                    style: 11,
                  },
                  4: {
                    style: 11,
                  },
                  5: {
                    style: 11,
                  },
                  6: {
                    style: 11,
                  },
                  7: {
                    style: 11,
                  },
                  8: {
                    style: 11,
                  },
                  9: {
                    style: 11,
                  },
                  10: {
                    style: 11,
                  },
                  11: {
                    style: 11,
                  },
                  12: {
                    style: 11,
                  },
                  13: {
                    style: 11,
                  },
                  14: {
                    style: 11,
                  },
                  15: {
                    style: 11,
                  },
                  16: {
                    style: 11,
                  },
                  17: {
                    style: 11,
                  },
                  18: {
                    style: 11,
                  },
                  19: {
                    style: 11,
                  },
                  20: {
                    style: 11,
                  },
                  21: {
                    style: 11,
                  },
                  22: {
                    style: 11,
                  },
                  23: {
                    style: 11,
                  },
                  24: {
                    style: 11,
                  },
                  25: {
                    style: 11,
                  },
                },
              },
              91: {
                cells: {
                  0: {
                    style: 28,
                  },
                  1: {
                    style: 11,
                  },
                  2: {
                    style: 11,
                  },
                  3: {
                    style: 11,
                  },
                  4: {
                    style: 11,
                  },
                  5: {
                    style: 11,
                  },
                  6: {
                    style: 11,
                  },
                  7: {
                    style: 11,
                  },
                  8: {
                    style: 11,
                  },
                  9: {
                    style: 11,
                  },
                  10: {
                    style: 11,
                  },
                  11: {
                    style: 11,
                  },
                  12: {
                    style: 11,
                  },
                  13: {
                    style: 11,
                  },
                  14: {
                    style: 11,
                  },
                  15: {
                    style: 11,
                  },
                  16: {
                    style: 11,
                  },
                  17: {
                    style: 11,
                  },
                  18: {
                    style: 11,
                  },
                  19: {
                    style: 11,
                  },
                  20: {
                    style: 11,
                  },
                  21: {
                    style: 11,
                  },
                  22: {
                    style: 11,
                  },
                  23: {
                    style: 11,
                  },
                  24: {
                    style: 11,
                  },
                  25: {
                    style: 11,
                  },
                },
                height: 33,
              },
              92: {
                cells: {
                  0: {
                    style: 28,
                  },
                  1: {
                    style: 11,
                  },
                  2: {
                    style: 11,
                  },
                  3: {
                    style: 11,
                  },
                  4: {
                    style: 11,
                  },
                  5: {
                    style: 11,
                  },
                  6: {
                    style: 11,
                  },
                  7: {
                    style: 11,
                  },
                  8: {
                    style: 11,
                  },
                  9: {
                    style: 11,
                  },
                  10: {
                    style: 11,
                  },
                  11: {
                    style: 11,
                  },
                  12: {
                    style: 11,
                  },
                  13: {
                    style: 11,
                  },
                  14: {
                    style: 11,
                  },
                  15: {
                    style: 11,
                  },
                  16: {
                    style: 11,
                  },
                  17: {
                    style: 11,
                  },
                  18: {
                    style: 11,
                  },
                  19: {
                    style: 11,
                  },
                  20: {
                    style: 11,
                  },
                  21: {
                    style: 11,
                  },
                  22: {
                    style: 11,
                  },
                  23: {
                    style: 11,
                  },
                  24: {
                    style: 11,
                  },
                  25: {
                    style: 11,
                  },
                },
              },
              93: {
                cells: {
                  0: {
                    style: 28,
                  },
                  1: {
                    style: 11,
                  },
                  2: {
                    style: 11,
                  },
                  3: {
                    style: 11,
                  },
                  4: {
                    style: 11,
                  },
                  5: {
                    style: 11,
                  },
                  6: {
                    style: 11,
                  },
                  7: {
                    style: 11,
                  },
                  8: {
                    style: 11,
                  },
                  9: {
                    style: 11,
                  },
                  10: {
                    style: 11,
                  },
                  11: {
                    style: 11,
                  },
                  12: {
                    style: 11,
                  },
                  13: {
                    style: 11,
                  },
                  14: {
                    style: 11,
                  },
                  15: {
                    style: 11,
                  },
                  16: {
                    style: 11,
                  },
                  17: {
                    style: 11,
                  },
                  18: {
                    style: 11,
                  },
                  19: {
                    style: 11,
                  },
                  20: {
                    style: 11,
                  },
                  21: {
                    style: 11,
                  },
                  22: {
                    style: 11,
                  },
                  23: {
                    style: 11,
                  },
                  24: {
                    style: 11,
                  },
                  25: {
                    style: 11,
                  },
                },
              },
              94: {
                cells: {
                  0: {
                    style: 28,
                  },
                  1: {
                    style: 11,
                  },
                  2: {
                    style: 11,
                  },
                  3: {
                    style: 11,
                  },
                  4: {
                    style: 11,
                  },
                  5: {
                    style: 11,
                  },
                  6: {
                    style: 11,
                  },
                  7: {
                    style: 11,
                  },
                  8: {
                    style: 11,
                  },
                  9: {
                    style: 11,
                  },
                  10: {
                    style: 11,
                  },
                  11: {
                    style: 11,
                  },
                  12: {
                    style: 11,
                  },
                  13: {
                    style: 11,
                  },
                  14: {
                    style: 11,
                  },
                  15: {
                    style: 11,
                  },
                  16: {
                    style: 11,
                  },
                  17: {
                    style: 11,
                  },
                  18: {
                    style: 11,
                  },
                  19: {
                    style: 11,
                  },
                  20: {
                    style: 11,
                  },
                  21: {
                    style: 11,
                  },
                  22: {
                    style: 11,
                  },
                  23: {
                    style: 11,
                  },
                  24: {
                    style: 11,
                  },
                  25: {
                    style: 11,
                  },
                },
              },
              95: {
                cells: {
                  0: {
                    style: 28,
                  },
                  1: {
                    style: 11,
                  },
                  2: {
                    style: 11,
                  },
                  3: {
                    style: 11,
                  },
                  4: {
                    style: 11,
                  },
                  5: {
                    style: 11,
                  },
                  6: {
                    style: 11,
                  },
                  7: {
                    style: 11,
                  },
                  8: {
                    style: 11,
                  },
                  9: {
                    style: 11,
                  },
                  10: {
                    style: 11,
                  },
                  11: {
                    style: 11,
                  },
                  12: {
                    style: 11,
                  },
                  13: {
                    style: 11,
                  },
                  14: {
                    style: 11,
                  },
                  15: {
                    style: 11,
                  },
                  16: {
                    style: 11,
                  },
                  17: {
                    style: 11,
                  },
                  18: {
                    style: 11,
                  },
                  19: {
                    style: 11,
                  },
                  20: {
                    style: 11,
                  },
                  21: {
                    style: 11,
                  },
                  22: {
                    style: 11,
                  },
                  23: {
                    style: 11,
                  },
                  24: {
                    style: 11,
                  },
                  25: {
                    style: 11,
                  },
                },
              },
              96: {
                cells: {
                  0: {
                    style: 28,
                  },
                  1: {
                    style: 11,
                  },
                  2: {
                    style: 11,
                  },
                  3: {
                    style: 11,
                  },
                  4: {
                    style: 11,
                  },
                  5: {
                    style: 11,
                  },
                  6: {
                    style: 11,
                  },
                  7: {
                    style: 11,
                  },
                  8: {
                    style: 11,
                  },
                  9: {
                    style: 11,
                  },
                  10: {
                    style: 11,
                  },
                  11: {
                    style: 11,
                  },
                  12: {
                    style: 11,
                  },
                  13: {
                    style: 11,
                  },
                  14: {
                    style: 11,
                  },
                  15: {
                    style: 11,
                  },
                  16: {
                    style: 11,
                  },
                  17: {
                    style: 11,
                  },
                  18: {
                    style: 11,
                  },
                  19: {
                    style: 11,
                  },
                  20: {
                    style: 11,
                  },
                  21: {
                    style: 11,
                  },
                  22: {
                    style: 11,
                  },
                  23: {
                    style: 11,
                  },
                  24: {
                    style: 11,
                  },
                  25: {
                    style: 11,
                  },
                },
              },
              97: {
                cells: {
                  0: {
                    style: 28,
                  },
                  1: {
                    style: 11,
                  },
                  2: {
                    style: 11,
                  },
                  3: {
                    style: 11,
                  },
                  4: {
                    style: 11,
                  },
                  5: {
                    style: 11,
                  },
                  6: {
                    style: 11,
                  },
                  7: {
                    style: 11,
                  },
                  8: {
                    style: 11,
                  },
                  9: {
                    style: 11,
                  },
                  10: {
                    style: 11,
                  },
                  11: {
                    style: 11,
                  },
                  12: {
                    style: 11,
                  },
                  13: {
                    style: 11,
                  },
                  14: {
                    style: 11,
                  },
                  15: {
                    style: 11,
                  },
                  16: {
                    style: 11,
                  },
                  17: {
                    style: 11,
                  },
                  18: {
                    style: 11,
                  },
                  19: {
                    style: 11,
                  },
                  20: {
                    style: 11,
                  },
                  21: {
                    style: 11,
                  },
                  22: {
                    style: 11,
                  },
                  23: {
                    style: 11,
                  },
                  24: {
                    style: 11,
                  },
                  25: {
                    style: 11,
                  },
                },
              },
              98: {
                cells: {
                  0: {
                    style: 28,
                  },
                  1: {
                    style: 12,
                  },
                  2: {
                    style: 12,
                  },
                  3: {
                    style: 12,
                  },
                  4: {
                    style: 12,
                  },
                  5: {
                    style: 12,
                  },
                  6: {
                    style: 12,
                  },
                  7: {
                    style: 12,
                  },
                  8: {
                    style: 12,
                  },
                  9: {
                    style: 12,
                  },
                  10: {
                    style: 12,
                  },
                  11: {
                    style: 12,
                  },
                  12: {
                    style: 12,
                  },
                  13: {
                    style: 12,
                  },
                  14: {
                    style: 12,
                  },
                  15: {
                    style: 12,
                  },
                  16: {
                    style: 12,
                  },
                  17: {
                    style: 12,
                  },
                  18: {
                    style: 12,
                  },
                  19: {
                    style: 12,
                  },
                  20: {
                    style: 12,
                  },
                  21: {
                    style: 12,
                  },
                  22: {
                    style: 12,
                  },
                  23: {
                    style: 12,
                  },
                  24: {
                    style: 12,
                  },
                  25: {
                    style: 12,
                  },
                },
              },
              99: {
                cells: {
                  0: {
                    style: 28,
                  },
                  1: {
                    style: 12,
                  },
                  2: {
                    style: 12,
                  },
                  3: {
                    style: 12,
                  },
                  4: {
                    style: 12,
                  },
                  5: {
                    style: 12,
                  },
                  6: {
                    style: 12,
                  },
                  7: {
                    style: 12,
                  },
                  8: {
                    style: 12,
                  },
                  9: {
                    style: 12,
                  },
                  10: {
                    style: 12,
                  },
                  11: {
                    style: 12,
                  },
                  12: {
                    style: 12,
                  },
                  13: {
                    style: 12,
                  },
                  14: {
                    style: 12,
                  },
                  15: {
                    style: 12,
                  },
                  16: {
                    style: 12,
                  },
                  17: {
                    style: 12,
                  },
                  18: {
                    style: 12,
                  },
                  19: {
                    style: 12,
                  },
                  20: {
                    style: 12,
                  },
                  21: {
                    style: 12,
                  },
                  22: {
                    style: 12,
                  },
                  23: {
                    style: 12,
                  },
                  24: {
                    style: 12,
                  },
                  25: {
                    style: 12,
                  },
                },
              },
              100: {
                cells: {
                  0: {
                    style: 7,
                  },
                  1: {
                    style: 12,
                  },
                  2: {
                    style: 12,
                  },
                  3: {
                    style: 12,
                  },
                  4: {
                    style: 12,
                  },
                  5: {
                    style: 12,
                  },
                  6: {
                    style: 12,
                  },
                  7: {
                    style: 12,
                  },
                  8: {
                    style: 12,
                  },
                  9: {
                    style: 12,
                  },
                  10: {
                    style: 12,
                  },
                  11: {
                    style: 12,
                  },
                  12: {
                    style: 12,
                  },
                  13: {
                    style: 12,
                  },
                  14: {
                    style: 12,
                  },
                  15: {
                    style: 12,
                  },
                  16: {
                    style: 12,
                  },
                  17: {
                    style: 12,
                  },
                  18: {
                    style: 12,
                  },
                  19: {
                    style: 12,
                  },
                  20: {
                    style: 12,
                  },
                  21: {
                    style: 12,
                  },
                  22: {
                    style: 12,
                  },
                  23: {
                    style: 12,
                  },
                  24: {
                    style: 12,
                  },
                  25: {
                    style: 12,
                  },
                },
              },
              101: {
                cells: {
                  0: {
                    style: 7,
                  },
                  1: {
                    style: 12,
                  },
                  2: {
                    style: 12,
                  },
                  3: {
                    style: 12,
                  },
                  4: {
                    style: 12,
                  },
                  5: {
                    style: 12,
                  },
                  6: {
                    style: 12,
                  },
                  7: {
                    style: 12,
                  },
                  8: {
                    style: 12,
                  },
                  9: {
                    style: 12,
                  },
                  10: {
                    style: 12,
                  },
                  11: {
                    style: 12,
                  },
                  12: {
                    style: 12,
                  },
                  13: {
                    style: 12,
                  },
                  14: {
                    style: 12,
                  },
                  15: {
                    style: 12,
                  },
                  16: {
                    style: 12,
                  },
                  17: {
                    style: 12,
                  },
                  18: {
                    style: 12,
                  },
                  19: {
                    style: 12,
                  },
                  20: {
                    style: 12,
                  },
                  21: {
                    style: 12,
                  },
                  22: {
                    style: 12,
                  },
                  23: {
                    style: 12,
                  },
                  24: {
                    style: 12,
                  },
                  25: {
                    style: 12,
                  },
                },
              },
              102: {
                cells: {
                  0: {
                    style: 12,
                  },
                  1: {
                    style: 12,
                  },
                  2: {
                    style: 12,
                  },
                  3: {
                    style: 12,
                  },
                  4: {
                    style: 12,
                  },
                  5: {
                    style: 12,
                  },
                  6: {
                    style: 12,
                  },
                  7: {
                    style: 12,
                  },
                  8: {
                    style: 12,
                  },
                  9: {
                    style: 12,
                  },
                  10: {
                    style: 12,
                  },
                  11: {
                    style: 12,
                  },
                  12: {
                    style: 12,
                  },
                  13: {
                    style: 12,
                  },
                  14: {
                    style: 12,
                  },
                  15: {
                    style: 12,
                  },
                  16: {
                    style: 12,
                  },
                  17: {
                    style: 12,
                  },
                  18: {
                    style: 12,
                  },
                  19: {
                    style: 12,
                  },
                  20: {
                    style: 12,
                  },
                  21: {
                    style: 12,
                  },
                  22: {
                    style: 12,
                  },
                  23: {
                    style: 12,
                  },
                  24: {
                    style: 12,
                  },
                  25: {
                    style: 12,
                  },
                },
              },
            },
            cols: {
              0: {
                width: 245,
              },
            },
            validations: [],
            autofilter: {},
            cellsSerialized: {
              0: {
                0: '=FIN("financialStatements")',
              },
            },
          },
          {
            name: "Cost of Capital",
            freeze: "A1",
            styles: [
              {
                format: "percent",
              },
              {},
              {},
              {
                format: "currency",
              },
              {
                format: "number",
              },
              {
                align: "center",
                underline: true,
                font: {
                  bold: true,
                },
              },
              {
                font: {
                  bold: true,
                },
              },
              {
                font: {
                  bold: true,
                },
                underline: true,
              },
              {
                font: {
                  bold: false,
                },
              },
              {
                font: {
                  bold: false,
                },
                underline: true,
              },
              {
                font: {
                  bold: false,
                },
                underline: false,
              },
              {
                font: {
                  bold: true,
                },
                underline: false,
              },
              {
                underline: true,
              },
              {
                border: {
                  right: ["thin", "#000"],
                  bottom: ["thin", "#000"],
                },
                format: "currency",
              },
              {
                border: {
                  bottom: ["thin", "#000"],
                },
                format: "currency",
              },
              {
                border: {
                  right: ["thin", "#000"],
                },
                format: "percent",
              },
              {
                border: {
                  right: ["thin", "#000"],
                  bottom: ["thin", "#000"],
                },
                font: {
                  bold: true,
                },
              },
              {
                border: {
                  right: ["thin", "#000"],
                },
                font: {
                  bold: true,
                },
              },
              {
                border: {
                  bottom: ["thin", "#000"],
                },
                font: {
                  bold: true,
                },
              },
              {
                bgcolor: "rgba(120, 73, 191, 0.4)",
                format: "percent",
              },
              {
                border: {
                  right: ["thin", "#000"],
                  bottom: ["thin", "#000"],
                },
                format: "percent",
              },
              {
                border: {
                  bottom: ["thin", "#000"],
                },
                format: "percent",
              },
              {
                format: "million",
              },
              {
                format: "million-currency",
              },
              {
                border: {
                  right: ["thin", "#000"],
                  bottom: ["thin", "#000"],
                },
                format: "million-currency",
              },
              {
                border: {
                  bottom: ["thin", "#000"],
                },
                format: "million-currency",
              },
            ],
            merges: ["A1:B1"],
            rows: {
              0: {
                cells: {
                  0: {
                    merge: [0, 1],
                    style: 5,
                  },
                },
              },
              1: {
                cells: {
                  0: {
                    style: 7,
                  },
                },
              },
              2: {
                cells: {
                  1: {
                    style: 4,
                  },
                },
              },
              3: {
                cells: {
                  1: {
                    style: 3,
                  },
                },
              },
              4: {
                cells: {
                  1: {
                    style: 4,
                    comment:
                      "Is a measure of the market risk of the company relative to it's peers in the same industry without the impact of debt. This determines how much risk comes with owning a stock.",
                  },
                },
              },
              5: {
                cells: {
                  1: {
                    style: 0,
                    comment:
                      "Refers to the theoretical rate of return of an investment with zero risk.",
                  },
                },
              },
              6: {
                cells: {
                  1: {
                    style: 0,
                  },
                },
              },
              8: {
                cells: {
                  0: {
                    style: 7,
                  },
                },
              },
              9: {
                cells: {
                  1: {
                    style: 3,
                  },
                  2: {
                    style: 7,
                  },
                },
              },
              10: {
                cells: {
                  1: {
                    style: 3,
                  },
                  3: {
                    style: 3,
                  },
                },
              },
              11: {
                cells: {
                  1: {
                    style: 4,
                  },
                  3: {
                    style: 3,
                  },
                },
              },
              12: {
                cells: {
                  3: {
                    style: 3,
                  },
                },
              },
              13: {
                cells: {
                  1: {
                    style: 0,
                    comment:
                      "By default this is the synthetic credit rating pre-tax cost of debt that we have automatically calculated for you which is fine for most cases. If you manually input a cost of debt in the Normal Debt input field then it will overwrite this synthetic cost of debt.",
                  },
                  3: {
                    style: 4,
                    comment:
                      "Is a measure of market risk of the company relative to it's peers in the same industry including the impact of debt on the company. This determines how much risk comes with owning a stock.",
                  },
                },
              },
              14: {
                cells: {
                  1: {
                    style: 0,
                  },
                  2: {
                    style: 13,
                  },
                  3: {
                    style: 16,
                  },
                  4: {
                    style: 16,
                  },
                  5: {
                    style: 16,
                  },
                  6: {
                    style: 18,
                  },
                },
              },
              15: {
                cells: {
                  2: {
                    style: 16,
                  },
                  3: {
                    style: 13,
                  },
                  4: {
                    style: 13,
                  },
                  5: {
                    style: 13,
                  },
                  6: {
                    style: 14,
                  },
                },
              },
              16: {
                cells: {
                  0: {
                    style: 7,
                  },
                  2: {
                    style: 16,
                  },
                  3: {
                    style: 20,
                  },
                  4: {
                    style: 20,
                  },
                  5: {
                    style: 20,
                  },
                  6: {
                    style: 21,
                  },
                },
              },
              17: {
                cells: {
                  1: {
                    style: 3,
                  },
                  2: {
                    style: 17,
                  },
                  3: {
                    style: 15,
                  },
                  4: {
                    style: 15,
                  },
                  5: {
                    style: 15,
                  },
                  6: {
                    style: 19,
                    comment:
                      "The total cost of raising capital (cash) for the company, weighted by equity and debt.",
                  },
                },
              },
              25: {
                cells: {
                  0: {
                    style: 7,
                  },
                },
              },
            },
            cols: {
              0: {
                width: 280,
              },
              1: {
                width: 150,
              },
              2: {
                width: 281,
              },
            },
            validations: [],
            autofilter: {},
            cellsSerialized: {
              0: {
                0: "Estimated Cost of Capital",
              },
              1: {
                0: "Equity",
              },
              2: {
                0: "Number of Shares Outstanding",
                1: "='API Millions Data'!$B$6",
              },
              3: {
                0: "Market Price per Share",
                1: '=FIN("price")',
              },
              4: {
                0: "Unlevered Beta",
                1: '=FIN("unleveredBeta")',
              },
              5: {
                0: "Riskfree Rate",
                1: '=FIN("riskFreeRate")',
              },
              6: {
                0: "Equity Risk Premium",
                1: '=FIN("equityRiskPremium")',
              },
              8: {
                0: "Normal Debt",
              },
              9: {
                0: "Book Value",
                1: "='API Millions Data'!$B$4",
                2: "Output",
              },
              10: {
                0: "Interest Expense",
                1: "=ABS('API Millions Data'!$B$9)",
                2: "Estimated Market Value of Normal Debt",
                3: "=B11*(1-(1+B14)^(-B12))/B14+B10/(1+B14)^B12",
              },
              11: {
                0: "Average Maturity",
                1: "='Optional Inputs'!$B$3",
                2: "Estimated Value of Normal Debt in Convertible",
                3: "='Optional Inputs'!$D$3*(1-(1+B14)^(-'Optional Inputs'!$D$4))/B14+'Optional Inputs'!$D$2/(1+B14)^'Optional Inputs'!$D$4",
              },
              12: {
                0: "Method of Calculating Pre-tax Cost of Debt",
                1: '=IF(\'Optional Inputs\'!$B$2="", "Synthetic Credit Rating", "Manual Input")',
                2: "Estimated Value of Equity in Convertible",
                3: "='Optional Inputs'!$D$5-D12",
              },
              13: {
                0: '="Pre-tax Cost of Debt"&" ("&B13&")"',
                1: "=IF('Optional Inputs'!$B$2=\"\", FIN(\"estimatedCostOfDebt\"), 'Optional Inputs'!$B$2)",
                2: "Levered Beta for Equity",
                3: "=B5*(1+(1-B15)*(E16/D16))",
              },
              14: {
                0: "Marginal Tax Rate",
                1: '=FIN("marginalTaxRate")',
                3: "Equity",
                4: "Debt",
                5: "Preferred Stock",
                6: "Capital",
              },
              15: {
                2: "Market Value",
                3: "=B3*B4+D13",
                4: "=D11+D12+B18",
                5: "='Optional Inputs'!$F$2*'Optional Inputs'!$F$3",
                6: "=SUM(D16:F16)",
              },
              16: {
                0: "Operating Leases",
                2: "Weight in Cost of Capital",
                3: "=D16/G16",
                4: "=E16/G16",
                5: "=F16/G16",
                6: "=SUM(D17:F17)",
              },
              17: {
                0: "Operating Leases Value",
                1: "='API Millions Data'!$B$10",
                2: "Cost of Component",
                3: "=B6+D14*B7",
                4: "=B14*(1-B15)",
                5: "=IF(ISERROR('Optional Inputs'!$F$4/'Optional Inputs'!$F$3), 0, 'Optional Inputs'!$F$4/'Optional Inputs'!$F$3)",
                6: "=D17*D18+E17*E18+F17*F18",
              },
            },
          },
          {
            name: "Employee Options",
            freeze: "A1",
            styles: [
              {
                format: "percent",
              },
              {},
              {},
              {
                format: "currency",
              },
              {
                format: "number",
              },
              {
                align: "center",
                underline: true,
                font: {
                  bold: true,
                },
              },
              {
                format: "million",
              },
              {
                format: "million-currency",
              },
            ],
            merges: ["A1:B1"],
            rows: {
              0: {
                cells: {
                  0: {
                    merge: [0, 1],
                    style: 5,
                    comment:
                      "Calculated from the inputs you entered in the Employee Options section. We use the Black Scholes methodology to work out the estimated market price per employee option. We then minus this from the 'Equity' cell in the Valuation Output (cell B34).",
                  },
                },
              },
              1: {
                cells: {
                  1: {
                    style: 4,
                  },
                },
              },
              2: {
                cells: {
                  1: {
                    style: 3,
                  },
                },
              },
              3: {
                cells: {
                  1: {
                    style: 4,
                  },
                },
              },
              4: {
                cells: {
                  1: {
                    style: 0,
                  },
                },
              },
              5: {
                cells: {
                  1: {
                    style: 0,
                  },
                },
              },
              6: {
                cells: {
                  1: {
                    style: 4,
                  },
                },
              },
              7: {
                cells: {
                  1: {
                    style: 3,
                  },
                },
              },
              9: {
                cells: {
                  1: {
                    style: 4,
                  },
                },
              },
              10: {
                cells: {
                  1: {
                    style: 4,
                  },
                },
              },
              12: {
                cells: {
                  1: {
                    style: 4,
                  },
                },
              },
              13: {
                cells: {
                  1: {
                    style: 4,
                  },
                },
              },
              15: {
                cells: {
                  1: {
                    style: 3,
                  },
                },
              },
              16: {
                cells: {
                  1: {
                    style: 3,
                  },
                },
              },
            },
            cols: {
              0: {
                width: 260,
              },
              1: {
                width: 165,
              },
            },
            validations: [],
            autofilter: {},
            cellsSerialized: {
              0: {
                0: "Black Scholes Employee Options Results",
              },
              1: {
                0: "Employee Options Outstanding",
                1: "='Optional Inputs'!$H$2",
              },
              2: {
                0: "Average Strike Price",
                1: "='Optional Inputs'!$H$3",
              },
              3: {
                0: "Average Maturity",
                1: "='Optional Inputs'!$H$4",
              },
              4: {
                0: "Standard deviation in stock price (volatility)",
                1: '=FIN("standardDeviationInStockPrices")',
              },
              5: {
                0: "Risk free rate",
                1: '=FIN("riskFreeRate")',
              },
              6: {
                0: "Shares outstanding",
                1: "='API Millions Data'!$B$6",
              },
              7: {
                0: "Share price",
                1: '=FIN("price")',
              },
              9: {
                0: "d1",
                1: "=IFERROR((LN(B8 / B3) + (B6 + (B5 * B5) / 2) * B4) / (B5 * SQRT(B4)), 0)",
              },
              10: {
                0: "N (d1)",
                1: "=NORMDIST(B10, 0, 1, TRUE)",
              },
              12: {
                0: "d2",
                1: "=B10 - B5 * SQRT(B4)",
              },
              13: {
                0: "N (d2)",
                1: "=NORMDIST(B13, 0, 1, TRUE)",
              },
              15: {
                0: "Value per option",
                1: "=B8 * B11 - B3 * EXP(-B6 * B4) * B14",
              },
              16: {
                0: "Value of all options",
                1: "=B16*B2",
              },
            },
          },
          {
            name: "Synthetic Credit Rating",
            freeze: "A1",
            styles: [
              {
                font: {
                  bold: true,
                },
              },
              {
                font: {
                  bold: true,
                },
                align: "center",
              },
              {
                font: {
                  bold: true,
                },
                align: "center",
                underline: true,
              },
              {
                font: {
                  bold: true,
                },
                underline: true,
              },
              {
                font: {
                  bold: true,
                },
                underline: false,
              },
              {
                font: {
                  bold: true,
                },
                underline: false,
                align: "center",
              },
              {
                align: "center",
              },
              {
                font: {
                  bold: true,
                },
                underline: false,
                align: "left",
              },
              {
                font: {
                  bold: false,
                },
                underline: false,
                align: "left",
              },
              {
                font: {
                  bold: false,
                },
                underline: false,
                align: "center",
              },
              {
                font: {
                  bold: false,
                },
                align: "center",
              },
              {
                font: {
                  bold: false,
                },
                align: "left",
              },
              {
                align: "center",
                font: {
                  size: 14,
                },
              },
              {
                align: "center",
                font: {
                  size: 12,
                },
              },
              {
                font: {
                  bold: true,
                  size: 14,
                },
                align: "center",
              },
              {
                font: {
                  bold: true,
                  size: 14,
                },
                align: "center",
                underline: true,
              },
              {
                font: {
                  bold: true,
                  size: 12,
                },
                align: "center",
              },
              {
                align: "center",
                font: {
                  size: 10,
                },
              },
              {
                align: "center",
                font: {
                  size: 10,
                  bold: true,
                },
              },
              {
                font: {
                  bold: false,
                },
              },
              {
                font: {
                  bold: false,
                },
                align: "left",
                format: "currency",
              },
              {
                format: "currency",
              },
              {
                format: "percent",
              },
              {
                format: "number",
              },
              {
                font: {
                  bold: false,
                },
                align: "left",
                format: "million-currency",
              },
              {
                format: "million-currency",
              },
            ],
            merges: ["A1:B1", "A10:B10", "C10:D10"],
            rows: {
              0: {
                cells: {
                  0: {
                    merge: [0, 1],
                    style: 15,
                  },
                  1: {
                    style: 15,
                  },
                },
              },
              1: {
                cells: {
                  0: {
                    style: 8,
                  },
                  1: {
                    style: 8,
                    comment:
                      "Large companies usually have stable earnings and less chance of defaulting on their debt. Smaller companies are usually risker, therefore they have higher costs of debts.",
                  },
                  2: {
                    style: 11,
                  },
                  3: {
                    style: 20,
                  },
                  6: {
                    style: 0,
                  },
                },
              },
              2: {
                cells: {
                  1: {
                    comment:
                      "How many times over a company can satisfy it's interest expenses with just it's operating income. A good interest coverage is usually above 5. Companies with volatile operating income can produce misleading interest coverages as they differ each year.",
                    style: 23,
                  },
                  3: {
                    style: 21,
                  },
                },
              },
              3: {
                cells: {
                  1: {
                    comment:
                      "The estimated bond rating that we have worked out based on the companies interest coverage. It is similar to Moody's, S&P and Fitch's ratings. We use our own synthetic credit rating because a lot of companies do not have any rating assigned by these agencies.",
                  },
                  3: {
                    style: 21,
                  },
                },
              },
              4: {
                cells: {
                  1: {
                    comment:
                      "The chance of a company defaulting on it's debts within a year.",
                    style: 22,
                  },
                },
              },
              5: {
                cells: {
                  1: {
                    comment:
                      "The chance of a country defaulting on it's debts within a year.",
                    style: 22,
                  },
                },
              },
              6: {
                cells: {
                  0: {
                    style: 19,
                  },
                  1: {
                    comment:
                      "The Synthetic Credit Rating pre-tax cost of debt that we have automatically calculated for you. This is used to work out the cost of capital.",
                    style: 22,
                  },
                },
              },
              9: {
                cells: {
                  0: {
                    merge: [0, 1],
                    style: 16,
                  },
                  1: {
                    style: 16,
                  },
                  2: {
                    merge: [0, 1],
                    style: 16,
                  },
                  3: {
                    style: 16,
                  },
                },
              },
              10: {
                cells: {
                  0: {
                    style: 18,
                  },
                  1: {
                    style: 18,
                  },
                  2: {
                    style: 18,
                  },
                  3: {
                    style: 18,
                  },
                  4: {
                    style: 18,
                  },
                  5: {
                    style: 18,
                  },
                },
              },
              11: {
                cells: {
                  1: {
                    style: 23,
                  },
                  3: {
                    style: 23,
                  },
                  5: {
                    style: 22,
                  },
                },
              },
              12: {
                cells: {
                  0: {
                    style: 23,
                  },
                  1: {
                    style: 23,
                  },
                  2: {
                    style: 23,
                  },
                  3: {
                    style: 23,
                  },
                  5: {
                    style: 22,
                  },
                },
              },
              13: {
                cells: {
                  0: {
                    style: 23,
                  },
                  1: {
                    style: 23,
                  },
                  2: {
                    style: 23,
                  },
                  3: {
                    style: 23,
                  },
                  5: {
                    style: 22,
                  },
                },
              },
              14: {
                cells: {
                  0: {
                    style: 23,
                  },
                  1: {
                    style: 23,
                  },
                  2: {
                    style: 23,
                  },
                  3: {
                    style: 23,
                  },
                  5: {
                    style: 22,
                  },
                },
              },
              15: {
                cells: {
                  0: {
                    style: 23,
                  },
                  1: {
                    style: 23,
                  },
                  2: {
                    style: 23,
                  },
                  3: {
                    style: 23,
                  },
                  5: {
                    style: 22,
                  },
                },
              },
              16: {
                cells: {
                  0: {
                    style: 23,
                  },
                  1: {
                    style: 23,
                  },
                  2: {
                    style: 23,
                  },
                  3: {
                    style: 23,
                  },
                  5: {
                    style: 22,
                  },
                },
              },
              17: {
                cells: {
                  0: {
                    style: 23,
                  },
                  1: {
                    style: 23,
                  },
                  2: {
                    style: 23,
                  },
                  3: {
                    style: 23,
                  },
                  5: {
                    style: 22,
                  },
                },
              },
              18: {
                cells: {
                  0: {
                    style: 23,
                  },
                  1: {
                    style: 23,
                  },
                  2: {
                    style: 23,
                  },
                  3: {
                    style: 23,
                  },
                  5: {
                    style: 22,
                  },
                },
              },
              19: {
                cells: {
                  0: {
                    style: 23,
                  },
                  1: {
                    style: 23,
                  },
                  2: {
                    style: 23,
                  },
                  3: {
                    style: 23,
                  },
                  5: {
                    style: 22,
                  },
                },
              },
              20: {
                cells: {
                  0: {
                    style: 23,
                  },
                  1: {
                    style: 23,
                  },
                  2: {
                    style: 23,
                  },
                  3: {
                    style: 23,
                  },
                  5: {
                    style: 22,
                  },
                },
              },
              21: {
                cells: {
                  0: {
                    style: 23,
                  },
                  1: {
                    style: 23,
                  },
                  2: {
                    style: 23,
                  },
                  3: {
                    style: 23,
                  },
                  5: {
                    style: 22,
                  },
                },
              },
              22: {
                cells: {
                  0: {
                    style: 23,
                  },
                  1: {
                    style: 23,
                  },
                  2: {
                    style: 23,
                  },
                  3: {
                    style: 23,
                  },
                  5: {
                    style: 22,
                  },
                },
              },
              23: {
                cells: {
                  0: {
                    style: 23,
                  },
                  1: {
                    style: 23,
                  },
                  2: {
                    style: 23,
                  },
                  3: {
                    style: 23,
                  },
                  5: {
                    style: 22,
                  },
                },
              },
              24: {
                cells: {
                  0: {
                    style: 23,
                  },
                  1: {
                    style: 23,
                  },
                  2: {
                    style: 23,
                  },
                  3: {
                    style: 23,
                  },
                  5: {
                    style: 22,
                  },
                },
              },
              25: {
                cells: {
                  0: {
                    style: 23,
                  },
                  2: {
                    style: 23,
                  },
                  5: {
                    style: 22,
                  },
                },
              },
            },
            cols: {
              0: {
                width: 283,
              },
              1: {
                width: 273,
              },
              2: {
                width: 252,
              },
              3: {
                width: 238,
              },
            },
            validations: [],
            autofilter: {},
            cellsSerialized: {
              0: {
                0: "Synthetic Credit Rating",
              },
              1: {
                0: "Company Size",
                1: "Large",
                2: "Operating Income",
                3: "='API Millions Data'!$B$2",
              },
              2: {
                0: "Interest Coverage",
                1: "=IF(D3=0,100,IF(D2<0,0,D2/D3))",
                2: "Interest Expense",
                3: "=ABS('API Millions Data'!$B$9)",
              },
              3: {
                0: "Estimated Bond Rating",
                1: '=IF(B2="Large",VLOOKUP(B3,A12:F26,5),IF(B2="Small", VLOOKUP(B3,C12:F26,3), 0))',
                2: "Market Capitalization",
                3: "='API Millions Data'!$B$11",
              },
              4: {
                0: "Estimated Company Default Spread",
                1: '=IF(B2="Large",VLOOKUP(B3,A12:F26,6),IF(B2="Small", VLOOKUP(B3,C12:F26,4), 0))',
              },
              5: {
                0: "Estimated Country Default Spread",
                1: '=FIN("adjDefaultSpread")',
              },
              6: {
                0: "Estimated Pre-tax Cost of Debt",
                1: '=FIN("riskFreeRate")+B5+B6',
              },
              9: {
                0: "Large Companies (< $5,000m Market Cap)",
                2: "Smaller & Riskier Companies (< $5,000m Market Cap)",
              },
              10: {
                0: "Interest Coverage From",
                1: "Interest Coverage To",
                2: "Interest Coverage From",
                3: "Interest Coverage To",
                4: "Rating",
                5: "Spread",
              },
              11: {
                0: "0",
                1: "0.2",
                2: "0",
                3: "0.5",
                4: "D2/D",
                5: "17.44%\r",
              },
              12: {
                0: "0.2",
                1: "0.65",
                2: "0.5",
                3: "0.8",
                4: "C2/C",
                5: "13.09%\r",
              },
              13: {
                0: "0.65",
                1: "0.8",
                2: "0.8",
                3: "1.25",
                4: "Ca2/CC",
                5: "9.97%\r",
              },
              14: {
                0: "0.8",
                1: "1.25",
                2: "1.25",
                3: "1.5",
                4: "Caa/CCC",
                5: "9.46%\r",
              },
              15: {
                0: "1.25",
                1: "1.5",
                2: "1.5",
                3: "2",
                4: "B3/B-",
                5: "5.94%\r",
              },
              16: {
                0: "1.5",
                1: "1.75",
                2: "2",
                3: "2.5",
                4: "B2/B",
                5: "4.86%\r",
              },
              17: {
                0: "1.75",
                1: "2",
                2: "2.5",
                3: "3",
                4: "B1/B+",
                5: "4.05%\r",
              },
              18: {
                0: "2",
                1: "2.25",
                2: "3",
                3: "3.5",
                4: "Ba2/BB",
                5: "2.77%\r",
              },
              19: {
                0: "2.25",
                1: "2.5",
                2: "3.5",
                3: "4",
                4: "Ba1/BB+",
                5: "2.31%\r",
              },
              20: {
                0: "2.5",
                1: "3",
                2: "4",
                3: "4.5",
                4: "Baa2/BBB",
                5: "1.71%\r",
              },
              21: {
                0: "3",
                1: "4.25",
                2: "4.5",
                3: "6",
                4: "A3/A-",
                5: "1.33%\r",
              },
              22: {
                0: "4.25",
                1: "5.5",
                2: "6",
                3: "7.5",
                4: "A2/A",
                5: "1.18%\r",
              },
              23: {
                0: "5.5",
                1: "6.5",
                2: "7.5",
                3: "9.5",
                4: "A1/A+",
                5: "1.07%\r",
              },
              24: {
                0: "6.5",
                1: "8.5",
                2: "9.5",
                3: "12.5",
                4: "Aa2/AA",
                5: "0.85%\r",
              },
              25: {
                0: "8.5",
                1: "100",
                2: "12.5",
                3: "100",
                4: "Aaa/AAA",
                5: "0.69%\r",
              },
            },
          },
          {
            name: "Industry Averages (US)",
            freeze: "B2",
            styles: [],
            merges: [],
            rows: {},
            cols: {
              0: {
                width: 263,
              },
            },
            validations: [],
            autofilter: {},
            cellsSerialized: {
              0: {
                0: "Industry Name",
                1: "Number of firms",
                2: "Annual Average Revenue growth - Last 5 years",
                3: "Pre-tax Operating Margin (Unadjusted)",
                4: "After-tax ROC",
                5: "Average effective tax rate",
                6: "Unlevered Beta",
                7: "Equity (Levered) Beta",
                8: "Cost of equity",
                9: "Std deviation in stock prices",
                10: "Pre-tax cost of debt",
                11: "Market Debt/Capital",
                12: "Cost of capital",
                13: "Sales/Capital",
                14: "EV/Sales",
                15: "EV/EBITDA",
                16: "EV/EBIT",
                17: "Price/Book",
                18: "Trailing PE",
                19: "Non-cash WC as % of Revenues",
                20: "Cap Ex as % of Revenues",
                21: "Net Cap Ex as % of Revenues",
                22: "Reinvestment Rate",
                23: "ROE",
                24: "Dividend Payout Ratio",
                25: "Equity Reinvestment Rate",
                26: "Pre-tax Operating Margin (Lease & R&D adjusted)\r",
              },
              1: {
                0: "Advertising",
                1: "61",
                2: "8.31%",
                3: "9.98%",
                4: "51.51%",
                5: "21.47%",
                6: "0.77",
                7: "1.08",
                8: "6.01%",
                9: "57.74%",
                10: "3.00%",
                11: "43.66%",
                12: "4.34%",
                13: "5.17",
                14: "1.83",
                15: "8.86",
                16: "16.08",
                17: "5.73",
                18: "45.38",
                19: "-0.57%",
                20: "1.75%",
                21: "-1.91%",
                22: "-31.67%",
                23: "2.93%",
                24: "912.85%",
                25: "912.85%",
                26: "10.31%\r",
              },
              2: {
                0: "Aerospace/Defense",
                1: "72",
                2: "5.28%",
                3: "7.56%",
                4: "19.11%",
                5: "24.62%",
                6: "0.91",
                7: "1.07",
                8: "5.96%",
                9: "34.89%",
                10: "2.58%",
                11: "24.84%",
                12: "4.95%",
                13: "2.61",
                14: "2.01",
                15: "12.15",
                16: "20.31",
                17: "4.44",
                18: "107.38",
                19: "43.56%",
                20: "2.77%",
                21: "-1.33%",
                22: "36.93%",
                23: "8.54%",
                24: "120.55%",
                25: "120.55%",
                26: "7.89%\r",
              },
              3: {
                0: "Air Transport",
                1: "17",
                2: "-6.82%",
                3: "-18.99%",
                4: "-16.07%",
                5: "88.76%",
                6: "0.92",
                7: "1.61",
                8: "8.52%",
                9: "46.15%",
                10: "3.00%",
                11: "61.74%",
                12: "4.61%",
                13: "0.88",
                14: "1.97",
                15: "34.43",
                16: "NA",
                17: "3.22",
                18: "13.47",
                19: "1.70%",
                20: "11.83%",
                21: "1.80%",
                22: "NA",
                23: "-47.03%",
                24: "0.09%",
                25: "0.09%",
                26: "-19.35%\r",
              },
              4: {
                0: "Apparel",
                1: "51",
                2: "-3.56%",
                3: "5.49%",
                4: "7.54%",
                5: "31.41%",
                6: "0.94",
                7: "1.10",
                8: "6.11%",
                9: "47.84%",
                10: "3.00%",
                11: "28.26%",
                12: "5.00%",
                13: "1.34",
                14: "2.03",
                15: "14.69",
                16: "33.98",
                17: "4.11",
                18: "22.76",
                19: "24.96%",
                20: "2.52%",
                21: "0.16%",
                22: "-146.72%",
                23: "-8.19%",
                24: "0.32%",
                25: "0.32%",
                26: "5.91%\r",
              },
              5: {
                0: "Auto & Truck",
                1: "19",
                2: "12.19%",
                3: "1.93%",
                4: "1.17%",
                5: "28.48%",
                6: "1.05",
                7: "1.28",
                8: "6.98%",
                9: "45.24%",
                10: "3.00%",
                11: "27.88%",
                12: "5.65%",
                13: "0.74",
                14: "3.58",
                15: "45.73",
                16: "177.76",
                17: "7.58",
                18: "261.56",
                19: "-6.94%",
                20: "10.24%",
                21: "4.61%",
                22: "184.40%",
                23: "4.49%",
                24: "64.58%",
                25: "64.58%",
                26: "1.73%\r",
              },
              6: {
                0: "Auto Parts",
                1: "52",
                2: "4.02%",
                3: "4.01%",
                4: "6.46%",
                5: "32.65%",
                6: "1.09",
                7: "1.20",
                8: "6.61%",
                9: "43.16%",
                10: "3.00%",
                11: "19.60%",
                12: "5.74%",
                13: "1.82",
                14: "1.60",
                15: "10.07",
                16: "23.28",
                17: "4.78",
                18: "55.56",
                19: "13.84%",
                20: "3.71%",
                21: "2.09%",
                22: "30.07%",
                23: "-14.31%",
                24: "0.42%",
                25: "0.42%",
                26: "3.85%\r",
              },
              7: {
                0: "Bank (Money Center)",
                1: "7",
                2: "-0.78%",
                3: "0.00%",
                4: "-0.01%",
                5: "14.04%",
                6: "0.60",
                7: "0.83",
                8: "4.84%",
                9: "21.59%",
                10: "1.92%",
                11: "68.37%",
                12: "2.49%",
                13: "0.14",
                14: "5.32",
                15: "NA",
                16: "NA",
                17: "1.00",
                18: "14.86",
                19: "NA",
                20: "1.06%",
                21: "1.06%",
                22: "NA",
                23: "7.41%",
                24: "46.95%",
                25: "46.95%",
                26: "-0.11%\r",
              },
              8: {
                0: "Banks (Regional)",
                1: "598",
                2: "8.82%",
                3: "0.00%",
                4: "-0.08%",
                5: "18.95%",
                6: "0.60",
                7: "0.64",
                8: "3.97%",
                9: "19.48%",
                10: "1.92%",
                11: "37.98%",
                12: "3.00%",
                13: "0.24",
                14: "4.47",
                15: "NA",
                16: "NA",
                17: "1.08",
                18: "15.39",
                19: "NA",
                20: "4.37%",
                21: "2.01%",
                22: "NA",
                23: "8.22%",
                24: "44.35%",
                25: "44.35%",
                26: "-0.41%\r",
              },
              9: {
                0: "Beverage (Alcoholic)",
                1: "23",
                2: "14.39%",
                3: "23.87%",
                4: "14.43%",
                5: "18.36%",
                6: "0.68",
                7: "0.78",
                8: "4.60%",
                9: "37.01%",
                10: "2.58%",
                11: "18.97%",
                12: "4.09%",
                13: "0.64",
                14: "5.30",
                15: "17.61",
                16: "22.21",
                17: "3.45",
                18: "32.39",
                19: "15.25%",
                20: "6.38%",
                21: "4.49%",
                22: "24.11%",
                23: "10.10%",
                24: "41.58%",
                25: "41.58%",
                26: "23.84%\r",
              },
              10: {
                0: "Beverage (Soft)",
                1: "41",
                2: "27.08%",
                3: "19.98%",
                4: "26.74%",
                5: "18.60%",
                6: "0.71",
                7: "0.79",
                8: "4.66%",
                9: "49.70%",
                10: "3.00%",
                11: "17.76%",
                12: "4.22%",
                13: "1.37",
                14: "5.08",
                15: "20.74",
                16: "25.22",
                17: "8.50",
                18: "116.72",
                19: "-9.54%",
                20: "5.42%",
                21: "7.41%",
                22: "37.01%",
                23: "28.86%",
                24: "74.19%",
                25: "74.19%",
                26: "20.11%\r",
              },
              11: {
                0: "Broadcasting",
                1: "29",
                2: "5.80%",
                3: "19.30%",
                4: "16.92%",
                5: "23.16%",
                6: "0.65",
                7: "1.13",
                8: "6.26%",
                9: "45.56%",
                10: "3.00%",
                11: "54.90%",
                12: "4.02%",
                13: "0.98",
                14: "2.08",
                15: "7.84",
                16: "10.93",
                17: "1.58",
                18: "12.42",
                19: "15.71%",
                20: "2.74%",
                21: "-1.05%",
                22: "111.06%",
                23: "0.24%",
                24: "0.17%",
                25: "0.17%",
                26: "19.03%\r",
              },
              12: {
                0: "Brokerage & Investment Banking",
                1: "39",
                2: "9.51%",
                3: "0.42%",
                4: "0.00%",
                5: "22.18%",
                6: "0.58",
                7: "1.13",
                8: "6.27%",
                9: "35.90%",
                10: "2.58%",
                11: "68.64%",
                12: "3.26%",
                13: "0.22",
                14: "4.93",
                15: "NA",
                16: "NA",
                17: "1.52",
                18: "82.20",
                19: "NA",
                20: "5.24%",
                21: "2.74%",
                22: "NA",
                23: "12.08%",
                24: "20.84%",
                25: "20.84%",
                26: "-0.01%\r",
              },
              13: {
                0: "Building Materials",
                1: "42",
                2: "7.47%",
                3: "10.80%",
                4: "24.17%",
                5: "26.26%",
                6: "0.97",
                7: "1.09",
                8: "6.07%",
                9: "33.99%",
                10: "2.58%",
                11: "20.82%",
                12: "5.20%",
                13: "2.59",
                14: "2.00",
                15: "13.27",
                16: "18.17",
                17: "4.98",
                18: "25.63",
                19: "15.45%",
                20: "2.44%",
                21: "0.45%",
                22: "-2.46%",
                23: "20.54%",
                24: "21.49%",
                25: "21.49%",
                26: "10.98%\r",
              },
              14: {
                0: "Business & Consumer Services",
                1: "169",
                2: "7.53%",
                3: "8.88%",
                4: "18.33%",
                5: "23.84%",
                6: "0.83",
                7: "0.93",
                8: "5.30%",
                9: "45.65%",
                10: "3.00%",
                11: "19.82%",
                12: "4.69%",
                13: "2.16",
                14: "2.97",
                15: "17.40",
                16: "31.21",
                17: "5.85",
                18: "44.22",
                19: "13.84%",
                20: "3.14%",
                21: "0.34%",
                22: "-11.51%",
                23: "6.81%",
                24: "65.87%",
                25: "65.87%",
                26: "9.18%\r",
              },
              15: {
                0: "Cable TV",
                1: "13",
                2: "6.70%",
                3: "18.15%",
                4: "11.09%",
                5: "22.33%",
                6: "0.70",
                7: "0.94",
                8: "5.38%",
                9: "32.02%",
                10: "2.58%",
                11: "34.19%",
                12: "4.18%",
                13: "0.76",
                14: "3.85",
                15: "11.11",
                16: "20.20",
                17: "3.13",
                18: "63.68",
                19: "-1.35%",
                20: "10.94%",
                21: "-1.74%",
                22: "-15.01%",
                23: "11.47%",
                24: "26.20%",
                25: "26.20%",
                26: "18.07%\r",
              },
              16: {
                0: "Chemical (Basic)",
                1: "48",
                2: "22.51%",
                3: "7.21%",
                4: "9.53%",
                5: "9.12%",
                6: "0.76",
                7: "0.99",
                8: "5.62%",
                9: "48.06%",
                10: "3.00%",
                11: "35.53%",
                12: "4.40%",
                13: "1.35",
                14: "1.52",
                15: "10.01",
                16: "20.70",
                17: "2.96",
                18: "45.86",
                19: "15.78%",
                20: "6.33%",
                21: "3.16%",
                22: "18.24%",
                23: "-1.82%",
                24: "0.44%",
                25: "0.44%",
                26: "7.28%\r",
              },
              17: {
                0: "Chemical (Diversified)",
                1: "5",
                2: "28.99%",
                3: "5.81%",
                4: "5.93%",
                5: "5.70%",
                6: "1.04",
                7: "1.36",
                8: "7.36%",
                9: "36.16%",
                10: "2.58%",
                11: "36.75%",
                12: "5.35%",
                13: "1.03",
                14: "1.72",
                15: "13.38",
                16: "29.25",
                17: "2.18",
                18: "17.19",
                19: "17.68%",
                20: "5.07%",
                21: "2.39%",
                22: "-68.79%",
                23: "13.25%",
                24: "51.84%",
                25: "51.84%",
                26: "5.82%\r",
              },
              18: {
                0: "Chemical (Specialty)",
                1: "97",
                2: "5.94%",
                3: "12.07%",
                4: "11.84%",
                5: "18.17%",
                6: "0.82",
                7: "0.93",
                8: "5.30%",
                9: "38.54%",
                10: "2.58%",
                11: "20.23%",
                12: "4.61%",
                13: "1.04",
                14: "3.27",
                15: "15.56",
                16: "26.53",
                17: "3.10",
                18: "58.86",
                19: "21.29%",
                20: "6.37%",
                21: "2.31%",
                22: "10.49%",
                23: "2.50%",
                24: "163.69%",
                25: "163.69%",
                26: "12.18%\r",
              },
              19: {
                0: "Coal & Related Energy",
                1: "29",
                2: "-14.18%",
                3: "-8.70%",
                4: "-7.50%",
                5: "0.00%",
                6: "0.56",
                7: "0.83",
                8: "4.84%",
                9: "42.27%",
                10: "3.00%",
                11: "48.62%",
                12: "3.55%",
                13: "0.87",
                14: "1.08",
                15: "5.79",
                16: "NA",
                17: "1.36",
                18: "37.68",
                19: "7.75%",
                20: "11.29%",
                21: "-7.19%",
                22: "NA",
                23: "-41.66%",
                24: "2.24%",
                25: "2.24%",
                26: "-8.61%\r",
              },
              20: {
                0: "Computer Services",
                1: "116",
                2: "9.40%",
                3: "7.58%",
                4: "22.98%",
                5: "12.94%",
                6: "0.94",
                7: "1.12",
                8: "6.20%",
                9: "45.89%",
                10: "3.00%",
                11: "28.44%",
                12: "5.06%",
                13: "3.03",
                14: "1.43",
                15: "10.70",
                16: "17.96",
                17: "4.00",
                18: "27.86",
                19: "12.09%",
                20: "1.81%",
                21: "-0.13%",
                22: "-16.58%",
                23: "13.50%",
                24: "75.57%",
                25: "75.57%",
                26: "8.02%\r",
              },
              21: {
                0: "Computers/Peripherals",
                1: "52",
                2: "4.06%",
                3: "15.55%",
                4: "27.82%",
                5: "14.17%",
                6: "1.14",
                7: "1.18",
                8: "6.52%",
                9: "42.87%",
                10: "3.00%",
                11: "8.55%",
                12: "6.15%",
                13: "1.81",
                14: "5.14",
                15: "24.76",
                16: "32.89",
                17: "22.90",
                18: "27.25",
                19: "-9.08%",
                20: "2.72%",
                21: "0.17%",
                22: "-0.24%",
                23: "50.53%",
                24: "26.83%",
                25: "26.83%",
                26: "15.98%\r",
              },
              22: {
                0: "Construction Supplies",
                1: "46",
                2: "3.50%",
                3: "9.41%",
                4: "9.93%",
                5: "22.99%",
                6: "0.87",
                7: "1.02",
                8: "5.75%",
                9: "33.39%",
                10: "2.58%",
                11: "25.80%",
                12: "4.75%",
                13: "1.21",
                14: "2.27",
                15: "15.23",
                16: "23.47",
                17: "3.82",
                18: "108.40",
                19: "17.23%",
                20: "5.21%",
                21: "1.96%",
                22: "-8.26%",
                23: "13.20%",
                24: "49.85%",
                25: "49.85%",
                26: "9.25%\r",
              },
              23: {
                0: "Diversified",
                1: "29",
                2: "0.51%",
                3: "18.06%",
                4: "13.44%",
                5: "20.76%",
                6: "0.89",
                7: "1.02",
                8: "5.77%",
                9: "29.94%",
                10: "2.58%",
                11: "22.92%",
                12: "4.88%",
                13: "0.79",
                14: "2.80",
                15: "11.37",
                16: "15.12",
                17: "1.86",
                18: "27.98",
                19: "1.48%",
                20: "5.08%",
                21: "2.97%",
                22: "20.49%",
                23: "10.62%",
                24: "14.32%",
                25: "14.32%",
                26: "18.14%\r",
              },
              24: {
                0: "Drugs (Biotechnology)",
                1: "547",
                2: "32.64%",
                3: "9.54%",
                4: "6.22%",
                5: "11.95%",
                6: "0.85",
                7: "0.89",
                8: "5.11%",
                9: "50.10%",
                10: "3.00%",
                11: "13.42%",
                12: "4.72%",
                13: "0.48",
                14: "8.73",
                15: "14.40",
                16: "57.63",
                17: "7.18",
                18: "480.18",
                19: "13.14%",
                20: "3.56%",
                21: "37.65%",
                22: "721.55%",
                23: "-1.19%",
                24: "0.13%",
                25: "0.13%",
                26: "12.92%\r",
              },
              25: {
                0: "Drugs (Pharmaceutical)",
                1: "287",
                2: "32.66%",
                3: "24.02%",
                4: "20.31%",
                5: "16.30%",
                6: "0.84",
                7: "0.91",
                8: "5.22%",
                9: "55.45%",
                10: "3.00%",
                11: "15.38%",
                12: "4.75%",
                13: "0.81",
                14: "5.55",
                15: "14.32",
                16: "22.27",
                17: "5.04",
                18: "34.54",
                19: "26.23%",
                20: "5.01%",
                21: "9.74%",
                22: "48.92%",
                23: "18.98%",
                24: "60.86%",
                25: "60.86%",
                26: "25.38%\r",
              },
              26: {
                0: "Education",
                1: "38",
                2: "1.01%",
                3: "9.26%",
                4: "9.89%",
                5: "16.65%",
                6: "1.07",
                7: "1.15",
                8: "6.35%",
                9: "55.73%",
                10: "3.00%",
                11: "19.57%",
                12: "5.53%",
                13: "1.17",
                14: "2.81",
                15: "14.43",
                16: "31.21",
                17: "2.92",
                18: "26.63",
                19: "7.47%",
                20: "3.88%",
                21: "2.70%",
                22: "61.41%",
                23: "-5.66%",
                24: "0.06%",
                25: "0.06%",
                26: "8.82%\r",
              },
              27: {
                0: "Electrical Equipment",
                1: "122",
                2: "4.21%",
                3: "12.60%",
                4: "22.12%",
                5: "17.21%",
                6: "1.00",
                7: "1.06",
                8: "5.93%",
                9: "55.12%",
                10: "3.00%",
                11: "13.31%",
                12: "5.43%",
                13: "1.80",
                14: "3.66",
                15: "15.96",
                16: "22.83",
                17: "6.28",
                18: "106.02",
                19: "21.00%",
                20: "3.79%",
                21: "4.49%",
                22: "36.52%",
                23: "17.67%",
                24: "43.55%",
                25: "43.55%",
                26: "12.84%\r",
              },
              28: {
                0: "Electronics (Consumer & Office)",
                1: "22",
                2: "1.69%",
                3: "1.99%",
                4: "4.66%",
                5: "11.28%",
                6: "1.01",
                7: "0.96",
                8: "5.44%",
                9: "54.91%",
                10: "3.00%",
                11: "8.68%",
                12: "5.16%",
                13: "1.82",
                14: "1.32",
                15: "18.96",
                16: "59.52",
                17: "4.26",
                18: "14.62",
                19: "13.26%",
                20: "1.68%",
                21: "0.97%",
                22: "-112.45%",
                23: "-4.89%",
                24: "0.00%",
                25: "0.00%",
                26: "2.58%\r",
              },
              29: {
                0: "Electronics (General)",
                1: "157",
                2: "2.88%",
                3: "7.47%",
                4: "11.08%",
                5: "19.85%",
                6: "0.86",
                7: "0.89",
                8: "5.11%",
                9: "43.87%",
                10: "3.00%",
                11: "11.88%",
                12: "4.76%",
                13: "1.49",
                14: "2.54",
                15: "17.52",
                16: "32.12",
                17: "4.14",
                18: "69.76",
                19: "20.52%",
                20: "4.19%",
                21: "4.25%",
                22: "59.96%",
                23: "6.67%",
                24: "41.48%",
                25: "41.48%",
                26: "7.90%\r",
              },
              30: {
                0: "Engineering/Construction",
                1: "61",
                2: "3.57%",
                3: "4.10%",
                4: "14.85%",
                5: "21.89%",
                6: "0.96",
                7: "1.06",
                8: "5.92%",
                9: "42.04%",
                10: "3.00%",
                11: "22.02%",
                12: "5.10%",
                13: "3.80",
                14: "0.90",
                15: "10.85",
                16: "19.80",
                17: "2.32",
                18: "34.52",
                19: "17.94%",
                20: "1.70%",
                21: "10.32%",
                22: "283.75%",
                23: "2.54%",
                24: "52.79%",
                25: "52.79%",
                26: "4.31%\r",
              },
              31: {
                0: "Entertainment",
                1: "118",
                2: "6.35%",
                3: "7.44%",
                4: "7.96%",
                5: "6.73%",
                6: "0.84",
                7: "0.88",
                8: "5.10%",
                9: "68.06%",
                10: "4.09%",
                11: "13.19%",
                12: "4.82%",
                13: "1.07",
                14: "6.81",
                15: "36.26",
                16: "89.24",
                17: "5.49",
                18: "1157.13",
                19: "0.65%",
                20: "5.18%",
                21: "0.28%",
                22: "16.68%",
                23: "-2.87%",
                24: "0.11%",
                25: "0.11%",
                26: "7.51%\r",
              },
              32: {
                0: "Environmental & Waste Services",
                1: "86",
                2: "7.88%",
                3: "11.92%",
                4: "19.19%",
                5: "20.68%",
                6: "0.82",
                7: "0.95",
                8: "5.43%",
                9: "50.43%",
                10: "3.00%",
                11: "20.13%",
                12: "4.78%",
                13: "1.63",
                14: "3.34",
                15: "14.98",
                16: "27.42",
                17: "4.68",
                18: "549.58",
                19: "9.56%",
                20: "7.49%",
                21: "2.83%",
                22: "22.50%",
                23: "6.21%",
                24: "94.76%",
                25: "94.76%",
                26: "12.10%\r",
              },
              33: {
                0: "Farming/Agriculture",
                1: "32",
                2: "-0.77%",
                3: "6.55%",
                4: "9.12%",
                5: "21.87%",
                6: "0.69",
                7: "0.87",
                8: "5.06%",
                9: "45.30%",
                10: "3.00%",
                11: "31.06%",
                12: "4.17%",
                13: "1.48",
                14: "1.35",
                15: "14.71",
                16: "20.13",
                17: "3.21",
                18: "23.82",
                19: "13.00%",
                20: "3.06%",
                21: "1.35%",
                22: "38.73%",
                23: "14.03%",
                24: "38.93%",
                25: "38.93%",
                26: "6.61%\r",
              },
              34: {
                0: "Financial Svcs. (Non-bank & Insurance)",
                1: "235",
                2: "9.08%",
                3: "12.32%",
                4: "0.40%",
                5: "19.21%",
                6: "0.11",
                7: "0.80",
                8: "4.69%",
                9: "27.74%",
                10: "2.58%",
                11: "89.96%",
                12: "2.17%",
                13: "0.04",
                14: "31.49",
                15: "NA",
                16: "NA",
                17: "2.23",
                18: "21.86",
                19: "NA",
                20: "6.99%",
                21: "13.20%",
                22: "122.62%",
                23: "64.28%",
                24: "23.86%",
                25: "23.86%",
                26: "12.23%\r",
              },
              35: {
                0: "Food Processing",
                1: "101",
                2: "6.85%",
                3: "12.80%",
                4: "17.53%",
                5: "25.02%",
                6: "0.53",
                7: "0.64",
                8: "3.93%",
                9: "32.56%",
                10: "2.58%",
                11: "24.82%",
                12: "3.42%",
                13: "1.48",
                14: "2.19",
                15: "12.88",
                16: "16.83",
                17: "2.57",
                18: "375.19",
                19: "5.27%",
                20: "3.21%",
                21: "2.09%",
                22: "15.12%",
                23: "10.12%",
                24: "60.98%",
                25: "60.98%",
                26: "12.95%\r",
              },
              36: {
                0: "Food Wholesalers",
                1: "18",
                2: "12.01%",
                3: "1.56%",
                4: "8.89%",
                5: "3.87%",
                6: "0.81",
                7: "1.03",
                8: "5.81%",
                9: "58.03%",
                10: "3.00%",
                11: "35.90%",
                12: "4.51%",
                13: "5.82",
                14: "0.54",
                15: "15.87",
                16: "35.36",
                17: "5.02",
                18: "8.64",
                19: "5.38%",
                20: "1.02%",
                21: "2.61%",
                22: "87.56%",
                23: "-5.03%",
                24: "0.20%",
                25: "0.20%",
                26: "1.54%\r",
              },
              37: {
                0: "Furn/Home Furnishings",
                1: "40",
                2: "5.08%",
                3: "7.98%",
                4: "14.59%",
                5: "18.92%",
                6: "0.78",
                7: "0.88",
                8: "5.10%",
                9: "40.52%",
                10: "3.00%",
                11: "25.41%",
                12: "4.36%",
                13: "1.88",
                14: "1.31",
                15: "9.73",
                16: "15.82",
                17: "2.68",
                18: "125.50",
                19: "10.60%",
                20: "2.74%",
                21: "1.37%",
                22: "-26.83%",
                23: "13.37%",
                24: "27.17%",
                25: "27.17%",
                26: "8.16%\r",
              },
              38: {
                0: "Green & Renewable Energy",
                1: "25",
                2: "-0.09%",
                3: "26.12%",
                4: "6.89%",
                5: "43.03%",
                6: "0.68",
                7: "0.98",
                8: "5.56%",
                9: "56.04%",
                10: "3.00%",
                11: "39.05%",
                12: "4.25%",
                13: "0.27",
                14: "13.15",
                15: "22.94",
                16: "50.76",
                17: "1.68",
                18: "40.67",
                19: "-158.25%",
                20: "35.69%",
                21: "25.82%",
                22: "110.11%",
                23: "-20.59%",
                24: "0.15%",
                25: "0.15%",
                26: "25.88%\r",
              },
              39: {
                0: "Healthcare Products",
                1: "265",
                2: "13.90%",
                3: "14.24%",
                4: "13.22%",
                5: "13.64%",
                6: "0.80",
                7: "0.83",
                8: "4.86%",
                9: "46.19%",
                10: "3.00%",
                11: "9.66%",
                12: "4.61%",
                13: "0.96",
                14: "7.42",
                15: "28.53",
                16: "49.25",
                17: "5.77",
                18: "317.98",
                19: "25.16%",
                20: "5.15%",
                21: "11.83%",
                22: "113.46%",
                23: "10.55%",
                24: "30.11%",
                25: "30.11%",
                26: "14.09%\r",
              },
              40: {
                0: "Healthcare Support Services",
                1: "129",
                2: "17.54%",
                3: "4.97%",
                4: "35.27%",
                5: "24.05%",
                6: "0.74",
                7: "0.85",
                8: "4.95%",
                9: "44.49%",
                10: "3.00%",
                11: "24.07%",
                12: "4.28%",
                13: "7.72",
                14: "0.68",
                15: "10.36",
                16: "13.63",
                17: "2.91",
                18: "104.18",
                19: "-5.33%",
                20: "0.74%",
                21: "0.68%",
                22: "19.57%",
                23: "16.60%",
                24: "25.63%",
                25: "25.63%",
                26: "4.84%\r",
              },
              41: {
                0: "Heathcare Information and Technology",
                1: "139",
                2: "15.02%",
                3: "13.14%",
                4: "16.35%",
                5: "16.43%",
                6: "0.75",
                7: "0.79",
                8: "4.66%",
                9: "42.45%",
                10: "3.00%",
                11: "10.79%",
                12: "4.40%",
                13: "1.24",
                14: "7.33",
                15: "29.32",
                16: "50.49",
                17: "7.12",
                18: "162.96",
                19: "23.07%",
                20: "3.82%",
                21: "0.07%",
                22: "10.28%",
                23: "14.11%",
                24: "10.55%",
                25: "10.55%",
                26: "13.69%\r",
              },
              42: {
                0: "Homebuilding",
                1: "30",
                2: "13.52%",
                3: "11.81%",
                4: "13.58%",
                5: "20.30%",
                6: "1.33",
                7: "1.46",
                8: "7.82%",
                9: "36.56%",
                10: "2.58%",
                11: "24.66%",
                12: "6.35%",
                13: "1.37",
                14: "1.21",
                15: "9.54",
                16: "10.23",
                17: "1.75",
                18: "17.34",
                19: "66.10%",
                20: "0.74%",
                21: "0.63%",
                22: "-10.15%",
                23: "17.70%",
                24: "7.58%",
                25: "7.58%",
                26: "11.82%\r",
              },
              43: {
                0: "Hospitals/Healthcare Facilities",
                1: "32",
                2: "4.24%",
                3: "10.20%",
                4: "13.18%",
                5: "20.32%",
                6: "0.81",
                7: "1.28",
                8: "6.99%",
                9: "49.21%",
                10: "3.00%",
                11: "49.85%",
                12: "4.59%",
                13: "1.51",
                14: "1.54",
                15: "8.97",
                16: "16.18",
                17: "5.78",
                18: "44.61",
                19: "3.37%",
                20: "5.92%",
                21: "1.39%",
                22: "-26.10%",
                23: "70.64%",
                24: "10.91%",
                25: "10.91%",
                26: "9.49%\r",
              },
              44: {
                0: "Hotel/Gaming",
                1: "66",
                2: "-0.38%",
                3: "-10.34%",
                4: "-5.24%",
                5: "23.34%",
                6: "1.19",
                7: "1.56",
                8: "8.32%",
                9: "43.69%",
                10: "3.00%",
                11: "36.40%",
                12: "6.09%",
                13: "0.38",
                14: "8.08",
                15: "38.32",
                16: "NA",
                17: "6.10",
                18: "64.17",
                19: "15.67%",
                20: "18.51%",
                21: "13.00%",
                22: "NA",
                23: "-30.40%",
                24: "0.50%",
                25: "0.50%",
                26: "-14.01%\r",
              },
              45: {
                0: "Household Products",
                1: "140",
                2: "14.18%",
                3: "18.20%",
                4: "34.99%",
                5: "20.24%",
                6: "0.68",
                7: "0.73",
                8: "4.38%",
                9: "54.66%",
                10: "3.00%",
                11: "12.93%",
                12: "4.09%",
                13: "2.02",
                14: "4.09",
                15: "17.60",
                16: "22.33",
                17: "9.06",
                18: "36.29",
                19: "8.85%",
                20: "3.65%",
                21: "1.27%",
                22: "-2.57%",
                23: "31.60%",
                24: "60.85%",
                25: "60.85%",
                26: "18.27%\r",
              },
              46: {
                0: "Information Services",
                1: "77",
                2: "12.19%",
                3: "23.40%",
                4: "24.34%",
                5: "20.35%",
                6: "0.97",
                7: "1.01",
                8: "5.70%",
                9: "42.37%",
                10: "3.00%",
                11: "8.56%",
                12: "5.40%",
                13: "1.14",
                14: "10.54",
                15: "31.70",
                16: "44.48",
                17: "8.38",
                18: "71.13",
                19: "6.79%",
                20: "3.07%",
                21: "-0.15%",
                22: "-7.08%",
                23: "14.35%",
                24: "32.41%",
                25: "32.41%",
                26: "23.61%\r",
              },
              47: {
                0: "Insurance (General)",
                1: "21",
                2: "5.51%",
                3: "12.83%",
                4: "9.26%",
                5: "19.30%",
                6: "0.56",
                7: "0.68",
                8: "4.15%",
                9: "30.12%",
                10: "2.58%",
                11: "28.98%",
                12: "3.49%",
                13: "0.82",
                14: "1.97",
                15: "9.99",
                16: "15.01",
                17: "1.45",
                18: "50.36",
                19: "-15.44%",
                20: "0.78%",
                21: "-3.17%",
                22: "-44.47%",
                23: "1.49%",
                24: "192.79%",
                25: "192.79%",
                26: "12.92%\r",
              },
              48: {
                0: "Insurance (Life)",
                1: "26",
                2: "3.35%",
                3: "8.48%",
                4: "4.33%",
                5: "13.00%",
                6: "0.64",
                7: "0.98",
                8: "5.54%",
                9: "30.68%",
                10: "2.58%",
                11: "54.53%",
                12: "3.55%",
                13: "0.60",
                14: "1.31",
                15: "12.51",
                16: "15.00",
                17: "0.59",
                18: "28.99",
                19: "1.35%",
                20: "0.16%",
                21: "-0.39%",
                22: "2.64%",
                23: "5.61%",
                24: "37.95%",
                25: "37.95%",
                26: "8.48%\r",
              },
              49: {
                0: "Insurance (Prop/Cas.)",
                1: "55",
                2: "3.09%",
                3: "10.85%",
                4: "10.74%",
                5: "19.46%",
                6: "0.58",
                7: "0.64",
                8: "3.97%",
                9: "22.93%",
                10: "1.92%",
                11: "20.04%",
                12: "3.45%",
                13: "1.11",
                14: "1.44",
                15: "9.69",
                16: "12.33",
                17: "1.54",
                18: "22.12",
                19: "-52.80%",
                20: "1.06%",
                21: "0.37%",
                22: "13.47%",
                23: "9.19%",
                24: "38.39%",
                25: "38.39%",
                26: "10.89%\r",
              },
              50: {
                0: "Investments & Asset Management",
                1: "348",
                2: "0.65%",
                3: "16.95%",
                4: "7.24%",
                5: "18.52%",
                6: "0.78",
                7: "0.93",
                8: "5.32%",
                9: "28.85%",
                10: "2.58%",
                11: "31.14%",
                12: "4.25%",
                13: "0.45",
                14: "5.87",
                15: "26.17",
                16: "30.60",
                17: "2.05",
                18: "625.41",
                19: "NA",
                20: "2.92%",
                21: "5.31%",
                22: "46.23%",
                23: "12.35%",
                24: "52.70%",
                25: "52.70%",
                26: "16.74%\r",
              },
              51: {
                0: "Machinery",
                1: "125",
                2: "3.44%",
                3: "13.07%",
                4: "21.42%",
                5: "21.03%",
                6: "0.96",
                7: "1.05",
                8: "5.88%",
                9: "34.28%",
                10: "2.58%",
                11: "16.42%",
                12: "5.22%",
                13: "1.78",
                14: "3.06",
                15: "16.70",
                16: "23.08",
                17: "4.55",
                18: "46.09",
                19: "23.31%",
                20: "2.44%",
                21: "3.99%",
                22: "20.62%",
                23: "12.65%",
                24: "45.37%",
                25: "45.37%",
                26: "13.21%\r",
              },
              52: {
                0: "Metals & Mining",
                1: "86",
                2: "4.02%",
                3: "11.47%",
                4: "10.75%",
                5: "51.98%",
                6: "0.82",
                7: "0.90",
                8: "5.20%",
                9: "67.84%",
                10: "4.09%",
                11: "19.26%",
                12: "4.77%",
                13: "0.97",
                14: "3.00",
                15: "13.90",
                16: "25.92",
                17: "3.29",
                18: "44.42",
                19: "14.30%",
                20: "8.98%",
                21: "1.03%",
                22: "-7.46%",
                23: "2.67%",
                24: "197.36%",
                25: "197.36%",
                26: "11.26%\r",
              },
              53: {
                0: "Office Equipment & Services",
                1: "22",
                2: "0.78%",
                3: "7.50%",
                4: "12.84%",
                5: "24.00%",
                6: "0.83",
                7: "1.00",
                8: "5.65%",
                9: "31.11%",
                10: "2.58%",
                11: "32.35%",
                12: "4.43%",
                13: "1.97",
                14: "1.12",
                15: "8.82",
                16: "14.77",
                17: "2.60",
                18: "33.03",
                19: "6.66%",
                20: "2.81%",
                21: "0.37%",
                22: "-10.66%",
                23: "6.36%",
                24: "91.77%",
                25: "91.77%",
                26: "7.51%\r",
              },
              54: {
                0: "Oil/Gas (Integrated)",
                1: "3",
                2: "-1.24%",
                3: "-4.27%",
                4: "-2.33%",
                5: "25.63%",
                6: "0.99",
                7: "1.26",
                8: "6.88%",
                9: "26.39%",
                10: "2.58%",
                11: "30.60%",
                12: "5.35%",
                13: "0.64",
                14: "1.54",
                15: "10.77",
                16: "NA",
                17: "1.05",
                18: "52.50",
                19: "5.39%",
                20: "11.10%",
                21: "-6.73%",
                22: "NA",
                23: "-6.19%",
                24: "4.48%",
                25: "4.48%",
                26: "-3.96%\r",
              },
              55: {
                0: "Oil/Gas (Production and Exploration)",
                1: "278",
                2: "-1.17%",
                3: "-21.40%",
                4: "-6.33%",
                5: "28.59%",
                6: "0.81",
                7: "1.18",
                8: "6.52%",
                9: "56.28%",
                10: "3.00%",
                11: "41.89%",
                12: "4.70%",
                13: "0.31",
                14: "2.91",
                15: "6.39",
                16: "NA",
                17: "1.21",
                18: "26.13",
                19: "1.29%",
                20: "38.82%",
                21: "-22.85%",
                22: "NA",
                23: "-37.09%",
                24: "1.68%",
                25: "1.68%",
                26: "-20.70%\r",
              },
              56: {
                0: "Oil/Gas Distribution",
                1: "57",
                2: "10.74%",
                3: "17.43%",
                4: "9.01%",
                5: "8.74%",
                6: "0.60",
                7: "1.16",
                8: "6.39%",
                9: "40.78%",
                10: "3.00%",
                11: "56.46%",
                12: "4.02%",
                13: "0.54",
                14: "2.42",
                15: "9.12",
                16: "13.95",
                17: "1.24",
                18: "37.08",
                19: "6.97%",
                20: "13.48%",
                21: "5.01%",
                22: "36.48%",
                23: "1.28%",
                24: "4.66%",
                25: "4.66%",
                26: "17.38%\r",
              },
              57: {
                0: "Oilfield Svcs/Equip.",
                1: "135",
                2: "-6.86%",
                3: "0.47%",
                4: "1.29%",
                5: "4.37%",
                6: "0.84",
                7: "1.21",
                8: "6.63%",
                9: "50.27%",
                10: "3.00%",
                11: "43.64%",
                12: "4.69%",
                13: "1.88",
                14: "0.73",
                15: "11.35",
                16: "95.78",
                17: "1.30",
                18: "31.78",
                19: "11.41%",
                20: "4.14%",
                21: "-0.08%",
                22: "-39.83%",
                23: "-26.63%",
                24: "0.30%",
                25: "0.30%",
                26: "0.70%\r",
              },
              58: {
                0: "Packaging & Container",
                1: "26",
                2: "2.52%",
                3: "9.66%",
                4: "12.25%",
                5: "25.38%",
                6: "0.68",
                7: "0.92",
                8: "5.28%",
                9: "29.22%",
                10: "2.58%",
                11: "35.53%",
                12: "4.07%",
                13: "1.47",
                14: "1.72",
                15: "10.34",
                16: "17.48",
                17: "3.76",
                18: "24.25",
                19: "7.23%",
                20: "5.34%",
                21: "2.18%",
                22: "22.77%",
                23: "9.76%",
                24: "64.94%",
                25: "64.94%",
                26: "9.86%\r",
              },
              59: {
                0: "Paper/Forest Products",
                1: "15",
                2: "0.51%",
                3: "5.84%",
                4: "8.38%",
                5: "21.09%",
                6: "0.96",
                7: "1.14",
                8: "6.30%",
                9: "35.67%",
                10: "2.58%",
                11: "27.29%",
                12: "5.10%",
                13: "1.48",
                14: "0.94",
                15: "7.71",
                16: "15.65",
                17: "1.61",
                18: "20.05",
                19: "15.40%",
                20: "3.85%",
                21: "-0.29%",
                22: "-27.91%",
                23: "4.69%",
                24: "117.52%",
                25: "117.52%",
                26: "6.01%\r",
              },
              60: {
                0: "Power",
                1: "55",
                2: "1.01%",
                3: "19.82%",
                4: "6.80%",
                5: "11.02%",
                6: "0.43",
                7: "0.67",
                8: "4.08%",
                9: "19.86%",
                10: "1.92%",
                11: "43.85%",
                12: "2.90%",
                13: "0.38",
                14: "4.37",
                15: "11.89",
                16: "22.26",
                17: "1.90",
                18: "21.95",
                19: "2.57%",
                20: "35.11%",
                21: "20.55%",
                22: "119.53%",
                23: "7.69%",
                24: "87.59%",
                25: "87.59%",
                26: "19.61%\r",
              },
              61: {
                0: "Precious Metals",
                1: "93",
                2: "3.17%",
                3: "21.48%",
                4: "9.87%",
                5: "18.13%",
                6: "0.75",
                7: "0.76",
                8: "4.50%",
                9: "67.76%",
                10: "4.09%",
                11: "11.26%",
                12: "4.33%",
                13: "0.46",
                14: "4.82",
                15: "10.30",
                16: "21.45",
                17: "2.19",
                18: "86.45",
                19: "11.99%",
                20: "13.00%",
                21: "-8.19%",
                22: "-44.22%",
                23: "8.27%",
                24: "31.91%",
                25: "31.91%",
                26: "21.64%\r",
              },
              62: {
                0: "Publishing & Newspapers",
                1: "29",
                2: "0.31%",
                3: "5.64%",
                4: "10.48%",
                5: "23.79%",
                6: "1.11",
                7: "1.41",
                8: "7.58%",
                9: "37.47%",
                10: "2.58%",
                11: "35.07%",
                12: "5.58%",
                13: "2.09",
                14: "1.17",
                15: "9.77",
                16: "21.76",
                17: "2.07",
                18: "48.94",
                19: "11.60%",
                20: "2.69%",
                21: "0.56%",
                22: "-4.91%",
                23: "-14.18%",
                24: "0.54%",
                25: "0.54%",
                26: "5.31%\r",
              },
              63: {
                0: "R.E.I.T.",
                1: "238",
                2: "6.81%",
                3: "23.23%",
                4: "2.05%",
                5: "2.47%",
                6: "0.79",
                7: "1.21",
                8: "6.62%",
                9: "32.40%",
                10: "2.58%",
                11: "43.42%",
                12: "4.56%",
                13: "0.11",
                14: "12.85",
                15: "22.72",
                16: "61.43",
                17: "2.11",
                18: "63.00",
                19: "89.65%",
                20: "3.24%",
                21: "-15.31%",
                22: "-75.13%",
                23: "2.17%",
                24: "430.49%",
                25: "430.49%",
                26: "19.05%\r",
              },
              64: {
                0: "Real Estate (Development)",
                1: "25",
                2: "-19.92%",
                3: "-3.64%",
                4: "-1.41%",
                5: "27.32%",
                6: "0.56",
                7: "0.85",
                8: "4.94%",
                9: "60.70%",
                10: "3.00%",
                11: "48.64%",
                12: "3.60%",
                13: "0.22",
                14: "6.00",
                15: "47.57",
                16: "NA",
                17: "1.19",
                18: "15.96",
                19: "-3.41%",
                20: "33.83%",
                21: "21.69%",
                22: "NA",
                23: "-0.13%",
                24: "0.00%",
                25: "0.00%",
                26: "-6.70%\r",
              },
              65: {
                0: "Real Estate (General/Diversified)",
                1: "11",
                2: "9.20%",
                3: "6.93%",
                4: "1.96%",
                5: "18.50%",
                6: "0.76",
                7: "0.78",
                8: "4.62%",
                9: "20.99%",
                10: "1.92%",
                11: "22.61%",
                12: "3.89%",
                13: "0.33",
                14: "6.81",
                15: "25.25",
                16: "78.40",
                17: "1.19",
                18: "52.41",
                19: "301.01%",
                20: "2.57%",
                21: "-2.99%",
                22: "497.44%",
                23: "2.00%",
                24: "67.61%",
                25: "67.61%",
                26: "6.37%\r",
              },
              66: {
                0: "Real Estate (Operations & Services)",
                1: "61",
                2: "2.10%",
                3: "4.13%",
                4: "7.97%",
                5: "10.49%",
                6: "0.76",
                7: "0.92",
                8: "5.28%",
                9: "34.72%",
                10: "2.58%",
                11: "28.97%",
                12: "4.29%",
                13: "2.05",
                14: "1.56",
                15: "14.82",
                16: "32.31",
                17: "3.21",
                18: "56.83",
                19: "14.01%",
                20: "1.22%",
                21: "-0.64%",
                22: "-93.68%",
                23: "4.71%",
                24: "39.08%",
                25: "39.08%",
                26: "4.07%\r",
              },
              67: {
                0: "Recreation",
                1: "69",
                2: "2.62%",
                3: "6.81%",
                4: "8.65%",
                5: "22.56%",
                6: "0.77",
                7: "0.87",
                8: "5.02%",
                9: "56.40%",
                10: "3.00%",
                11: "19.68%",
                12: "4.46%",
                13: "1.42",
                14: "3.73",
                15: "22.59",
                16: "52.06",
                17: "10.37",
                18: "155.39",
                19: "15.66%",
                20: "4.56%",
                21: "11.38%",
                22: "206.78%",
                23: "-7.19%",
                24: "0.71%",
                25: "0.71%",
                26: "6.44%\r",
              },
              68: {
                0: "Reinsurance",
                1: "2",
                2: "9.11%",
                3: "4.27%",
                4: "3.74%",
                5: "25.14%",
                6: "1.13",
                7: "1.16",
                8: "6.42%",
                9: "25.23%",
                10: "2.58%",
                11: "27.81%",
                12: "5.16%",
                13: "1.02",
                14: "0.81",
                15: "12.92",
                16: "19.18",
                17: "0.75",
                18: "15.20",
                19: "-7.60%",
                20: "0.29%",
                21: "-0.98%",
                22: "-17.14%",
                23: "2.42%",
                24: "36.15%",
                25: "36.15%",
                26: "4.21%\r",
              },
              69: {
                0: "Restaurant/Dining",
                1: "79",
                2: "0.84%",
                3: "11.36%",
                4: "7.24%",
                5: "18.69%",
                6: "1.11",
                7: "1.34",
                8: "7.28%",
                9: "53.63%",
                10: "3.00%",
                11: "25.21%",
                12: "5.99%",
                13: "1.14",
                14: "5.27",
                15: "23.53",
                16: "80.25",
                17: "NA",
                18: "58.91",
                19: "2.84%",
                20: "5.82%",
                21: "2.47%",
                22: "48.72%",
                23: "NA",
                24: "114.33%",
                25: "114.33%",
                26: "6.55%\r",
              },
              70: {
                0: "Retail (Automotive)",
                1: "30",
                2: "3.20%",
                3: "6.43%",
                4: "10.10%",
                5: "23.18%",
                6: "0.99",
                7: "1.30",
                8: "7.06%",
                9: "42.82%",
                10: "3.00%",
                11: "33.21%",
                12: "5.44%",
                13: "2.09",
                14: "1.24",
                15: "11.56",
                16: "19.84",
                17: "5.99",
                18: "17.52",
                19: "10.95%",
                20: "1.81%",
                21: "1.72%",
                22: "-23.16%",
                23: "36.28%",
                24: "3.72%",
                25: "3.72%",
                26: "5.48%\r",
              },
              71: {
                0: "Retail (Building Supply)",
                1: "15",
                2: "6.42%",
                3: "12.79%",
                4: "37.47%",
                5: "23.94%",
                6: "1.44",
                7: "1.54",
                8: "8.22%",
                9: "40.60%",
                10: "3.00%",
                11: "15.31%",
                12: "7.30%",
                13: "3.46",
                14: "2.06",
                15: "12.59",
                16: "16.49",
                17: "40.07",
                18: "140.11",
                19: "4.46%",
                20: "2.07%",
                21: "0.20%",
                22: "-26.45%",
                23: "0.27%",
                24: "45.51%",
                25: "45.51%",
                26: "12.51%\r",
              },
              72: {
                0: "Retail (Distributors)",
                1: "85",
                2: "4.67%",
                3: "7.70%",
                4: "11.67%",
                5: "25.02%",
                6: "0.75",
                7: "0.97",
                8: "5.51%",
                9: "41.97%",
                10: "3.00%",
                11: "31.38%",
                12: "4.47%",
                13: "1.68",
                14: "1.49",
                15: "13.88",
                16: "18.78",
                17: "3.39",
                18: "138.44",
                19: "15.54%",
                20: "3.68%",
                21: "5.08%",
                22: "63.11%",
                23: "9.67%",
                24: "52.37%",
                25: "52.37%",
                26: "7.90%\r",
              },
              73: {
                0: "Retail (General)",
                1: "17",
                2: "2.41%",
                3: "4.63%",
                4: "14.67%",
                5: "24.42%",
                6: "0.82",
                7: "0.90",
                8: "5.17%",
                9: "38.91%",
                10: "2.58%",
                11: "17.59%",
                12: "4.59%",
                13: "4.10",
                14: "0.93",
                15: "12.29",
                16: "22.81",
                17: "5.43",
                18: "22.70",
                19: "0.06%",
                20: "2.01%",
                21: "0.02%",
                22: "-42.80%",
                23: "20.64%",
                24: "36.12%",
                25: "36.12%",
                26: "4.09%\r",
              },
              74: {
                0: "Retail (Grocery and Food)",
                1: "14",
                2: "6.28%",
                3: "3.48%",
                4: "9.63%",
                5: "23.43%",
                6: "0.15",
                7: "0.24",
                8: "2.07%",
                9: "37.72%",
                10: "2.58%",
                11: "48.54%",
                12: "1.98%",
                13: "4.11",
                14: "0.39",
                15: "5.75",
                16: "14.31",
                17: "2.51",
                18: "14.41",
                19: "-0.20%",
                20: "2.29%",
                21: "0.11%",
                22: "-14.72%",
                23: "30.63%",
                24: "12.85%",
                25: "12.85%",
                26: "2.71%\r",
              },
              75: {
                0: "Retail (Online)",
                1: "75",
                2: "9.28%",
                3: "5.74%",
                4: "11.04%",
                5: "16.13%",
                6: "1.14",
                7: "1.16",
                8: "6.42%",
                9: "52.87%",
                10: "3.00%",
                11: "6.67%",
                12: "6.14%",
                13: "1.80",
                14: "4.71",
                15: "33.19",
                16: "83.83",
                17: "18.62",
                18: "131.27",
                19: "-3.70%",
                20: "7.72%",
                21: "3.55%",
                22: "55.37%",
                23: "27.05%",
                24: "5.66%",
                25: "5.66%",
                26: "6.29%\r",
              },
              76: {
                0: "Retail (Special Lines)",
                1: "85",
                2: "5.57%",
                3: "2.89%",
                4: "5.29%",
                5: "24.55%",
                6: "1.04",
                7: "1.28",
                8: "6.98%",
                9: "49.01%",
                10: "3.00%",
                11: "32.55%",
                12: "5.42%",
                13: "2.29",
                14: "1.10",
                15: "11.40",
                16: "43.75",
                17: "5.51",
                18: "55.99",
                19: "4.75%",
                20: "1.78%",
                21: "0.05%",
                22: "-179.34%",
                23: "-0.64%",
                24: "0.32%",
                25: "0.32%",
                26: "2.51%\r",
              },
              77: {
                0: "Rubber& Tires",
                1: "3",
                2: "-4.21%",
                3: "-0.50%",
                4: "0.01%",
                5: "15.90%",
                6: "0.55",
                7: "1.09",
                8: "6.09%",
                9: "43.83%",
                10: "3.00%",
                11: "63.62%",
                12: "3.61%",
                13: "1.07",
                14: "0.74",
                15: "9.84",
                16: "NA",
                17: "1.04",
                18: "24.89",
                19: "13.63%",
                20: "5.63%",
                21: "-0.53%",
                22: "NA",
                23: "-25.69%",
                24: "0.07%",
                25: "0.07%",
                26: "0.01%\r",
              },
              78: {
                0: "Semiconductor",
                1: "70",
                2: "3.77%",
                3: "24.09%",
                4: "17.39%",
                5: "10.77%",
                6: "0.96",
                7: "1.00",
                8: "5.66%",
                9: "37.26%",
                10: "2.58%",
                11: "8.85%",
                12: "5.33%",
                13: "0.75",
                14: "7.16",
                15: "18.04",
                16: "29.30",
                17: "6.87",
                18: "726.52",
                19: "17.44%",
                20: "12.76%",
                21: "16.06%",
                22: "79.83%",
                23: "22.13%",
                24: "42.10%",
                25: "42.10%",
                26: "24.79%\r",
              },
              79: {
                0: "Semiconductor Equip",
                1: "40",
                2: "8.49%",
                3: "22.21%",
                4: "27.89%",
                5: "12.83%",
                6: "1.07",
                7: "1.07",
                8: "5.98%",
                9: "35.91%",
                10: "2.58%",
                11: "7.44%",
                12: "5.68%",
                13: "1.30",
                14: "5.14",
                15: "18.69",
                16: "22.86",
                17: "7.87",
                18: "55.87",
                19: "27.82%",
                20: "3.71%",
                21: "1.16%",
                22: "28.59%",
                23: "32.23%",
                24: "23.31%",
                25: "23.31%",
                26: "23.18%\r",
              },
              80: {
                0: "Shipbuilding & Marine",
                1: "11",
                2: "3.10%",
                3: "5.11%",
                4: "3.74%",
                5: "24.39%",
                6: "0.74",
                7: "1.04",
                8: "5.82%",
                9: "29.83%",
                10: "2.58%",
                11: "38.33%",
                12: "4.31%",
                13: "0.68",
                14: "1.74",
                15: "10.67",
                16: "30.64",
                17: "1.13",
                18: "49.99",
                19: "8.57%",
                20: "9.73%",
                21: "7.10%",
                22: "124.48%",
                23: "-5.70%",
                24: "0.16%",
                25: "0.16%",
                26: "5.66%\r",
              },
              81: {
                0: "Shoe",
                1: "11",
                2: "-0.11%",
                3: "9.22%",
                4: "20.90%",
                5: "13.44%",
                6: "0.98",
                7: "0.98",
                8: "5.57%",
                9: "31.50%",
                10: "2.58%",
                11: "6.43%",
                12: "5.33%",
                13: "2.50",
                14: "5.05",
                15: "35.83",
                16: "56.49",
                17: "14.87",
                18: "46.18",
                19: "20.38%",
                20: "0.76%",
                21: "-2.13%",
                22: "-30.66%",
                23: "23.70%",
                24: "48.27%",
                25: "48.27%",
                26: "8.93%\r",
              },
              82: {
                0: "Software (Entertainment)",
                1: "101",
                2: "-0.41%",
                3: "20.61%",
                4: "14.73%",
                5: "12.02%",
                6: "0.96",
                7: "0.96",
                8: "5.46%",
                9: "62.61%",
                10: "3.00%",
                11: "2.55%",
                12: "5.37%",
                13: "0.68",
                14: "8.16",
                15: "25.09",
                16: "38.04",
                17: "6.23",
                18: "157.38",
                19: "5.41%",
                20: "14.04%",
                21: "9.94%",
                22: "67.80%",
                23: "17.71%",
                24: "0.26%",
                25: "0.26%",
                26: "21.79%\r",
              },
              83: {
                0: "Software (Internet)",
                1: "36",
                2: "19.34%",
                3: "5.06%",
                4: "6.66%",
                5: "5.97%",
                6: "0.75",
                7: "0.77",
                8: "4.58%",
                9: "32.73%",
                10: "2.58%",
                11: "8.11%",
                12: "4.36%",
                13: "1.01",
                14: "15.67",
                15: "19.21",
                16: "95.44",
                17: "15.19",
                18: "67.89",
                19: "10.58%",
                20: "7.90%",
                21: "6.95%",
                22: "217.24%",
                23: "-11.23%",
                24: "0.18%",
                25: "0.18%",
                26: "6.78%\r",
              },
              84: {
                0: "Software (System & Application)",
                1: "388",
                2: "18.93%",
                3: "23.30%",
                4: "22.28%",
                5: "14.14%",
                6: "0.89",
                7: "0.91",
                8: "5.23%",
                9: "47.97%",
                10: "3.00%",
                11: "6.15%",
                12: "5.05%",
                13: "0.92",
                14: "11.82",
                15: "30.42",
                16: "43.93",
                17: "14.07",
                18: "148.99",
                19: "13.15%",
                20: "6.80%",
                21: "5.60%",
                22: "33.69%",
                23: "28.09%",
                24: "29.35%",
                25: "29.35%",
                26: "24.90%\r",
              },
              85: {
                0: "Steel",
                1: "32",
                2: "0.47%",
                3: "3.55%",
                4: "5.81%",
                5: "24.53%",
                6: "0.78",
                7: "0.95",
                8: "5.43%",
                9: "39.32%",
                10: "2.58%",
                11: "33.44%",
                12: "4.24%",
                13: "1.70",
                14: "0.93",
                15: "9.74",
                16: "23.06",
                17: "1.55",
                18: "35.73",
                19: "21.69%",
                20: "6.96%",
                21: "5.57%",
                22: "28.49%",
                23: "-2.84%",
                24: "0.65%",
                25: "0.65%",
                26: "3.63%\r",
              },
              86: {
                0: "Telecom (Wireless)",
                1: "16",
                2: "6.53%",
                3: "12.48%",
                4: "10.22%",
                5: "22.65%",
                6: "0.39",
                7: "0.53",
                8: "3.44%",
                9: "39.78%",
                10: "2.58%",
                11: "35.30%",
                12: "2.89%",
                13: "0.84",
                14: "3.67",
                15: "10.14",
                16: "29.55",
                17: "2.36",
                18: "24.68",
                19: "10.99%",
                20: "15.33%",
                21: "3.52%",
                22: "168.20%",
                23: "8.91%",
                24: "3.04%",
                25: "3.04%",
                26: "12.65%\r",
              },
              87: {
                0: "Telecom. Equipment",
                1: "96",
                2: "31.65%",
                3: "18.69%",
                4: "21.80%",
                5: "17.90%",
                6: "0.83",
                7: "0.87",
                8: "5.03%",
                9: "43.11%",
                10: "3.00%",
                11: "12.89%",
                12: "4.67%",
                13: "1.20",
                14: "3.56",
                15: "13.92",
                16: "18.52",
                17: "4.84",
                18: "50.68",
                19: "16.84%",
                20: "2.95%",
                21: "3.35%",
                22: "11.71%",
                23: "17.10%",
                24: "64.71%",
                25: "64.71%",
                26: "18.86%\r",
              },
              88: {
                0: "Telecom. Services",
                1: "58",
                2: "7.79%",
                3: "19.46%",
                4: "13.78%",
                5: "16.71%",
                6: "0.42",
                7: "0.66",
                8: "4.04%",
                9: "43.53%",
                10: "3.00%",
                11: "45.40%",
                12: "3.20%",
                13: "0.75",
                14: "2.51",
                15: "6.76",
                16: "13.12",
                17: "1.73",
                18: "22.27",
                19: "1.18%",
                20: "12.63%",
                21: "-2.36%",
                22: "-2.19%",
                23: "11.27%",
                24: "51.92%",
                25: "51.92%",
                26: "19.07%\r",
              },
              89: {
                0: "Tobacco",
                1: "15",
                2: "52.82%",
                3: "42.80%",
                4: "45.33%",
                5: "34.67%",
                6: "0.61",
                7: "0.72",
                8: "4.34%",
                9: "24.49%",
                10: "1.92%",
                11: "23.26%",
                12: "3.65%",
                13: "1.16",
                14: "4.82",
                15: "10.48",
                16: "11.20",
                17: "NA",
                18: "54.62",
                19: "13.10%",
                20: "1.75%",
                21: "1.24%",
                22: "0.69%",
                23: "-0.23%",
                24: "164.95%",
                25: "164.95%",
                26: "42.92%\r",
              },
              90: {
                0: "Transportation",
                1: "21",
                2: "9.42%",
                3: "6.28%",
                4: "13.32%",
                5: "22.37%",
                6: "0.79",
                7: "0.91",
                8: "5.21%",
                9: "28.68%",
                10: "2.58%",
                11: "24.07%",
                12: "4.41%",
                13: "2.45",
                14: "1.56",
                15: "12.96",
                16: "25.63",
                17: "6.77",
                18: "48.61",
                19: "7.97%",
                20: "5.88%",
                21: "2.26%",
                22: "68.34%",
                23: "22.77%",
                24: "55.44%",
                25: "55.44%",
                26: "6.07%\r",
              },
              91: {
                0: "Transportation (Railroads)",
                1: "6",
                2: "-1.47%",
                3: "39.13%",
                4: "12.97%",
                5: "23.12%",
                6: "0.74",
                7: "0.84",
                8: "4.92%",
                9: "16.83%",
                10: "1.92%",
                11: "18.39%",
                12: "4.27%",
                13: "0.40",
                14: "8.10",
                15: "15.46",
                16: "20.93",
                17: "5.82",
                18: "28.55",
                19: "1.65%",
                20: "16.36%",
                21: "4.45%",
                22: "12.83%",
                23: "21.47%",
                24: "41.03%",
                25: "41.03%",
                26: "38.69%\r",
              },
              92: {
                0: "Trucking",
                1: "35",
                2: "3.06%",
                3: "-2.88%",
                4: "-4.04%",
                5: "21.68%",
                6: "0.95",
                7: "1.11",
                8: "6.18%",
                9: "38.78%",
                10: "2.58%",
                11: "25.24%",
                12: "5.09%",
                13: "0.84",
                14: "2.73",
                15: "10.06",
                16: "NA",
                17: "4.81",
                18: "46.74",
                19: "6.07%",
                20: "-0.80%",
                21: "-8.67%",
                22: "NA",
                23: "-17.70%",
                24: "0.27%",
                25: "0.27%",
                26: "-5.07%\r",
              },
              93: {
                0: "Utility (General)",
                1: "16",
                2: "2.27%",
                3: "20.40%",
                4: "6.79%",
                5: "11.72%",
                6: "0.49",
                7: "0.74",
                8: "4.42%",
                9: "18.44%",
                10: "1.92%",
                11: "42.76%",
                12: "3.13%",
                13: "0.37",
                14: "4.14",
                15: "12.15",
                16: "20.53",
                17: "1.84",
                18: "18.73",
                19: "9.01%",
                20: "31.15%",
                21: "19.90%",
                22: "110.40%",
                23: "7.49%",
                24: "100.90%",
                25: "100.90%",
                26: "20.15%\r",
              },
              94: {
                0: "Utility (Water)",
                1: "17",
                2: "12.74%",
                3: "30.46%",
                4: "8.05%",
                5: "18.75%",
                6: "0.57",
                7: "0.73",
                8: "4.39%",
                9: "35.96%",
                10: "2.58%",
                11: "28.81%",
                12: "3.67%",
                13: "0.30",
                14: "9.79",
                15: "20.92",
                16: "32.16",
                17: "3.51",
                18: "62.39",
                19: "16.95%",
                20: "47.28%",
                21: "96.62%",
                22: "394.54%",
                23: "8.25%",
                24: "66.37%",
                25: "71.31%",
                26: "30.21%\r",
              },
              95: {
                0: "Total Market",
                1: "7582",
                2: "8.86%",
                3: "9.62%",
                4: "6.05%",
                5: "17.76%",
                6: "0.75",
                7: "0.94",
                8: "5.37%",
                9: "41.21%",
                10: "3.00%",
                11: "32.58%",
                12: "4.34%",
                13: "0.67",
                14: "3.65",
                15: "20.02",
                16: "36.46",
                17: "3.81",
                18: "103.25",
                19: "-36.10%",
                20: "5.60%",
                21: "2.57%",
                22: "33.16%",
                23: "8.25%",
                24: "71.31%",
                25: "71.31%",
                26: "9.61%\r",
              },
              96: {
                0: "Total Market (without financials)",
                1: "6253",
                2: "9.40%",
                3: "9.93%",
                4: "10.58%",
                5: "17.74%",
                6: "0.86",
                7: "0.98",
                8: "5.55%",
                9: "44.77%",
                10: "3.00%",
                11: "20.07%",
                12: "4.87%",
                13: "1.11",
                14: "3.20",
                15: "16.52",
                16: "30.62",
                17: "4.75",
                18: "87.08",
                19: "8.28%",
                20: "5.91%",
                21: "2.54%",
                22: "29.40%",
                23: "7.78%",
                24: "83.97%",
                25: "83.97%",
                26: "9.93%\r",
              },
            },
          },
          {
            name: "Industry Averages (Global)",
            freeze: "B2",
            styles: [],
            merges: [],
            rows: {},
            cols: {
              0: {
                width: 263,
              },
            },
            validations: [],
            autofilter: {},
            cellsSerialized: {
              0: {
                0: "Industry Name",
                1: "Number of firms",
                2: "Annual Average Revenue growth - Last 5 years",
                3: "Pre-tax Operating Margin (Unadjusted)",
                4: "After-tax ROC",
                5: "Average effective tax rate",
                6: "Unlevered Beta",
                7: "Equity (Levered) Beta",
                8: "Cost of equity",
                9: "Std deviation in stock prices",
                10: "Pre-tax cost of debt",
                11: "Market Debt/Capital",
                12: "Cost of capital",
                13: "Sales/Capital",
                14: "EV/Sales",
                15: "EV/EBITDA",
                16: "EV/EBIT",
                17: "Price/Book",
                18: "Trailing PE",
                19: "Non-cash WC as % of Revenues",
                20: "Cap Ex as % of Revenues",
                21: "Net Cap Ex as % of Revenues",
                22: "Reinvestment Rate",
                23: "ROE",
                24: "Dividend Payout Ratio",
                25: "Equity Reinvestment Rate",
                26: "Pre-tax Operating Margin (Lease & R&D adjusted)\r",
              },
              1: {
                0: "Advertising",
                1: "348",
                2: "4.97%",
                3: "4.64%",
                4: "9.34%",
                5: "24.99%",
                6: "0.99",
                7: "1.13",
                8: "7.45%",
                9: "37.24%",
                10: "3.53%",
                11: "29.05%",
                12: "6.04%",
                13: "2.14",
                14: "1.71",
                15: "12.74",
                16: "29.57",
                17: "2.51",
                18: "69.03",
                19: "-2.88%",
                20: "1.90%",
                21: "1.18%",
                22: "-10.61%",
                23: "-3.95%",
                24: "0.90%",
                25: "0.90%",
                26: "4.96%\r",
              },
              2: {
                0: "Aerospace/Defense",
                1: "255",
                2: "7.84%",
                3: "5.47%",
                4: "11.42%",
                5: "21.36%",
                6: "1.00",
                7: "1.13",
                8: "7.45%",
                9: "32.56%",
                10: "3.53%",
                11: "23.06%",
                12: "6.34%",
                13: "2.11",
                14: "1.93",
                15: "14.01",
                16: "26.86",
                17: "4.62",
                18: "76.25",
                19: "39.36%",
                20: "3.30%",
                21: "-0.20%",
                22: "66.51%",
                23: "-0.18%",
                24: "1.03%",
                25: "1.03%",
                26: "5.93%\r",
              },
              3: {
                0: "Air Transport",
                1: "156",
                2: "-2.62%",
                3: "-14.64%",
                4: "-9.24%",
                5: "31.44%",
                6: "0.92",
                7: "1.56",
                8: "9.89%",
                9: "32.76%",
                10: "3.53%",
                11: "55.24%",
                12: "5.87%",
                13: "0.65",
                14: "2.49",
                15: "24.89",
                16: "NA",
                17: "2.62",
                18: "140.70",
                19: "-7.42%",
                20: "12.67%",
                21: "0.44%",
                22: "NA",
                23: "-35.47%",
                24: "2.09%",
                25: "2.09%",
                26: "-15.15%\r",
              },
              4: {
                0: "Apparel",
                1: "1188",
                2: "-1.94%",
                3: "7.90%",
                4: "8.75%",
                5: "27.63%",
                6: "0.85",
                7: "0.92",
                8: "6.23%",
                9: "31.18%",
                10: "3.53%",
                11: "18.04%",
                12: "5.57%",
                13: "1.23",
                14: "2.90",
                15: "21.19",
                16: "35.17",
                17: "3.65",
                18: "95.19",
                19: "24.69%",
                20: "4.34%",
                21: "1.31%",
                22: "24.78%",
                23: "2.44%",
                24: "171.53%",
                25: "171.53%",
                26: "8.03%\r",
              },
              5: {
                0: "Auto & Truck",
                1: "144",
                2: "0.90%",
                3: "2.61%",
                4: "2.02%",
                5: "26.40%",
                6: "1.01",
                7: "1.39",
                8: "8.94%",
                9: "30.83%",
                10: "3.53%",
                11: "42.91%",
                12: "6.22%",
                13: "0.86",
                14: "1.53",
                15: "19.79",
                16: "53.78",
                17: "1.76",
                18: "156.27",
                19: "0.62%",
                20: "6.76%",
                21: "3.31%",
                22: "107.02%",
                23: "1.91%",
                24: "121.63%",
                25: "121.63%",
                26: "2.71%\r",
              },
              6: {
                0: "Auto Parts",
                1: "709",
                2: "1.85%",
                3: "2.62%",
                4: "3.40%",
                5: "24.18%",
                6: "1.28",
                7: "1.40",
                8: "9.00%",
                9: "29.94%",
                10: "3.53%",
                11: "25.58%",
                12: "7.37%",
                13: "1.38",
                14: "1.05",
                15: "11.24",
                16: "36.17",
                17: "1.72",
                18: "78.99",
                19: "12.31%",
                20: "5.82%",
                21: "3.45%",
                22: "175.13%",
                23: "-1.61%",
                24: "0.71%",
                25: "0.71%",
                26: "2.79%\r",
              },
              7: {
                0: "Bank (Money Center)",
                1: "620",
                2: "8.45%",
                3: "0.20%",
                4: "0.02%",
                5: "20.18%",
                6: "0.48",
                7: "1.00",
                8: "6.67%",
                9: "21.18%",
                10: "2.87%",
                11: "75.42%",
                12: "3.24%",
                13: "0.12",
                14: "7.75",
                15: "NA",
                16: "NA",
                17: "0.81",
                18: "71.41",
                19: "NA",
                20: "3.32%",
                21: "4.09%",
                22: "1965.58%",
                23: "7.70%",
                24: "37.39%",
                25: "37.39%",
                26: "0.22%\r",
              },
              8: {
                0: "Banks (Regional)",
                1: "850",
                2: "7.10%",
                3: "-0.02%",
                4: "-0.03%",
                5: "19.24%",
                6: "0.54",
                7: "0.69",
                8: "4.92%",
                9: "19.26%",
                10: "2.87%",
                11: "66.12%",
                12: "3.07%",
                13: "0.18",
                14: "4.94",
                15: "NA",
                16: "NA",
                17: "0.81",
                18: "17.68",
                19: "NA",
                20: "4.10%",
                21: "2.66%",
                22: "NA",
                23: "7.26%",
                24: "54.40%",
                25: "54.40%",
                26: "-0.21%\r",
              },
              9: {
                0: "Beverage (Alcoholic)",
                1: "223",
                2: "7.34%",
                3: "20.27%",
                4: "11.49%",
                5: "25.18%",
                6: "0.73",
                7: "0.80",
                8: "5.56%",
                9: "24.28%",
                10: "2.87%",
                11: "15.01%",
                12: "5.04%",
                13: "0.68",
                14: "5.86",
                15: "22.59",
                16: "28.80",
                17: "4.95",
                18: "163.77",
                19: "10.26%",
                20: "5.02%",
                21: "3.93%",
                22: "24.69%",
                23: "9.14%",
                24: "72.96%",
                25: "72.96%",
                26: "20.31%\r",
              },
              10: {
                0: "Beverage (Soft)",
                1: "108",
                2: "6.39%",
                3: "15.00%",
                4: "19.81%",
                5: "22.09%",
                6: "0.65",
                7: "0.72",
                8: "5.07%",
                9: "31.20%",
                10: "3.53%",
                11: "17.57%",
                12: "4.64%",
                13: "1.47",
                14: "3.79",
                15: "19.29",
                16: "25.14",
                17: "5.90",
                18: "82.18",
                19: "-5.54%",
                20: "5.35%",
                21: "4.95%",
                22: "36.27%",
                23: "19.34%",
                24: "78.48%",
                25: "78.48%",
                26: "15.08%\r",
              },
              11: {
                0: "Broadcasting",
                1: "146",
                2: "1.32%",
                3: "14.79%",
                4: "12.96%",
                5: "23.93%",
                6: "0.69",
                7: "0.98",
                8: "6.55%",
                9: "31.23%",
                10: "3.53%",
                11: "43.51%",
                12: "4.83%",
                13: "1.00",
                14: "1.80",
                15: "8.14",
                16: "11.77",
                17: "1.35",
                18: "26.64",
                19: "14.64%",
                20: "3.62%",
                21: "-0.03%",
                22: "80.75%",
                23: "1.95%",
                24: "127.73%",
                25: "127.73%",
                26: "14.67%\r",
              },
              12: {
                0: "Brokerage & Investment Banking",
                1: "575",
                2: "8.36%",
                3: "1.03%",
                4: "0.15%",
                5: "22.23%",
                6: "0.42",
                7: "0.86",
                8: "5.87%",
                9: "29.64%",
                10: "3.53%",
                11: "66.17%",
                12: "3.71%",
                13: "0.19",
                14: "6.62",
                15: "NA",
                16: "NA",
                17: "1.60",
                18: "44.20",
                19: "-204.02%",
                20: "3.72%",
                21: "1.74%",
                22: "-1022.63%",
                23: "10.25%",
                24: "51.59%",
                25: "51.59%",
                26: "0.89%\r",
              },
              13: {
                0: "Building Materials",
                1: "439",
                2: "1.99%",
                3: "8.62%",
                4: "12.21%",
                5: "25.58%",
                6: "0.91",
                7: "0.99",
                8: "6.64%",
                9: "27.51%",
                10: "3.53%",
                11: "19.90%",
                12: "5.83%",
                13: "1.66",
                14: "1.81",
                15: "13.58",
                16: "20.47",
                17: "2.90",
                18: "66.92",
                19: "17.07%",
                20: "4.14%",
                21: "3.13%",
                22: "35.43%",
                23: "8.69%",
                24: "41.47%",
                25: "41.47%",
                26: "8.78%\r",
              },
              14: {
                0: "Business & Consumer Services",
                1: "923",
                2: "7.37%",
                3: "7.61%",
                4: "16.20%",
                5: "25.59%",
                6: "0.91",
                7: "0.99",
                8: "6.63%",
                9: "32.24%",
                10: "3.53%",
                11: "17.75%",
                12: "5.91%",
                13: "2.45",
                14: "2.17",
                15: "17.28",
                16: "27.40",
                17: "4.54",
                18: "90.75",
                19: "8.91%",
                20: "2.69%",
                21: "0.88%",
                22: "-0.61%",
                23: "8.88%",
                24: "70.65%",
                25: "70.65%",
                26: "7.82%\r",
              },
              15: {
                0: "Cable TV",
                1: "60",
                2: "1.85%",
                3: "18.12%",
                4: "11.27%",
                5: "22.91%",
                6: "0.78",
                7: "1.05",
                8: "7.00%",
                9: "30.64%",
                10: "3.53%",
                11: "34.48%",
                12: "5.49%",
                13: "0.73",
                14: "3.67",
                15: "10.40",
                16: "19.34",
                17: "2.75",
                18: "41.40",
                19: "-0.07%",
                20: "11.70%",
                21: "-2.11%",
                22: "-15.90%",
                23: "10.47%",
                24: "32.91%",
                25: "32.91%",
                26: "18.07%\r",
              },
              16: {
                0: "Chemical (Basic)",
                1: "844",
                2: "5.61%",
                3: "6.49%",
                4: "5.83%",
                5: "22.47%",
                6: "0.93",
                7: "1.07",
                8: "7.09%",
                9: "28.52%",
                10: "3.53%",
                11: "25.80%",
                12: "5.93%",
                13: "1.04",
                14: "1.76",
                15: "13.32",
                16: "26.30",
                17: "1.90",
                18: "47.06",
                19: "12.17%",
                20: "8.99%",
                21: "5.70%",
                22: "104.08%",
                23: "3.97%",
                24: "135.95%",
                25: "135.95%",
                26: "6.60%\r",
              },
              17: {
                0: "Chemical (Diversified)",
                1: "73",
                2: "3.34%",
                3: "3.81%",
                4: "3.12%",
                5: "24.81%",
                6: "1.05",
                7: "1.33",
                8: "8.57%",
                9: "24.89%",
                10: "2.87%",
                11: "34.88%",
                12: "6.32%",
                13: "0.97",
                14: "1.37",
                15: "12.96",
                16: "35.24",
                17: "1.45",
                18: "129.62",
                19: "19.36%",
                20: "6.77%",
                21: "2.95%",
                22: "71.18%",
                23: "-2.95%",
                24: "3.33%",
                25: "3.33%",
                26: "3.92%\r",
              },
              18: {
                0: "Chemical (Specialty)",
                1: "861",
                2: "5.37%",
                3: "9.71%",
                4: "8.83%",
                5: "21.58%",
                6: "0.99",
                7: "1.08",
                8: "7.16%",
                9: "30.27%",
                10: "3.53%",
                11: "17.80%",
                12: "6.35%",
                13: "1.06",
                14: "2.75",
                15: "15.89",
                16: "27.73",
                17: "2.87",
                18: "61.44",
                19: "17.88%",
                20: "7.59%",
                21: "3.47%",
                22: "35.00%",
                23: "5.33%",
                24: "89.61%",
                25: "89.61%",
                26: "9.80%\r",
              },
              19: {
                0: "Coal & Related Energy",
                1: "222",
                2: "6.57%",
                3: "12.18%",
                4: "10.53%",
                5: "23.72%",
                6: "0.90",
                7: "1.01",
                8: "6.77%",
                9: "40.87%",
                10: "3.95%",
                11: "35.54%",
                12: "5.40%",
                13: "0.92",
                14: "1.23",
                15: "5.59",
                16: "9.53",
                17: "0.96",
                18: "22.51",
                19: "-1.76%",
                20: "8.03%",
                21: "2.34%",
                22: "44.52%",
                23: "7.60%",
                24: "98.30%",
                25: "98.30%",
                26: "12.24%\r",
              },
              20: {
                0: "Computer Services",
                1: "1007",
                2: "6.15%",
                3: "6.92%",
                4: "19.18%",
                5: "22.24%",
                6: "1.00",
                7: "1.05",
                8: "6.98%",
                9: "31.02%",
                10: "3.53%",
                11: "15.55%",
                12: "6.30%",
                13: "3.21",
                14: "1.44",
                15: "14.01",
                16: "20.07",
                17: "3.87",
                18: "60.30",
                19: "13.18%",
                20: "1.66%",
                21: "1.02%",
                22: "9.83%",
                23: "14.32%",
                24: "51.51%",
                25: "51.51%",
                26: "7.11%\r",
              },
              21: {
                0: "Computers/Peripherals",
                1: "337",
                2: "0.58%",
                3: "10.06%",
                4: "15.10%",
                5: "18.88%",
                6: "1.23",
                7: "1.27",
                8: "8.22%",
                9: "31.51%",
                10: "3.53%",
                11: "9.64%",
                12: "7.68%",
                13: "1.65",
                14: "2.80",
                15: "18.05",
                16: "27.54",
                17: "6.21",
                18: "57.75",
                19: "1.62%",
                20: "4.48%",
                21: "2.92%",
                22: "35.94%",
                23: "19.09%",
                24: "34.57%",
                25: "34.57%",
                26: "10.38%\r",
              },
              22: {
                0: "Construction Supplies",
                1: "753",
                2: "3.73%",
                3: "9.32%",
                4: "9.45%",
                5: "22.25%",
                6: "0.95",
                7: "1.10",
                8: "7.24%",
                9: "28.73%",
                10: "3.53%",
                11: "28.91%",
                12: "5.90%",
                13: "1.16",
                14: "1.59",
                15: "10.90",
                16: "16.46",
                17: "1.76",
                18: "49.38",
                19: "10.10%",
                20: "5.06%",
                21: "1.83%",
                22: "4.86%",
                23: "7.99%",
                24: "59.34%",
                25: "59.34%",
                26: "9.44%\r",
              },
              23: {
                0: "Diversified",
                1: "324",
                2: "5.64%",
                3: "12.43%",
                4: "8.55%",
                5: "20.38%",
                6: "0.73",
                7: "0.99",
                8: "6.63%",
                9: "23.45%",
                10: "2.87%",
                11: "40.32%",
                12: "4.81%",
                13: "0.79",
                14: "1.82",
                15: "10.24",
                16: "14.18",
                17: "1.09",
                18: "38.05",
                19: "-20.77%",
                20: "5.34%",
                21: "2.93%",
                22: "34.76%",
                23: "7.74%",
                24: "33.96%",
                25: "33.96%",
                26: "12.45%\r",
              },
              24: {
                0: "Drugs (Biotechnology)",
                1: "1139",
                2: "24.87%",
                3: "6.21%",
                4: "4.85%",
                5: "13.52%",
                6: "0.97",
                7: "0.98",
                8: "6.60%",
                9: "45.63%",
                10: "3.95%",
                11: "9.87%",
                12: "6.24%",
                13: "0.49",
                14: "10.37",
                15: "18.61",
                16: "106.34",
                17: "7.30",
                18: "547.85",
                19: "18.82%",
                20: "5.30%",
                21: "31.56%",
                22: "1540.41%",
                23: "-4.38%",
                24: "0.31%",
                25: "0.31%",
                26: "10.03%\r",
              },
              25: {
                0: "Drugs (Pharmaceutical)",
                1: "1319",
                2: "16.98%",
                3: "16.85%",
                4: "12.50%",
                5: "16.97%",
                6: "0.93",
                7: "1.00",
                8: "6.67%",
                9: "39.92%",
                10: "3.53%",
                11: "15.01%",
                12: "6.06%",
                13: "0.76",
                14: "4.38",
                15: "15.07",
                16: "24.39",
                17: "3.90",
                18: "78.51",
                19: "17.08%",
                20: "4.70%",
                21: "5.09%",
                22: "44.04%",
                23: "10.90%",
                24: "82.24%",
                25: "82.24%",
                26: "18.09%\r",
              },
              26: {
                0: "Education",
                1: "250",
                2: "12.70%",
                3: "7.21%",
                4: "7.55%",
                5: "19.57%",
                6: "0.95",
                7: "0.98",
                8: "6.56%",
                9: "32.66%",
                10: "3.53%",
                11: "12.58%",
                12: "6.06%",
                13: "1.09",
                14: "4.88",
                15: "23.88",
                16: "58.55",
                17: "4.84",
                18: "58.53",
                19: "2.19%",
                20: "6.50%",
                21: "6.57%",
                22: "131.05%",
                23: "-0.28%",
                24: "0.65%",
                25: "0.65%",
                26: "7.76%\r",
              },
              27: {
                0: "Electrical Equipment",
                1: "950",
                2: "6.30%",
                3: "5.69%",
                4: "8.17%",
                5: "20.79%",
                6: "1.06",
                7: "1.09",
                8: "7.20%",
                9: "32.30%",
                10: "3.53%",
                11: "13.59%",
                12: "6.57%",
                13: "1.54",
                14: "2.34",
                15: "20.35",
                16: "36.59",
                17: "3.31",
                18: "71.44",
                19: "23.33%",
                20: "4.82%",
                21: "3.47%",
                22: "54.82%",
                23: "6.63%",
                24: "66.75%",
                25: "66.75%",
                26: "5.99%\r",
              },
              28: {
                0: "Electronics (Consumer & Office)",
                1: "142",
                2: "0.81%",
                3: "4.83%",
                4: "7.21%",
                5: "9.75%",
                6: "1.15",
                7: "1.22",
                8: "7.98%",
                9: "34.39%",
                10: "3.53%",
                11: "23.94%",
                12: "6.69%",
                13: "1.57",
                14: "1.08",
                15: "11.50",
                16: "21.32",
                17: "2.07",
                18: "46.44",
                19: "-0.85%",
                20: "5.52%",
                21: "3.77%",
                22: "75.48%",
                23: "12.12%",
                24: "23.66%",
                25: "23.66%",
                26: "5.10%\r",
              },
              29: {
                0: "Electronics (General)",
                1: "1387",
                2: "5.04%",
                3: "6.13%",
                4: "8.69%",
                5: "20.99%",
                6: "1.25",
                7: "1.24",
                8: "8.10%",
                9: "31.04%",
                10: "3.53%",
                11: "12.69%",
                12: "7.40%",
                13: "1.52",
                14: "1.89",
                15: "16.69",
                16: "29.75",
                17: "2.96",
                18: "85.41",
                19: "17.58%",
                20: "5.98%",
                21: "4.47%",
                22: "103.69%",
                23: "6.81%",
                24: "59.84%",
                25: "59.84%",
                26: "6.48%\r",
              },
              30: {
                0: "Engineering/Construction",
                1: "1263",
                2: "3.73%",
                3: "4.93%",
                4: "8.89%",
                5: "25.90%",
                6: "0.77",
                7: "1.04",
                8: "6.92%",
                9: "29.24%",
                10: "3.53%",
                11: "49.91%",
                12: "4.77%",
                13: "2.02",
                14: "0.60",
                15: "8.22",
                16: "11.64",
                17: "0.99",
                18: "52.36",
                19: "16.22%",
                20: "3.52%",
                21: "2.88%",
                22: "129.78%",
                23: "7.89%",
                24: "62.95%",
                25: "62.95%",
                26: "5.21%\r",
              },
              31: {
                0: "Entertainment",
                1: "725",
                2: "8.47%",
                3: "7.71%",
                4: "8.75%",
                5: "15.40%",
                6: "1.04",
                7: "1.07",
                8: "7.10%",
                9: "39.45%",
                10: "3.53%",
                11: "11.53%",
                12: "6.58%",
                13: "1.16",
                14: "5.43",
                15: "26.54",
                16: "58.66",
                17: "4.62",
                18: "128.44",
                19: "1.79%",
                20: "4.27%",
                21: "0.93%",
                22: "15.88%",
                23: "-1.27%",
                24: "0.21%",
                25: "0.21%",
                26: "8.04%\r",
              },
              32: {
                0: "Environmental & Waste Services",
                1: "344",
                2: "9.85%",
                3: "10.33%",
                4: "11.62%",
                5: "21.08%",
                6: "0.87",
                7: "1.01",
                8: "6.77%",
                9: "35.25%",
                10: "3.53%",
                11: "24.78%",
                12: "5.74%",
                13: "1.26",
                14: "2.80",
                15: "14.66",
                16: "26.16",
                17: "3.14",
                18: "86.82",
                19: "11.38%",
                20: "9.87%",
                21: "6.59%",
                22: "109.95%",
                23: "5.78%",
                24: "93.63%",
                25: "93.63%",
                26: "10.45%\r",
              },
              33: {
                0: "Farming/Agriculture",
                1: "410",
                2: "6.19%",
                3: "6.76%",
                4: "7.42%",
                5: "19.35%",
                6: "0.71",
                7: "0.89",
                8: "6.08%",
                9: "30.72%",
                10: "3.53%",
                11: "31.69%",
                12: "4.98%",
                13: "1.22",
                14: "1.45",
                15: "14.11",
                16: "20.68",
                17: "2.30",
                18: "50.26",
                19: "15.49%",
                20: "5.80%",
                21: "3.68%",
                22: "53.80%",
                23: "9.45%",
                24: "40.75%",
                25: "40.75%",
                26: "6.88%\r",
              },
              34: {
                0: "Financial Svcs. (Non-bank & Insurance)",
                1: "1096",
                2: "8.98%",
                3: "9.17%",
                4: "0.52%",
                5: "18.41%",
                6: "0.16",
                7: "0.80",
                8: "5.57%",
                9: "29.68%",
                10: "3.53%",
                11: "85.72%",
                12: "3.03%",
                13: "0.07",
                14: "17.21",
                15: "113.76",
                16: "154.77",
                17: "1.42",
                18: "67.24",
                19: "NA",
                20: "5.91%",
                21: "8.11%",
                22: "117.19%",
                23: "13.96%",
                24: "27.98%",
                25: "27.98%",
                26: "9.14%\r",
              },
              35: {
                0: "Food Processing",
                1: "1322",
                2: "7.06%",
                3: "9.42%",
                4: "13.97%",
                5: "21.67%",
                6: "0.71",
                7: "0.78",
                8: "5.45%",
                9: "26.95%",
                10: "3.53%",
                11: "18.92%",
                12: "4.91%",
                13: "1.72",
                14: "1.87",
                15: "14.14",
                16: "19.48",
                17: "3.03",
                18: "72.32",
                19: "9.34%",
                20: "4.68%",
                21: "3.14%",
                22: "44.80%",
                23: "13.03%",
                24: "47.24%",
                25: "47.24%",
                26: "9.48%\r",
              },
              36: {
                0: "Food Wholesalers",
                1: "155",
                2: "4.76%",
                3: "1.88%",
                4: "7.69%",
                5: "24.77%",
                6: "0.54",
                7: "0.76",
                8: "5.28%",
                9: "30.09%",
                10: "3.53%",
                11: "44.07%",
                12: "4.10%",
                13: "4.77",
                14: "0.45",
                15: "12.84",
                16: "23.74",
                17: "2.07",
                18: "43.34",
                19: "4.30%",
                20: "1.33%",
                21: "1.64%",
                22: "68.53%",
                23: "1.60%",
                24: "304.31%",
                25: "304.31%",
                26: "1.86%\r",
              },
              37: {
                0: "Furn/Home Furnishings",
                1: "357",
                2: "4.74%",
                3: "7.16%",
                4: "14.95%",
                5: "18.10%",
                6: "1.02",
                7: "1.01",
                8: "6.76%",
                9: "28.09%",
                10: "3.53%",
                11: "14.93%",
                12: "6.14%",
                13: "2.37",
                14: "1.68",
                15: "15.59",
                16: "22.64",
                17: "3.61",
                18: "40.27",
                19: "4.16%",
                20: "3.43%",
                21: "1.55%",
                22: "-6.37%",
                23: "11.90%",
                24: "58.73%",
                25: "58.73%",
                26: "7.40%\r",
              },
              38: {
                0: "Green & Renewable Energy",
                1: "226",
                2: "12.06%",
                3: "34.37%",
                4: "7.23%",
                5: "16.20%",
                6: "0.69",
                7: "0.95",
                8: "6.38%",
                9: "31.15%",
                10: "3.53%",
                11: "35.73%",
                12: "5.03%",
                13: "0.24",
                14: "8.97",
                15: "15.68",
                16: "25.87",
                17: "2.12",
                18: "194.24",
                19: "6.86%",
                20: "27.23%",
                21: "16.01%",
                22: "69.27%",
                23: "7.25%",
                24: "107.12%",
                25: "107.12%",
                26: "34.26%\r",
              },
              39: {
                0: "Healthcare Products",
                1: "816",
                2: "12.11%",
                3: "14.47%",
                4: "13.14%",
                5: "16.35%",
                6: "0.93",
                7: "0.96",
                8: "6.45%",
                9: "38.32%",
                10: "3.53%",
                11: "8.87%",
                12: "6.11%",
                13: "0.96",
                14: "6.51",
                15: "27.02",
                16: "42.65",
                17: "5.48",
                18: "421.87",
                19: "25.02%",
                20: "5.25%",
                21: "7.86%",
                22: "78.36%",
                23: "10.56%",
                24: "37.17%",
                25: "37.17%",
                26: "14.68%\r",
              },
              40: {
                0: "Healthcare Support Services",
                1: "413",
                2: "12.89%",
                3: "5.02%",
                4: "26.55%",
                5: "24.08%",
                6: "0.76",
                7: "0.87",
                8: "5.94%",
                9: "33.20%",
                10: "3.53%",
                11: "24.77%",
                12: "5.12%",
                13: "6.24",
                14: "0.73",
                15: "10.85",
                16: "14.31",
                17: "2.64",
                18: "86.38",
                19: "-1.69%",
                20: "0.99%",
                21: "0.84%",
                22: "21.96%",
                23: "14.37%",
                24: "29.27%",
                25: "29.27%",
                26: "4.92%\r",
              },
              41: {
                0: "Heathcare Information and Technology",
                1: "423",
                2: "15.79%",
                3: "12.88%",
                4: "14.92%",
                5: "17.03%",
                6: "0.97",
                7: "1.00",
                8: "6.67%",
                9: "40.10%",
                10: "3.95%",
                11: "7.74%",
                12: "6.38%",
                13: "1.18",
                14: "8.66",
                15: "36.66",
                16: "61.78",
                17: "8.08",
                18: "117.85",
                19: "22.07%",
                20: "5.53%",
                21: "2.78%",
                22: "40.65%",
                23: "12.88%",
                24: "14.17%",
                25: "14.17%",
                26: "13.46%\r",
              },
              42: {
                0: "Homebuilding",
                1: "167",
                2: "6.43%",
                3: "10.44%",
                4: "9.50%",
                5: "22.59%",
                6: "1.16",
                7: "1.31",
                8: "8.46%",
                9: "28.33%",
                10: "3.53%",
                11: "29.01%",
                12: "6.76%",
                13: "1.26",
                14: "1.21",
                15: "9.93",
                16: "12.77",
                17: "1.57",
                18: "174.93",
                19: "60.81%",
                20: "1.03%",
                21: "1.22%",
                22: "17.37%",
                23: "13.35%",
                24: "21.56%",
                25: "21.56%",
                26: "9.42%\r",
              },
              43: {
                0: "Hospitals/Healthcare Facilities",
                1: "216",
                2: "5.77%",
                3: "9.26%",
                4: "8.54%",
                5: "21.65%",
                6: "0.66",
                7: "0.86",
                8: "5.88%",
                9: "27.17%",
                10: "3.53%",
                11: "34.03%",
                12: "4.77%",
                13: "1.16",
                14: "2.66",
                15: "15.14",
                16: "27.53",
                17: "4.61",
                18: "80.44",
                19: "3.99%",
                20: "7.08%",
                21: "2.41%",
                22: "15.27%",
                23: "6.71%",
                24: "61.27%",
                25: "61.27%",
                26: "8.67%\r",
              },
              44: {
                0: "Hotel/Gaming",
                1: "641",
                2: "-0.95%",
                3: "-5.75%",
                4: "-3.03%",
                5: "20.95%",
                6: "0.85",
                7: "1.09",
                8: "7.21%",
                9: "31.46%",
                10: "3.53%",
                11: "35.18%",
                12: "5.59%",
                13: "0.46",
                14: "5.26",
                15: "30.70",
                16: "NA",
                17: "2.92",
                18: "125.16",
                19: "0.65%",
                20: "13.81%",
                21: "5.80%",
                22: "NA",
                23: "-14.75%",
                24: "1.38%",
                25: "1.38%",
                26: "-7.15%\r",
              },
              45: {
                0: "Household Products",
                1: "568",
                2: "5.95%",
                3: "15.82%",
                4: "22.37%",
                5: "23.56%",
                6: "0.87",
                7: "0.91",
                8: "6.17%",
                9: "35.24%",
                10: "3.53%",
                11: "10.63%",
                12: "5.79%",
                13: "1.59",
                14: "3.84",
                15: "18.64",
                16: "23.87",
                17: "6.13",
                18: "73.09",
                19: "5.63%",
                20: "3.60%",
                21: "3.14%",
                22: "19.93%",
                23: "16.80%",
                24: "65.42%",
                25: "65.42%",
                26: "15.89%\r",
              },
              46: {
                0: "Information Services",
                1: "244",
                2: "15.57%",
                3: "20.18%",
                4: "21.09%",
                5: "20.72%",
                6: "1.14",
                7: "1.18",
                8: "7.72%",
                9: "38.54%",
                10: "3.53%",
                11: "8.75%",
                12: "7.27%",
                13: "1.20",
                14: "9.67",
                15: "32.31",
                16: "46.25",
                17: "8.32",
                18: "62.48",
                19: "4.48%",
                20: "3.07%",
                21: "0.35%",
                22: "-0.36%",
                23: "13.12%",
                24: "34.56%",
                25: "34.56%",
                26: "20.26%\r",
              },
              47: {
                0: "Insurance (General)",
                1: "220",
                2: "5.63%",
                3: "8.44%",
                4: "10.30%",
                5: "23.03%",
                6: "0.66",
                7: "0.75",
                8: "5.27%",
                9: "23.27%",
                10: "2.87%",
                11: "32.12%",
                12: "4.26%",
                13: "1.45",
                14: "1.04",
                15: "9.33",
                16: "12.25",
                17: "1.23",
                18: "72.14",
                19: "-3.14%",
                20: "0.70%",
                21: "-0.37%",
                22: "-15.00%",
                23: "7.20%",
                24: "46.27%",
                25: "46.27%",
                26: "8.45%\r",
              },
              48: {
                0: "Insurance (Life)",
                1: "133",
                2: "9.32%",
                3: "9.68%",
                4: "10.70%",
                5: "16.10%",
                6: "0.96",
                7: "1.00",
                8: "6.70%",
                9: "23.85%",
                10: "2.87%",
                11: "49.24%",
                12: "4.44%",
                13: "1.30",
                14: "0.91",
                15: "8.59",
                16: "9.21",
                17: "0.95",
                18: "52.07",
                19: "-104.40%",
                20: "0.56%",
                21: "0.44%",
                22: "63.24%",
                23: "7.89%",
                24: "45.64%",
                25: "45.64%",
                26: "9.68%\r",
              },
              49: {
                0: "Insurance (Prop/Cas.)",
                1: "229",
                2: "4.31%",
                3: "8.34%",
                4: "9.45%",
                5: "19.80%",
                6: "0.65",
                7: "0.72",
                8: "5.09%",
                9: "24.51%",
                10: "2.87%",
                11: "24.16%",
                12: "4.38%",
                13: "1.33",
                14: "1.04",
                15: "9.57",
                16: "11.60",
                17: "1.22",
                18: "26.18",
                19: "-39.68%",
                20: "0.86%",
                21: "0.06%",
                22: "13.85%",
                23: "7.40%",
                24: "46.02%",
                25: "46.02%",
                26: "8.34%\r",
              },
              50: {
                0: "Investments & Asset Management",
                1: "1234",
                2: "9.61%",
                3: "17.10%",
                4: "4.62%",
                5: "21.14%",
                6: "0.55",
                7: "0.78",
                8: "5.45%",
                9: "30.37%",
                10: "3.53%",
                11: "44.81%",
                12: "4.18%",
                13: "0.29",
                14: "5.79",
                15: "18.31",
                16: "23.24",
                17: "1.54",
                18: "198.87",
                19: "NA",
                20: "2.43%",
                21: "6.22%",
                22: "57.93%",
                23: "7.24%",
                24: "67.27%",
                25: "67.27%",
                26: "17.02%\r",
              },
              51: {
                0: "Machinery",
                1: "1385",
                2: "3.57%",
                3: "7.82%",
                4: "9.55%",
                5: "23.83%",
                6: "1.07",
                7: "1.11",
                8: "7.33%",
                9: "27.34%",
                10: "3.53%",
                11: "14.54%",
                12: "6.65%",
                13: "1.41",
                14: "2.22",
                15: "17.09",
                16: "27.40",
                17: "3.05",
                18: "87.50",
                19: "26.31%",
                20: "4.25%",
                21: "3.47%",
                22: "48.14%",
                23: "7.47%",
                24: "56.22%",
                25: "56.22%",
                26: "8.01%\r",
              },
              52: {
                0: "Metals & Mining",
                1: "1620",
                2: "15.56%",
                3: "8.10%",
                4: "8.65%",
                5: "31.30%",
                6: "0.83",
                7: "0.97",
                8: "6.51%",
                9: "53.80%",
                10: "3.95%",
                11: "26.73%",
                12: "5.55%",
                13: "1.10",
                14: "1.64",
                15: "10.20",
                16: "19.25",
                17: "1.98",
                18: "175.10",
                19: "10.39%",
                20: "8.05%",
                21: "4.11%",
                22: "88.51%",
                23: "3.61%",
                24: "179.98%",
                25: "179.98%",
                26: "8.16%\r",
              },
              53: {
                0: "Office Equipment & Services",
                1: "148",
                2: "3.17%",
                3: "6.68%",
                4: "10.69%",
                5: "26.23%",
                6: "1.01",
                7: "1.04",
                8: "6.92%",
                9: "29.31%",
                10: "3.53%",
                11: "20.17%",
                12: "6.05%",
                13: "1.91",
                14: "1.16",
                15: "10.52",
                16: "16.81",
                17: "2.14",
                18: "35.76",
                19: "12.52%",
                20: "2.31%",
                21: "0.36%",
                22: "1.65%",
                23: "6.87%",
                24: "58.26%",
                25: "58.26%",
                26: "6.66%\r",
              },
              54: {
                0: "Oil/Gas (Integrated)",
                1: "49",
                2: "0.74%",
                3: "6.25%",
                4: "4.59%",
                5: "45.14%",
                6: "1.08",
                7: "1.27",
                8: "8.25%",
                9: "24.70%",
                10: "2.87%",
                11: "25.97%",
                12: "6.66%",
                13: "0.85",
                14: "1.66",
                15: "9.65",
                16: "26.38",
                17: "1.59",
                18: "45.52",
                19: "1.88%",
                20: "11.18%",
                21: "0.34%",
                22: "-17.52%",
                23: "-1.43%",
                24: "1.45%",
                25: "1.45%",
                26: "6.30%\r",
              },
              55: {
                0: "Oil/Gas (Production and Exploration)",
                1: "765",
                2: "6.67%",
                3: "-7.50%",
                4: "-2.19%",
                5: "41.03%",
                6: "0.93",
                7: "1.31",
                8: "8.49%",
                9: "50.71%",
                10: "3.95%",
                11: "40.39%",
                12: "6.24%",
                13: "0.32",
                14: "2.78",
                15: "6.11",
                16: "NA",
                17: "1.05",
                18: "52.89",
                19: "-0.05%",
                20: "32.26%",
                21: "-13.78%",
                22: "NA",
                23: "-21.04%",
                24: "0.83%",
                25: "0.83%",
                26: "-7.12%\r",
              },
              56: {
                0: "Oil/Gas Distribution",
                1: "204",
                2: "9.68%",
                3: "16.79%",
                4: "8.07%",
                5: "10.94%",
                6: "0.65",
                7: "1.14",
                8: "7.50%",
                9: "31.31%",
                10: "3.53%",
                11: "52.41%",
                12: "4.94%",
                13: "0.54",
                14: "2.38",
                15: "9.22",
                16: "14.14",
                17: "1.19",
                18: "26.72",
                19: "4.75%",
                20: "13.59%",
                21: "5.78%",
                22: "42.13%",
                23: "5.25%",
                24: "201.87%",
                25: "201.87%",
                26: "16.76%\r",
              },
              57: {
                0: "Oilfield Svcs/Equip.",
                1: "513",
                2: "-2.25%",
                3: "1.27%",
                4: "2.12%",
                5: "14.76%",
                6: "0.91",
                7: "1.23",
                8: "8.00%",
                9: "37.62%",
                10: "3.53%",
                11: "38.26%",
                12: "5.94%",
                13: "1.65",
                14: "0.85",
                15: "12.81",
                16: "54.87",
                17: "1.41",
                18: "35.05",
                19: "6.96%",
                20: "4.95%",
                21: "1.85%",
                22: "90.28%",
                23: "-12.48%",
                24: "0.53%",
                25: "0.53%",
                26: "1.38%\r",
              },
              58: {
                0: "Packaging & Container",
                1: "412",
                2: "2.81%",
                3: "8.80%",
                4: "10.18%",
                5: "23.86%",
                6: "0.71",
                7: "0.88",
                8: "6.02%",
                9: "28.68%",
                10: "3.53%",
                11: "30.40%",
                12: "4.98%",
                13: "1.35",
                14: "1.66",
                15: "10.83",
                16: "18.63",
                17: "2.72",
                18: "35.87",
                19: "11.43%",
                20: "6.04%",
                21: "2.40%",
                22: "28.17%",
                23: "10.06%",
                24: "53.28%",
                25: "53.28%",
                26: "8.93%\r",
              },
              59: {
                0: "Paper/Forest Products",
                1: "287",
                2: "3.25%",
                3: "7.03%",
                4: "5.38%",
                5: "22.56%",
                6: "0.78",
                7: "1.01",
                8: "6.76%",
                9: "29.44%",
                10: "3.53%",
                11: "35.15%",
                12: "5.30%",
                13: "0.87",
                14: "1.57",
                15: "10.99",
                16: "21.68",
                17: "1.47",
                18: "159.36",
                19: "18.69%",
                20: "7.36%",
                21: "2.66%",
                22: "17.01%",
                23: "4.96%",
                24: "59.66%",
                25: "59.66%",
                26: "7.07%\r",
              },
              60: {
                0: "Power",
                1: "553",
                2: "6.42%",
                3: "13.38%",
                4: "6.15%",
                5: "19.69%",
                6: "0.51",
                7: "0.82",
                8: "5.67%",
                9: "22.41%",
                10: "2.87%",
                11: "48.35%",
                12: "3.95%",
                13: "0.55",
                14: "2.44",
                15: "10.02",
                16: "18.19",
                17: "1.35",
                18: "25.26",
                19: "2.11%",
                20: "17.48%",
                21: "8.63%",
                22: "85.25%",
                23: "7.31%",
                24: "81.59%",
                25: "81.59%",
                26: "13.38%\r",
              },
              61: {
                0: "Precious Metals",
                1: "922",
                2: "35.80%",
                3: "19.25%",
                4: "14.34%",
                5: "27.75%",
                6: "0.87",
                7: "0.89",
                8: "6.08%",
                9: "54.78%",
                10: "3.95%",
                11: "12.61%",
                12: "5.68%",
                13: "0.77",
                14: "3.52",
                15: "9.83",
                16: "16.60",
                17: "2.53",
                18: "63.03",
                19: "12.73%",
                20: "13.90%",
                21: "8.19%",
                22: "78.16%",
                23: "7.86%",
                24: "45.15%",
                25: "45.15%",
                26: "19.30%\r",
              },
              62: {
                0: "Publishing & Newspapers",
                1: "349",
                2: "-0.29%",
                3: "5.31%",
                4: "6.74%",
                5: "17.12%",
                6: "0.84",
                7: "0.89",
                8: "6.07%",
                9: "29.13%",
                10: "3.53%",
                11: "26.37%",
                12: "5.16%",
                13: "1.45",
                14: "1.20",
                15: "11.16",
                16: "21.71",
                17: "1.43",
                18: "42.54",
                19: "13.10%",
                20: "3.20%",
                21: "1.46%",
                22: "40.75%",
                23: "-0.76%",
                24: "0.54%",
                25: "0.54%",
                26: "5.29%\r",
              },
              63: {
                0: "R.E.I.T.",
                1: "799",
                2: "8.60%",
                3: "33.19%",
                4: "2.88%",
                5: "3.28%",
                6: "0.66",
                7: "0.97",
                8: "6.53%",
                9: "23.99%",
                10: "2.87%",
                11: "41.47%",
                12: "4.70%",
                13: "0.10",
                14: "13.48",
                15: "23.08",
                16: "38.37",
                17: "1.62",
                18: "44.45",
                19: "63.30%",
                20: "5.40%",
                21: "-1.45%",
                22: "-1.00%",
                23: "0.80%",
                24: "823.36%",
                25: "823.36%",
                26: "30.35%\r",
              },
              64: {
                0: "Real Estate (Development)",
                1: "890",
                2: "6.89%",
                3: "17.31%",
                4: "8.28%",
                5: "35.87%",
                6: "0.52",
                7: "0.94",
                8: "6.37%",
                9: "26.44%",
                10: "3.53%",
                11: "63.75%",
                12: "3.97%",
                13: "0.57",
                14: "1.85",
                15: "9.48",
                16: "10.17",
                17: "0.68",
                18: "62.63",
                19: "192.82%",
                20: "3.05%",
                21: "3.47%",
                22: "103.72%",
                23: "10.44%",
                24: "69.21%",
                25: "69.21%",
                26: "17.31%\r",
              },
              65: {
                0: "Real Estate (General/Diversified)",
                1: "364",
                2: "5.41%",
                3: "16.29%",
                4: "3.89%",
                5: "31.95%",
                6: "0.60",
                7: "0.99",
                8: "6.64%",
                9: "24.40%",
                10: "2.87%",
                11: "53.09%",
                12: "4.24%",
                13: "0.28",
                14: "3.35",
                15: "13.56",
                16: "19.50",
                17: "0.73",
                18: "99.04",
                19: "98.92%",
                20: "10.07%",
                21: "8.87%",
                22: "136.57%",
                23: "3.90%",
                24: "83.99%",
                25: "83.99%",
                26: "16.14%\r",
              },
              66: {
                0: "Real Estate (Operations & Services)",
                1: "720",
                2: "8.04%",
                3: "23.22%",
                4: "4.60%",
                5: "23.85%",
                6: "0.53",
                7: "0.81",
                8: "5.61%",
                9: "25.03%",
                10: "3.53%",
                11: "45.06%",
                12: "4.26%",
                13: "0.22",
                14: "6.46",
                15: "20.78",
                16: "24.13",
                17: "1.08",
                18: "58.53",
                19: "21.54%",
                20: "3.25%",
                21: "5.84%",
                22: "36.32%",
                23: "5.08%",
                24: "48.89%",
                25: "48.89%",
                26: "24.07%\r",
              },
              67: {
                0: "Recreation",
                1: "331",
                2: "0.43%",
                3: "8.05%",
                4: "6.67%",
                5: "24.97%",
                6: "0.93",
                7: "1.01",
                8: "6.76%",
                9: "33.21%",
                10: "3.53%",
                11: "20.03%",
                12: "5.93%",
                13: "0.95",
                14: "3.37",
                15: "20.53",
                16: "39.26",
                17: "3.70",
                18: "71.57",
                19: "34.60%",
                20: "6.91%",
                21: "6.93%",
                22: "144.74%",
                23: "2.79%",
                24: "192.60%",
                25: "192.60%",
                26: "7.98%\r",
              },
              68: {
                0: "Reinsurance",
                1: "37",
                2: "4.29%",
                3: "3.80%",
                4: "5.18%",
                5: "13.76%",
                6: "1.25",
                7: "1.27",
                8: "8.24%",
                9: "28.79%",
                10: "3.53%",
                11: "23.72%",
                12: "6.91%",
                13: "1.53",
                14: "0.67",
                15: "11.42",
                16: "13.95",
                17: "0.91",
                18: "188.44",
                19: "-41.18%",
                20: "0.16%",
                21: "-0.01%",
                22: "25.39%",
                23: "3.34%",
                24: "93.49%",
                25: "93.49%",
                26: "3.78%\r",
              },
              69: {
                0: "Restaurant/Dining",
                1: "379",
                2: "-0.53%",
                3: "6.02%",
                4: "5.42%",
                5: "20.92%",
                6: "0.90",
                7: "1.10",
                8: "7.25%",
                9: "31.96%",
                10: "3.53%",
                11: "26.74%",
                12: "6.01%",
                13: "1.46",
                14: "3.37",
                15: "22.80",
                16: "80.66",
                17: "16.01",
                18: "127.25",
                19: "-0.36%",
                20: "4.87%",
                21: "0.70%",
                22: "34.96%",
                23: "5.17%",
                24: "459.50%",
                25: "459.50%",
                26: "4.03%\r",
              },
              70: {
                0: "Retail (Automotive)",
                1: "185",
                2: "3.50%",
                3: "4.90%",
                4: "8.40%",
                5: "23.66%",
                6: "0.82",
                7: "1.07",
                8: "7.09%",
                9: "30.48%",
                10: "3.53%",
                11: "34.60%",
                12: "5.54%",
                13: "2.28",
                14: "0.96",
                15: "11.89",
                16: "19.81",
                17: "3.38",
                18: "43.31",
                19: "11.51%",
                20: "2.30%",
                21: "1.54%",
                22: "0.39%",
                23: "13.99%",
                24: "36.42%",
                25: "36.42%",
                26: "4.45%\r",
              },
              71: {
                0: "Retail (Building Supply)",
                1: "90",
                2: "2.82%",
                3: "11.62%",
                4: "24.98%",
                5: "24.94%",
                6: "1.06",
                7: "1.14",
                8: "7.52%",
                9: "28.19%",
                10: "3.53%",
                11: "17.02%",
                12: "6.69%",
                13: "2.78",
                14: "1.84",
                15: "12.33",
                16: "16.22",
                17: "10.73",
                18: "46.21",
                19: "5.32%",
                20: "2.08%",
                21: "0.05%",
                22: "-25.48%",
                23: "55.16%",
                24: "43.42%",
                25: "43.42%",
                26: "11.36%\r",
              },
              72: {
                0: "Retail (Distributors)",
                1: "1022",
                2: "6.62%",
                3: "3.65%",
                4: "5.23%",
                5: "23.16%",
                6: "0.57",
                7: "0.83",
                8: "5.71%",
                9: "29.10%",
                10: "3.53%",
                11: "46.28%",
                12: "4.28%",
                13: "1.68",
                14: "0.81",
                15: "13.45",
                16: "21.20",
                17: "1.40",
                18: "66.68",
                19: "15.31%",
                20: "3.02%",
                21: "2.45%",
                22: "42.86%",
                23: "5.73%",
                24: "75.55%",
                25: "75.55%",
                26: "3.68%\r",
              },
              73: {
                0: "Retail (General)",
                1: "217",
                2: "-1.14%",
                3: "4.31%",
                4: "8.66%",
                5: "26.86%",
                6: "0.84",
                7: "0.99",
                8: "6.65%",
                9: "25.73%",
                10: "3.53%",
                11: "26.95%",
                12: "5.56%",
                13: "2.71",
                14: "0.96",
                15: "12.76",
                16: "24.54",
                17: "3.34",
                18: "61.89",
                19: "-1.86%",
                20: "2.41%",
                21: "0.18%",
                22: "-15.30%",
                23: "9.99%",
                24: "55.81%",
                25: "55.81%",
                26: "3.88%\r",
              },
              74: {
                0: "Retail (Grocery and Food)",
                1: "171",
                2: "3.74%",
                3: "4.31%",
                4: "11.09%",
                5: "25.33%",
                6: "0.47",
                7: "0.62",
                8: "4.51%",
                9: "21.91%",
                10: "2.87%",
                11: "37.55%",
                12: "3.61%",
                13: "3.40",
                14: "0.64",
                15: "9.05",
                16: "15.42",
                17: "2.28",
                18: "53.40",
                19: "-3.31%",
                20: "2.65%",
                21: "0.46%",
                22: "24.83%",
                23: "11.41%",
                24: "47.07%",
                25: "47.07%",
                26: "4.11%\r",
              },
              75: {
                0: "Retail (Online)",
                1: "356",
                2: "13.38%",
                3: "4.75%",
                4: "8.67%",
                5: "14.08%",
                6: "1.31",
                7: "1.31",
                8: "8.48%",
                9: "39.84%",
                10: "3.53%",
                11: "5.74%",
                12: "8.15%",
                13: "1.76",
                14: "5.06",
                15: "36.23",
                16: "91.77",
                17: "8.84",
                18: "110.83",
                19: "-2.97%",
                20: "6.36%",
                21: "3.99%",
                22: "98.20%",
                23: "14.89%",
                24: "5.03%",
                25: "5.03%",
                26: "5.38%\r",
              },
              76: {
                0: "Retail (Special Lines)",
                1: "480",
                2: "1.51%",
                3: "3.47%",
                4: "6.39%",
                5: "27.42%",
                6: "0.96",
                7: "1.09",
                8: "7.20%",
                9: "32.04%",
                10: "3.53%",
                11: "25.29%",
                12: "6.04%",
                13: "2.24",
                14: "1.30",
                15: "14.29",
                16: "38.13",
                17: "4.05",
                18: "38.36",
                19: "6.06%",
                20: "1.71%",
                21: "-0.64%",
                22: "-101.36%",
                23: "2.29%",
                24: "201.73%",
                25: "201.73%",
                26: "3.32%\r",
              },
              77: {
                0: "Rubber& Tires",
                1: "92",
                2: "0.31%",
                3: "5.62%",
                4: "4.42%",
                5: "29.95%",
                6: "0.86",
                7: "1.04",
                8: "6.94%",
                9: "25.61%",
                10: "3.53%",
                11: "34.33%",
                12: "5.46%",
                13: "1.00",
                14: "1.18",
                15: "8.39",
                16: "20.16",
                17: "1.33",
                18: "30.65",
                19: "19.35%",
                20: "5.47%",
                21: "1.14%",
                22: "-12.49%",
                23: "2.65%",
                24: "110.38%",
                25: "110.38%",
                26: "5.39%\r",
              },
              78: {
                0: "Semiconductor",
                1: "565",
                2: "4.55%",
                3: "18.19%",
                4: "13.96%",
                5: "12.09%",
                6: "1.43",
                7: "1.46",
                8: "9.34%",
                9: "32.40%",
                10: "3.53%",
                11: "8.49%",
                12: "8.77%",
                13: "0.80",
                14: "5.96",
                15: "17.81",
                16: "31.94",
                17: "5.31",
                18: "254.65",
                19: "16.63%",
                20: "15.67%",
                21: "14.78%",
                22: "101.66%",
                23: "16.89%",
                24: "44.42%",
                25: "44.42%",
                26: "19.15%\r",
              },
              79: {
                0: "Semiconductor Equip",
                1: "308",
                2: "7.15%",
                3: "18.84%",
                4: "18.61%",
                5: "16.11%",
                6: "1.73",
                7: "1.73",
                8: "10.87%",
                9: "33.70%",
                10: "3.53%",
                11: "5.91%",
                12: "10.38%",
                13: "1.08",
                14: "5.58",
                15: "22.86",
                16: "29.16",
                17: "6.70",
                18: "84.83",
                19: "29.83%",
                20: "5.96%",
                21: "3.66%",
                22: "38.20%",
                23: "21.38%",
                24: "31.51%",
                25: "31.51%",
                26: "19.69%\r",
              },
              80: {
                0: "Shipbuilding & Marine",
                1: "353",
                2: "1.59%",
                3: "8.18%",
                4: "4.97%",
                5: "19.10%",
                6: "0.76",
                7: "1.03",
                8: "6.86%",
                9: "26.29%",
                10: "3.53%",
                11: "40.19%",
                12: "5.15%",
                13: "0.68",
                14: "1.93",
                15: "11.54",
                16: "22.60",
                17: "1.24",
                18: "915.77",
                19: "-0.07%",
                20: "9.45%",
                21: "3.22%",
                22: "42.72%",
                23: "5.68%",
                24: "61.79%",
                25: "61.79%",
                26: "8.35%\r",
              },
              81: {
                0: "Shoe",
                1: "79",
                2: "-5.90%",
                3: "6.26%",
                4: "9.45%",
                5: "18.57%",
                6: "0.99",
                7: "1.01",
                8: "6.73%",
                9: "29.35%",
                10: "3.53%",
                11: "9.13%",
                12: "6.35%",
                13: "1.72",
                14: "3.73",
                15: "33.75",
                16: "60.07",
                17: "7.74",
                18: "108.92",
                19: "19.77%",
                20: "1.63%",
                21: "-1.45%",
                22: "-39.76%",
                23: "9.95%",
                24: "65.38%",
                25: "65.38%",
                26: "6.16%\r",
              },
              82: {
                0: "Software (Entertainment)",
                1: "339",
                2: "8.14%",
                3: "19.78%",
                4: "14.00%",
                5: "13.93%",
                6: "1.13",
                7: "1.13",
                8: "7.44%",
                9: "42.35%",
                10: "3.95%",
                11: "4.07%",
                12: "7.26%",
                13: "0.73",
                14: "7.99",
                15: "25.76",
                16: "38.88",
                17: "5.95",
                18: "122.11",
                19: "1.54%",
                20: "10.83%",
                21: "7.12%",
                22: "51.13%",
                23: "18.42%",
                24: "3.72%",
                25: "3.72%",
                26: "21.05%\r",
              },
              83: {
                0: "Software (Internet)",
                1: "155",
                2: "23.83%",
                3: "3.64%",
                4: "5.51%",
                5: "12.49%",
                6: "0.93",
                7: "0.95",
                8: "6.38%",
                9: "34.77%",
                10: "3.53%",
                11: "7.09%",
                12: "6.11%",
                13: "1.26",
                14: "11.15",
                15: "44.21",
                16: "185.25",
                17: "12.49",
                18: "118.92",
                19: "1.98%",
                20: "10.43%",
                21: "9.53%",
                22: "414.73%",
                23: "-5.64%",
                24: "0.32%",
                25: "0.32%",
                26: "4.72%\r",
              },
              84: {
                0: "Software (System & Application)",
                1: "1478",
                2: "14.37%",
                3: "19.82%",
                4: "19.31%",
                5: "15.88%",
                6: "1.06",
                7: "1.08",
                8: "7.12%",
                9: "40.59%",
                10: "3.95%",
                11: "6.00%",
                12: "6.87%",
                13: "0.98",
                14: "10.19",
                15: "30.92",
                16: "44.66",
                17: "11.12",
                18: "187.92",
                19: "13.52%",
                20: "5.65%",
                21: "5.99%",
                22: "43.79%",
                23: "20.37%",
                24: "33.25%",
                25: "33.25%",
                26: "21.44%\r",
              },
              85: {
                0: "Steel",
                1: "718",
                2: "5.72%",
                3: "4.41%",
                4: "4.54%",
                5: "25.27%",
                6: "0.93",
                7: "1.17",
                8: "7.68%",
                9: "30.40%",
                10: "3.53%",
                11: "36.27%",
                12: "5.84%",
                13: "1.14",
                14: "0.99",
                15: "8.96",
                16: "21.06",
                17: "1.19",
                18: "59.31",
                19: "14.07%",
                20: "6.22%",
                21: "3.21%",
                22: "50.37%",
                23: "2.44%",
                24: "154.05%",
                25: "154.05%",
                26: "4.52%\r",
              },
              86: {
                0: "Telecom (Wireless)",
                1: "104",
                2: "1.13%",
                3: "14.17%",
                4: "8.58%",
                5: "32.42%",
                6: "0.63",
                7: "0.87",
                8: "5.95%",
                9: "26.77%",
                10: "3.53%",
                11: "40.09%",
                12: "4.61%",
                13: "0.74",
                14: "2.29",
                15: "6.95",
                16: "16.01",
                17: "1.55",
                18: "46.65",
                19: "-6.55%",
                20: "11.57%",
                21: "-4.38%",
                22: "-22.91%",
                23: "8.19%",
                24: "77.55%",
                25: "77.55%",
                26: "14.07%\r",
              },
              87: {
                0: "Telecom. Equipment",
                1: "482",
                2: "8.73%",
                3: "10.81%",
                4: "12.49%",
                5: "19.45%",
                6: "1.09",
                7: "1.10",
                8: "7.28%",
                9: "34.27%",
                10: "3.53%",
                11: "12.66%",
                12: "6.69%",
                13: "1.21",
                14: "2.52",
                15: "15.55",
                16: "22.16",
                17: "3.68",
                18: "105.51",
                19: "21.75%",
                20: "3.55%",
                21: "2.66%",
                22: "28.78%",
                23: "10.42%",
                24: "61.55%",
                25: "61.55%",
                26: "11.18%\r",
              },
              88: {
                0: "Telecom. Services",
                1: "315",
                2: "9.99%",
                3: "15.08%",
                4: "10.27%",
                5: "22.10%",
                6: "0.51",
                7: "0.78",
                8: "5.45%",
                9: "29.19%",
                10: "3.53%",
                11: "45.01%",
                12: "4.17%",
                13: "0.79",
                14: "2.16",
                15: "6.79",
                16: "14.39",
                17: "1.48",
                18: "59.00",
                19: "2.27%",
                20: "13.98%",
                21: "-3.32%",
                22: "-22.88%",
                23: "8.78%",
                24: "65.62%",
                25: "65.62%",
                26: "14.95%\r",
              },
              89: {
                0: "Tobacco",
                1: "57",
                2: "11.85%",
                3: "32.81%",
                4: "18.58%",
                5: "28.83%",
                6: "0.55",
                7: "0.65",
                8: "4.68%",
                9: "24.63%",
                10: "2.87%",
                11: "23.96%",
                12: "4.06%",
                13: "0.68",
                14: "3.87",
                15: "10.35",
                16: "11.77",
                17: "3.58",
                18: "39.89",
                19: "17.49%",
                20: "2.73%",
                21: "0.00%",
                22: "-8.74%",
                23: "19.35%",
                24: "105.89%",
                25: "105.89%",
                26: "32.91%\r",
              },
              90: {
                0: "Transportation",
                1: "284",
                2: "5.64%",
                3: "5.89%",
                4: "7.77%",
                5: "23.01%",
                6: "0.77",
                7: "0.95",
                8: "6.38%",
                9: "26.02%",
                10: "3.53%",
                11: "31.49%",
                12: "5.19%",
                13: "1.55",
                14: "1.53",
                15: "13.20",
                16: "25.13",
                17: "2.94",
                18: "37.67",
                19: "3.96%",
                20: "4.67%",
                21: "0.68%",
                22: "21.49%",
                23: "8.26%",
                24: "79.54%",
                25: "79.54%",
                26: "6.03%\r",
              },
              91: {
                0: "Transportation (Railroads)",
                1: "53",
                2: "1.76%",
                3: "15.27%",
                4: "5.24%",
                5: "23.92%",
                6: "0.62",
                7: "0.78",
                8: "5.43%",
                9: "17.28%",
                10: "2.87%",
                11: "29.21%",
                12: "4.46%",
                13: "0.40",
                14: "4.83",
                15: "17.09",
                16: "31.01",
                17: "2.48",
                18: "56.83",
                19: "7.99%",
                20: "19.50%",
                21: "12.72%",
                22: "112.09%",
                23: "5.66%",
                24: "78.08%",
                25: "78.08%",
                26: "15.62%\r",
              },
              92: {
                0: "Trucking",
                1: "217",
                2: "2.54%",
                3: "1.45%",
                4: "0.45%",
                5: "27.60%",
                6: "0.81",
                7: "1.05",
                8: "7.00%",
                9: "29.38%",
                10: "3.53%",
                11: "35.44%",
                12: "5.44%",
                13: "1.00",
                14: "1.74",
                15: "10.05",
                16: "68.18",
                17: "2.68",
                18: "35.79",
                19: "5.95%",
                20: "2.42%",
                21: "-2.78%",
                22: "-726.78%",
                23: "-5.76%",
                24: "0.47%",
                25: "0.47%",
                26: "0.73%\r",
              },
              93: {
                0: "Utility (General)",
                1: "53",
                2: "2.58%",
                3: "11.86%",
                4: "6.65%",
                5: "23.33%",
                6: "0.49",
                7: "0.76",
                8: "5.33%",
                9: "17.73%",
                10: "2.87%",
                11: "46.37%",
                12: "3.84%",
                13: "0.70",
                14: "2.38",
                15: "10.76",
                16: "19.00",
                17: "1.67",
                18: "37.33",
                19: "-1.28%",
                20: "15.37%",
                21: "10.16%",
                22: "107.97%",
                23: "5.49%",
                24: "122.28%",
                25: "122.28%",
                26: "11.79%\r",
              },
              94: {
                0: "Utility (Water)",
                1: "104",
                2: "8.44%",
                3: "26.79%",
                4: "7.27%",
                5: "26.54%",
                6: "0.59",
                7: "0.83",
                8: "5.70%",
                9: "27.39%",
                10: "3.53%",
                11: "40.89%",
                12: "4.43%",
                13: "0.32",
                14: "5.01",
                15: "12.78",
                16: "18.44",
                17: "1.71",
                18: "31.57",
                19: "5.29%",
                20: "27.09%",
                21: "27.53%",
                22: "172.58%",
                23: "6.30%",
                24: "56.83%",
                25: "75.32%",
                26: "26.79%\r",
              },
              95: {
                0: "Total Market",
                1: "46580",
                2: "6.62%",
                3: "8.00%",
                4: "4.94%",
                5: "22.12%",
                6: "0.79",
                7: "1.01",
                8: "6.76%",
                9: "32.36%",
                10: "3.53%",
                11: "38.68%",
                12: "5.16%",
                13: "0.69",
                14: "2.66",
                15: "15.84",
                16: "27.99",
                17: "2.21",
                18: "93.22",
                19: "-137.39%",
                20: "5.88%",
                21: "2.72%",
                22: "47.93%",
                23: "6.30%",
                24: "75.32%",
                25: "75.32%",
                26: "8.09%\r",
              },
              96: {
                0: "Total Market (without financials)",
                1: "41623",
                2: "6.41%",
                3: "8.31%",
                4: "7.72%",
                5: "22.89%",
                6: "0.89",
                7: "1.04",
                8: "6.90%",
                9: "33.08%",
                10: "3.53%",
                11: "24.82%",
                12: "5.84%",
                13: "1.04",
                14: "2.31",
                15: "14.33",
                16: "26.06",
                17: "2.71",
                18: "93.93",
                19: "11.58%",
                20: "6.37%",
                21: "2.75%",
                22: "46.14%",
                23: "5.54%",
                24: "95.73%",
                25: "95.73%",
                26: "8.41%\r",
              },
            },
          },
          {
            name: "API Millions Data",
            styles: [
              {
                format: "currency",
              },
              {
                format: "number",
              },
            ],
            merges: [],
            rows: {
              0: {
                cells: {
                  1: {
                    style: 0,
                  },
                  4: {
                    style: 1,
                  },
                },
              },
              1: {
                cells: {
                  1: {
                    style: 0,
                  },
                },
              },
              2: {
                cells: {
                  1: {
                    style: 0,
                  },
                },
              },
              3: {
                cells: {
                  1: {
                    style: 0,
                  },
                },
              },
              4: {
                cells: {
                  1: {
                    style: 0,
                  },
                },
              },
              5: {
                cells: {
                  1: {
                    style: 1,
                  },
                },
              },
              6: {
                cells: {
                  1: {
                    style: 0,
                  },
                },
              },
              7: {
                cells: {
                  1: {
                    style: 0,
                  },
                },
              },
              8: {
                cells: {
                  1: {
                    style: 0,
                  },
                },
              },
              9: {
                cells: {
                  1: {
                    style: 0,
                  },
                },
              },
              10: {
                cells: {
                  1: {
                    style: 0,
                  },
                },
              },
            },
            cols: {
              0: {
                width: 198,
              },
              1: {
                width: 167,
              },
            },
            validations: [],
            autofilter: {},
            cellsSerialized: {
              0: {
                0: "Revenue",
                1: '=FIN("revenue")/E1',
                3: "Million Modifier",
                4: "1000000",
              },
              1: {
                0: "Operating Income",
                1: '=FIN("operatingIncome")/E1',
              },
              2: {
                0: "Book Value of Equity",
                1: '=FIN("bookValueOfEquity")/E1',
              },
              3: {
                0: "Book Value of Debt",
                1: '=FIN("bookValueOfDebt")/E1',
              },
              4: {
                0: "Invested Capital",
                1: '=FIN("investedCapital")/E1',
              },
              5: {
                0: "Shares Outstanding",
                1: '=FIN("sharesOutstanding")/E1',
              },
              6: {
                0: "Minority Interest",
                1: '=FIN("minorityInterest")/E1',
              },
              7: {
                0: "Cash & Short Term Investments",
                1: '=FIN("cashAndShortTermInvestments")/E1',
              },
              8: {
                0: "Interest Expense",
                1: '=FIN("interestExpense")/E1',
              },
              9: {
                0: "Capital Lease Obligations",
                1: '=FIN("capitalLeaseObligations")/E1',
              },
              10: {
                0: "Market Capitalization",
                1: '=FIN("marketCapitalization")/E1',
              },
            },
          },
        ],
      },
    },
  },
];

export default test;
