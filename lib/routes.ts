import { Bot, GaugeCircle, LucideIcon, Settings, Zap } from "lucide-react"

type RouteProps = {
	name: string
	href: string
	icon: LucideIcon
	color: string
	bgColor: string
}

export const routes: RouteProps[] = [
	{
		name: "Dashboard",
		href: "/dashboard",
		icon: GaugeCircle,
		color: "text-primary",
		bgColor: "bg-primary/10",
	},
	{
		name: "Generator",
		href: "/generator",
		icon: Zap,
		color: "text-primary",
		bgColor: "bg-primary/10",
	},
	// {
	// 	name: "Assistants",
	// 	href: "/assistants",
	// 	icon: Bot,
	// 	color: "text-primary",
	// 	bgColor: "bg-primary/10",
	// },
	{
		name: "Settings",
		href: "/settings",
		icon: Settings,
		color: "text-primary",
		bgColor: "bg-primary/10",
	},
]
