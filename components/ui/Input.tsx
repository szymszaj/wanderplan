import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={inputId}
          className="text-sm font-semibold text-stone-600"
        >
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "rounded-xl border bg-white px-4 py-3 text-stone-800 placeholder-stone-400 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-400",
            error
              ? "border-red-400 focus:ring-red-400"
              : "border-orange-200 hover:border-orange-300",
            className,
          )}
          {...props}
        />
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";
