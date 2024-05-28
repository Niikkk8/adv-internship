import { buffer } from "micro";
import * as admin from "firebase-admin";
import Stripe from "stripe";
import { NextApiRequest, NextApiResponse } from "next";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-04-10",
});

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(
      JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY!)
    ),
  });
}

export const config = {
  api: {
    bodyParser: false,
  },
};

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

const handleStripeEvent = async (event: Stripe.Event) => {
  const db = admin.firestore();

  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.userId;
      const plan = session.amount_total === 99900 ? "Premium-Plus" : "Premium";

      if (userId) {
        await db.collection("users").doc(userId).update({
          userSubscriptionStatus: plan,
        });
      } else {
        console.warn(`User ID not found in session metadata`);
      }

      await db.collection("payments").doc(session.id).set({
        amount_total: session.amount_total,
        customer_email: session.customer_email,
        status: session.payment_status,
      });
      break;
    default:
      console.warn(`Unhandled event type ${event.type}`);
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"] as string;

    let event: Stripe.Event;

    event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);

    try {
      await handleStripeEvent(event);
    } catch (error) {
      console.error("Error handling event:", error);
      return res.status(500).send("Internal Server Error");
    }

    res.json({ received: true });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
