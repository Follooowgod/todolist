import {UserPlus} from "lucide-react";
import {Button} from "@/components/ui/button";



export const LogInBtn = () => {
  return (
    <Button variant={"outline"} className='flex items-center gap-2'>
      <UserPlus size={16} />
      Log In
    </Button>
  )
}