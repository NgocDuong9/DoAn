import * as React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  labelColor?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, labelColor = false, ...props }, ref) => {
    return (
      <>
        {label && (
          <div className="mb-1">
            <label className={`${labelColor ? "text-white" : ""}`}>
              {label}
            </label>
          </div>
        )}
        <input
          type={type}
          className={
            "flex h-12 w-full rounded-xl border border-input bg-background px-3 py-4 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring  disabled:cursor-not-allowed disabled:opacity-50 bg-white"
          }
          ref={ref}
          {...props}
        />
      </>
    );
  }
);
Input.displayName = "Input";

export { Input };
