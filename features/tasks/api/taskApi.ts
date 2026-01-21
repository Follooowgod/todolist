import {baseApi} from "@/lib/api/baseApi";
import {
  DomainTask,
  GetTasksResponse,
  UpdateTaskModel
} from "@/features/tasks/api/taskApi.types";
import {BaseResponse} from "@/components/common/types";


export const tasksApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<GetTasksResponse, { todolistId: string; count?: number; page?: number }>({
      query: ({todolistId, count = 7, page = 1}) => ({
        url: `todo-lists/${todolistId}/tasks`,
        params: {count, page}
    }),
      serializeQueryArgs: ({endpointName, queryArgs}) => `${endpointName}-${queryArgs.todolistId}`,

      merge: (currentCache, newData, {arg}) => {
        const page = arg.page ?? 1

        if(page === 1) {
          currentCache.items = newData.items
          currentCache.totalCount = newData.totalCount
          return
        }

        const existing = new Set(currentCache.items.map(t=> t.id))
        for(const t of newData.items) {
          if(!existing.has(t.id)) currentCache.items.push(t)
        }
        currentCache.totalCount = newData.totalCount
      },

      forceRefetch: ({currentArg, previousArg}) => (currentArg?.page ?? 1) !== (previousArg?.page ?? 1),

      providesTags: (_result, _error, {todolistId}) => [{ type: "Task", id: todolistId }],
    }),

    addTask: build.mutation<
      BaseResponse<{ item: DomainTask }>,
      { todolistId: string; title: string }
    >({
      query: ({ todolistId, title }) => ({
        url: `todo-lists/${todolistId}/tasks`,
        method: "POST",
        body: { title },
      }),
      invalidatesTags: (_result, _error, { todolistId }) => [{ type: "Task", id: todolistId }],
    }),

    removeTask: build.mutation<BaseResponse, { todolistId: string; taskId: string }>({
      query: ({ todolistId, taskId }) => ({
        url: `todo-lists/${todolistId}/tasks/${taskId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, { todolistId }) => [{ type: "Task", id: todolistId }],
    }),

    updateTask: build.mutation<
      BaseResponse<{ item: DomainTask }>,
      { todolistId: string; taskId: string; model: UpdateTaskModel }
    >({
      query: ({ todolistId, taskId, model }) => ({
        url: `todo-lists/${todolistId}/tasks/${taskId}`,
        method: "PUT",
        body: model,
      }),
      invalidatesTags: (_result, _error, { todolistId }) => [{ type: "Task", id: todolistId }],
    }),

    reorderTask: build.mutation<
      BaseResponse,
      { todolistId: string; taskId: string; putAfterItemId: string | null }
    >({
      query: ({ todolistId, taskId, putAfterItemId }) => ({
        url: `todo-lists/${todolistId}/tasks/${taskId}/reorder`,
        method: "PUT",
        body: { putAfterItemId },
      }),
      invalidatesTags: (_result, _error, { todolistId }) => [{ type: "Task", id: todolistId }],
    }),
  }),
})

export const {
  useGetTasksQuery,
  useAddTaskMutation,
  useRemoveTaskMutation,
  useUpdateTaskMutation,
  useReorderTaskMutation,
} = tasksApi
