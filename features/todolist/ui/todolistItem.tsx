import {DomainTodolist} from "@/components/common/types";
import {useAddTaskMutation} from "@/features/tasks/api/taskApi";
import {TodolistTitle} from "@/features/todolist/ui/todolistTitle";
import {CreateItemForm} from "@/components/shared";
import {Task} from "@/features/tasks/ui/task";
import {FilterBtn} from "@/features/tasks/ui/filterBtn";


type Props = {
  todolist: DomainTodolist
}

export const TodolistItem = ({todolist}: Props) => {

  const [addTask] = useAddTaskMutation()

  const createTask = (title: string) => {
    addTask({ todolistId: todolist.id, title })
  }

  return (
    <div>
      <TodolistTitle todolist={todolist}/>
      <CreateItemForm onCreateItem={createTask} disabled={todolist.entityStatus === "loading"}/>
      <Task todolist={todolist}/>
      <FilterBtn todolist={todolist}/>
    </div>
  )

}