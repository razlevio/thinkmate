import { authMiddleware } from "@clerk/nextjs"

export default authMiddleware({
	publicRoutes: ["/", "/api/ideas", "/api/ideas2"],
})

export const config = {
	matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}
