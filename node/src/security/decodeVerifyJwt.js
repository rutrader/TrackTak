import axios from "axios";
import { default as jsonwebtoken } from "jsonwebtoken";
import { default as jwkToPem } from "jwk-to-pem";

const cognitoIssuerUri = process.env.COGNITO_ISSUER_URI || "";
const cognitoPoolId = process.env.COGNITO_POOL_ID || "";
if (!cognitoPoolId || !cognitoIssuerUri) {
  throw new Error("env var required for cognito pool and issuer URL");
}
const cognitoIssuer = `${cognitoIssuerUri}${cognitoPoolId}`;

let cacheKeys;
const getPublicKeys = async () => {
  if (!cacheKeys) {
    const url = `${cognitoIssuer}/.well-known/jwks.json`;
    const publicKeys = await axios.get(url);
    cacheKeys = publicKeys.data.keys.reduce((agg, current) => {
      const pem = jwkToPem(current);
      agg[current.kid] = { instance: current, pem };
      return agg;
    }, {});
    return cacheKeys;
  } else {
    return cacheKeys;
  }
};

const getTokenFromHeader = (authHeader) => {
  const token = authHeader.split(" ")[1];
  const split = token.split(".");
  if (split.length < 2) {
    throw Error("requested token is invalid");
  }
  return {
    raw: token,
    header: JSON.parse(Buffer.from(split[0], "base64").toString("utf8")),
    payload: JSON.parse(Buffer.from(split[1], "base64").toString("utf8")),
    signature: split[2],
  };
};

const handler = async (request) => {
  let result;
  try {
    const headers = request.headers;
    const token = getTokenFromHeader(headers.authorization);
    const keys = await getPublicKeys();
    const key = keys[token.header.kid];
    if (key === undefined) {
      throw new Error("claim made for unknown kid");
    }
    const claim = jsonwebtoken.verify(token.raw, key.pem);
    const currentSeconds = Math.floor(new Date().valueOf() / 1000);
    if (currentSeconds > claim.exp || currentSeconds < claim.auth_time) {
      throw new Error("claim is expired or invalid");
    }
    if (claim.iss !== cognitoIssuer) {
      throw new Error("claim issuer is invalid");
    }
    if (claim.token_use !== "access") {
      throw new Error("claim use is not access");
    }
    result = {
      username: claim.username,
      clientId: claim.client_id,
      isValid: true,
    };
  } catch (error) {
    console.error("Error decoding JWT", error);
    result = { username: "", clientId: "", error, isValid: false };
  }
  return result;
};

export default handler;
