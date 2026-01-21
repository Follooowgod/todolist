import {DomainTodolist} from "@/components/common/types";
import {
  useGetTasksQuery,
  useReorderTaskMutation
} from "@/features/tasks/api/taskApi";
import {TaskStatus} from "@/components/common/enums";
import {TaskItemDraggable} from "@/features/tasks/ui/TaskItemDraggable";
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {DndContext, DragEndEvent} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import {getPutAfterItemId} from "@/lib/dnd/reorder";


type Props = {
  todolist: DomainTodolist
}


export const Task = ({todolist}: Props) => {

  const {id, filter} = todolist

  const count = 7
  const scroll = 80

  const [page, setPage] = useState(1)

  const {data, isFetching} = useGetTasksQuery({
    todolistId: id,
    count: count,
    page
  })
  const [reorderTask] = useReorderTaskMutation()
  const [orderId, setOrderId] = useState<string[]>([])


  const filteredTasks = useMemo(() => {
    const items = data?.items ?? [];
    if (filter === "active") return items.filter(t => t.status === TaskStatus.New);
    if (filter === "completed") return items.filter(t => t.status === TaskStatus.Completed);
    return items;
  }, [data?.items, filter]);

  const initialId = useMemo(() => filteredTasks.map(t => t.id), [filteredTasks])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOrderId((prev) => {
      const next = prev.filter(id => initialId.includes(id));
      for (const id of initialId) {
        if (!next.includes(id)) next.push(id);
      }
      return next;
    })
  }, [initialId])

  const filteredById = useMemo(() => new Map(filteredTasks.map(t => [t.id, t])), [filteredTasks])

  const onDragEnd = async ({active, over}: DragEndEvent) => {
    if (!over) return

    const activeId = String(active.id).replace("task:", "")
    const overId = String(over.id).replace("task:", "")

    if (activeId === overId) return

    const oldIndex = orderId.indexOf(activeId)
    const newIndex = orderId.indexOf(overId)
    if (oldIndex === -1 || newIndex === -1) return

    const newPosition = arrayMove(orderId, oldIndex, newIndex)

    const prev = orderId;
    setOrderId(newPosition);

    try {
      const putAfterItemId = getPutAfterItemId(newPosition, activeId);
      await reorderTask({
        todolistId: id,
        taskId: activeId,
        putAfterItemId
      }).unwrap();
    } catch {
      setOrderId(prev);
    }
  }

  const hasMore = (data?.items.length ?? 0) < (data?.totalCount ?? 0)

  const containerRef = useRef<HTMLUListElement | null>(null)

  const onScroll = useCallback(() => {
    const el = containerRef.current
    if(!el) return

    const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < scroll

    if(nearBottom && hasMore && !isFetching) setPage(prev => prev + 1)
  }, [hasMore, isFetching])

  useEffect(() => {
    const el = containerRef.current
    if(!el) return
    if(isFetching || !hasMore) return;

    if(el.scrollHeight <= el.clientHeight + scroll) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPage(p => p + 1)
    }
  }, [isFetching, hasMore]);

  return (
    <DndContext onDragEnd={onDragEnd}>
      <SortableContext
        items={orderId.map(id => `task:${id}`)}
        strategy={verticalListSortingStrategy}
      >
        <ul className="max-h-[300px] overflow-auto" ref={containerRef} onScroll={onScroll}>
          {orderId.length === 0 ? (
            <li>No tasks</li>
          ) : (
            orderId.map((id) => {
              const task = filteredById.get(id)
              if (!task) return null
              return <TaskItemDraggable
                task={task}
                todolist={todolist}
                key={task.id}
              />
            })
          )}
        </ul>
      </SortableContext>
    </DndContext>
  )

}