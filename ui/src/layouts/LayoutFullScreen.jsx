import React from "react";
import Header from "../components/Header";
import { useAuth } from "../hooks/useAuth";
import { ProvideSpreadsheet } from "../hooks/useSpreadsheet";
import { getHeaderLinks } from "../shared/getHeaderLinks";

const LayoutFullScreen = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const links = getHeaderLinks(isAuthenticated);

  return (
    <ProvideSpreadsheet>
      <Header position="relative" links={links} />
      {children}
    </ProvideSpreadsheet>
  );
};

export default LayoutFullScreen;
