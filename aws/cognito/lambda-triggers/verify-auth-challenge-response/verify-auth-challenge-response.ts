// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import { VerifyAuthChallengeResponseTriggerHandler } from 'aws-lambda';
import AWS from 'aws-sdk';
import { CognitoIdentityProviderClient, AdminUpdateUserAttributesCommand } from "@aws-sdk/client-cognito-identity-provider";

const CHANGE_PASSWORD_FUNCTION = 'ChangePassword';

export const handler: VerifyAuthChallengeResponseTriggerHandler = async (event) => {
    const expectedAnswer = event.request.privateChallengeParameters!.secretLoginCode;
    const isChangePasswordFlow = !!event.request?.clientMetadata?.newPassword;
    if (event.request.challengeAnswer === expectedAnswer) {
        event.response.answerCorrect = true;
        if (isChangePasswordFlow) {
          return changePassword(event);
        } else {
          return verifyEmail(event);
        }
    } else {
        event.response.answerCorrect = false;
    }
    return event;
};

//@ts-ignore
const changePassword = async (event) => {
    const lambda = new AWS.Lambda();
    const params = {
        FunctionName: CHANGE_PASSWORD_FUNCTION,
        InvocationType: 'Event',
        LogType: 'Tail',
        Payload: JSON.stringify({
            ...event.request.clientMetadata,
            userPoolId: event.userPoolId,
            username: event.request.userAttributes.email,
        })
    }

    const promise = new Promise(function(resolve, reject) {
        lambda.invoke(params, function(err) {
            if (err) {
                console.error(err, err.stack);
                reject(err);
            } else {
                resolve(event);
            }
        });
    });
    return promise;
};

//@ts-ignore
const verifyEmail = async (event) => {
  const client = new CognitoIdentityProviderClient({});
  const command = new AdminUpdateUserAttributesCommand({
      UserPoolId: event.userPoolId,
      Username: event.username,
      UserAttributes: [{
        Name: 'email_verified',
        Value: 'true'
      }],

  });

  return await client.send(command);
}
