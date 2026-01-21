import {DomainTodolist} from "@/components/common/types";
import {useAddTaskMutation} from "@/features/tasks/api/taskApi";
import {TodolistTitle} from "@/features/todolist/ui/todolistTitle";
import {CreateItemForm} from "@/components/shared";
import {Task} from "@/features/tasks/ui/task";
import {FilterBtn} from "@/features/tasks/ui/filterBtn";
import {Card} from "@/components/ui/card";
import {useDroppable} from "@dnd-kit/core";


type Props = {
  todolist: DomainTodolist
}

export const TodolistItem = ({todolist}: Props) => {

  const [addTask] = useAddTaskMutation()

  const createTask = (title: string) => {
    addTask({ todolistId: todolist.id, title })
  }

  const {setNodeRef} = useDroppable({
    id: `todolist:${todolist.id}`,
  })

  return (
      <Card className='flex flex-col gap-2 max-w-[310px] p-4' ref={setNodeRef}>
      <TodolistTitle todolist={todolist}/>
      <CreateItemForm onCreateItem={createTask} disabled={todolist.entityStatus === "loading"}/>
      <Task todolist={todolist}/>
      <FilterBtn todolist={todolist}/>
      </Card>
  )

}