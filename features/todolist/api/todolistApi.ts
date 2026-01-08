import {baseApi} from "@/lib/api/baseApi";
import {Todolist} from "@/features/todolist/api/todolistApi.types";
import {BaseResponse, DomainTodolist} from "@/components/common/types";


export const todolistsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTodolists: build.query<DomainTodolist[], void>({
      query: () => "todo-lists",
      transformResponse: (todolists: Todolist[]): DomainTodolist[] =>
        todolists.map((todolist) => ({ ...todolist, filter: "all", entityStatus: "idle" })),
      providesTags: (result) =>
        result
          ? [
            { type: "Todolist" as const, id: "LIST" },
            ...result.map((t) => ({ type: "Todolist" as const, id: t.id })),
          ]
          : [{ type: "Todolist" as const, id: "LIST" }],
    }),

    addTodolist: build.mutation<BaseResponse<{ item: Todolist }>, string>({
      query: (title) => ({
        url: "todo-lists",
        method: "POST",
        body: { title },
      }),
      invalidatesTags: [{ type: "Todolist", id: "LIST" }],
    }),

    removeTodolist: build.mutation<BaseResponse, string>({
      query: (id) => ({
        url: `todo-lists/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_res, _err, id) => [
        { type: "Todolist", id },
        { type: "Todolist", id: "LIST" },
      ],
    }),

    updateTodolistTitle: build.mutation<BaseResponse, { id: string; title: string }>({
      query: ({ id, title }) => ({
        url: `todo-lists/${id}`,
        method: "PUT",
        body: { title },
      }),
      invalidatesTags: (_res, _err, { id }) => [{ type: "Todolist", id }],
    }),

    reorderTodolist: build.mutation<
      BaseResponse,
      { todolistId: string; putAfterItemId: string | null }
    >({
      query: ({ todolistId, putAfterItemId }) => ({
        url: `todo-lists/${todolistId}/reorder`,
        method: "PUT",
        body: { putAfterItemId },
      }),
      invalidatesTags: [{ type: "Todolist", id: "LIST" }],
    }),
  }),
})

export const {
  useGetTodolistsQuery,
  useAddTodolistMutation,
  useRemoveTodolistMutation,
  useUpdateTodolistTitleMutation,
  useReorderTodolistMutation,
} = todolistsApi
