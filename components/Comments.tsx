import React, { Dispatch, SetStateAction } from "react"
import Image from "next/image"
import Link from "next/link"
import { GoVerified } from "react-icons/go"

import useAuthStore from "../store/authStore"
import NoResults from "./NoResults"
import { IUser } from "../types"

interface IProps {
  isPostingComment: Boolean
  comment: string
  setComment: Dispatch<SetStateAction<string>>
  addComment: (e: React.FormEvent) => void
  comments: IComment[]
}

interface IComment {
  comment: string
  length?: number
  _key: string
  postedBy: { _ref?: string; _id?: string }
}

const Comments = ({
  comment,
  setComment,
  addComment,
  comments,
  isPostingComment,
}: IProps) => {
  const { allUsers, userProfile }: any = useAuthStore()

  return (
    <div className="border-t-2 border-gray-200 pt-4 px-10 mt-4 bg-[#F8F8F8] border-b-2 lg:pb-0 pb-[100px]">
      <div className="overflow-scroll lg:h-[457px]">
        {comments?.length > 0 ? (
          comments?.map((item: IComment, idx: number) => (
            <>
              {allUsers?.map(
                (user: IUser) =>
                  user._id === (item.postedBy._ref || item.postedBy._id) && (
                    <div className=" p-2 items-center" key={user._id}>
                      <Link href={`/profile/${user._id}`}>
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12">
                            <Image
                              width={48}
                              height={48}
                              className="rounded-full cursor-pointer"
                              src={user.image}
                              alt="user-profile"
                              layout="responsive"
                            />
                          </div>

                          <p className="flex cursor-pointer gap-1 items-center text-[18px] font-bold leading-6 text-primary">
                            {user.userName}{" "}
                            <GoVerified className="text-blue-400" />
                          </p>
                        </div>
                      </Link>
                      <div>
                        <p className="-mt-5 ml-16 text-[16px] mr-8">
                          {item.comment}
                        </p>
                      </div>
                    </div>
                  )
              )}
            </>
          ))
        ) : (
          <NoResults text="No Comments Yet! Be First to do add the comment." />
        )}
      </div>
      {userProfile && (
        <div className="absolute bottom-0 left-0  pb-6 px-2 md:px-10 ">
          <form onSubmit={addComment} className="flex gap-2">
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value.trim())}
              className="bg-primary ml-3 pl-2 py-4 text-md font-medium border-2 w-[210px] md:w-[700px] lg:w-[350px] border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 flex-1 rounded-lg"
              placeholder="Add comment.."
            />
            <button
              onClick={addComment}
              className="relative inline-flex items-center justify-center p-4 px-5 py-3 overflow-hidden font-medium text-indigo-600 rounded-lg group shadow-md shadow-slate-400"
            >
              <span className="absolute top-0 left-0 w-40 h-40 -mt-10 -ml-3 transition-all duration-700 bg-rose-400 rounded-full blur-md ease"></span>
              <span className="absolute inset-0 w-full h-full transition duration-700 group-hover:rotate-180 ease">
                <span className="absolute bottom-0 left-0 w-24 h-28 -ml-10 bg-red-400 rounded-full blur-md"></span>
                <span className="absolute bottom-0 right-0 w-24 h-24 -mr-0 bg-silentred rounded-full blur-md"></span>
              </span>
              <span className="relative text-white">
                {isPostingComment ? "Commenting" : "Comment"}
              </span>
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default Comments
