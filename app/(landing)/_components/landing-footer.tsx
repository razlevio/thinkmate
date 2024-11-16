import Link from "next/link"

import { Logo } from "@/components/logo"

export function LandingFooter() {
	return (
		<footer>
			<div className="mx-auto w-full max-w-screen-xl p-4">
				<div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
					<Logo />
					<ul className="flex items-center text-sm font-medium text-gray-500 dark:text-gray-400 sm:mb-0">
						<li>
							<Link
								href="/terms-of-service"
								className="me-4 hover:underline md:me-6"
							>
								Terms of Service
							</Link>
						</li>
						<li>
							<Link
								href="/privacy-policy"
								className="me-4 hover:underline md:me-6"
							>
								Privacy Policy
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</footer>
	)
}
