import decodeVerifyJwt from '../security/decodeVerifyJwt'

const auth = async (req, res, next) => {
  const userDetails = await decodeVerifyJwt(req)
  if (!userDetails.isValid) {
    return res.status(401).send('Invalid auth token')
  }

  req.user = userDetails

  return next()
}

export default auth

export const excludeStripeWebhookJSON = fn => {
  return (req, res, next) => {
    if (req.path === '/api/v1/stripe-webhook' && req.method === 'POST') {
      next()
    } else {
      fn(req, res, next)
    }
  }
}
