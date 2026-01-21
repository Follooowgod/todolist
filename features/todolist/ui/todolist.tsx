'use client'
import {
  useAddTodolistMutation,
  useGetTodolistsQuery
} from "@/features/todolist/api/todolistApi";
import {TodolistItem} from "@/features/todolist/ui/todolistItem";
import {Container, CreateItemForm} from "@/components/shared";
import {Card} from "@/components/ui/card";
import {TodoSkeleton} from "@/features/todolist/ui/Todoskeleton/todoSkeleton";


export const Todolist = () => {
 const {data: todolists, isLoading} = useGetTodolistsQuery();
  const [addTodolist] = useAddTodolistMutation()



  return (
    <Container >
      <div>
        <CreateItemForm placeholder={'Add new todolist...'} onCreateItem={addTodolist}/>
      </div>
      <Card className = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-transparent border-0">
        {isLoading && Array.from({length: 3}, (_, i) => <TodoSkeleton key={i}/>)}
      {todolists?.map((todolist) =>
        <div key={todolist.id} >
        <TodolistItem key={todolist.id} todolist={todolist}/>
        </div>
      )}
      </Card>
    </Container>
  )
}