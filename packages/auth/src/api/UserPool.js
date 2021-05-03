import { CognitoUserPool } from "amazon-cognito-identity-js";
import { POOL_CONFIG } from "./awsCognitoConfig";

export default new CognitoUserPool(POOL_CONFIG);
