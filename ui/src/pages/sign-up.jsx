import React from "react";
import { Helmet } from "react-helmet";
import getTitle from "../shared/getTitle";
import resourceName from "../shared/resourceName";
import SignUpForm from "../components/SignUpForm";

const SignUp = () => {
  return (
    <>
      <Helmet>
        <title>{getTitle("Sign up")}</title>
        <link rel="canonical" href={`${resourceName}/sign-up`} />
        <meta name="description" content="Sign up to Tracktak." />
      </Helmet>
      <SignUpForm />
    </>
  );
};

export default SignUp;
