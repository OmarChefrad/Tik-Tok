import React, { useState, useEffect, Dispatch, SetStateAction } from "react"
import Image from "next/image"
import Link from "next/link"
import { GoVerified } from "react-icons/go"

import useAuthStore from "../store/authStore"
import NoResults from "./NoResults"

interface IProps {
  isPostingComment: Boolean
  comment: string
  setComment: Dispatch<SetStateAction<string>>
  addComment: (e: React.FormEvent) => void
  comments: IComment[]
}

interface IComment {
  comment: string
  lenght?: number
  _key: string
  postedBy: { _ref: string; _id: string }
}

const Comments = ({
  comment,
  setComment,
  addComment,
  comments,
  isPostingComment,
}: IProps) => {
  const { userProfile } = useAuthStore()

  return (
    <div className="border-t-2 border-gray-200 pt-5 flex items-center h-full md:pl-[50px] mx-10 border-b-2 lg:pb-4 shadow-md shadow-slate-200">
      <div className="overflow-scroll h-full ">
        {comments?.length ? (
          <div>No comments yet</div>
        ) : (
          <NoResults text="No comments yet" />
        )}
      </div>
      {userProfile && (
        <div className="absolute left-0 pb-0 px-0 md:px-10">
          <form onSubmit={addComment} className="flex gap-2">
            <input
              onChange={(e) => setComment(e.target.value)}
              value={comment}
              placeholder="Add a Comment ..."
              className="ml-0 md:ml-[1390px] px-6 py-4 mt-[320px] md:mt-56 text-md font-meduim border-2 w-[400px] md:w-[240px] h-[75px] md:h-[50px] border-slate-100 focus:outline-none focus:border-3 focus:border-slate-300 flex-1 rounded-lg text-4xl md:text-base
              shadow-md shadow-slate-200 "
            />
            <button
              className="relative inline-flex items-center justify-center p-0.5 mb-2 overflow-hidden text-2xl md:text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-regalblue to-blue-500 hover:text-white hover:bg-gradient-to-br  hover:from-silentred hover:to-red-500 focus:outline-none focus:ring-cyan-200h-[75px] mt-80 md:mt-[240px] md:h-[50px] shadow-md shadow-slate-200 "
              onClick={addComment}
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 rounded-md group-hover:bg-opacity-0">
                {isPostingComment ? "Commenting..." : "Comment"}
              </span>
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default Comments
