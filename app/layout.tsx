import "./globals.css"

import { Metadata } from "next"
import { ClerkProvider } from "@clerk/nextjs"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Toaster } from "sonner"

import { appConfig } from "@/config/app"
import { geist, geistMono } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { CrispProvider } from "@/components/providers/crisp-provider"
import { ModalProvider } from "@/components/providers/modal-provider"
import { ThemeProvider } from "@/components/providers/theme-provider"

export const metadata: Metadata = {
	title: {
		default: appConfig.name,
		template: appConfig.name + "| %s",
	},
	applicationName: appConfig.name,
	description: appConfig.description,
	creator: "razlevio",
	authors: [{ name: "Raz Levi", url: "https://razlevio.com" }],
	icons: {
		icon: "/thinkmate-blackbg.png",
		shortcut: "/thinkmate-blackbg.png",
		apple: "/thinkmate-blackbg.png",
	},
	openGraph: {
		title: appConfig.name,
		description: appConfig.description,
		url: appConfig.url,
		siteName: appConfig.name,
		locale: "en_US",
		type: "website",
		images: [
			{
				url: "/thinkmate-blackbg.png",
				width: 1200,
				height: 630,
				alt: "Thinkmate",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: appConfig.name,
		description: appConfig.description,
		site: "@thinkmate",
		creator: "@thinkmate",
	},
	robots: {
		index: true,
		follow: true,
		nocache: true,
		googleBot: {
			index: true,
			follow: false,
			noimageindex: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	verification: {
		google: "google",
		yandex: "yandex",
		yahoo: "yahoo",
	},
	manifest: "https://thinkmate.vercel.app/app.webmanifest",
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<ClerkProvider>
			<html
				lang="en"
				className={cn(
					"no-scrollbar h-full",
					geist.className,
					geist.variable,
					geistMono.variable
				)}
				suppressHydrationWarning
			>
				<CrispProvider />
				<body>
					<ThemeProvider
						attribute="class"
						defaultTheme="dark"
						enableSystem
						disableTransitionOnChange
					>
						<ModalProvider />
						<Toaster position="bottom-center" />
						{children}
						<Analytics />
						<SpeedInsights />
					</ThemeProvider>
				</body>
			</html>
		</ClerkProvider>
	)
}
