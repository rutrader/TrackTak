// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import { VerifyAuthChallengeResponseTriggerEvent, VerifyAuthChallengeResponseTriggerHandler } from 'aws-lambda';
import AWS, { CognitoIdentityServiceProvider } from 'aws-sdk';

const CHANGE_PASSWORD_FUNCTION = 'ChangePassword';
const cup = new CognitoIdentityServiceProvider();

export const handler: VerifyAuthChallengeResponseTriggerHandler = async (event: VerifyAuthChallengeResponseTriggerEvent) => {
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

const changePassword = async (event: VerifyAuthChallengeResponseTriggerEvent) => {
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

const verifyEmail = async (event: VerifyAuthChallengeResponseTriggerEvent) => {
  const params: CognitoIdentityServiceProvider.AdminUpdateUserAttributesRequest = {
    UserPoolId: event.userPoolId,
    UserAttributes: [{
        Name: 'email_verified',
        Value: 'true',
    }],
    Username: event.request.userAttributes.email,
  };
  await cup.adminUpdateUserAttributes(params).promise();

  return event;
}
