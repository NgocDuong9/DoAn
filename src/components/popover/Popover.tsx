import { popoverVariants } from '@/components/popover/_configs'
import { cn } from '@/libs/utils'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { PopoverProps } from './_interface/Popover.interface'

function Popover({
  data,
  isOpen: isOpenProp,
  header,
  footer,
  className,
  classNames
}: PopoverProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false)
  const isOpen = isOpenProp !== undefined ? isOpenProp : internalIsOpen

  useEffect(() => {
    if (isOpenProp !== undefined) {
      setInternalIsOpen(isOpenProp)
    }
  }, [isOpenProp])

  return (
    <AnimatePresence initial={false}>
      <div
        className={cn(
          'w-fit h-fit z-[9999] absolute top-full -right-12 py-6',
          !isOpen && 'pointer-events-none'
        )}
      >
        <motion.div
          className={cn(
            'popover transition-all rounded-lg p-0',
            'bg-white shadow-md border border-gray-200',
            className,
            classNames?.popover,
            !isOpen && 'pointer-events-none'
          )}
          variants={popoverVariants}
          initial="initial"
          animate={isOpen ? 'animate' : 'initial'}
          exit={'initial'}
        >
          <div
            className={cn('absolute triangle right-12 top-[1px]')}
            style={{
              width: 0,
              height: 0,
              borderWidth: '12px',
              borderStyle: 'solid',
              borderLeftColor: 'transparent',
              borderRightColor: 'transparent',
              borderBottomColor: '#fefefe',
              borderTopColor: 'transparent',
              filter: 'drop-shadow(0 0 0px #333333)'
            }}
          />
          {header && (
            <div
              className={cn(
                'text-lg font-semibold mb-2',
                classNames?.popoverHeader
              )}
            >
              {header}
            </div>
          )}
          <div className="max-h-[400px] overflow-y-auto px-4">
            {data.map((item, index) => (
              <div
                key={index}
                className={cn(
                  'prose dark:prose-invert flex flex-col items-start',
                  classNames?.popoverContent
                )}
                onClick={() => item.onClick && item.onClick()}
              >
                {item.jsx ? (
                  item.jsx
                ) : (
                  <>
                    <h3>{item.title}</h3>
                    <p>{item.content}</p>
                  </>
                )}
              </div>
            ))}
          </div>
          {footer && (
            <div
              className={cn(
                'flex justify-center space-x-2 py-2',
                classNames?.popoverFooter
              )}
            >
              {footer}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

export default Popover
