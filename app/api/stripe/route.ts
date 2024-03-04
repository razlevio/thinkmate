import { NextResponse } from "next/server"
import { auth, currentUser } from "@clerk/nextjs"

import { db } from "@/lib/db"
import { stripe } from "@/lib/stripe"
import { absoluteUrl } from "@/lib/utils"

const settingsUrl = absoluteUrl("/settings")

export async function GET() {
	try {
		const { userId } = auth()
		const user = await currentUser()

		if (!userId || !user) {
			return new NextResponse("Unauthorized", { status: 401 })
		}

		const userSubscription = await db.userSubscription.findUnique({
			where: {
				userId,
			},
		})

		if (userSubscription && userSubscription.stripeCustomerId) {
			const stripeSession = await stripe.billingPortal.sessions.create({
				customer: userSubscription.stripeCustomerId,
				return_url: settingsUrl,
			})
			return NextResponse.json({ url: stripeSession.url })
		}

		const stripeSession = await stripe.checkout.sessions.create({
			success_url: settingsUrl,
			cancel_url: settingsUrl,
			payment_method_types: ["card"],
			mode: "subscription",
			billing_address_collection: "auto",
			customer_email: user.emailAddresses[0].emailAddress,
			line_items: [
				{
					price_data: {
						currency: "usd",
						product_data: {
							name: "Thinkmate Pro",
							description: "Unlimited idea generations",
						},
						unit_amount: 1000,
						recurring: {
							interval: "month",
						},
					},
					quantity: 1,
				},
			],
			metadata: { userId },
		})

		return NextResponse.json({ url: stripeSession.url })
	} catch (error) {
		console.log("[STRIPE_ERROR]", error)
		return new NextResponse("Internal error", { status: 500 })
	}
}
