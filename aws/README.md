## Amazon Cognito Passwordless Email Auth

Based of [the blog post on passwordless e-mail auth in Amazon Cognito](https://aws.amazon.com/blogs/mobile/implementing-passwordless-email-authentication-with-amazon-cognito/).

- [./cognito](./cognito): a Serverless Application that includes a Cognito user pool with the necessary setup


# Deployment from command line

Set the following environment variables
```bash
export S3_BUCKET_NAME=tracktak-cognito;
export SES_FROM_ADDRESS=registration@tracktak.com;
export STACK_NAME=tracktakCognitoEmailAuthFlow;
export USER_POOL_NAME=Tracktak;
export AWS_DEFAULT_REGION=eu-west-2;
```

Run
```bash
npm run bd
```