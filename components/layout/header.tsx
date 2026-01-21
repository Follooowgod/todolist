'use client'
import {cn} from "@/lib/utils";
import {Container} from "@/components/shared";
import Image from "next/image";
import {ThemeSwitch} from "@/components/common";
import {LogInBtn, LogOutBtn} from "@/components/common/logIn";
import {selectIsLoggedIn} from "@/app/app-slice";
import {useAppSelector} from "@/lib/hooks";

interface Props {
  className?: string
}

export const Header = ({ className}: Props) => {

  const IsLoggedIn = useAppSelector(selectIsLoggedIn)

  return (
    <header className={cn("border-b ", className)}>
      <Container className="flex items-center justify-between py-2">
        <div className="flex items-center">
          <Image src="/todo-logo.png" alt="Todo Logo" width={80} height={50}/>
          <div>
            <h1 className='text-2xl uppercase font-black'>to-do list</h1>
            <p className='text-sm text-gray-400 leading-3'>
              You can&apos;t forger anything with us
            </p>
          </div>
        </div>
        <div className='flex gap-8 py-2'>
          {IsLoggedIn ? <LogOutBtn/> : <LogInBtn/>}
          <ThemeSwitch/>
        </div>
      </Container>
    </header>
  )
}