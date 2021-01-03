import { sentenceCase } from "change-case";

const getHeader = (key) => {
  let header;

  switch (key) {
    case "afterTaxROIC":
      header = "After Tax ROIC";
      break;
    case "marketDebt/Capital":
      header = "Market Debt/Capital";
      break;
    case "sales/Capital":
      header = "Sales/Capital";
      break;
    case "EV/Sales":
      header = "EV/Sales";
      break;
    case "EV/EBITDA":
      header = "EV/EBITDA";
      break;
    case "EV/EBIT":
      header = "EV/EBIT";
      break;
    case "price/Book":
      header = "Price/Book";
      break;
    case "trailingPE":
      header = "Trailing PE";
      break;
    case "CAPEXAsAPercentageOfRevenues":
      header = "CAPEX As a Percentage Of Revenues";
      break;
    case "netCAPEXAsAPercentageOfRevenues":
      header = "Net CAPEX As A Percentage Of Revenues";
      break;
    case "ROE":
      header = "ROE";
      break;
    case "preTaxOperatingMarginLeaseAndR&DAdjusted":
      header = "Pre Tax Operating Margin Lease And R&D Adjusted";
      break;
    default:
      header = sentenceCase(key);
      break;
  }
  return header;
};

export default getHeader;
