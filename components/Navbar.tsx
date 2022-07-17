import React from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { AiOutlineLogout } from "react-icons/ai"
import { BiSearch, BiLogOut } from "react-icons/bi"
import { IoMdAdd } from "react-icons/io"
import Logo from "../public/tiktok-logo-10301.svg"
import { GoogleLogin, googleLogout } from "@react-oauth/google"
import { createOrGetUser } from "../utils"
import useAuthStore from "../store/authStore"

function Navbar() {
  const { userProfile, addUser, removeUser } = useAuthStore()

  return (
    <div className="w-full flex justify-between items-center border-b-2 border-gray-200 md:-mt-6  px-4">
      <Link href="/">
        <div className="w-[75px] md:w-[100px] h-[75px] md:h-[80px]  flex-col">
          <Image
            src={Logo}
            alt="tiktok"
            layout="responsive"
            className="cursor-pointer"
            priority
          />
        </div>
      </Link>
      <div className="md:pt-5 hidden">Search</div>
      <div className="md:pt-5">
        {userProfile ? (
          <div className="flex gap-5 md:gap-10">
            <Link href="/upload">
              <button className="rounded-3xl px-2 md:px-4 text-md font-semibold flex items-center  shadow-md shadow-slate-400 md:shadow-md md:shadow-slate-400 hover:bg-black hover:text-white">
                <IoMdAdd className="text-xl hover:text-white" />
                <span className="hover:text-regalblue">U</span>
                <span className="hover:text-silentred">p</span>
                <span className="hover:text-regalblue">l</span>
                <span className="hover:text-silentred">o</span>
                <span className="hover:text-regalblue">a</span>
                <span className="hover:text-silentred">d</span>
              </button>
            </Link>
            {userProfile.image && (
              <Link href="/">
                <>
                  <div className="cursor-pointer rounded-full bg-gradient-to-r from-regalblue to-silentred w-12 h-12 p-[2px] mt-1 shadow-md shadow-slate-400 md:shadow-md  md:shadow-slate-400">
                    <Image
                      width={50}
                      height={50}
                      className="rounded-full cursor-pointer"
                      src={userProfile.image}
                      alt="profile photo"
                    />
                  </div>
                </>
              </Link>
            )}
            <button
              type="button"
              className="mt-3  bg-slate-200 w-8 h-8 rounded-full shadow-md shadow-slate-400 md:shadow-md  md:shadow-slate-400"
              onClick={() => {
                googleLogout()
                removeUser()
              }}
            >
              <BiLogOut color="silentred" fontSize="25" />
            </button>
          </div>
        ) : (
          <GoogleLogin
            onSuccess={(response) => createOrGetUser(response, addUser)}
            onError={() => console.log(`Error`)}
          ></GoogleLogin>
        )}
      </div>
    </div>
  )
}

export default Navbar
