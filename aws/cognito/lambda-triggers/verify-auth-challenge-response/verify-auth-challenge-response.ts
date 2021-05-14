// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import { VerifyAuthChallengeResponseTriggerHandler } from 'aws-lambda';
import AWS from 'aws-sdk';

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
    const lambda = new AWS.Lambda({
        region: 'eu-west-2'
    });
    const params = {
        FunctionName: 'cognitoEmailAuthFlow-ChangePassword-P8M0410OHSTW', // TODO - better way to get name?
        InvocationType: 'Event',
        LogType: 'Tail',
        Payload: JSON.stringify({
            ...event.request.clientMetadata,
            username: event.request.userAttributes.email,
        })
    }

    const promise = new Promise(function(resolve, reject) {
        lambda.invoke(params, function(err, data) {
            if (err) {
                console.log(err, err.stack);
                reject(err);
            } else {
                console.log(data, event);
                resolve(event);
            }
        });
    });
    return promise;
};
