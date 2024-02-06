import { z } from "zod"

// EXAMPLE SCHEMA
export const IdeaSchema = z.object({
	prompt: z.string().min(1, { message: "Need provide prompt" }),
})

export type Idea = z.infer<typeof IdeaSchema>
