import { authMiddleware } from "@clerk/nextjs"

export default authMiddleware({
	publicRoutes: [
		"/",
		"/api/ideas",
		"/api/api-limit",
		"/api/webhook",
		"/api/subscription",
	],
})

export const config = {
	matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}
