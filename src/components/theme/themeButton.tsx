"use client";
import { Switch } from "@/components/ui/switch";
import { Moon, Sun } from "lucide-react";
import { Label } from "../ui/label";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

function ThemeButton() {
  const { theme, setTheme, systemTheme } = useTheme();

  useEffect(() => {
    if (theme === "system") {
      systemTheme === "dark" ? setTheme("dark") : setTheme("light");
    } else if (theme === "light") {
      setTheme("light");
    } else if (theme === "dark") {
      setTheme("dark");
    }
  }, []);

  function themeSetter() {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("light");
    }
  }
  if (!theme) return;
  return (
    <div
      className="w-full flex justify-between items-center"
      onClick={themeSetter}
    >
      <Label htmlFor="themeSwitch" className="space-x-1">
        {theme &&
          (theme === "dark" ? (
            <>
              <Moon />
              <span>Dark</span>
            </>
          ) : (
            <>
              <Sun />
              <span>Light</span>
            </>
          ))}
      </Label>
      {theme && (
        <Switch
          id="themeSwitch"
          checked={theme === "light"}
          className="cursor-pointer"
        />
      )}
    </div>
  );
}
export default ThemeButton;
