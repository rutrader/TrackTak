import AWS from "aws-sdk";

const cognitoIssuerUri = process.env.COGNITO_ISSUER_URI;
const cognitoPoolId = process.env.COGNITO_POOL_ID;
const region = process.env.REGION;

const cup = new AWS.CognitoIdentityServiceProvider();
cup.config = new AWS.Config({
  region,
});
cup.endpoint = new AWS.Endpoint(cognitoIssuerUri);

const PLANS = {
  ONE_HOUR_TRIAL: "1-hour-trial",
  NON_ACTIVE: "non-active",
  ACTIVE: "active",
  PRO: "pro",
  FROZEN: "frozen",
  DEACTIVATED: "deactivated",
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

  const plan = {
    type: attributes["custom:account_type"],
    expiration: Number(attributes["custom:plan_expiration"]),
    isExpired: attributes["custom:plan_expired"] === "true",
    addons: attributes["custom:account_addons"]
      ? attributes["custom:account_addons"].split(",")
      : [],
  };

  return getUpdatedPlanIfExpired(username, plan);
};

const getUpdatedPlanIfExpired = async (username, plan) => {
  const now = new Date().getTime();
  if (!plan.isExpired && now > plan.expiration) {
    let type = plan.type;
    const expiredParameters = [
      {
        Name: "custom:plan_expired",
        Value: "true",
      },
    ];
    if (plan.type !== PLANS.ONE_HOUR_TRIAL) {
      expiredParameters.push({
        Name: "custom:account_type",
        Value: PLANS.DEACTIVATED,
      });
      type = PLANS.DEACTIVATED;
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
  const params = {
    UserPoolId: cognitoPoolId,
    UserAttributes: attributes,
    Username: username,
  };

  await cup.adminUpdateUserAttributes(params).promise();
};
