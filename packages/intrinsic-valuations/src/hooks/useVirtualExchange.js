import { useSelector } from "react-redux";
import selectGeneral from "../selectors/stockSelectors/selectGeneral";
import selectIsInUS from "../selectors/stockSelectors/selectIsInUS";

const useVirtualExchange = () => {
  const isInUS = useSelector(selectIsInUS);
  const general = useSelector(selectGeneral);

  return isInUS ? general?.countryISO : general?.exchange;
};

export default useVirtualExchange;
