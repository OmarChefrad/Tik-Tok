import React, { useState, useEffect } from "react"
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

  const [searchValue, setSearchValue] = useState("")
  const router = useRouter()

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    router.push(`/search/${searchValue}`)
  }

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

      <div className="md:mt-6 md:ml-48 ml-0 hidden md:block ">
        <form onSubmit={handleSearch}>
          <label className="hidden md:block  mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">
            Search
          </label>
          <div className="relative">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <input
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value)
              }}
              type="search"
              id="default-search"
              className="p-4 pl-10 h-12
               w-full md:w-[500px] text-sm text-gray-800 bg-gray-50 rounded-lg border border-gray-300 focus:ring-slate-300 focus:border-slate-300 shadow-md shadow-slate-300"
              placeholder="Search..."
              required
            />
            <button
              onClick={handleSearch}
              type="submit"
              className="relative inline-flex items-center justify-center p-4 ml-2 px-5 py-3 overflow-hidden font-medium text-indigo-600 rounded-lg group shadow-md shadow-slate-400"
            >
              <span className="absolute top-0 left-0 w-40 h-40 -mt-10 -ml-3 transition-all duration-700 bg-rose-400 rounded-full blur-md ease"></span>
              <span className="absolute inset-0 w-full h-full transition duration-700 group-hover:rotate-180 ease">
                <span className="absolute bottom-0 left-0 w-24 h-28 -ml-10 bg-red-400 rounded-full blur-md"></span>
                <span className="absolute bottom-0 right-0 w-24 h-24 -mr-10 bg-silentred rounded-full blur-md"></span>
              </span>
              <span className="relative text-white">Search</span>
            </button>
          </div>
        </form>
      </div>

      <div className="md:pt-5">
        {userProfile ? (
          <div className="flex gap-5 h-12 md:gap-10">
            <Link href="/upload">
              <button className="rounded-lg md:h-24 h-12 px-2 md:px-4 text-md font-semibold flex items-center md:mt-3 shadow-md shadow-slate-300 md:shadow-md md:shadow-slate-300 hover:bg-black hover:text-white">
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
                  <div className="cursor-pointer rounded-full bg-gradient-to-r from-regalblue to-silentred w-12 h-12 p-[2px] mt-1 shadow-md shadow-slate-300 md:shadow-md  md:shadow-slate-300">
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
