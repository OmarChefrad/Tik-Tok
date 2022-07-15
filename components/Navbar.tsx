import React from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useGoogleLogin, GoogleLogout } from "react-google-login"
import { AiOutlineLogout } from "react-icons/ai"
import { BiSearch } from "react-icons/bi"
import { IoMdAdd } from "react-icons/io"
import Logo from "../public/tiktok-logo-10301.svg"

function Navbar() {
  return (
    <div className="w-full flex justify-between items-center border-b-2 border-gray-200 -mt-2 md:-mt-4 md:pb-5 px-4">
      <Link href="/">
        <div className="w-[75px] md:w-[100px] h-[60px] flex-col">
          <Image
            src={Logo}
            alt="tiktok"
            layout="responsive"
            className="cursor-pointer"
          />
        </div>
      </Link>
    </div>
  )
}

export default Navbar
