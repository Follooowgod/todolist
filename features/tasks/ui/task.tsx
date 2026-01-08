import {DomainTodolist} from "@/components/common/types";
import {useGetTasksQuery} from "@/features/tasks/api/taskApi";
import {TaskStatus} from "@/components/common/enums";
import {TaskItem} from "@/features/tasks/ui/taskItem";


type Props = {
  todolist: DomainTodolist
}


export const Task = ({todolist}: Props) => {

  const {id, filter} = todolist

  const {data, isLoading} = useGetTasksQuery(id)

  let filteredTasks = data?.items
  if (filter === "active") {
    filteredTasks = filteredTasks?.filter((task) => task.status === TaskStatus.New);
  }
  if (filter === "completed") {
    filteredTasks = filteredTasks?.filter((task) => task.status === TaskStatus.Completed)
  }

  // if (isLoading) {
  //   return <TaskSkeleton />
  // }

  return (
    <ul>
    filteredTasks?.length === 0 ? <p>No tasks</p> :
<li>{filteredTasks?.map((task) => <TaskItem key={task.id} task={task} todolist={todolist}/>)}</li>
    </ul>
  )

}