"use client";

import { useTheme } from "next-themes";
import Button from "./ui/Button";
import { Moon, Sun } from "lucide-react";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  return (
    <Button
      size="sm"
      varient="custome"
      className={`flex items-center justify-center px-1  rounded-full w-[40px]`}
    >
      {theme === "black" ? <Moon onClick={()=>setTheme("light")} /> : <Sun onClick={()=>setTheme("black")} />}
    </Button>
  );
};

export default ThemeSwitcher;
