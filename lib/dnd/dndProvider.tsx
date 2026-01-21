'use client'
import {DndContext} from "@dnd-kit/core";


export const DndProvider = ({children}: {children: React.ReactNode}) => {
  return (
    <DndContext>
      {children}
    </DndContext>
  )
}