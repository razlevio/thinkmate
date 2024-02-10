import { AlertCircle } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

type ErrorProps = {
	error: string
}

export function Error({ error }: ErrorProps) {
	return (
		<div className="flex flex-col items-center justify-center px-6">
			<Alert variant="destructive">
				<AlertCircle className="size-4" />
				<AlertTitle>Error</AlertTitle>
				<AlertDescription>{error}</AlertDescription>
			</Alert>
		</div>
	)
}
