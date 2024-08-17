'use client'

import { Dispatch, SetStateAction, useRef } from 'react'
import { Card } from '@/components/ui/card'
import { SaveIcon, Trash2Icon } from 'lucide-react'
import { Input } from './ui/input'
import { List } from '@/lib/types'

export const EditableCard = ({
  id,
  question,
  answer,
  setLists
}: {
  id: string
  question: string
  answer: string
  setLists: Dispatch<SetStateAction<List[]>>
}) => {
  const questionRef = useRef<HTMLInputElement>(null)
  const answerRef = useRef<HTMLInputElement>(null)

  const handleDelete = (id: string) => {
    setLists(prev =>
      prev.map(list => ({
        ...list,
        data: list.data.filter(qa => qa.id !== id)
      }))
    )
  }

  const handleEdit = (id: string) => {
    setLists(prev =>
      prev.map(list => ({
        ...list,
        data: list.data.map(qa =>
          qa.id === id
            ? {
                ...qa,
                question: questionRef.current?.value || '',
                answer: answerRef.current?.value || ''
              }
            : qa
        )
      }))
    )
  }

  return (
    <Card className="p-4">
      <Input
        ref={questionRef}
        placeholder="Question"
        defaultValue={question}
        className="w-full"
      />
      <hr className="my-2" />
      <Input
        ref={answerRef}
        placeholder="Answer"
        defaultValue={answer}
        className="w-full"
      />
      <div className="flex gap-3 mt-6 ml-auto w-fit [&>*]:w-5 [&>*]:h-5 [&>*]:cursor-pointer">
        <SaveIcon onClick={() => handleEdit(id)} />
        <Trash2Icon onClick={() => handleDelete(id)} />
      </div>
    </Card>
  )
}
