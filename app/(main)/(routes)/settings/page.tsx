import { Heading } from "../../_components/heading"
import { Settings } from "lucide-react"
import { checkSubscription } from "@/lib/subscription"
import SubscriptionButton from "@/components/subscription-button"
export default async function SettingsPage() {
	const settings = {
		title: "Settings",
		description: "Manage your settings and subscription",
		icon: Settings,
		iconColor: "text-primary",
		bgColor: "bg-primary/10",
	}

	const isPro = await checkSubscription()
	return (
		<div className="flex flex-col justify-center px-6">
			<Heading {...settings}/>
			<div className="space-y-4">
				<div className="text-sm text-muted-foreground">
					{isPro ? "You are currently on a pro plan" : "You are currnelty on a free plan"}
				</div>
				<SubscriptionButton isPro={isPro} />
			</div>
		</div>
	)
}
