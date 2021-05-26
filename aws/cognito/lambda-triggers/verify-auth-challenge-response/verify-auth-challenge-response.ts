// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import { VerifyAuthChallengeResponseTriggerHandler } from 'aws-lambda';
import AWS from 'aws-sdk';

const CHANGE_PASSWORD_FUNCTION = 'ChangePassword';

export const handler: VerifyAuthChallengeResponseTriggerHandler = async (event) => {
    const expectedAnswer = event.request.privateChallengeParameters!.secretLoginCode; 
    if (event.request.challengeAnswer === expectedAnswer) {
        event.response.answerCorrect = true;
        return changePassword(event);
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
