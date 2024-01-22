import { z } from "zod"

// EXAMPLE SCHEMA
export const AddReportSchema = z.object({
	date: z.date(),
	project_id: z.string().min(1, { message: "Need to choose project" }),
	report_status: z.string().min(1, { message: "Need to choose status" }),
	amount_reported: z.number(),
	amount_approved: z.number(),
	assignee: z.string().min(1, { message: "Need to choose assignee" }),
})

export type AddReport = z.infer<typeof AddReportSchema>
