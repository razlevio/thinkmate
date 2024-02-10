"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { routes } from "@/lib/routes"
import { cn } from "@/lib/utils"
import { Logo } from "@/components/logo"

export function Sidebar() {
	const pathname = usePathname()
	return (
		<div className="flex h-full flex-col space-y-4 py-4">
			<div className="flex-1 px-3 py-2">
				<Logo />
				<div className="space-y-1">
					{routes.map((route) => (
						<Link
							href={route.href}
							key={route.href}
							className={cn(
								"group flex w-full cursor-pointer justify-start rounded-lg p-3 text-sm font-medium transition",
								pathname.includes(route.href) ? route.bgColor : "hover:bg-primary/10"
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
									className={cn(pathname.includes(route.href) ? route.color : "")}
								>
									{route.name}
								</span>
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	)
}
