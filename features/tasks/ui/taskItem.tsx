import {DomainTodolist} from "@/components/common/types";
import {DomainTask, UpdateTaskModel} from "@/features/tasks/api/taskApi.types";
import {
  useRemoveTaskMutation,
  useUpdateTaskMutation
} from "@/features/tasks/api/taskApi";
import {TaskStatus} from "@/components/common/enums";
import {createTaskModel} from "@/features/tasks/lib/createTaskModel";
import {Checkbox} from "@/components/ui/checkbox";
import {EditableSpan} from "@/components/shared/editableSpan";
import {Button} from "@/components/ui/button";
import {BadgeX} from "lucide-react";


type Props = {
  task: DomainTask
  todolist: DomainTodolist
}


export const TaskItem = ({task, todolist}: Props) => {
  const [removeTask] = useRemoveTaskMutation()
  const [updateTask] = useUpdateTaskMutation()

  const deleteTaskHandler = () => {
    removeTask({todolistId: todolist.id, taskId: task.id})
  }

  const updateTaskHandler = (arg: Partial<UpdateTaskModel>) => {
    const model = createTaskModel(task, arg)
    updateTask({todolistId: todolist.id, taskId: task.id, model})
  }

  const changeTaskStatus = (checked: boolean | 'indeterminate') => {
    const isCheked = checked === true
    updateTaskHandler({
      status: isCheked
        ? TaskStatus.Completed
        : TaskStatus.New,
    })
  }

  const changeTaskTitle = (title: string) => {
    updateTaskHandler({title})
  }

  const isTaskCompleted = task.status === TaskStatus.Completed



  return (
      <div className='flex justify-between items-center gap-2'>
        <div className='flex items-center gap-4'>
        <Checkbox checked={isTaskCompleted} onCheckedChange={changeTaskStatus} />
        <EditableSpan value={task.title} onChange={changeTaskTitle} />
        </div>
        <Button variant={'ghost'} onClick={deleteTaskHandler}>
          <BadgeX size={16}/>
        </Button>
      </div>
  )
}