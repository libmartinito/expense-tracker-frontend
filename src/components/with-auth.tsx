"use client"

import { isAuthenticated } from "@/utils/auth"
import { redirect } from "next/navigation"
import { useEffect } from "react"

const withAuth = (WrappedComponent: any) => {
  const WithAuth = (props: any) => {
    useEffect(() => {
      if (!isAuthenticated()) {
        redirect("/login")
      }
    }, [])

    if (!isAuthenticated()) {
      return null
    }

    return <WrappedComponent {...props} />
  }

  return WithAuth
}

export default withAuth
