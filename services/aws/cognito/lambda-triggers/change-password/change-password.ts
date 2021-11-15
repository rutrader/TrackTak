// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import { Handler } from 'aws-lambda';
import { CognitoIdentityProviderClient, AdminSetUserPasswordCommand } from "@aws-sdk/client-cognito-identity-provider";
import { BaseTriggerEvent, StringMap } from 'aws-lambda/trigger/cognito-user-pool-trigger/_common';

interface ChangePasswordTriggerEvent extends BaseTriggerEvent<'VerifyAuthChallengeResponse_Authentication'> {
    request: {
        clientMetadata?: StringMap;
    };
    response: {
        passwordSet: boolean;
    };
}
  
type ChangePasswordTriggerHandler = Handler<ChangePasswordTriggerEvent>;

export const handler: ChangePasswordTriggerHandler = async (event, _, callback) => {
    try {
        const response = await changePassword(event);
        const responseCode = response?.$metadata?.httpStatusCode;
        const passwordSet = responseCode && responseCode >= 200 && responseCode < 300;
        return callback(null, passwordSet);
    } catch (err) {
        return callback(err, null);    
    }
};

//@ts-ignore
const changePassword = async (event) => {
    const client = new CognitoIdentityProviderClient({});
    const command = new AdminSetUserPasswordCommand({
        UserPoolId: event.userPoolId,
        Username: event.username,
        Password: event.newPassword,
        Permanent: true,
    });

    return await client.send(command);
}
