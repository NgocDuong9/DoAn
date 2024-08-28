'use client'
import { nanoid } from '@/libs/utils'
import { Button, Checkbox } from '@mantine/core'
import { useActions, useUIState } from 'ai/rsc'
import { union } from 'lodash'
import { useState } from 'react'
import { UserMessage } from './bot-message'

const ListPotential = ({ potentials }: { potentials: any[] }) => {
  const { submitListOfPotential } = useActions()
  const [messages, setMessages] = useUIState()

  const [isSubmit, setIsSubmit] = useState(false)
  const [selection, setSelection] = useState<Record<string, boolean>>({})

  const potentailOverview = potentials.map(item => item.potential).join(', ')
  const symptoms = potentials.reduce((acc: any, cur: any) => {
    acc = [...acc, ...cur.symptoms]
    return acc
  }, [])

  return (
    <div className="px-3 py-2 bg-[#f4fafc] rounded-xl text-sm">
      <div className="text-sm">
        <div>
          Triệu chứng có thể bạn đang gặp phải:{' '}
          <span className="font-semibold">{potentailOverview}</span>
        </div>
        <div className="mt-2">
          Hãy chọn những vấn đề bạn gặp phải và tôi sẽ giúp bạn tìm nguyên nhân
          cụ thể:
        </div>
      </div>

      <div className="select-none flex flex-col gap-y-2 mt-3">
        {union(symptoms).map((item: any, index) => (
          <Checkbox
            key={index}
            className="gradientCheckbox"
            label={item}
            checked={!!selection[item]}
            onChange={event => {
              if (isSubmit) return
              setSelection({
                ...selection,
                [item]: event.currentTarget.checked
              })
            }}
            // disabled={isSubmit}
          />
        ))}
      </div>

      <div>
        <Button
          variant="filled"
          color="linear-gradient(91deg, #258DBA 1.26%, #26D3E0 66.99%, #8BF6C8 126.97%)"
          radius="xs"
          className="md:rounded-lg rounded-md h-8 w-full mt-2 border-none"
          onClick={async () => {
            if (isSubmit) return
            const options = Object.keys(selection).reduce(
              (acc: string[], key) => {
                if (selection[key]) {
                  acc = [...acc, key]
                }

                return acc
              },
              []
            )
            setMessages((prev: any[]) => [
              ...prev,
              {
                id: nanoid(),
                display: (
                  <UserMessage
                    content={`Các nguyên nhân tôi gặp phải: ${options.join(', ')}`}
                  />
                )
              }
            ])

            const responseMessage = await submitListOfPotential(
              `Các nguyên nhân tôi gặp phải: ${options.join(', ')}`
            )

            setMessages((prev: any[]) => [...prev, responseMessage])

            setIsSubmit(true)
          }}
          disabled={isSubmit}
        >
          <div className="font-semibold  text-sm md:text-base">
            {isSubmit ? 'Đã tìm kiếm' : 'Tìm nguyên nhân'}
          </div>
        </Button>
      </div>
    </div>
  )
}

export default ListPotential
