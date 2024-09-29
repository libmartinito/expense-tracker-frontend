import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

type ThemeToggleProps = {
  className?: string
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className={className}>
      {mounted && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              {theme === "light"
                ? <Sun className="h-4 w-4" />
                : <Moon className="h-4 w-4" />}
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setTheme("light")}>light</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>dark</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>system</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  )
}
