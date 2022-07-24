import React, { useEffect, useRef, useState } from "react"
import { GoVerified } from "react-icons/go"
import Image from "next/image"
import axios from "axios"

import VideoCard from "../../components/VideoCard"
import NoResults from "../../components/NoResults"
import { IUser, Video } from "../../types"
import { BASE_URL } from "../../utils"

interface IProps {
  data: {
    user: IUser
    userVideos: Video[]
    userLikedVideos: Video[]
  }
}

const Profile = ({ data }: IProps) => {
  const [videoList, setVideoList] = useState<Video[]>([])
  const { user, userVideos, userLikedVideos } = data
  const [showUserVideos, setShowUserVideos] = useState(true)

  const videos = showUserVideos ? `border-b-2 border-black ` : `text-gray-400`
  const liked = !showUserVideos ? `border-b-2 border-black ` : `text-gray-400`

  useEffect(() => {
    if (showUserVideos) {
      setVideoList(userVideos)
    } else {
      setVideoList(userLikedVideos)
    }
  }, [showUserVideos, userVideos, userLikedVideos])

  return (
    <div className="w-full">
      <div className="flex gap-2 md:gap-4 mb-4 bg-white w-full">
        <div className="w-12 h-12 md:w-32 md:h-32">
          <Image
            src={user.image}
            width={34}
            height={34}
            className="rounded-full"
            alt="user profile"
            layout="responsive"
          />
        </div>

        <div className=" flex flex-col justify-center text-base md:text-xl font-semibold">
          <p className="flex gap-1 tex-md lowercase">
            {user.userName.replaceAll(" ", "")}
            <GoVerified className="mt-1 ml-2 text-blue-400" />
          </p>
          <p className="text-sm Capitilize text-gray-400">
            {user.userName.replaceAll(" ", "")}
          </p>
        </div>
      </div>
      <div>
        <div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-2 bg-white w-full">
          <p
            onClick={() => setShowUserVideos(true)}
            className={`text-base font-semibold cursor-pointer mt-2 ${videos}`}
          >
            Videos
          </p>
          <p
            onClick={() => setShowUserVideos(false)}
            className={`text-base font-semibold cursor-pointer mt-2 ${liked}`}
          >
            liked
          </p>
        </div>
        <div className="flex gap-6 flex-wrap md:justify-start">
          {videoList.length > 0 ? (
            videoList.map((post: Video, idx: number) => (
              <VideoCard post={post} key={idx} />
            ))
          ) : (
            <NoResults
              text={`No ${showUserVideos ? `` : `Liked`} Videos Yet`}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string }
}) => {
  const res = await axios.get(`${BASE_URL}/api/profile/${id}`)

  return {
    props: { data: res.data },
  }
}

export default Profile
