import React from "react";
import Layout from "./layout";
import { Link, ModalRoutingContext } from "gatsby-plugin-modal-routing";
import { useContext } from "react";

const ConditionalLayout = ({ children, ...rest }) => {
  const { modal, closeTo } = useContext(ModalRoutingContext);
  return modal ? (
    <React.Fragment>
      <Link to={closeTo}>Close</Link>
      {children}
    </React.Fragment>
  ) : (
    <Layout {...rest}>{children}</Layout>
  );
};

export default ConditionalLayout;
