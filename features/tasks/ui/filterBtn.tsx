import {DomainTodolist, FilterValues} from "@/components/common/types";
import {todolistsApi} from "@/features/todolist/api/todolistApi";
import {Button} from "@/components/ui/button";
import {useAppDispatch} from "@/lib/hooks";


type Props = {
  todolist: DomainTodolist
}

export const FilterBtn = ({todolist}: Props) => {

  const {id, filter} = todolist

  const dispatch = useAppDispatch();

  const changeFilter = (filter: FilterValues) => {
    dispatch(
      todolistsApi.util.updateQueryData('getTodolists', undefined, (state) => {
        const todolist = state.find((todolist) => todolist.id === id)
        if (todolist) {
          todolist.filter = filter
        }
      })
    )
  }

  return (
    <div className='flex gap-2'>
      <Button
        variant={filter === 'all'? "default" : 'outline'}
        onClick={() => changeFilter('all')}
      >
        ALL
      </Button>
      <Button
        variant={filter === 'active'? "default" : 'outline'}
        onClick={() => changeFilter('active')}
      >
        ACTIVE
      </Button>
      <Button
        variant={filter === 'completed'? "default" : 'outline'}
        onClick={() => changeFilter('completed')}
      >
        COMPLETED
      </Button>
    </div>
  )

}