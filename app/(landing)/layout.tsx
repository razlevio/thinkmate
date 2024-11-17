import { LandingFooter } from "./_components/landing-footer"
import { LandingNavbar } from "./_components/landing-navbar"

export default function LandingLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<main className="mx-auto flex h-full max-w-screen-xl flex-col justify-between">
			<div className="absolute inset-0 -z-10 size-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute inset-x-0 top-0 -z-10 m-auto size-[310px] rounded-full bg-blue-400 opacity-20 blur-[100px]"></div></div>			<LandingNavbar />
			{children}
			<LandingFooter />
		</main>
	)
}
