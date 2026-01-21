'use client'
import {ChangeEvent, useState} from "react";
import {Button} from "@/components/ui/button";
import {BadgePlus} from "lucide-react";


type Props = {
  onCreateItem: (title: string) => void
  disabled?: boolean
  placeholder?: string
}


export const CreateItemForm = ({onCreateItem, disabled, placeholder}: Props) => {

  const [title, setTitle] = useState("")
  const [error, setError] = useState<string | null>(null)

  const createItemHandler = () => {
    const trimmedTitle = title.trim()
    if (trimmedTitle !== "") {
      onCreateItem(trimmedTitle)
      setTitle("")
    } else {
      setError("Title is required")
    }
  }

  const changeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value)
    setError(null)
  }

  const createItemOnEnterHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      createItemHandler()
    }
  }

  return (
  <div>
    <input
      type="text"
      value={title}
      onChange={changeTitleHandler}
      onKeyDown={createItemOnEnterHandler}
      placeholder={placeholder ?? "Add new task..."}
      className="border border-gray-300 rounded-md p-2 " />
    {error && <p className="text-red-500">{error}</p>}
    <Button variant='ghost' onClick={createItemHandler} disabled={disabled} className='w-15 h-12'>
      <BadgePlus size={20}/>
    </Button>
  </div>
  )
}