import { Loader2 } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Defines the variants for the Spinner component using class-variance-authority (cva).
 * It allows for different size variants to be applied to the spinner.
 */
const spinnerVariants = cva(
  "animate-spin", // Base classes that are always applied.
  {
    variants: {
      size: {
				xs: "h-2 w-2",      // Small size.
        sm: "h-4 w-4", // Default size of the spinner.
        md: "h-6 w-6",      // Large size.
				lg: "h-8 w-8",      // Extra large size.
        icon: "h-10 w-10",   // Icon size.
				xl: "h-12 w-12",      // Extra large size.
      }
    },
    defaultVariants: {
      size: "md", // The default variant to use if none is specified.
    },
  },
);

/**
 * Props for the Spinner component.
 * Extends the variant props from the spinnerVariants definition.
 */
interface SpinnerProps extends VariantProps<typeof spinnerVariants> {}

/**
 * A Spinner component that shows a loading indicator.
 * Utilizes the Lucide 'Loader2' icon and applies styling variants.
 *
 * @param {SpinnerProps} props - The props for the component including size variant.
 * @returns The Spinner component.
 */
export const Spinner = ({
  size,
}: SpinnerProps) => {
  return (
    <Loader2 className={cn(spinnerVariants({ size }))} />
  );
};