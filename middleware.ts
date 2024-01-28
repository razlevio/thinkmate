import { authMiddleware } from "@clerk/nextjs"

export default authMiddleware({publicRoutes: ["/", "/api/vision"]});

export const config = {
	matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}
