"use client"

import Link from "next/link"
import { useAuth } from "@clerk/nextjs"
import TypewriterComponent from "typewriter-effect"

import { examplePrompts } from "@/lib/constants"
import { Button } from "@/components/ui/button"

export function LandingHero() {
	const { isSignedIn } = useAuth()

	return (
		<div className="space-y-5 py-36 text-center">
			<div className="space-y-5 font-extrabold">
				<h1 className="text-xl md:text-3xl">Instant Idea Generation</h1>
				<div className="bg-gradient-to-r from-gray-400 to-gray-600 bg-clip-text text-2xl text-transparent md:text-4xl lg:text-5xl xl:text-6xl">
					<TypewriterComponent
						options={{
							strings: examplePrompts,
							delay: 60,
							deleteSpeed: 30,
							autoStart: true,
							loop: true,
						}}
					/>
				</div>
			</div>
			<div className="text-sm font-light text-zinc-400 md:text-xl">
				Spark your imagination 10x faster using AI.
			</div>
			<div>
				<Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
					<Button
						variant="premium2"
						className="rounded-full p-4 font-semibold md:p-6 md:text-lg"
					>
						Start Generating For Free
					</Button>
				</Link>
			</div>
			<div className="text-xs font-normal text-zinc-400 md:text-sm">
				No credit card required.
			</div>
		</div>
	)
}
