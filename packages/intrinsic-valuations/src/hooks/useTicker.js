import { useSelector } from "react-redux";
import selectGeneral from "../selectors/stockSelectors/selectGeneral";
import useVirtualExchange from "./useVirtualExchange";

const useTicker = () => {
  const general = useSelector(selectGeneral);
  const exchange = useVirtualExchange();

  if (!general || !exchange) return null;

  return `${general.code}-${exchange}`.toLowerCase();
};

export default useTicker;
