import Image from "next/image"

type EmptyProps = {
	label: string
}

export function Empty({ label }: EmptyProps) {
	return (
		<div className="flex h-full flex-col items-center justify-center p-20">
			<div className="relative size-72">
				<Image src="/empty.png" fill alt="Empty" />
			</div>
			<p className="text-center text-sm text-muted-foreground">{label}</p>
		</div>
	)
}
