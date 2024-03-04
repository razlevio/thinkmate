import Link from "next/link"

export function Logo() {
	return (
		<Link href="/" className="flex items-center">
			<span
				className="mr-4 text-3xl text-primary"
				role="img"
				aria-label="logo-symbol"
			>
				💠
			</span>
			<h1 className="text-xl font-bold">Thinkmate</h1>
		</Link>
	)
}
