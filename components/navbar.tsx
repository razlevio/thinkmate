
import { UserButton } from "@clerk/nextjs"
import { MobileSidebar } from "@/components/mobile-sidebar"
import { ThemeToggle } from "@/components/theme-toggle"

export function Navbar() {
	return (
		<div className="flex items-center p-4">
      <MobileSidebar />
      <div className="flex w-full items-center justify-end gap-1">
        <UserButton afterSignOutUrl="/" />
        <ThemeToggle />
      </div>
		</div>
	)
}