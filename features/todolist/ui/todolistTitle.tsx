import {DomainTodolist, RequestStatus} from "@/components/common/types";
import {
  todolistsApi,
  useRemoveTodolistMutation,
  useUpdateTodolistTitleMutation
} from "@/features/todolist/api/todolistApi";
import {EditableSpan} from "@/components/shared";
import {Button} from "@/components/ui/button";
import {BadgeX} from "lucide-react";
import {useAppDispatch} from "@/lib/hooks";

type Props = {
  todolist: DomainTodolist
}

export const TodolistTitle = ({ todolist }: Props) => {
  const { id, title, entityStatus } = todolist

  const [removeTodolist] = useRemoveTodolistMutation()
  const [updateTodolistTitle] = useUpdateTodolistTitleMutation()

  const dispatch = useAppDispatch()

  const changeTodolistStatus = (entityStatus: RequestStatus) => {
    dispatch(
      todolistsApi.util.updateQueryData("getTodolists", undefined, (state) => {
        const todolist = state.find((todolist) => todolist.id === id)
        if (todolist) {
          todolist.entityStatus = entityStatus
        }
      }),
    )
  }

  const deleteTodolist = () => {
    changeTodolistStatus("loading")
    removeTodolist(id)
      .unwrap()
      .catch(() => {
        changeTodolistStatus("idle")
      })
  }

  const changeTodolistTitle = (title: string) => {
    updateTodolistTitle({ id, title })
  }

  return (
    <div className="flex justify-between items-center mb-2">
      <h3 className='text-xl font-bold'>
        <EditableSpan value={title} onChange={changeTodolistTitle}/>
      </h3>
      <Button variant={'ghost'} onClick={deleteTodolist} disabled={entityStatus === "loading"}>
        <BadgeX size={16}/>
      </Button>
    </div>
  )
}