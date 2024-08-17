'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export const PlayableCard = ({
  question,
  answer
}: {
  question: string
  answer: string
}) => {
  const [revealed, setRevealed] = useState(false)

  return (
    <Card className="p-4">
      <div className="">{revealed ? answer : question}</div>
      <hr className="my-2" />
      <Button className="w-full" onClick={() => setRevealed(ps => !ps)}>
        Reveal{revealed ? ' Question' : ' Answer'}
      </Button>
    </Card>
  )
}
