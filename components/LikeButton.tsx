import React, { useState, useEffect } from "react"
import { MdFavorite } from "react-icons/md"
import useAuthStore from "../store/authStore"

interface IProps {
  handleLike: () => void
  handleDislike: () => void
  likes: any[]
}

const LikeButton = ({ likes, handleLike, handleDislike }: IProps) => {
  const [alreadyLiked, setAlreadyLiked] = useState(true)
  const { userProfile }: any = useAuthStore()
  const filterLikes = likes?.filter((item) => item._ref === userProfile?._id)

  useEffect(() => {
    if (filterLikes?.length > 0) {
      setAlreadyLiked(true)
    } else {
      setAlreadyLiked(false)
    }
  }, [filterLikes, likes])

  return (
    <div className="flex gap-2">
      <div className="ml-5 flex flex-row justify-center items-center cursor-pointer">
        {alreadyLiked ? (
          <div onClick={handleDislike}>
            <MdFavorite className="text-6xl md:text-2xl m-2  text-silentred " />
          </div>
        ) : (
          <div onClick={handleLike}>
            <MdFavorite className="text-6xl md:text-2xl m-2  text-gray-700 " />
          </div>
        )}
        <p className="text-md md: text-xs font-semibold">{likes?.length | 0}</p>
      </div>
    </div>
  )
}

export default LikeButton
