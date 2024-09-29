"use client";

import withAuth from "@/components/with-auth";
import { getToken, getUserId } from "@/utils/auth";
import { useEffect, useState } from "react";

type user = {
  type: string;
  id: number;
  attributes: {
    username: string;
    email: string;
  };
};

const User = () => {
  const [user, setUser] = useState<user | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const userId = getUserId()
      const token = getToken()

      if (!userId || !token) {
        return
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/users/${userId}`,
        { headers: { Authorization: token } },
      ).then((res) => res.json());
      setUser(response.data);
    };

    getUser();
  }, []);

  return (
    <>
      <div className="mt-8 text-center text-6xl sm:text-8xl">user</div>

      <div className="mt-8">
        <div>username: {user?.attributes.username}</div>
        <div>email: {user?.attributes.email}</div>
      </div>
    </>
  );
};

export default withAuth(User);
