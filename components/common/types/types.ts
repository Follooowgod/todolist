import {Todolist} from "@/features/todolist/api/todolistApi.types";

export type BaseResponse<T = {}> = {
  data: T
  resultCode: number
  messages: string[]
  fieldsErrors: FieldError[]
}

export type FieldError = {
  error: string
  field: string
}

export type DomainTodolist = Todolist & {
  filter: FilterValues
  entityStatus: RequestStatus
}

export type FilterValues = "all" | "active" | "completed"
export type RequestStatus = "idle" | "loading" | "succeeded" | "failed"

