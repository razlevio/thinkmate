"use client"

import Link from "next/link"
import { useAuth } from "@clerk/nextjs"

import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"

export const LandingNavbar = () => {
	const { isSignedIn } = useAuth()

	return (
		<nav className="flex items-center justify-between p-4">
			<Logo />
			<Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
				<Button variant="outline" className="rounded-full">
					Get Started
				</Button>
			</Link>
		</nav>
	)
}
