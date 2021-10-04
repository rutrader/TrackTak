import { getCurrentPlan } from "../cognito/cognitoClient";
import decodeVerifyJwt from "../security/decodeVerifyJwt";

const auth = async (req, res, next) => {
  const userDetails = await decodeVerifyJwt(req);
  if (!userDetails.isValid) {
    return res.status(401).send("Invalid auth token");
  }

  const currentPlan = await getCurrentPlan(
    userDetails.username,
    userDetails.accessToken,
  );

  if (req.path !== "/api/v1/current-plan" && currentPlan.isExpired) {
    return res.status(401).send("PLAN_EXPIRED");
  }

  req.user = userDetails;

  return next();
};

export default auth;
