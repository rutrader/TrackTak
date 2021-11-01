import "dotenv/config";
import express from "express";
import cors from "cors";
import api from "./api";
import auth, { excludeStripeWebhookJSON } from "./middleware/auth";
import Stripe from "stripe";
import { CURRENT_PLAN_ENDPOINT } from "./shared/constants";
import { Plans, updatePlan } from "./cognito/cognitoClient";

const hostname = "127.0.0.1";
const port = process.env.NODE_ENV === "development" ? 3001 : process.env.PORT;
const app = express();
const stripe = Stripe(process.env.STRIPE_AUTH_SECRET_KEY);

app.use(express.static("public"));
app.use(excludeStripeWebhookJSON(express.json({ limit: "16mb" })));

// const publicRoutes = ["/api/v1/compute-sensitivity-analysis"];

app.use(cors());

// app.options(publicRoutes[0], cors());

// // These routes are public so they have cors turned off
// app.post(publicRoutes[0], cors(), async (req, res) => {
//   const { sheetsSerializedValues, existingScope, currentScopes } = req.body;
//   const values = await api.computeSensitivityAnalysis(
//     sheetsSerializedValues,
//     existingScope,
//     currentScopes,
//   );

//   res.send(values);
// });

app.use(
  cors({
    origin: process.env.ORIGIN_URL,
    optionsSuccessStatus: 204,
  }),
);

app.get("/api/v1/fundamentals/:ticker", async (req, res) => {
  const value = await api.getFundamentals(req.params.ticker, req.query);

  res.send({ value });
});

app.get("/api/v1/prices/:ticker", async (req, res) => {
  const value = await api.getPrices(req.params.ticker, req.query);

  res.send({ value });
});

app.get("/api/v1/eur-base-exchange-rate/:code", async (req, res) => {
  const value = await api.getEURBaseExchangeRate(req.params.code, req.query);

  res.send({ value });
});

app.get(
  "/api/v1/exchange-rate/:baseCurrency/:quoteCurrency",
  async (req, res) => {
    const value = await api.getExchangeRate(
      req.params.baseCurrency,
      req.params.quoteCurrency,
      req.query,
    );

    res.send({ value });
  },
);

app.get("/api/v1/exchange-symbol-list/:code", async (req, res) => {
  const value = await api.getExchangeSymbolList(req.params.code, req.query);
  res.send({ value });
});

app.get("/api/v1/government-bond/:code", async (req, res) => {
  const value = await api.getGovernmentBond(req.params.code, req.query);
  res.send({ value });
});

app.get("/api/v1/autocomplete-query/:queryString", async (req, res) => {
  const value = await api.getAutocompleteQuery(
    req.params.queryString,
    req.query,
  );
  res.send({ value });
});

app.get("/api/v1/financial-data/:id", async (req, res) => {
  const financialData = await api.getFinancialData(req.params.id);

  res.send({ financialData });
});

app.post("/api/v1/financial-data", auth, async (req, res) => {
  let financialData = req.body.financialData;

  const financialDataQuery = {
    code: financialData.general.code,
    exchange: financialData.general.exchange,
    updatedAt: financialData.general.updatedAt,
  };

  const existingFinancialData = await api.getFinancialDataByQuery(
    financialDataQuery,
  );

  if (existingFinancialData) {
    financialData = existingFinancialData;
  } else {
    financialData = await api.createFinancialData(financialData);
  }

  if (req.body.spreadsheetId) {
    await api.updateSpreadsheet(
      req.body.spreadsheetId,
      financialData._id,
      req.user.username,
    );
  }

  res.send({ financialData });
});

app.post("/api/v1/spreadsheets", auth, async (req, res) => {
  const financialData = {
    ticker: req.body.ticker,
  };
  const spreadsheet = await api.saveSpreadsheet(
    req.body.sheetData,
    req.user.username,
    financialData,
  );
  res.send({ spreadsheet });
});

app.put("/api/v1/spreadsheets", auth, async (req, res) => {
  const spreadsheet = await api.saveSpreadsheet(
    req.body.sheetData,
    req.user.username,
    req.body.financialData,
    req.body._id,
    req.body.createdTimestamp,
  );
  res.send({ spreadsheet });
});

app.get("/api/v1/spreadsheets", auth, async (req, res) => {
  const spreadsheets = await api.getSpreadsheets(req.user.username);
  res.send({ spreadsheets });
});

app.get("/api/v1/spreadsheets/:id", auth, async (req, res) => {
  const spreadsheet = await api.getSpreadsheet(
    req.user.username,
    req.params.id,
  );

  res.send({ spreadsheet });
});

app.delete("/api/v1/spreadsheets/:id", auth, async (req, res) => {
  await api.deleteSpreadsheet(req.params.id, req.user.username);

  res.send({ id: req.params.id });
});

const getSubscription = async (stripeCustomerId) => {
  const customer = await stripe.customers.retrieve(stripeCustomerId, {
    expand: ["subscriptions"],
  });
  return (
    customer.subscriptions.data.length > 0 && customer.subscriptions.data[0]
  );
};

app.get(CURRENT_PLAN_ENDPOINT, auth, async (req, res) => {
  const currentPlan = await api.getCurrentPlan(req.user.accessToken);
  let stripeData = {
    priceIds: [],
  };
  if (currentPlan.stripeCustomerId) {
    const subscription = await getSubscription(currentPlan.stripeCustomerId);

    if (subscription) {
      const paymentMethod = await stripe.paymentMethods.retrieve(
        subscription.default_payment_method,
      );

      stripeData = {
        periodEnd:
          currentPlan.type === Plans.FROZEN
            ? subscription.pause_collection.resumes_at * 1000
            : subscription.current_period_end * 1000, // to ms
        priceIds:
          currentPlan.type === Plans.FROZEN
            ? []
            : subscription.items.data.map((x) => x.price.id),
        totalCost:
          subscription.items.data.reduce(
            (sum, x) => (sum += x.price.unit_amount),
            0,
          ) / 100,
        paymentCardLast4: paymentMethod && paymentMethod.card.last4,
        paymentCardBrand: paymentMethod && paymentMethod.card.brand,
      };
    }
  }

  res.send({
    ...currentPlan,
    ...stripeData,
  });
});

app.put(CURRENT_PLAN_ENDPOINT, auth, async (req, res) => {
  const currentPlan = await api.getCurrentPlan(req.user.accessToken);
  const { state, monthsToFreeze } = req.body;

  if (currentPlan.stripeCustomerId) {
    const subscription = await getSubscription(currentPlan.stripeCustomerId);

    switch (state) {
      case "freeze": {
        const now = new Date();
        const resumesAt =
          new Date(
            now.getFullYear(),
            now.getMonth() + Number(monthsToFreeze),
            now.getDay(),
          ).getTime() / 1000; // to seconds
        await stripe.subscriptions.update(subscription.id, {
          pause_collection: {
            behavior: "void",
            resumes_at: resumesAt,
          },
        });
        const updatedPlan = await updatePlan(
          req.user.username,
          currentPlan.stripeCustomerId,
          Plans.FROZEN,
        );
        res.send({
          ...updatedPlan,
          priceIds: [],
        });
        break;
      }
      case "cancel": {
        await stripe.subscriptions.del(subscription.id);
        const updatedPlan = await updatePlan(
          req.user.username,
          currentPlan.stripeCustomerId,
          Plans.ACTIVE,
        );
        res.send({
          ...updatedPlan,
          priceIds: [],
        });
        break;
      }
      default:
        console.error("Unknown account state transition");
    }
  }
});

app.get("/v1/prices/:id", auth, async (req, res) => {
  const id = req.params.id;

  const price = await stripe.prices.retrieve(id);
  res.send({ price });
});

app.post("/api/v1/create-checkout-session", auth, async (req, res) => {
  const { lineItems } = req.body;

  try {
    const currentPlan = await api.getCurrentPlan(req.user.accessToken);
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: lineItems,
      allow_promotion_codes: true,
      billing_address_collection: "required",
      automatic_tax: {
        enabled: true,
      },
      success_url: `${process.env.ORIGIN_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.ORIGIN_URL}/pricing`,
      metadata: {
        username: req.user.username,
      },
      ...(currentPlan.stripeCustomerId && {
        customer: currentPlan.stripeCustomerId,
      }),
    });

    res.send({ url: session.url });
  } catch (e) {
    res.status(400);
    return res.send({
      error: {
        message: e.message,
      },
    });
  }
});

app.post(
  "/api/v1/stripe-webhook",
  // auth,
  express.raw({ type: "application/json" }),
  async (req, res) => {
    let event;
    const signature = req.headers["stripe-signature"];
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET,
      );
    } catch (err) {
      console.error("Webhook signature verification failed.");
      return res.sendStatus(400);
    }

    switch (event.type) {
      case "checkout.session.completed":
        const eventData = event.data.object;
        updatePlan(eventData.metadata.username, eventData.customer);
        break;
      default:
        console.error(`Unhandled event type ${event.type}`);
    }

    res.sendStatus(200);
  },
);

app.post("/api/v1/create-customer-portal-session", auth, async (req, res) => {
  const returnUrl = `${process.env.ORIGIN_URL}/account-settings`;

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: "cus_KRWrqkdz1yQ8L6",
    return_url: returnUrl,
  });

  res.send({ url: portalSession.url });
});

app.get("/", (_, res) => {
  res.sendStatus(200);
});

app.listen(port, async () => {
  console.log(`Server running at ${hostname}:${port}/`);
});
