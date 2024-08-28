'use client'

export function SpinnerMessage() {
  return (
    <div className="group relative flex items-start">
      <div className="">
        <img src="/logo/ai.png" alt="" className="w-[22px] h-[22px]" />
      </div>
      <div className="h-[24px] flex flex-row items-center flex-1 space-y-2 overflow-hidden px-1">
        <svg
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
          xmlns="http://www.w3.org/2000/svg"
          className="size-5 animate-spin stroke-zinc-400"
        >
          <path d="M12 3v3m6.366-.366-2.12 2.12M21 12h-3m.366 6.366-2.12-2.12M12 21v-3m-6.366.366 2.12-2.12M3 12h3m-.366-6.366 2.12 2.12"></path>
        </svg>
      </div>
    </div>
  )
}
