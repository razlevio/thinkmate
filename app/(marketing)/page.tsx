import { redirect } from 'next/navigation'
import { SignInButton, SignUpButton, auth } from "@clerk/nextjs"

import { Button } from "@/components/ui/button"

export default function MarketingPage() {
	const { userId } = auth()

	if (userId) redirect("/dashboard")

	return (
		<div>
			<h1>Marketing Page (Unprotected)</h1>
			<div>
				<SignInButton mode="modal">
					<Button size={"sm"}>Login</Button>
				</SignInButton>
				<SignUpButton mode="modal">
					<Button size={"sm"}>Sign Up</Button>
				</SignUpButton>
			</div>
		</div>
	)
}
