import 'server-only'

import { openai } from '@ai-sdk/openai'
import {
  createAI,
  createStreamableValue,
  getMutableAIState,
  streamUI
} from 'ai/rsc'

import { getGarageForAi } from '@/apis/admin/garage'
import { BotMessage } from '@/components/ui/bot-message'
import BrokenParts from '@/components/ui/broken-parts'
import ListPotential from '@/components/ui/potentials'
import { z } from 'zod'
import { Message } from '../types'
import { nanoid } from '../utils'
import GaraItem from './GaraItem'
import { SpinnerMessage } from '@/components/ui/sprinner-message'
import { ReactNode } from 'react'
import { embedMany } from 'ai'

async function submitListOfPotential(userInput: string) {
  'use server'

  const aiState = getMutableAIState<typeof AI>()

  aiState.update({
    ...aiState.get(),
    messages: [
      ...aiState.get().messages,
      {
        id: nanoid(),
        role: 'user',
        content: userInput
      }
    ]
  })

  const result = await streamUI({
    model: openai('gpt-3.5-turbo'),
    initial: <SpinnerMessage />,
    system: `Based on the list of symptoms provided by the user, determine which part of the vehicle is damaged`,
    messages: [
      ...aiState.get().messages.map((message: any) => ({
        role: message.role,
        content: message.content,
        name: message.name
      }))
    ],
    tools: {
      displayListOfBrokenPart: {
        description: 'Displays a list of broken car parts',
        parameters: z.object({
          errorParts: z.array(
            z.string().describe('Name of the damaged part on the car')
          )
        }),
        generate: async function* ({ errorParts }) {
          const toolCallId = nanoid()
          aiState.done({
            ...aiState.get(),
            messages: [
              ...aiState.get().messages,
              {
                id: nanoid(),
                role: 'assistant',
                content: [
                  {
                    type: 'tool-call',
                    toolName: 'generateSelectGetListOfGaraOption',
                    toolCallId,
                    args: { errorParts }
                  }
                ]
              },
              {
                id: nanoid(),
                role: 'tool',
                content: [
                  {
                    type: 'tool-result',
                    toolName: 'generateSelectGetListOfGaraOption',
                    toolCallId,
                    result: { errorParts }
                  }
                ]
              }
            ]
          })

          return <BrokenParts errorParts={errorParts} />
        }
      }
    }
  })

  return {
    id: nanoid(),
    display: result.value
  }
}

async function getListOfGara(userInput: string) {
  'use server'

  const aiState = getMutableAIState<typeof AI>()

  aiState.update({
    ...aiState.get(),
    messages: [
      ...aiState.get().messages,
      {
        id: nanoid(),
        role: 'user',
        content: userInput
      }
    ]
  })

  const result = await streamUI({
    model: openai('gpt-3.5-turbo'),
    initial: <SpinnerMessage />,
    system: `Based on identifying the broken part of the vehicle, if the user wants to see the list of garages`,
    messages: [
      ...aiState.get().messages.map((message: any) => ({
        role: message.role,
        content: message.content,
        name: message.name
      }))
    ],
    tools: {
      getListOfGara: {
        description:
          "List of gara around the user'location provide the service to help user fix car problem",
        parameters: z.object({
          garas: z.array(
            z.object({
              id: z.string().describe('Id of the gara'),
              services: z
                .number()
                .describe('The list of services that gara provide')
            })
          )
        }),
        generate: async function* ({ garas }) {
          yield <SpinnerMessage />

          const { data: listOfGara } = await getGarageForAi()
          // tim gara co co sửa chữa: hệ thống đánh lửa, hệ thống nhiên liệu

          const toolCallId = nanoid()
          aiState.done({
            ...aiState.get(),
            messages: [
              ...aiState.get().messages,
              {
                id: nanoid(),
                role: 'assistant',
                content: [
                  {
                    type: 'tool-call',
                    toolName: 'getListOfGara',
                    toolCallId,
                    args: { garas }
                  }
                ]
              },
              {
                id: nanoid(),
                role: 'tool',
                content: [
                  {
                    type: 'tool-result',
                    toolName: 'getListOfGara',
                    toolCallId,
                    result: { garas }
                  }
                ]
              }
            ]
          })
          // todo: add sematic search

          if (!listOfGara || listOfGara.length === 0)
            return <div>Không tìm được kết quả nào.</div>

          return (
            <div className="grid grid-cols-1 gap-2 mt-2">
              {listOfGara.map((item, index) => (
                <GaraItem key={index} gara={item as any} />
              ))}
            </div>
          )
        }
      }
    }
  })

  return {
    id: nanoid(),
    display: result.value
  }
}

async function submitUserMessage(userInput: string) {
  'use server'
  const aiState = getMutableAIState<typeof AI>()

  aiState.update({
    ...aiState.get(),
    messages: [
      ...aiState.get().messages,
      {
        id: nanoid(),
        role: 'user',
        content: userInput
      }
    ]
  })

  let textStream: undefined | ReturnType<typeof createStreamableValue<string>>
  let textNode: undefined | React.ReactNode

  const result = await streamUI({
    model: openai('gpt-3.5-turbo'),
    initial: <SpinnerMessage />,
    system: `
    You are a car assistant, you can chat normally with the user.
    You also are an assistant who specializes in cars, when I provide a car error, you will give me a list of causes, and an expression for each cause by using tool \`getListOfPotential\``,
    messages: [
      ...aiState.get().messages.map((message: any) => ({
        role: message.role,
        content: message.content,
        name: message.name
      }))
    ],
    text: ({ content, done, delta }) => {
      if (!textStream) {
        textStream = createStreamableValue('')
        textNode = (
          <div>
            <BotMessage content={textStream.value} />
          </div>
        )
      }

      if (done) {
        textStream.done()
        aiState.done({
          ...aiState.get(),
          messages: [
            ...aiState.get().messages,
            {
              id: nanoid(),
              role: 'assistant',
              content
            }
          ]
        })
      } else {
        textStream.update(delta)
      }

      return textNode
    },
    tools: {
      getListOfPotential: {
        description: `This tool helps return a list of causes and symptoms of each cause`,
        parameters: z.object({
          listOfPotentialIssues: z.array(
            z.object({
              potential: z.string().describe('The cause name'),
              symptoms: z.array(
                z
                  .string()
                  .describe(
                    'the symptom related to each cause the user encountered if have, Should have at least 2 symptoms'
                  )
              )
            })
          )
        }),
        generate: async function* ({ listOfPotentialIssues }) {
          const toolCallId = nanoid()

          aiState.done({
            ...aiState.get(),
            messages: [
              ...aiState.get().messages,
              {
                id: nanoid(),
                role: 'assistant',
                content: [
                  {
                    type: 'tool-call',
                    toolName: 'getListOfPotential',
                    toolCallId,
                    args: { listOfPotentialIssues }
                  }
                ]
              },
              {
                id: nanoid(),
                role: 'tool',
                content: [
                  {
                    type: 'tool-result',
                    toolName: 'getListOfPotential',
                    toolCallId,
                    result: { listOfPotentialIssues }
                  }
                ]
              }
            ]
          })

          return <ListPotential potentials={listOfPotentialIssues} />
        }
      }
    }
  })

  return {
    id: nanoid(),
    display: result.value
  }
}

export type AIState = {
  chatId: string
  messages: Message[]
}

export type UIState = {
  id: string
  display: React.ReactNode
}[]

export const AI = createAI<AIState, UIState>({
  actions: {
    submitUserMessage,
    submitListOfPotential,
    getListOfGara
  },
  initialUIState: [],
  initialAIState: { chatId: nanoid(), messages: [] },
  // @ts-ignore
  onGetUIState: async () => {
    'use server'
    return
  },
  onSetAIState: async ({ state }) => {
    'use server'
    return
  }
})
