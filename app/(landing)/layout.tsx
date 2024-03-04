import { LandingFooter } from "./_components/landing-footer"
import { LandingNavbar } from "./_components/landing-navbar"

export default function LandingLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<main className="mx-auto flex h-full max-w-screen-xl flex-col justify-between">
			<LandingNavbar />
			{children}
			<LandingFooter />
		</main>
	)
}
