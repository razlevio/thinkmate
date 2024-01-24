"use client"

import { Menu } from "lucide-react"
import { useMediaQuery } from "usehooks-ts"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Sidebar } from "@/components/sidebar"

export function MobileSidebar() {
	const isMobile = useMediaQuery("(max-width: 768px)")

	return (
		<>
			{isMobile && (
				<Sheet>
					<SheetTrigger>
						<Button variant="ghost" size="icon" className="md:hidden">
							<Menu />
						</Button>
					</SheetTrigger>
					<SheetContent side="left" className="w-[250px] p-0">
						<Sidebar />
					</SheetContent>
				</Sheet>
			)}
		</>
	)
}
