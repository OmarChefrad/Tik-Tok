import React, { useState } from "react"
// import { NextPage } from "next"
// import { useRouter } from "next/router"
import Link from "next/link"
import GoogleLogin from "react-google-login"
import { AiFillHome, AiOutlineMenu } from "react-icons/ai"
import { ImCancelCircle } from "react-icons/im"
import Discover from "./Discover"
import SuggestedAccounts from "./SuggestedAccounts"
import Footer from "./Footer"
import { motion } from "framer-motion"

function Sidebar() {
  const [showSidebar, setShowSidebar] = useState(true)
  const [userProfile, setuserProfile] = useState(false)
  const normalLink =
    "flex items-center h-12 md:pl-3 justify-center xl:justify-start cursor-pointer font-semibold text-gray-800 rounded hover:bg-black"

  return (
    <div>
      <div
        className="block xl-hidden m-2 ml-4 mt-3 text-xl cursor-pointer"
        onClick={() => {
          setShowSidebar((prev) => !prev)
        }}
      >
        {showSidebar ? <ImCancelCircle /> : <AiOutlineMenu />}
      </div>
      {showSidebar && (
        <motion.div
          className="xl:w-400 w-20 flex flex-col justify-start mb-10 border-r-2 border-gray-200 xl:border-gray-200 p-4"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="md:border-gray-200 xl:pb-2 ">
            <Link href="/">
              <div className={normalLink}>
                <p className="text-2xl">
                  <AiFillHome />
                </p>
                <span className="xl:block hidden pl-5 hover:text-regalblue">
                  F
                </span>
                <span className="xl:block hidden hover:text-silentred">o</span>
                <span className="xl:block hidden hover:text-regalblue">r</span>
                <span className="xl:block hidden pl-1 hover:text-silentred">
                  Y
                </span>
                <span className="xl:block hidden hover:text-regalblue">o</span>
                <span className="xl:block hidden hover:text-silentred">u</span>
              </div>
            </Link>
          </div>
          {!userProfile && (
            <div className="px-2 py-4 hidden xl:block ">
              <p className="text-gray-400 font-normal">
                Log in to follow creators, like videos, and view comments.
              </p>
              <div className="pr-2">
                <GoogleLogin
                  clientId=""
                  render={(renderProps) => (
                    <button
                      className=" text-lg text-gray-800
                      border-1 cursor-pointer border-gray-300 font-semibold px-6 py-3 rounded-md outline-none w-full mt-3  hover:bg-black hover:text-gray-100 select-none bg-gray-100 decoration-gray-600"
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                    >
                      <span className="hover:text-regalblue">L</span>
                      <span className="hover:text-silentred">o</span>
                      <span className="hover:text-regalblue">g </span>
                      {""}
                      <span className="hover:text-silentred">i</span>
                      <span className="hover:text-regalblue">n</span>
                    </button>
                  )}
                  onSuccess={() => {}}
                  onFailure={() => {}}
                  cookiePolicy="single_host_origin"
                />
              </div>
            </div>
          )}
          <Discover />
          <SuggestedAccounts />
          <Footer />
        </motion.div>
      )}
    </div>
  )
}

export default Sidebar
