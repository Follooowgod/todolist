import {
  useAddTodolistMutation,
  useGetTodolistsQuery
} from "@/features/todolist/api/todolistApi";
import {TodolistItem} from "@/features/todolist/ui/todolistItem";
import {Container, CreateItemForm} from "@/components/shared";


export const Todolist = () => {
 const {data: todolists} = useGetTodolistsQuery();
  const [addTodolist] = useAddTodolistMutation()



  return (
    <Container>
      <div>
        <CreateItemForm onCreateItem={addTodolist}/>
      </div>
      {todolists?.map((todolist) =>
        <div key={todolist.id}>
        <TodolistItem key={todolist.id} todolist={todolist}/>
        </div>
      )}
    </Container>
  )
}