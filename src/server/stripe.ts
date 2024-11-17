import Stripe from 'stripe';
import { AffiliateService } from './services/affiliate';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export const createSubscription = async (email: string, affiliateCode: string) => {
  try {
    // Create or retrieve customer
    const customer = await stripe.customers.create({
      email,
      metadata: {
        affiliateCode,
      },
    });

    // Create subscription checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID, // Monthly membership price ID
          quantity: 1,
        },
      ],
      success_url: `${process.env.DOMAIN}/subscription/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.DOMAIN}/subscription/cancel`,
      metadata: {
        affiliateCode,
      },
    });

    return { id: session.id };
  } catch (error) {
    console.error('Subscription creation failed:', error);
    throw error;
  }
};

export const handleSubscriptionWebhook = async (event: Stripe.Event) => {
  const affiliateService = new AffiliateService();

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      const affiliateCode = session.metadata?.affiliateCode;

      if (affiliateCode) {
        // Calculate affiliate commission (30% of €3.99 = €1.20)
        await affiliateService.distributeCommission(1.20, 'subscription', affiliateCode);
      }
      break;
    }

    case 'invoice.paid': {
      const invoice = event.data.object as Stripe.Invoice;
      const customer = await stripe.customers.retrieve(invoice.customer as string);
      const affiliateCode = customer.metadata?.affiliateCode;

      if (affiliateCode) {
        // Distribute monthly affiliate commission
        await affiliateService.distributeCommission(1.20, 'subscription', affiliateCode);
      }
      break;
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription;
      // Handle subscription cancellation
      break;
    }
  }
};