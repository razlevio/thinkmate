"use server"

import { revalidatePath } from "next/cache"
import { auth } from "@clerk/nextjs"

export async function revalidate(path: string) {
	const { userId } = auth()
	console.log("revalidating: ", path)
	console.log("userId: ", userId)
	revalidatePath(path)
}
