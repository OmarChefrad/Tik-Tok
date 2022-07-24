import React, { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { GoVerified } from "react-icons/go"

import useAuthStore from "../store/authStore"
import { IUser } from "../types"

function SuggestedAccounts() {
  const { fetchAllUsers, allUsers } = useAuthStore()

  useEffect(() => {
    fetchAllUsers()
  }, [fetchAllUsers])

  return (
    <div className="xl:border-b-2 border-gray-200 pb-4">
      <p className="text-slate-400 font-semibold m-3 mt-4 hidden md:block">
        Suggested Account
      </p>
      <div>
        {allUsers.slice(0, 6).map((user: IUser) => (
          <Link href={`/profile/${user._id}`} key={user._id}>
            <div className="flex gap-3 hover:bg-black text-gray hover:text-white mt-2 pl-1 cursor-pointer font-semibold rounded">
              <div className="w-12 h-12 pb-2">
                <Image
                  src={user.image}
                  width={34}
                  height={34}
                  className="rounded-full"
                  alt="user profile"
                  layout="responsive"
                />
              </div>

              <div>
                <div className="hidden md:block">
                  <p className="flex gap-1 tex-md lowercase">
                    {user.userName.replaceAll(" ", "")}
                    <GoVerified className="mt-1 ml-2" />
                  </p>
                  <p className="text-sm Capitilize text-gray-400">
                    {user.userName.replaceAll(" ", "")}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SuggestedAccounts
