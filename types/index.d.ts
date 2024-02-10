import type { Icon } from "lucide-react"

export type AppConfig = {
	name: string
	description: string
	url: string
}

export type Icon = Icon

export type Idea = {
	userId?: string
	userprompt: string
	title: string
	description: string
	substeps?: string[]
}
