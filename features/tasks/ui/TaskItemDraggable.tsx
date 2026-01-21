import {DomainTodolist} from "@/components/common/types";
import {DomainTask} from "@/features/tasks/api/taskApi.types";
import {TaskItem} from "@/features/tasks/ui/taskItem";
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import {Button} from "@/components/ui/button";
import {UnfoldVertical} from "lucide-react";


type TaskItemDraggableProps = {
  task: DomainTask
  todolist: DomainTodolist
}

export const TaskItemDraggable = ({task, todolist}: TaskItemDraggableProps) => {

  const {attributes, listeners, setNodeRef, transform, transition, setActivatorNodeRef} = useSortable({
    id: `task:${task.id}`,
    data: {todolistId: todolist.id, taskId: task.id}
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  return (
    <li
    ref={setNodeRef}
    style={style}
    className='flex gap-2'
    >
      <Button
      {...attributes}
      {...listeners}
      ref={setActivatorNodeRef}
      type={'button'}
      className='cursor-grab active:cursor-grabbing p-1'
      variant={'ghost'}
    >
      <UnfoldVertical size={16}/>
    </Button>
      <div className='flex-grow'>
      <TaskItem task={task} todolist={todolist}/>
      </div>
    </li>
  )
}