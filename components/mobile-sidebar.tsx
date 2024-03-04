"use client"

import { useEffect, useState } from "react"
import { Menu } from "lucide-react"
import { useMediaQuery } from "usehooks-ts"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Sidebar } from "@/components/sidebar"

type MobileSidebarProps = {
	apiLimitCount: number
	isPro: boolean
}

export function MobileSidebar({
	apiLimitCount = 0,
	isPro = false,
}: MobileSidebarProps) {
	const isMobile = useMediaQuery("(max-width: 768px)")
	const [isMounted, setIsMounted] = useState(false)

	useEffect(() => {
		setIsMounted(true)
	}, [])

	if (!isMounted) {
		return null
	}

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
						<Sidebar isPro={isPro} apiLimitCount={apiLimitCount} />
					</SheetContent>
				</Sheet>
			)}
		</>
	)
}
