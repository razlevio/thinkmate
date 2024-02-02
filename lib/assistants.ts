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
	PartyPopper,
	Settings,
	Shrub,
	Users,
} from "lucide-react"

type AssistantUIProps = {
	name: string
	description: string
	icon: LucideIcon
	href: string
  color: string
	bgColor: string
	firstInitialMessage?: string
}

export const assistantsUI: AssistantUIProps[] = [
  {
		name: "Dashboard",
		description: "",
		icon: GaugeCircle,
		href: "/dashboard",
		color: "",
		bgColor: "bg-muted"
	},
	{
		name: "Vision",
		description: "",
		icon: Shrub,
		href: "/assistant/vision",
    color: "text-emerald-500",
		bgColor: "bg-emerald-500/10",
		firstInitialMessage: "Hello, I am your guide to envisioning and achieving your future. What are your dreams and how can we work together to turn them into reality?"
	},
	{
		name: "Philosophy",
		description: "",
		icon: Lightbulb,
		href: "/assistant/philosophy",
    color: "text-orange-500",
		bgColor: "bg-orange-500/10",
		firstInitialMessage: "Welcome, fellow thinker. As your navigator through the intricate realms of philosophy, I'm here to spark enlightening ideas and offer diverse perspectives that enrich your journey through life's deepest questions"
	},
	{
		name: "Legacy",
		description: "",
		icon: Users,
		href: "/assistant/legacy",
    color: "text-violet-500",
		bgColor: "bg-violet-500/10"
	},
  {
		name: "Dates",
		description: "",
		icon: BookHeart,
		href: "/assistant/dates",
    color: "text-rose-500",
		bgColor: "bg-rose-500/10"
	},
	{
		name: "Fun",
		description: "",
		icon: FerrisWheel,
		href: "/assistant/fun",
    color: "text-cyan-500",
		bgColor: "bg-cyan-500/10"
	},
	{
		name: "Food",
		description: "",
		icon: Apple,
		href: "/assistant/food",
    color: "text-fuchsia-500",
		bgColor: "bg-fuchsia-500/10"
	},
  {
		name: "Travel",
		description: "",
		icon: Backpack,
		href: "/assistant/travel",
    color: "text-blue-500",
		bgColor: "bg-blue-500/10"
	},
	{
		name: "Spicy",
		description: "",
		icon: Flame,
		href: "/assistant/spicy",
    color: "text-yellow-600",
		bgColor: "bg-yellow-600/10"
	},
	{
		name: "Exploration",
		description: "",
		icon: PartyPopper,
		href: "/assistant/exploration",
    color: "text-indigo-700",
		bgColor: "bg-indigo-700/10"
	},
  {
    name: "Settings",
		description: "",
    icon: Settings,
    href: "/settings",
		color: "",
		bgColor: ""
  }
]


export const visionAssistant: AssistantUIProps =	{
	name: "Vision",
	description:"Ideas that helps define future aspirations, focusing on character traits and mutual goals",
	icon: Shrub,
	href: "/assistant/vision",
	color: "text-emerald-500",
	bgColor: "bg-emerald-500/10",
	firstInitialMessage: "Hello, I am your guide to envisioning and achieving your future. What are your dreams and how can we work together to turn them into reality?"
}

export const philosophyAssistant: AssistantUIProps =	{
	name: "Philosophy",
	description:"A resource of ideas for deep thinkers and seekers of wisdom, phoilosophy and system of thougths",
	icon: Lightbulb,
	href: "/assistant/philosophy",
	color: "text-orange-500",
	bgColor: "bg-orange-500/10",
	firstInitialMessage: "Welcome, fellow thinker. As your navigator through the intricate realms of philosophy, I'm here to spark enlightening ideas and offer diverse perspectives that enrich your journey through life's deepest questions"
}

export const legacyAssistant: AssistantUIProps =	{
	name: "Legacy",
	description: "Ideas of legacy building, focusing on nurturing family values, traditions, and the lasting impact",
	icon: Users,
	href: "/assistant/legacy",
	color: "text-violet-500",
	bgColor: "bg-violet-500/10",
	firstInitialMessage: "Hello, I'm here to help you navigate the meaningful journey of legacy building. What aspirations do you have for your legacy, and how can we work together to ensure it reflects your values and vision for the future?"
}

export const datesAssistant: AssistantUIProps =	{
	name: "Dates",
	description: "A resource of memorable date experiences, tailored to deepen connections and enrich relationships",
	icon: BookHeart,
	href: "/assistant/dates",
	color: "text-rose-500",
	bgColor: "bg-rose-500/10",
	firstInitialMessage: "Welcome to the art of crafting unforgettable dates! Tell me a bit about you and your partner's interests, and let's create some magical moments together. Whether it's a first date or a special anniversary, I'm here to help"

}


export const funAssistant: AssistantUIProps =	{
	name: "Fun",
	description: "",
	icon: FerrisWheel,
	href: "/assistant/fun",
	color: "text-cyan-500",
	bgColor: "bg-cyan-500/10"
}

export const foodAssistant: AssistantUIProps =	{
	name: "Food",
	description: "",
	icon: Apple,
	href: "/assistant/food",
	color: "text-fuchsia-500",
	bgColor: "bg-fuchsia-500/10"
}

export const travelAssistant: AssistantUIProps =	{
	name: "Travel",
	description: "",
	icon: Backpack,
	href: "/assistant/travel",
	color: "text-blue-500",
	bgColor: "bg-blue-500/10"
}

export const spicyAssistant: AssistantUIProps =	{
	name: "Spicy",
	description: "",
	icon: Flame,
	href: "/assistant/spicy",
	color: "text-yellow-600",
	bgColor: "bg-yellow-600/10"
}

export const explorationAssistant: AssistantUIProps =	{
	name: "Exploration",
	description: "",
	icon: PartyPopper,
	href: "/assistant/exploration",
	color: "text-indigo-700",
	bgColor: "bg-indigo-700/10"
}

export function getAssistant(name: string) {
	name = name.toLowerCase().trim()
	switch (name) {
		case "vision":
			return visionAssistant
		case "philosophy":
			return philosophyAssistant
		case "legacy":
			return legacyAssistant
		case "dates":
			return datesAssistant
		case "fun":
			return funAssistant
		case "food":
			return foodAssistant
		case "travel":
			return travelAssistant
		case "spicy":
			return spicyAssistant
		case "exploration":
			return explorationAssistant
		default:
			return null
	}
}
