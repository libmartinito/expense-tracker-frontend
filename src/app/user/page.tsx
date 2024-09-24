"use client"

import Header from "@/components/header";
import { getToken, getUserId } from "@/utils/auth";
import { useEffect, useState } from "react";

type user = {
  type: string,
  id: number,
  attributes: {
    username: string,
    email: string,
  }
}

export default function User() {
  const [user, setUser] = useState<user | null>(null)

  useEffect(() => {
    const getUser = async () => {
      const response = await fetch(`http://localhost:3000/v1/users/${getUserId()}`, { headers: { "Authorization": getToken() as string } }).then((res) => res.json())
      setUser(response.data)
    }

    getUser()
  }, [])

  return (
    <div className="container mx-auto px-8 sm:px-16">
      <Header />
      <div className="text-center text-6xl mt-8 sm:text-8xl">user</div>

      <div className="mt-8">
        <div>username: {user?.attributes.username}</div>
        <div>email: {user?.attributes.email}</div>
      </div>
    </div>
  )
}
