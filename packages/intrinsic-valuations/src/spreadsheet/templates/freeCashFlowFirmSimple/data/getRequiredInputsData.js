const getRequiredInputsData = () => {
  return {
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
    serializedValues: [
      [
        "CAGR in Years 1-5 *",
        null,
        null,
        "Fill out the green input cells to generate your DCF",
      ],
      [
        "Operating Target Margin in\nYear 10 *",
        null,
        null,
        "Numbers are in millions, expect per share amounts",
      ],
      ["Year of Convergence *"],
      ["Sales to Capital Ratio *", `=FIN("sales/Capital")`],
    ],
    rows: {
      0: {
        1: {
          style: 5,
          comment:
            "Compound Annual Growth Rate - look at: a. Revenue growth in your company in recent years b. Your company's revenues, relative to the overall market size and larger players in the sector.",
        },
        3: {
          style: 7,
        },
      },
      1: {
        1: {
          style: 5,
          comment:
            "Start by looking at your company's current pre-tax operating margin but also look at the average for your industry.",
        },
        3: {
          style: 7,
        },
      },
      2: {
        1: {
          style: 6,
          comment:
            "The forecast year in which the companies current Operating margin will converge on the target Operating margin.",
        },
      },
      3: {
        1: {
          style: 6,
          comment:
            "The efficiency of how much the company has to reinvest the business to grow. The formula is Revenue / Invested Capital. The higher the number the more efficient the company is. The default value is set to the industry average as this is usually a good starting point. You should also look at the previous years sales to capital ratio's in the above table to fine tune this value. In the DCF output we compute how much the company is going to reinvest to keep the business growing in future years. The higher you set this number, the more efficiently the business is growing and the higher the value of your growth.",
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
  };
};

export default getRequiredInputsData;
