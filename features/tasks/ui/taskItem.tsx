import {DomainTodolist} from "@/components/common/types";
import {DomainTask, UpdateTaskModel} from "@/features/tasks/api/taskApi.types";
import {
  useRemoveTaskMutation, useReorderTaskMutation,
  useUpdateTaskMutation
} from "@/features/tasks/api/taskApi";
import {TaskStatus} from "@/components/common/enums";
import {getPutAfterItemId} from "@/lib/dnd/reorder";
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
  const [reorderTask] = useReorderTaskMutation()

  const deleteTaskHandler = () => {
    removeTask({todolistId: todolist.id, taskId: task.id})
  }

  const updateTaskHandler = (arg: Partial<UpdateTaskModel>) => {
    const model = createTaskModel(task, arg)
    updateTask({todolistId: todolist.id, taskId: task.id, model})
  }

  const reorderTaskHandler = async (arg: {
    todolistId: string;
    taskId: string;
    newPosition: string[]
  }) => {
    const {todolistId, taskId, newPosition} = arg
    const putAfterItemId = getPutAfterItemId(newPosition, taskId)
    await reorderTask({todolistId, taskId, putAfterItemId})
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
    <div>
      <div>
        <Checkbox checked={isTaskCompleted} onCheckedChange={changeTaskStatus} />
        <EditableSpan value={task.title} onChange={changeTaskTitle} />
        <Button onClick={deleteTaskHandler}>
          <BadgeX size={16}/>
        </Button>
      </div>
    </div>
  )
}