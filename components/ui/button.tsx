import * as React from "react";
import { cn } from "@/lib/utils";
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { variant?: "default" | "secondary"; }
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant="default", ...props }, ref) => {
  const base="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-4 py-2";
  const style=variant==="secondary"?"bg-white/10 hover:bg-white/20 border border-white/10":"bg-violet-600 hover:bg-violet-700";
  return <button ref={ref} className={cn(base, style, className)} {...props}/>;
}); Button.displayName="Button";