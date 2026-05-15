import { stripe, webhookSecret } from '../../../../lib/stripe';
export async function POST(req: Request) {
  const sig = req.headers.get('stripe-signature');
  const body = await req.text();
  const event = stripe.webhooks.constructEvent(body, sig!, webhookSecret!);
  return Response.json({ received: event.type });
}
