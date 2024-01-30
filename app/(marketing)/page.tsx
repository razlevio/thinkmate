"use client"

import { SignInButton, SignUpButton, useAuth } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function MarketingPage() {
	const { userId } = useAuth()
	const router = useRouter()

	if(userId) router.push("/dashboard")
	else
		return (
			<div>
				<h1>Marketing Page (Unprotected)</h1>
				<div>
					<SignInButton mode="modal">
						<Button size={"sm"} >Login</Button>
					</SignInButton>
					<SignUpButton mode="modal">
						<Button size={"sm"}>Sign Up</Button>
					</SignUpButton>
				</div>
			</div>
		)
}
