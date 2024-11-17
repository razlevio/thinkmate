"use client"

import Link from "next/link"
import { useAuth } from "@clerk/nextjs"

import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"
import { ThemeToggle } from "@/components/theme-toggle"

export const LandingNavbar = () => {
	const { isSignedIn } = useAuth()

	return (
		<nav className="fixed top-0 flex w-full max-w-screen-xl items-center justify-center p-4">
			<div className="flex w-full items-center justify-between">
				<Logo />
				<Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
					<Button variant="outline" className="rounded-full">
						Get Started
					</Button>
				</Link>
			</div>
			<ThemeToggle />
		</nav>
	)
}
