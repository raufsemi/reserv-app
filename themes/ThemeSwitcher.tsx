"use client";

import { useEffect, useState } from "react";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
} from "@heroui/react";
import { Palette, Check } from "lucide-react";

type Theme = "blue" | "orange";

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>("blue");

  useEffect(() => {
    const saved = localStorage.getItem("theme") as Theme | null;
    const nextTheme = saved === "orange" ? "orange" : "blue";

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(nextTheme);

    if (nextTheme === "orange") {
      document.documentElement.dataset.theme = "orange";
    } else {
      delete document.documentElement.dataset.theme;
    }
  }, []);

  function changeTheme(nextTheme: Theme) {
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);

    if (nextTheme === "orange") {
      document.documentElement.dataset.theme = "orange";
    } else {
      delete document.documentElement.dataset.theme;
    }
  }

  return (
    <Popover>
      <Tooltip>
        <PopoverTrigger>
          <Button
            isIconOnly
            variant="secondary"
            className="h-9 min-w-0 rounded-md border-b-2 border-transparent bg-transparent px-2 text-gray-400 hover:bg-transparent hover:text-accent"
          >
            <Palette className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
      </Tooltip>

      <PopoverContent className="w-52 p-3">
        <div className="w-full">
          <p className="px-2 pb-2 text-xs font-semibold text-neutral-500">
            Tema
          </p>

          <div className="space-y-1">
            <button
              type="button"
              onClick={() => changeTheme("blue")}
              className="flex w-full items-center justify-between rounded-lg px-2 py-2 text-sm hover:bg-neutral-100"
            >
              <span className="flex items-center gap-3">
                <span className="h-4 w-4 rounded-full bg-blue-700" />
                Blue
              </span>

              {theme === "blue" && <Check className="h-4 w-4" />}
            </button>

            <button
              type="button"
              onClick={() => changeTheme("orange")}
              className="flex w-full items-center justify-between rounded-lg px-2 py-2 text-sm hover:bg-neutral-100"
            >
              <span className="flex items-center gap-3">
                <span className="h-4 w-4 rounded-full bg-orange-500" />
                Orange
              </span>

              {theme === "orange" && <Check className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
