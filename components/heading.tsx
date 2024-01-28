import { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Separator } from "./ui/separator"

type HeadingProps = {
	title: string
	description: string
	icon: LucideIcon
	iconColor?: string
	bgColor?: string
}

export function Heading({
	title,
	description,
	icon: Icon,
	iconColor,
	bgColor,
}: HeadingProps) {
	return (
		<div className="mx-auto flex w-full max-w-4xl flex-col px-4">
			<div className="flex items-center gap-x-3">
				<div className={cn("w-fit rounded-md p-2", bgColor)}>
					<Icon className={cn("size-10", iconColor)} />
				</div>
				<div>
					<h2 className="text-3xl font-bold">{title}</h2>
          <p className="text-sm text-muted-foreground">{description}</p>
				</div>
			</div>
			<Separator className="my-6" />
		</div>
	)
}
