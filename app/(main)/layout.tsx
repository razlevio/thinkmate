import { getApiLimitCount } from "@/lib/api-limit"
import { checkSubscription } from "@/lib/subscription"
import { Navbar } from "@/components/navbar"
import { Sidebar } from "@/components/sidebar"

export default async function DashboardLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const apiLimitCount = await getApiLimitCount()
	const isPro = await checkSubscription()

	return (
		<div className="relative h-full">
			<div className="z-[40] hidden h-full border-r md:fixed md:inset-y-0 md:flex md:w-[250px] md:flex-col">
				<Sidebar isPro={isPro} apiLimitCount={apiLimitCount} />
			</div>
			<main className="pb-[6rem] pt-[5rem] md:pl-[250px]">
				<Navbar />
				{children}
			</main>
		</div>
	)
}
