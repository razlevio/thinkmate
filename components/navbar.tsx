
import { UserButton } from "@clerk/nextjs"
import { MobileSidebar } from "@/components/mobile-sidebar"
import { ThemeToggle } from "@/components/theme-toggle"

export function Navbar() {
	return (
		<div className="fixed inset-x-0 top-0 z-50 flex items-center bg-background p-4">
		<MobileSidebar />
      <div className="flex w-full items-center justify-end gap-1">
        <UserButton afterSignOutUrl="/" />
        <ThemeToggle />
      </div>
		</div>
	)
}
