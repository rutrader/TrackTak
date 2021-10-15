import { getCurrentPlan } from "../cognito/cognitoClient";
import decodeVerifyJwt from "../security/decodeVerifyJwt";
import { CURRENT_PLAN_ENDPOINT } from "../shared/constants";

const auth = async (req, res, next) => {
  const userDetails = await decodeVerifyJwt(req);
  if (!userDetails.isValid) {
    return res.status(401).send("Invalid auth token");
  }

  const currentPlan = await getCurrentPlan(
    userDetails.username,
    userDetails.accessToken,
  );

  if (req.path !== CURRENT_PLAN_ENDPOINT && currentPlan.isExpired) {
    return res.status(401).send("PLAN_EXPIRED");
  }

  req.user = userDetails;

  return next();
};

export default auth;
