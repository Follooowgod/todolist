"use client"
import {Switch} from "@/components/ui/switch";
import {Moon, Sun} from "lucide-react";
import {useTheme} from "next-themes";



export const ThemeSwitch = () => {

  const {theme, setTheme} = useTheme();

  function toggleTheme() {
    setTheme(theme => theme === "light" ? "dark" : "light");
  }

  return (
    <>
      {theme === "light" ? (
        <div className='flex items-center gap-2'>
        <Sun size={24} className="transition-transform duration-10"/>
        <Switch onClick={toggleTheme} />
        </div>
      ) :(
        <div className='flex items-center gap-2'>
          <Switch onClick={toggleTheme} />
          <Moon size={24} className="transition-transform duration-200 rotate-0"/>
        </div>
      )}
    </>
  )
}