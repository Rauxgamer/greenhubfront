// app/api/create-checkout-session/route.ts
export const runtime = "nodejs";  // fuerza Node.js runtime (necesario para stripe)

import { NextResponse } from "next/server";
import stripe from "@/services/stripe";

export async function POST(request: Request) {
  const { items, successUrl, cancelUrl } = await request.json();
  
  if (!Array.isArray(items) || !successUrl || !cancelUrl) {
    return NextResponse.json({ error: "Payload inválido" }, { status: 400 });
  }

  // Construye los line_items para Stripe
  const line_items = items.map((i: any) => ({
    price_data: {
      currency: "eur",
      product_data: { name: i.nombre },
      unit_amount: Math.round(i.precio * 100),
    },
    quantity: i.cantidad,
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: successUrl,
      cancel_url: cancelUrl,
    });
    return NextResponse.json({ sessionId: session.id });
  } catch (err: any) {
    console.error("Stripe error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
