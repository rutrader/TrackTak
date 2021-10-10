import AWS from "aws-sdk";

const cognitoIssuerUri = process.env.COGNITO_ISSUER_URI;
const cognitoPoolId = process.env.COGNITO_POOL_ID;
const region = process.env.REGION;

const cup = new AWS.CognitoIdentityServiceProvider();
cup.config = new AWS.Config({
  region,
});
cup.endpoint = new AWS.Endpoint(cognitoIssuerUri);

const Plans = {
  ONE_HOUR_TRIAL: "One Hour Free Trial",
  NON_ACTIVE: "Non-Active",
  ACTIVE: "Active",
  PRO: "Pro",
  FROZEN: "Frozen",
  DEACTIVATED: "Deactivated",
};

export const getCurrentPlan = async (username, accessToken) => {
  const user = await cup.getUser({ AccessToken: accessToken }).promise();
  const attributes = user.UserAttributes.reduce(
    (all, current) => ({
      ...all,
      [current.Name]: current.Value,
    }),
    {},
  );

  const plan = mapCognitoAttributesToPlan(attributes);
  return getUpdatedPlanIfExpired(username, plan);
};

export const startPlan = async (username, type, isAnnual, addons = []) => {
  const expirationTime = isAnnual
    ? new Date(new Date().setFullYear(new Date().getFullYear() + 1))
    : new Date(new Date().setMonth(new Date().getMonth() + 1));
  const newPlan = {
    "custom:account_type": type,
    "custom:plan_expiration": expirationTime.getTime().toString(),
    "custom:plan_expired": "false",
    "custom:account_addons": addons.join(","),
  };

  await setUserAccountAttributes(username, newPlan);

  return mapCognitoAttributesToPlan(newPlan);
};

const mapCognitoAttributesToPlan = (attributes) => ({
  type: attributes["custom:account_type"],
  expiration: Number(attributes["custom:plan_expiration"]),
  isExpired: attributes["custom:plan_expired"] === "true",
  addons: attributes["custom:account_addons"]
    ? attributes["custom:account_addons"].split(",")
    : [],
});

const getUpdatedPlanIfExpired = async (username, plan) => {
  const now = new Date().getTime();
  if (!plan.isExpired && now > plan.expiration) {
    let type = plan.type;
    const expiredParameters = {
      "custom:plan_expired": "true",
    };

    if (plan.type !== Plans.ONE_HOUR_TRIAL) {
      expiredParameters["custom:account_type"] = Plans.DEACTIVATED;
    }

    await setUserAccountAttributes(username, expiredParameters);
    return {
      ...plan,
      type,
      isExpired: true,
    };
  }

  return plan;
};

const setUserAccountAttributes = async (username, attributes) => {
  const cognitoAttribute = attributes.reduce((all, current) => ({
    ...all,
    [current.Name]: current.Value,
  }));
  const params = {
    UserPoolId: cognitoPoolId,
    UserAttributes: cognitoAttribute,
    Username: username,
  };

  await cup.adminUpdateUserAttributes(params).promise();
};
