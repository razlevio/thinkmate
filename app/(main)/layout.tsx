import { Sidebar } from "@/components/sidebar"
import { Navbar } from "@/components/navbar"
import { getApiLimitCount } from "@/lib/api-limit"

export default async function DashboardLayout({
	children,
}: {
	children: React.ReactNode
}) {

	const apiLimitCount = await getApiLimitCount()

	return (
		<div className="relative h-full">
			<div className="z-[80] hidden h-full border-r md:fixed md:inset-y-0 md:flex md:w-[250px] md:flex-col">
			  <Sidebar apiLimitCount={apiLimitCount} />
			</div>
			<main className="pb-[12rem] pt-[5rem] md:pl-[250px]">
				<Navbar />
				{children}
			</main>
		</div>
	)
}
