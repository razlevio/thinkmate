"use client"

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
  ArrowRight,
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
const tools = [
	{
		label: "Vision",
		icon: Shrub,
		href: "/vision",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
	},
	{
		label: "Philosophy",
		icon: Lightbulb,
		href: "/philosophy",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
	},
	{
		label: "Legacy",
		icon: Users,
		href: "/legacy",
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
	},
  {
		label: "Dates",
		icon: BookHeart,
		href: "/dates",
    color: "text-rose-500",
    bgColor: "bg-rose-500/10",
	},
	{
		label: "Fun",
		icon: FerrisWheel,
		href: "/fun",
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
	},
	{
		label: "Food",
		icon: Apple,
		href: "/food",
    color: "text-fuchsia-500",
    bgColor: "bg-fuchsia-500/10",
	},
  {
		label: "Travel",
		icon: Backpack,
		href: "/travel",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
	},
	{
		label: "Spicy",
		icon: Flame,
		href: "/spicy",
    color: "text-yellow-600",
    bgColor: "bg-yellow-600/10",
	},
	{
		label: "Exploration",
		icon: PartyPopper,
		href: "/exploration",
    color: "text-indigo-700",
    bgColor: "bg-indigo-700/10",
	},
]


export default function DashboardPage() {
  
  const router = useRouter()

  return (
    <div>
      <div className="mb-8 space-y-4">
        <h2 className="md:texl-4xl font bold text-center text-2xl">Explore the power of AI to enhance day-to-day life</h2>
        <p className="text-center text-sm font-light text-muted-foreground md:text-lg">Chat with a collection of sophisticated AI agents designed to enhance peoples day-to-day lives and relationships by promoting exciting, creative ideas in various aspects of life</p>
      </div>
      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 md:px-10 lg:grid-cols-3 xl:px-24">
        {tools.map((tool) => (
          <Card
            key={tool.href}
            className="flex cursor-pointer items-center justify-between p-4 transition hover:shadow-md"
            onClick={() => router.push(tool.href)}
          >
            <div className="flex items-center gap-x-4">
              <div className={cn("w-fit rounded-md p-2", tool.bgColor)}>
                <tool.icon className={cn("size-8", tool.color)} />
              </div>
              <div className="font-semibols">
                {tool.label}
              </div>
            </div>
            <ArrowRight className="size-5" />
          </Card>
        ))}
      </div>
    </div>
  )
}