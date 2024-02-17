"use client"

import { Montserrat } from "next/font/google"
import Image from "next/image"
import Link from "next/link"
import { useAuth } from "@clerk/nextjs"
import { Command } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"

const font = Montserrat({ weight: "600", subsets: ["latin"] })

export const LandingNavbar = () => {
	const { isSignedIn } = useAuth()

	return (
		<nav className="flex  items-center justify-between p-4">
			<Link href="/" className="flex items-center">
				<Command className="mr-4 text-primary" />
				<h1 className="text-xl font-bold">Thinkmate</h1>
			</Link>
			<Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
				<Button variant="outline" className="rounded-full">
					Get Started
				</Button>
			</Link>
		</nav>
	)
}
