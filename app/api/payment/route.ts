import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2022-11-15' });
  const { priceId } = await request.json();

  const successUrl = `${process.env.SITE_URL}/success`;
  const cancelUrl  = `${process.env.SITE_URL}/cancel`;

  const session = await stripe.checkout.sessions.create({
    line_items: [
      { price: priceId, quantity: 1 }
    ],
    mode: 'payment',    // <-- pago único
    success_url: successUrl,
    cancel_url: cancelUrl,
  });

  return NextResponse.json({ url: session.url });
}
