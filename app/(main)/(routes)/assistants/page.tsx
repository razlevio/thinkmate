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

const assistants = [
	{
		name: "Vision",
		description: "",
		icon: Shrub,
		href: "/assistants/vision",
    color: "text-emerald-500",
		bgColor: "bg-emerald-500/10"
	},
	{
		name: "Philosophy",
		description: "",
		icon: Lightbulb,
		href: "/assistants/philosophy",
    color: "text-orange-500",
		bgColor: "bg-orange-500/10"
	},
	{
		name: "Legacy",
		description: "",
		icon: Users,
		href: "/assistants/legacy",
    color: "text-violet-500",
		bgColor: "bg-violet-500/10"
	},
  {
		name: "Dates",
		description: "",
		icon: BookHeart,
		href: "/assistants/dates",
    color: "text-rose-500",
		bgColor: "bg-rose-500/10"
	},
	{
		name: "Fun",
		description: "",
		icon: FerrisWheel,
		href: "/assistants/fun",
    color: "text-cyan-500",
		bgColor: "bg-cyan-500/10"
	},
	{
		name: "Food",
		description: "",
		icon: Apple,
		href: "/assistants/food",
    color: "text-fuchsia-500",
		bgColor: "bg-fuchsia-500/10"
	},
  {
		name: "Travel",
		description: "",
		icon: Backpack,
		href: "/assistants/travel",
    color: "text-blue-500",
		bgColor: "bg-blue-500/10"
	},
	{
		name: "Spicy",
		description: "",
		icon: Flame,
		href: "/assistants/spicy",
    color: "text-yellow-600",
		bgColor: "bg-yellow-600/10"
	},
	{
		name: "Exploration",
		description: "",
		icon: PartyPopper,
		href: "/assistants/exploration",
    color: "text-indigo-700",
		bgColor: "bg-indigo-700/10"
	},
]


export default function AssistantsPage() {

  const router = useRouter()

  return (
    <div>
      <div className="mb-8 space-y-4">
        <h2 className="md:texl-4xl text-center text-2xl font-bold">Navigate Your World with AI</h2>
        <p className="text-center text-sm font-light text-muted-foreground md:text-lg">Discover New Visions, Experiences, and Journeys with the help of cutting-edge AI assistants</p>
      </div>
      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 md:px-10 lg:grid-cols-3 xl:px-24">
        {assistants.map((assistant) => (
          <Card
            key={assistant.href}
            className="flex cursor-pointer items-center justify-between p-4 transition hover:shadow-md"
            onClick={() => router.push(assistant.href)}
          >
            <div className="flex items-center gap-x-4">
              <div className={cn("w-fit rounded-md p-2", assistant.bgColor)}>
                <assistant.icon className={cn("size-8", assistant.color)} />
              </div>
              <div className="font-semibols">
                {assistant.name}
              </div>
            </div>
            <ArrowRight className="size-5" />
          </Card>
        ))}
      </div>
    </div>
  )
}
