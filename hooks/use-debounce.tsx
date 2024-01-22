import { useEffect, useState } from "react"

/**
 * A hook that provides a debounced value of the given input.
 * It delays updating the value until after the specified delay has passed, which is useful for reducing the frequency of updates during rapid input.
 * @param {T} value - The value to debounce.
 * @param {number} [delay=500] - The time in milliseconds to delay the update of the debounced value. Defaults to 500ms if not provided.
 * @returns {T} - The debounced value.
 */
export function useDebounce<T>(value: T, delay?: number): T {
	const [debouncedValue, setDebouncedValue] = useState<T>(value)

	useEffect(() => {
		// Set up a timer to update the debounced value after the specified delay
		const timer = setTimeout(() => setDebouncedValue(value), delay || 500)

		// Clean up the timer when the value or delay changes, or when the component unmounts
		return () => clearTimeout(timer)
	}, [value, delay])

	return debouncedValue
}
