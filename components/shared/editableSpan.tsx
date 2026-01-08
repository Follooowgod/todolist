'use client'

import {Input} from "@/components/ui/input";
import {ChangeEvent, useState} from "react";

type EditableSpanProps = {
  value: string
  onChange: (title: string) => void
  disabled?: boolean
}

export const EditableSpan = ({
                               value,
                               onChange,
                               disabled
                             }: EditableSpanProps) => {

  const [title, setTitle] = useState(value)
  const [isEditable, setEditable] = useState(false)

  const turnOnEditMode = () => {
    if (disabled) return
    setEditable(true)
  }

  const turnOffEditMode = () => {
    setEditable(false)
    onChange(title)
  }

  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  return (
    <>
      {isEditable ? (
        <Input
          value={title}
          onChange={changeTitle}
          onBlur={turnOffEditMode}
          autoFocus
        />
      ) : (
        <span onDoubleClick={turnOnEditMode}>{value}</span>
      )}
    </>
  )
}