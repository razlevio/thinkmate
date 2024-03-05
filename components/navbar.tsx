import { UserButton } from "@clerk/nextjs"

import { getApiLimitCount } from "@/lib/api-limit"
import { checkSubscription } from "@/lib/subscription"
import { MobileSidebar } from "@/components/mobile-sidebar"
import { ThemeToggle } from "@/components/theme-toggle"

export async function Navbar() {
	const apiLimitCount = await getApiLimitCount()
	const isPro = await checkSubscription()

	return (
		<div className="fixed inset-x-0 top-0 z-[35] flex items-center rounded bg-background p-4 xl:bg-transparent">
			<MobileSidebar isPro={isPro} apiLimitCount={apiLimitCount} />
			<div className="flex w-full items-center justify-end gap-1">
				<UserButton afterSignOutUrl="/" />
				<ThemeToggle />
			</div>
		</div>
	)
}
