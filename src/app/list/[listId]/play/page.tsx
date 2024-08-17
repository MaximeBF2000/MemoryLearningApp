'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { PlayableCard } from '@/components/PlayableCard'
import { List, QA } from '@/lib/types'
import { Button } from '@/components/ui/button'

const PlayListPage = ({
  params: { listId }
}: {
  params: { listId: string }
}) => {
  const isMounted = useRef(false)

  const [lists, setLists] = useState<List[]>([])
  const list = lists.find((list: any) => list.id === listId)

  const [qas, setQas] = useState<QA[]>([])

  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const mode = new URL(window.location.href).searchParams.get('mode')

    if (mode === 'shuffle') {
      const shuffledQas = [...(list?.data ?? [])].sort(
        () => Math.random() - 0.5
      )
      setQas(shuffledQas)
    } else if (mode === 'guided') {
      setQas([...(list?.data ?? [])])
    }
  }, [list])

  useEffect(() => {
    if (isMounted.current)
      return localStorage.setItem('lists', JSON.stringify(lists))

    const savedLists = localStorage.getItem('lists') || '[]'
    const newLists = JSON.parse(savedLists)
    setLists(newLists)

    isMounted.current = true
  }, [listId, lists])

  return (
    <div className="p-4 max-w-[800px] mx-auto">
      <Link href="/" className="underline italic text-gray-700 text-sm">
        Go back to lists
      </Link>

      <h1 className="text-center font-bold text-2xl mt-2 mb-12">
        List: {list?.name}
      </h1>

      {qas.length === 0 ? (
        <div className="text-center text-gray-500">List is empty</div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          <PlayableCard
            key={qas[currentIndex].id}
            question={qas[currentIndex].question}
            answer={qas[currentIndex].answer}
          />
        </div>
      )}

      <div className="flex gap-3 w-full mt-12 [&>*]:w-full">
        <Button
          onClick={() => setCurrentIndex(ps => ps - 1)}
          disabled={currentIndex === 0}
        >
          Previous
        </Button>
        <Button
          onClick={() => setCurrentIndex(ps => ps + 1)}
          disabled={currentIndex === qas.length - 1}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

export default PlayListPage
