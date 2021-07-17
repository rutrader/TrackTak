import React from "react";
import Header from "../components/Header";
import { useAuth } from "../hooks/useAuth";
import { getHeaderLinks } from "../shared/getHeaderLinks";

const LayoutFullScreen = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const links = getHeaderLinks(isAuthenticated);

  return (
    <>
      <Header position="relative" links={links} />
      {children}
    </>
  );
};

export default LayoutFullScreen;
