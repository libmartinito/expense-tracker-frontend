"use client"

import withAuth from "@/components/with-auth";
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

const User = () => {
  const [user, setUser] = useState<user | null>(null)

  useEffect(() => {
    const getUser = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/users/${getUserId()}`, { headers: { "Authorization": getToken() as string } }).then((res) => res.json())
      setUser(response.data)
    }

    getUser()
  }, [])

  return (
    <>
      <div className="text-center text-6xl mt-8 sm:text-8xl">user</div>

      <div className="mt-8">
        <div>username: {user?.attributes.username}</div>
        <div>email: {user?.attributes.email}</div>
      </div>
    </>
  )
}

export default withAuth(User)
