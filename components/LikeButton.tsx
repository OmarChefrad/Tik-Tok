import React, { useState, useEffect } from "react"
import { MdFavorite } from "react-icons/md"
import useAuthStore from "../store/authStore"

interface IProps {
  handleLike: () => void
  handleDislike: () => void
}

const LikeButton = ({ handleLike, handleDislike }: IProps) => {
  const [alreadyLiked, setAlreadyLiked] = useState(true)
  const { userProfile } = useAuthStore()

  return (
    <div className="gap-6">
      <div className="mt-6 flex flex-col justify-center items-center cursor-pointer">
        {alreadyLiked ? (
          <div onClick={handleDislike}>
            <MdFavorite className="text-6xl md:text-2xl  text-silentred " />
          </div>
        ) : (
          <div onClick={handleLike}>
            <MdFavorite className="text-6xl md:text-2xl  text-gray-700 " />
          </div>
        )}
        <p className="text-md font-semibold">320 Likes</p>
      </div>
    </div>
  )
}

export default LikeButton
