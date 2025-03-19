"use client";

import { MoonStar, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <Button
        variant={"default"}
        size={"icon"}
        onClick={() =>
          theme === "dark" ? setTheme("light") : setTheme("dark")
        }
        className="flex items-center"
      >
        <Sun
          size={28}
          className="rotate-0 scale-100 transition-all duration-300 ease-in-out dark:-rotate-90 dark:scale-0"
        />
        <MoonStar
          size={28}
          className="absolute rotate-90 scale-0 transition-all duration-300 ease-in-out dark:rotate-0 dark:scale-100"
        />
      </Button>
    </>
  );
};

export default ThemeToggle;
