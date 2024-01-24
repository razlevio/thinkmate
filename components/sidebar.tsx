"use client"

import Link from "next/link"
import {
	Apple,
	Backpack,
	BookHeart,
	Command,
	FerrisWheel,
	Flame,
	GaugeCircle,
	Lightbulb,
	LucideIcon,
	Menu,
	PartyPopper,
	Settings,
	Shrub,
	Users,
} from "lucide-react"
import { cn } from "@/lib/utils"

type SidebarItemProps = {
	label: string
	icon: LucideIcon
	href: string
  color?: string
}

const routes: SidebarItemProps[] = [
  {
		label: "Dashboard",
		icon: GaugeCircle,
		href: "/dashboard",
	},
	{
		label: "Vision",
		icon: Shrub,
		href: "/vision",
    color: "text-emerald-500",
	},
	{
		label: "Philosophy",
		icon: Lightbulb,
		href: "/philosophy",
    color: "text-orange-500",
	},
	{
		label: "Legacy",
		icon: Users,
		href: "/legacy",
    color: "text-violet-500",
	},
  {
		label: "Dates",
		icon: BookHeart,
		href: "/dates",
    color: "text-rose-500",
	},
	{
		label: "Fun",
		icon: FerrisWheel,
		href: "/fun",
    color: "text-cyan-500"
	},
	{
		label: "Food",
		icon: Apple,
		href: "/food",
    color: "text-fuchsia-500"
	},
  {
		label: "Travel",
		icon: Backpack,
		href: "/travel",
    color: "text-blue-500"
	},
	{
		label: "Spicy",
		icon: Flame,
		href: "/spicy",
    color: "text-yellow-600"
	},
	{
		label: "Exploration",
		icon: PartyPopper,
		href: "/exploration",
    color: "text-indigo-700"
	},
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
  }
]

export function Sidebar() {
	return (
			<div className="flex h-full flex-col space-y-4 py-4">
				<div className="flex-1 px-3 py-2">
					<Link href="/dashboard" className="mb-14 flex items-center pl-3">
            <Command className="mr-4" />
            <h1 className="text-xl font-bold">Thinkmate</h1>
					</Link>
          <div className="space-y-1">
            {routes.map((route) => (
              <Link
                href={route.href}
                key={route.href}
                className="group flex w-full cursor-pointer justify-start rounded-lg p-3 text-sm font-medium transition hover:bg-muted"
              >
                <div className="flex flex-1 items-center">
                  <route.icon className={cn("mr-3", route.color)} />
                  {route.label}
                </div>
              </Link>
            ))}
          </div>
				</div>
			</div>
	)
}
