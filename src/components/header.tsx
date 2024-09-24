"use client"

import { Button } from "./ui/button"
import { getToken, removeToken } from "@/utils/auth"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ThemeToggle } from "./theme-toggle"

export default function Header() {
  const router = useRouter()

  const logout = async () => {
    const response = await fetch("http://localhost:3000/v1/logout", {
      method: "POST",
      headers: {
        "Authorization": getToken() as string
      }
    })

    if (response.ok) {
      removeToken()
      router.push("/")
    } else {
      console.error("something went wrong: ", response)
    }
  }

  return (
    <div className="my-8 flex items-center justify-between">
      <nav>
        <ul className="flex gap-4">
          <li>
            <Link href="/expenses">expenses</Link>
          </li>
          <li>
            <Link href="/user">user</Link>
          </li>
        </ul>
      </nav>

      <div className="flex gap-4">
        <ThemeToggle />
        <Button variant="secondary" onClick={logout}>logout</Button>
      </div>
    </div>
  )
}
