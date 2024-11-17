import Image from "next/image"
import Link from "next/link"

export function Logo() {
	return (
		<Link href="/" className="flex items-center justify-center">
			<Image
				src="/thinkmate.png"
				alt="Thinkmate"
				width={40}
				height={40}
			/>
			<h1 className="text-xl font-extrabold">Thinkmate</h1>
		</Link>
	)
}
