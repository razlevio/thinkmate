import Link from "next/link"
import { Command } from "lucide-react"

export function Logo() {
	return (
		<Link href="/" className="mb-14 flex items-center pl-3">
			<Command className="mr-4 text-primary" />
			<h1 className="text-xl font-bold">Thinkmate</h1>
		</Link>
	)
}
