import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price: process.env.IBOOST_PRICE_ID, // Monthly iBoost subscription price ID
          quantity: 1,
        },
      ],
      success_url: `${process.env.DOMAIN}/subscription/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.DOMAIN}/subscription/cancel`,
    });

    res.status(200).json({ id: session.id });
  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({ error: 'Failed to create subscription session' });
  }
}