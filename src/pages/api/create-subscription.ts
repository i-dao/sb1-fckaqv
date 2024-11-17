import { NextApiRequest, NextApiResponse } from 'next';
import { createSubscription } from '../../server/stripe';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, affiliateCode } = req.body;

    if (!email || !affiliateCode) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const session = await createSubscription(email, affiliateCode);
    res.status(200).json(session);
  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({ error: 'Subscription creation failed' });
  }
}