import useInputQueryParams from "./useInputQueryParams";
import { useSelector } from "react-redux";

const useInjectQueryParams = (selector) => {
  const inputQueryParams = useInputQueryParams();

  return useSelector(selector(inputQueryParams));
};

export default useInjectQueryParams;
