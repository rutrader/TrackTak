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
