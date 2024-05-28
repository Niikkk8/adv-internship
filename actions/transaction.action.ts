"use server";

import { db } from "@/firebase";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setUser } from "@/redux/userSlice";
import { doc, updateDoc } from "firebase/firestore";
import { redirect } from "next/navigation";
import Stripe from "stripe";

interface CheckoutTransactionParams {
  amount: number;
  plan: string;
  userId: string;
}

interface CreateTransactionParams {
  stripeId: string;
  amount: number;
  plan: string;
  userId: string;
}

interface UserState {
  userId: string | null;
  userEmail: string | null;
  userSubscriptionStatus: string | null;
  userSavedBooks: string[];
  userFinishedBooks: string[];
}

export async function checkoutPlan(transaction: CheckoutTransactionParams) {
  const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);

  const amount = Number(transaction.amount) * 100;

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "INR",
          unit_amount: amount,
          product_data: {
            name: transaction.plan,
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      plan: transaction.plan,
      userId: transaction.userId,
    },
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/for-you`,
    cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/choose-plan`,
  });

  redirect(session.url!);
}

export async function createTransaction(transaction: CreateTransactionParams) {
  try {
    const userDocRef = doc(db, "users", transaction.userId!);
    await updateDoc(userDocRef, {
      userSubscriptionStatus: transaction.plan,
    });
  } catch (error) {
    console.error(error);
  }
}
