"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { assistantsUI } from "@/types/assistants"
import { cn } from "@/lib/utils"
import { Command } from "lucide-react"

export function Sidebar() {
	const pathname = usePathname()
	return (
			<div className="flex h-full flex-col space-y-4 py-4">
				<div className="flex-1 px-3 py-2">
					<Link href="/dashboard" className="mb-14 flex items-center pl-3">
            <Command className="mr-4" />
            <h1 className="text-xl font-bold">Thinkmate</h1>
					</Link>
          <div className="space-y-1">
            {assistantsUI.map((assistant) => (
              <Link
                href={assistant.href}
                key={assistant.href}
                className={cn("group flex w-full cursor-pointer justify-start rounded-lg p-3 text-sm font-medium transition",
									assistant.href === pathname ? assistant.bgColor : "hover:bg-muted",
								)}>
                <div className="flex flex-1 items-center">
                  <assistant.icon className={cn("mr-3", assistant.color)} />
                  {assistant.name}
                </div>
              </Link>
            ))}
          </div>
				</div>
			</div>
	)
}
