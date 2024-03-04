"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { routes } from "@/lib/routes"
import { cn } from "@/lib/utils"
import { FreeCounter } from "@/components/free-counter"
import { Logo } from "@/components/logo"

type SidebarProps = {
	apiLimitCount: number
	isPro: boolean
}

export function Sidebar({ apiLimitCount = 0, isPro = false }: SidebarProps) {
	const pathname = usePathname()
	return (
		<div className="flex h-full flex-col space-y-4 bg-muted py-4">
			<div className="flex-1 px-3 py-2">
				<Logo />
				<div className="space-y-1">
					{routes.map((route) => (
						<Link
							href={route.href}
							key={route.href}
							className={cn(
								"group flex w-full cursor-pointer justify-start rounded-lg p-3 text-sm font-medium transition",
								pathname.includes(route.href)
									? route.bgColor
									: "hover:bg-primary/10"
							)}
						>
							<div className="flex flex-1 items-center">
								<route.icon
									className={cn(
										"mr-3",
										pathname.includes(route.href) ? route.color : ""
									)}
								/>
								<span
									className={cn(
										pathname.includes(route.href) ? route.color : ""
									)}
								>
									{route.name}
								</span>
							</div>
						</Link>
					))}
				</div>
			</div>
			<FreeCounter apiLimitCount={apiLimitCount} isPro={isPro} />
		</div>
	)
}
