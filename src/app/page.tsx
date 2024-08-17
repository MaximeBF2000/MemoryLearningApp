'use client'

import { ListCard } from '@/components/ListCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { List } from '@/lib/types'
import { useEffect, useRef, useState } from 'react'

export default function Home() {
  const isMounted = useRef(false)
  const [lists, setLists] = useState<List[]>([])

  useEffect(() => {
    if (isMounted.current)
      return localStorage.setItem('lists', JSON.stringify(lists))

    const savedLists = localStorage.getItem('lists') || '[]'
    setLists(JSON.parse(savedLists))

    isMounted.current = true
  }, [lists])

  const addNewList = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const newList = formData.get('list') as string
    if (lists.find(list => list.name === newList)) {
      alert('A list with this name already exists')
      return
    }
    setLists(prev => [
      ...prev,
      { id: crypto.randomUUID(), name: newList, data: [] }
    ])
  }

  return (
    <div className="p-4 max-w-[800px] mx-auto">
      <h1 className="text-center font-bold text-2xl mt-2 mb-12">
        Memory Learning Card App
      </h1>

      <h2 className="text-xl mb-4">Lists</h2>

      {lists.length === 0 ? (
        <div className="text-center text-gray-500">No lists found</div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {lists.map(list => (
            <ListCard
              key={list.id}
              id={list.id}
              name={list.name}
              setLists={setLists}
            />
          ))}
        </div>
      )}

      <form onSubmit={addNewList}>
        <Input
          type="text"
          className="w-full p-2 border border-gray-300 rounded mt-4"
          placeholder="Add new list"
          name="list"
        />
        <Button type="submit" className="w-full p-2 text-white rounded mt-2">
          Add
        </Button>
      </form>
    </div>
  )
}
