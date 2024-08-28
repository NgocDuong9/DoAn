'use client'

import * as React from 'react'

import { IconEye, IconEyeOff } from '@tabler/icons-react'
import classNames from 'classnames'

// import { FaEye, FaEyeSlash } from "react-icons/fa";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  labelColor?: boolean
}

const InputCustom = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, labelColor = false, ...props }, ref) => {
    const [hidePassword, setShowPassword] = React.useState<boolean>(true)
    return (
      <div className="relative">
        {label && (
          <div className="mb-1">
            <label className={classNames(labelColor ? 'text-white' : '')}>
              {label}
            </label>
          </div>
        )}
        <input
          type={type === 'password' && !hidePassword ? '' : type}
          className={
            'flex h-12 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring  disabled:cursor-not-allowed disabled:opacity-50 bg-white'
          }
          ref={ref}
          {...props}
        />
        <div
          onClick={() => setShowPassword(!hidePassword)}
          className="absolute right-5 bottom-[20%]"
        >
          {hidePassword ? (
            <IconEye size={18} className="text-gray-400" />
          ) : (
            <IconEyeOff size={18} className="text-gray-400" />
          )}
        </div>
      </div>
    )
  }
)
InputCustom.displayName = 'InputCustom'

export { InputCustom }
