import React, { useState, useEffect, useRef } from "react"
import { useRouter } from "next/router"
import Image from "next/image"
import Link from "next/link"
import { GoVerified } from "react-icons/go"
import { MdOutlineCancel } from "react-icons/md"
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi"
import { BsFillPlayFill, BsFillPauseFill, BsPlay } from "react-icons/bs"
import axios from "axios"
import { BASE_URL } from "./../../utils/index"
import { Video } from "../../types"
import useAuthStore from "../../store/authStore"
import LikeButton from "../../components/LikeButton"
import Comments from "../../components/Comments"

interface IProps {
  postDetails: Video
}

const Detail = ({ postDetails }: IProps) => {
  const [post, setPost] = useState(postDetails)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isVideoMuted, setIsVideoMuted] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)
  const router = useRouter()
  const { userProfile }: any = useAuthStore()

  const onVideoPress = () => {
    if (isPlaying) {
      videoRef?.current?.pause()
      setIsPlaying(false)
    } else {
      videoRef?.current?.play()
      setIsPlaying(true)
    }
  }

  let linkStyle =
    "text-9xl md:text-6xl text-white cursor-pointer hidden hover:visible"

  useEffect(() => {
    if (post && videoRef?.current) {
      videoRef.current.muted = isVideoMuted
    }
  }, [post, isVideoMuted])

  const handleLike = async (like: boolean) => {
    if (userProfile) {
      const { data } = await axios.put(`${BASE_URL}/api/like`, {
        userId: userProfile._id,
        postId: post._id,
        like,
      })

      setPost({ ...post, likes: data.likes })
    }
  }

  if (!post) return null

  return (
    <div className="flex w-full h-full absolute left-0 top-0 bg-white flex-col md:flex-nowrap md:flex-col p-0">
      <div className="relative flex-col md:flex-row flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-black bg-cover">
        <div className="absolute top-6 left-2 md:left-6 flex gap-6 z-50">
          <p onClick={() => router.back()}>
            <MdOutlineCancel className="text-white text-[75px] md:text-[35px] cursor-pointer" />
          </p>
        </div>
        <div className="relative">
          <div className="md:h-[100vh] h-[200vh]">
            <video
              ref={videoRef}
              loop
              onClick={() => {}}
              className="h-full cursor-pointer"
              src={post.video.asset.url}
            ></video>
          </div>

          <div className="absolute top-[50%] left-[42.5%]">
            {isPlaying ? (
              <button onClick={onVideoPress}>
                <BsFillPauseFill className={linkStyle} />.
              </button>
            ) : (
              <button onClick={onVideoPress}>
                <BsFillPlayFill className={linkStyle} />.
              </button>
            )}
          </div>

          <div className="absolute top-[92.5%] left-[85%]">
            {isVideoMuted ? (
              <button onClick={() => setIsVideoMuted(false)}>
                <HiVolumeOff className="text-6xl  md:text-4xl text-white cursor-pointer" />
                .
              </button>
            ) : (
              <button onClick={() => setIsVideoMuted(true)}>
                <HiVolumeUp className="text-6xl  md:text-4xl text-white cursor-pointer" />
                .
              </button>
            )}
          </div>
        </div>

        <div className="absolute pr-[500px] md:pr-0 md:pl-[1450px] md:mb-[600px] md:mt-0 mt-[1600px] text-gray-400 flex flex-row">
          <div className="md:w-16 md:h-16 w-24 h-10 text-5xl md:text-sm">
            <Link href="/">
              <>
                <Image
                  width={62}
                  height={62}
                  className="rounded-full"
                  src={post.postedBy.image}
                  alt="profile photo"
                  layout="responsive"
                />
              </>
            </Link>
          </div>
          <div className="flex flex-row items-center">
            <Link href="/">
              <div className="flex items-center gap-2 md:gap-0">
                <p className="flex flex-row items-center md:text-base text-4xl font-bold text-slate-800 font-sans pl-3 md:w-32">
                  {post.postedBy.userName}{" "}
                </p>
                <GoVerified className="text-blue-500 text-4xl md:text-xl " />
              </div>
            </Link>
          </div>
        </div>
        <div className="absolute pr-[500px] md:pr-0 md:pl-[1450px] md:mb-[600px] md:mt-[150px] mt-[1800px] flex flex-col">
          <p className="px-10 pl-16 md:pl-32 mt-12 md:mt-24 md:text-base text-3xl w-[300px] text-gray-800">
            {post.caption}
          </p>
          <div className="mt-10 px-10">
            {userProfile && (
              <LikeButton
                handleLike={() => handleLike(true)}
                handleDislike={() => handleLike(false)}
              />
            )}
          </div>
          <Comments />
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
  const { data } = await axios.get(`${BASE_URL}/api/post/${id}`)

  return {
    props: { postDetails: data },
  }
}

export default Detail
