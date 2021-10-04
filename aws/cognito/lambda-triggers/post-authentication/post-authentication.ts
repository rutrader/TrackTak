// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import {
  PostAuthenticationTriggerEvent,
  PostAuthenticationTriggerHandler,
} from "aws-lambda";
import { CognitoIdentityServiceProvider } from "aws-sdk";

const cup = new CognitoIdentityServiceProvider();
const ONE_HOUR = 60 * 60 * 1000;

export const handler: PostAuthenticationTriggerHandler = async (
  event: PostAuthenticationTriggerEvent,
) => {
  const userAttributes = event.request.userAttributes;
  if (!userAttributes["custom:account_type"]) {
    await setTrialAttributes(event);
  }

  return event;
};

const setTrialAttributes = async (event: PostAuthenticationTriggerEvent) => {
  const planExpiration = (new Date().getTime() + ONE_HOUR).toString();
  const params: CognitoIdentityServiceProvider.AdminUpdateUserAttributesRequest = {
    UserPoolId: event.userPoolId,
    UserAttributes: [
      {
        Name: "custom:account_type",
        Value: "1-hour-trial",
      },
      {
        Name: "custom:account_addons",
        Value: "",
      },
      {
        Name: "custom:plan_expiration",
        Value: planExpiration,
      },
      {
        Name: "custom:plan_expired",
        Value: "false",
      },
    ],
    Username: event.request.userAttributes.email,
  };
  await cup.adminUpdateUserAttributes(params).promise();

  return event;
};
