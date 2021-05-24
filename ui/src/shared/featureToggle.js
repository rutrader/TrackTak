const featureToggle = {
  AUTHENTICATION: process.env.NODE_ENV !== "PRODUCTION"
}

export default featureToggle;
