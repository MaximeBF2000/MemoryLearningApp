'use client'

import { Dispatch, SetStateAction } from 'react'
import { Card } from '@/components/ui/card'
import { PencilIcon, PlayIcon, ShuffleIcon, Trash2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { List } from '@/lib/types'

export const ListCard = ({
  id,
  name,
  setLists
}: {
  id: string
  name: string
  setLists: Dispatch<SetStateAction<List[]>>
}) => {
  const router = useRouter()

  const handleDelete = (listName: string) => {
    const confirmDelete = confirm(`Delete list "${listName}"?`)
    if (!confirmDelete) return
    setLists(prev => prev.filter(list => list.name !== listName))
  }

  return (
    <Card className="p-4">
      <div className="">{name}</div>
      <div className="flex gap-3 mt-6 ml-auto w-fit [&>*]:w-5 [&>*]:h-5 [&>*]:cursor-pointer">
        <PlayIcon onClick={() => router.push(`/list/${id}/play?mode=guided`)} />
        <ShuffleIcon
          onClick={() => router.push(`/list/${id}/play?mode=shuffle`)}
        />
        <PencilIcon onClick={() => router.push(`/list/${id}/edit`)} />
        <Trash2Icon onClick={() => handleDelete(name)} />
      </div>
    </Card>
  )
}
