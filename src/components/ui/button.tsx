import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-green-500 text-white hover:bg-green-600 shadow-lg hover:shadow-xl border-b-4 border-green-700 hover:border-green-800 active:border-green-600 active:shadow-md active:translate-y-0.5",
        destructive: "bg-red-500 text-white hover:bg-red-600 shadow-lg border-b-4 border-red-700",
        outline: "border-2 border-gray-300 bg-white hover:bg-gray-50 hover:border-gray-400 text-gray-700",
        secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 border-b-4 border-gray-300",
        ghost: "hover:bg-gray-100 hover:text-gray-900",
        link: "text-green-600 underline-offset-4 hover:underline",
        premium: "bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:from-yellow-500 hover:to-orange-600 shadow-lg border-b-4 border-orange-600",
        danger: "bg-red-500 text-white hover:bg-red-600 shadow-lg border-b-4 border-red-700",
        success: "bg-green-500 text-white hover:bg-green-600 shadow-lg border-b-4 border-green-700"
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-9 rounded-md px-3",
        lg: "h-14 rounded-xl px-8 text-lg",
        xl: "h-16 rounded-xl px-10 text-xl",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }