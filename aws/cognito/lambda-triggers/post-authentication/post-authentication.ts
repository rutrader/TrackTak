// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import {
  PostAuthenticationTriggerEvent,
  PostAuthenticationTriggerHandler,
} from "aws-lambda";
import { CognitoIdentityServiceProvider } from "aws-sdk";

const cup = new CognitoIdentityServiceProvider();

export const handler: PostAuthenticationTriggerHandler = async (
  event: PostAuthenticationTriggerEvent,
) => {
  const userAttributes = event.request.userAttributes;
  if (!userAttributes["custom:account_type"]) {
    await setInitialAccountAttributes(event);
  }

  return event;
};

const setInitialAccountAttributes = async (
  event: PostAuthenticationTriggerEvent,
) => {
  const params: CognitoIdentityServiceProvider.AdminUpdateUserAttributesRequest = {
    UserPoolId: event.userPoolId,
    UserAttributes: [
      {
        Name: "custom:account_type",
        Value: "Active",
      },
      {
        Name: "custom:account_addons",
        Value: "us_small",
      },
    ],
    Username: event.request.userAttributes.email,
  };
  await cup.adminUpdateUserAttributes(params).promise();

  return event;
};
