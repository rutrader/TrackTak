import { useSelector } from "react-redux";
import selectGeneral from "../selectors/fundamentalSelectors/selectGeneral";
import selectIsInUS from "../selectors/fundamentalSelectors/selectIsInUS";

const useVirtualExchange = () => {
  const isInUS = useSelector(selectIsInUS);
  const general = useSelector(selectGeneral);

  return isInUS ? general?.countryISO : general?.exchange;
};

export default useVirtualExchange;
