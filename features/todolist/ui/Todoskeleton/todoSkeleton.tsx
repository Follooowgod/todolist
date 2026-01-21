import {Skeleton} from "@/components/ui/skeleton";


export const TodoSkeleton = () => {
  return (
    <div className='flex flex-col gap-4'>
      <Skeleton className='h-[35px] w-[80%]'/>
      <Skeleton className='h-[35px] w-[80%]'/>
        <ul className='flex flex-col gap-2'>
          {Array.from({length: 5}).map((_, index) => <li key={index}>
            <Skeleton className='h-[20px] w-[80%]' /></li>)}
        </ul>
      <div className='flex gap-3'>
        <Skeleton className='h-[35px] w-[25%]'/>
        <Skeleton className='h-[35px] w-[25%]'/>
        <Skeleton className='h-[35px] w-[25%]'/>
      </div>
    </div>
  )
}