import React, { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { GoVerified } from "react-icons/go"

import useAuthStore from "../store/authStore"
import NoResults from "./NoResults"

const Comments = () => {
  const comments = []
  return (
    <div className="border-t-2 border-gray-200 pt-4 flex items-center h-full pl-0 md:pl-[50px] mx-10 bg-slate border-b-2 lg:pb-4">
      <div className="overflow-scroll lg:h-full">
        {comments.length ? (
          <div>videos</div>
        ) : (
          <NoResults text="No comments yet" />
        )}
      </div>
    </div>
  )
}

export default Comments
