const featureToggle = {
  AUTHENTICATION: process.env.NODE_ENV === "development",
};

export default featureToggle;
