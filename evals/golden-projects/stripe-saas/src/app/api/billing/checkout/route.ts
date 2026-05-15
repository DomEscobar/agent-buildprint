import { stripe } from '../../../../lib/stripe';
export async function POST() {
  return Response.json({ url: 'checkout-session-url' });
}
