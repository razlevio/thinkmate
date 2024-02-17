export default function LandingLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<main className="h-full">
			<div className="mx-auto size-full max-w-screen-xl">{children}</div>
		</main>
	)
}
