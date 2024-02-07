import { revalidatePath } from "next/cache"

export async function revalidateDashboard() {
	await revalidatePath("/dashboard")
	console.log("Dashboard revalidated...")
}
