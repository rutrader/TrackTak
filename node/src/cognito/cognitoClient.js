import AWS from "aws-sdk";

const cognitoIssuerUri = process.env.COGNITO_ISSUER_URI;
const cognitoPoolId = process.env.COGNITO_POOL_ID;
const region = process.env.REGION;

const cup = new AWS.CognitoIdentityServiceProvider();
cup.config = new AWS.Config({
  region,
});
cup.endpoint = new AWS.Endpoint(cognitoIssuerUri);

export const getCurrentPlan = async (accessToken) => {
  const user = await cup.getUser({ AccessToken: accessToken }).promise();
  const attributes = user.UserAttributes.reduce(
    (all, current) => ({
      ...all,
      [current.Name]: current.Value,
    }),
    {},
  );

  return mapCognitoAttributesToPlan(attributes);
};

export const updatePlan = async (
  username,
  stripeCustomerId,
  type = "Active",
) => {
  const newPlan = {
    "custom:account_type": type,
    "custom:stripe_customer_id": stripeCustomerId,
  };
  await setUserAccountAttributes(username, newPlan);
  return mapCognitoAttributesToPlan(newPlan);
};

const mapCognitoAttributesToPlan = (attributes) => ({
  type: attributes["custom:account_type"],
  stripeCustomerId: attributes["custom:stripe_customer_id"],
});

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
