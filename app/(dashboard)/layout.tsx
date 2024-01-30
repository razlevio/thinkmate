import { Sidebar } from "@/components/sidebar"
import { Navbar } from "@/components/navbar"

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode
}) {

	return (
		<div className="relative h-full">
			<div className="z-[80] hidden h-full border-r md:fixed md:inset-y-0 md:flex md:w-[250px] md:flex-col">
			  <Sidebar />
			</div>
			<main className="pb-[12rem] pt-[5rem] md:pl-[250px]">
				<Navbar />
				{children}
			</main>
		</div>
	)
}
