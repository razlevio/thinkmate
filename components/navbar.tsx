"use client"

import { usePathname } from "next/navigation"
import { UserButton } from "@clerk/nextjs"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface NavigationData {
	name: string
	href: string
}

/**
 * Represents a navigation bar component
 */
export function Navbar() {
	const navigationData: NavigationData[] = [
		{ name: "dashboard", href: "/dashboard" },
		{ name: "control", href: "/control" },
	]

	const pathname = usePathname()

	return (
		// <div className="sticky top-0 z-50 shadow bg-base-100">
		// 	<div className="px-4 mx-auto navbar max-w-7xl">
		// 		<div className="navbar-start">
		// 			{/* Mobile Navigation */}
		// 			<div className="dropdown sm:hidden">
		// 				{/* Mobile Navigation Trigger */}
		// 				<label tabIndex={0} className="btn btn-circle btn-ghost">
		// 					{/* Hamburger Icon */}
		// 					<svg
		// 						xmlns="http://www.w3.org/2000/svg"
		// 						className="w-5 h-5"
		// 						fill="none"
		// 						viewBox="0 0 24 24"
		// 						stroke="currentColor"
		// 					>
		// 						<path
		// 							strokeLinecap="round"
		// 							strokeLinejoin="round"
		// 							strokeWidth="2"
		// 							d="M4 6h16M4 12h16M4 18h7"
		// 						/>
		// 					</svg>
		// 				</label>
		// 				{/* Mobile Navigation Menu */}
		// 				<ul
		// 					tabIndex={0}
		// 					className="menu dropdown-content rounded-box menu-sm z-[1] mt-3 w-52 gap-1 bg-base-100 p-2 font-bold shadow"
		// 				>
		// 					{navigationData.map((item) => (
		// 						<li key={item.href}>
		// 							<Link href={item.href}>{item.name}</Link>
		// 						</li>
		// 					))}
		// 				</ul>
		// 			</div>
		// 			{/* Desktop Navigation */}
		// 			<div className="hidden gap-4 sm:flex">
		// 				{navigationData.map((item) => (
		// 					<Link
		// 						key={item.name}
		// 						href={item.href}
		// 						className={cn(
		// 							pathname.startsWith(item.href)
		// 								? "border-primary text-base-content"
		// 								: pathname === "/"
		// 								? "border-transparent text-base-content hover:border-primary hover:text-base-content"
		// 								: "border-transparent text-base-content/60 hover:border-primary hover:text-base-content",
		// 							"text-md flex h-full items-center border-b-2 px-1 pt-1 font-medium"
		// 						)}
		// 						aria-current={pathname === item.href ? "page" : undefined}
		// 					>
		// 						{item.name}
		// 					</Link>
		// 				))}
		// 			</div>
		// 		</div>
		// 		{/* Logo */}
		// 		<div className="navbar-center">
		// 			<Link href="/" className="flex items-center rounded-lg btn btn-ghost">
		// 				<Logo src="/logos/logo-symbol-hd.png" />
		// 			</Link>
		// 		</div>
		// 		{/* User Controls */}
		// 		<div className="navbar-end">
		// 			<div className="btn btn-circle btn-ghost">
		// 				<UserButton afterSignOutUrl="/" />
		// 			</div>
		// 			<ThemePicker />
		// 		</div>
		// 	</div>
		// </div>
    <div></div>
	)
}
