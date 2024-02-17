import { redirect } from "next/navigation"
import { auth, SignInButton, SignUpButton } from "@clerk/nextjs"

import { Button } from "@/components/ui/button"

import { LandingContent } from "./_components/landing-content"
import { LandingHero } from "./_components/landing-hero"
import { LandingNavbar } from "./_components/landing-navbar"

export default function MarketingPage() {

	return (
		<div className="">
			<LandingNavbar />
			<LandingHero />
		</div>
	)
}
