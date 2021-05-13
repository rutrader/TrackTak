import { useState, useEffect } from "react";

const useIsClient = () => {
  const [isClient, setClient] = useState(false);

  useEffect(() => {
    setClient(true);
  }, []);

  return isClient;
};

export default useIsClient;
