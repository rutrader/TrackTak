## Amazon Cognito Passwordless Email Auth

Based of [the blog post on passwordless e-mail auth in Amazon Cognito](https://aws.amazon.com/blogs/mobile/implementing-passwordless-email-authentication-with-amazon-cognito/).

- [./cognito](./cognito): a Serverless Application that includes a Cognito user pool with the necessary setup

This is currently used for the forgot password flow to verify a user's email and set a new password.


# Deployment from command line

Set the following environment variables
**PROD**
```bash
export S3_BUCKET_NAME=tracktak-cognito;
export SES_FROM_ADDRESS=registration@tracktak.com;
export STACK_NAME=tracktakCognitoEmailAuthFlow;
export USER_POOL_NAME=Tracktak;
export AWS_DEFAULT_REGION=eu-west-2;
export SES_SOURCE_ARN=arn:aws:ses:eu-west-1:326973209868:identity/tracktak.com;
export CLOUDFORMATION_ENV=prod;
export GOOGLE_CLIENT_ID="<GetFromSecretFile>";
export GOOGLE_CLIENT_SECRET="<GetFromSecretFile>";
export FACEBOOK_CLIENT_ID="<GetFromSecretFile>";
export FACEBOOK_CLIENT_SECRET="<GetFromSecretFile>";
export USER_POOL_DOMAIN_CERT_ARN=arn:aws:acm:us-east-1:326973209868:certificate/56970e7c-9a27-45bd-bf16-8c4acb06ee70;
```

**TEST**
```bash
export S3_BUCKET_NAME=tracktak-cognito-test;
export SES_FROM_ADDRESS=registration@tracktak.com;
export STACK_NAME=tracktakCognitoEmailAuthFlowTest;
export USER_POOL_NAME=TracktakTest;
export AWS_DEFAULT_REGION=eu-west-1;
export SES_SOURCE_ARN=arn:aws:ses:eu-west-1:326973209868:identity/tracktak.com;
export CLOUDFORMATION_ENV=test;
export GOOGLE_CLIENT_ID="<GetFromSecretFile>";
export GOOGLE_CLIENT_SECRET="<GetFromSecretFile>";
export FACEBOOK_CLIENT_ID="<GetFromSecretFile>";
export FACEBOOK_CLIENT_SECRET="<GetFromSecretFile>";
export USER_POOL_DOMAIN_CERT_ARN="null"
```

Run
```bash
npm run bd
```
