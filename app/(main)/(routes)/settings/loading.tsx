import { Spinner } from "@/components/ui/spinner"

export default function Loading() {
	// You can add any UI inside Loading, including a Skeleton.
	return (
		<div className="flex h-full items-center justify-center">
			<Spinner size="xl" />
		</div>
	)
}
