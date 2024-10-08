'use client'

import { EditableCard } from '@/components/EditableCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { List, QA } from '@/lib/types'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

const EditListPage = ({
  params: { listId }
}: {
  params: { listId: string }
}) => {
  const isMounted = useRef(false)

  const [lists, setLists] = useState<List[]>([])
  const list = lists.find((list: any) => list.id === listId)

  const [jsonData, setJsonData] = useState('')

  useEffect(() => {
    if (isMounted.current)
      return localStorage.setItem('lists', JSON.stringify(lists))

    const savedLists = localStorage.getItem('lists') || '[]'
    const newLists = JSON.parse(savedLists)
    setLists(newLists)

    isMounted.current = true
  }, [listId, lists])

  const updateListName = (name: string) => {
    if (!list) return

    setLists(prev => [
      ...prev.filter(list => list.id !== listId),
      {
        ...list,
        name
      }
    ])
  }

  const handleAddNewQA = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const question = formData.get('question') as string
    const answer = formData.get('answer') as string

    if (!list) return

    setLists(prev => [
      ...prev.filter(list => list.id !== listId),
      {
        ...list,
        data: [
          ...list.data,
          {
            id: crypto.randomUUID(),
            question,
            answer
          }
        ]
      }
    ])
  }

  const importFromJson = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = JSON.parse(jsonData) as QA[]
    if (!Array.isArray(data)) return

    setLists(prev => [
      ...prev.filter(list => list.id !== listId),
      {
        ...list,
        data: [...(list?.data ?? []), ...data]
      } as List
    ])
  }

  return (
    <div className="p-4 max-w-[800px] mx-auto">
      <Link href="/" className="underline italic text-gray-700 text-sm">
        Go back to lists
      </Link>

      <h1 className="text-center font-bold text-2xl mt-2 mb-12">
        List:{' '}
        <Input
          type="text"
          value={list?.name}
          onChange={e => updateListName(e.target.value)}
        />
      </h1>

      {list?.data?.length === 0 ? (
        <div className="text-center text-gray-500">List is empty</div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {list?.data?.map(qa => (
            <EditableCard
              key={qa.id}
              id={qa.id}
              question={qa.question}
              answer={qa.answer}
              setLists={setLists}
            />
          ))}
        </div>
      )}

      <form onSubmit={handleAddNewQA}>
        <Input
          type="text"
          className="w-full p-2 border border-gray-300 rounded mt-4"
          placeholder="Add new question/anwser"
          name="question"
        />
        <Input
          type="text"
          className="w-full p-2 border border-gray-300 rounded mt-4"
          placeholder="Add new question/anwser"
          name="answer"
        />
        <Button type="submit" className="w-full p-2 text-white rounded mt-2">
          Add
        </Button>
      </form>

      <form className="mt-20" onSubmit={importFromJson}>
        <Textarea
          placeholder="import from json (id: string, question: string, answer: string{}[])"
          className="mb-2"
          value={jsonData}
          onChange={e => setJsonData(e.target.value)}
        />
        <Button className="w-full">Import from JSON</Button>
      </form>
    </div>
  )
}

export default EditListPage
