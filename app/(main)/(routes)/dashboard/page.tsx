import { auth } from "@clerk/nextjs"
import { Idea as IdeaPrisma } from "@prisma/client"
import { Home } from "lucide-react"

import { db } from "@/lib/db"
import { Error } from "@/components/error"

import { Heading } from "../../_components/heading"
import { Idea } from "../dashboard/_components/idea"

export default async function DashboardPage() {
	const { user, userId } = auth()
	if (!userId) {
		return <Error error="Unauthorized" />
	}

	const ideas = await db.idea.findMany({
		where: {
			userId: userId,
		},
	})

	return (
		<div className="flex flex-col items-center justify-center px-6">
			<Heading
				title="Dashboard"
				description=""
				icon={Home}
				iconColor="text-primary"
				bgColor="bg-primary/10"
			/>
			{ideas.length > 0 ? (
				<div className="flex w-full max-w-6xl flex-col justify-start">
					<h1 className="text-xl font-bold">Your Saved Ideas</h1>
					<div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
						{ideas.map((idea: IdeaPrisma) => (
							<Idea
								key={idea.id}
								title={idea.title}
								description={idea.description}
								userprompt={idea.userprompt}
							/>
						))}
					</div>
				</div>
			) : (
				<div className="flex w-full max-w-6xl flex-col justify-start">
					<h1 className="text-xl font-bold">No saved ideas</h1>
				</div>
			)}
		</div>
	)
}
