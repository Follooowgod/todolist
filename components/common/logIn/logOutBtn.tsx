import {UserMinus} from "lucide-react";
import {Button} from "@/components/ui/button";


export const LogOutBtn = () => {
  return (
    <Button variant={"outline"} className='flex items-center gap-2'>
      <UserMinus size={16}/>
      Log Out
    </Button>
  )
}