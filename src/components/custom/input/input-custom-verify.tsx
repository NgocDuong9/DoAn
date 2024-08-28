'use client'

import * as React from 'react'

import { cn } from '@/libs/utils'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  handleOTP: () => void
  onVerify: boolean
  onRefreshVerify: () => void
  labelColor?: boolean
}

const InputCustomVerify = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      label,
      labelColor = false,
      handleOTP,
      onVerify,
      onRefreshVerify,
      ...props
    },
    ref
  ) => {
    const [verify, setVerify] = React.useState<boolean>(false)
    const [count, setCount] = React.useState<number>(60)
    const handleBtn = () => {
      handleOTP()
    }
    React.useEffect(() => {
      if (onVerify) {
        setVerify(true)
      }
      if (count === 0) {
        onRefreshVerify()
      }
    }, [onVerify, count])

    setTimeout(() => {
      if (verify) {
        if (count == 0) {
          setVerify(false)
          setCount(60)
        } else {
          setCount(count - 1)
        }
      }
    }, 1000)

    return (
      <div className="relative w-full">
        {label && (
          <label className={`${labelColor ? 'text-white' : ''}`}>{label}</label>
        )}
        <input
          type={type}
          className={cn(
            'flex h-12 w-full rounded-xl border border-input bg-background pl-3 pr-[45%] py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 bg-white',
            className
          )}
          ref={ref}
          {...props}
        />
        <button
          disabled={verify}
          onClick={() => {
            handleBtn()
          }}
          className={`absolute right-2 bottom-[22%] font-semibold text-xs gradientText ${
            verify && 'opacity-60'
          }`}
        >
          {verify && count != 0 ? `Gửi lại mã (${count}s)` : 'Gửi mã xác thực'}
        </button>
      </div>
    )
  }
)
InputCustomVerify.displayName = 'InputCustomVerify'

export { InputCustomVerify }
