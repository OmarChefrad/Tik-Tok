import React, { useEffect, useState } from "react"
import { MdFavorite } from "react-icons/md"
import { NextPage } from "next"

import useAuthStore from "../store/authStore"

interface IProps {
  likes: any
  flex: string
  handleLike: () => void
  handleDislike: () => void
}

const LikeButton: NextPage<IProps> = ({
  likes,
  flex,
  handleLike,
  handleDislike,
}) => {
  const [alreadyLiked, setAlreadyLiked] = useState(false)
  const { userProfile }: any = useAuthStore()
  let filterLikes = likes?.filter((item: any) => item._ref === userProfile?._id)

  useEffect(() => {
    if (filterLikes?.length > 0) {
      setAlreadyLiked(true)
    } else {
      setAlreadyLiked(false)
    }
  }, [filterLikes, likes])

  return (
    <div className={`${flex} gap-2`}>
      <div className="md:mt-0 mt-0 flex flex-col justify-center items-center cursor-pointer">
        {alreadyLiked ? (
          <div
            className="bg-primary rounded-full p-2 md:p-2 text-silentred "
            onClick={handleDislike}
          >
            <MdFavorite className="text-lg md:text-xl" />
          </div>
        ) : (
          <div
            className="bg-primary rounded-full p-2 md:p-2 "
            onClick={handleLike}
          >
            <MdFavorite className="text-lg md:text-xl" />
          </div>
        )}
        <p className="text-xs font-semibold ">{likes?.length || 0}</p>
      </div>
    </div>
  )
}

export default LikeButton
