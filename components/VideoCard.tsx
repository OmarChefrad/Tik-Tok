import React, { useState, useEffect, useRef } from "react"
import { Video } from "../types"
import { NextPage } from "next"
import Image from "next/image"
import Link from "next/link"
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi"
import { BsFillPlayFill, BsFillPauseFill, BsPlay } from "react-icons/bs"
import { GoVerified } from "react-icons/go"

interface Iprops {
  post: Video
}

const VideoCard: NextPage<Iprops> = ({ post }) => {
  const [playing, setIsPlaying] = useState(false)
  const [isVideoMuted, setIsVideoMuted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const onVideoPress = () => {
    if (playing) {
      videoRef?.current?.pause()
      setIsPlaying(false)
    } else {
      videoRef?.current?.play()
      setIsPlaying(true)
    }
  }

  useEffect(() => {
    if (videoRef?.current) {
      videoRef.current.muted = isVideoMuted
    }
  }, [isVideoMuted])

  return (
    <div className="flex flex-col border-b-2 border-gray-200 pb-4 mr-0 md:mr-20">
      <div>
        <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
          <div className="md:w-16 md:h-16 w-10 h-10 ">
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
          <div className="flex flex-row">
            <Link href="/">
              <div className="flex items-center gap-2">
                <p className="flex items-center gap-2 md:text-md font-bold text-primary font-sans">
                  {post.postedBy.userName}{" "}
                  <GoVerified className="text-blue-500 text-lg " />
                </p>
                <p className="capitalize font-meduim text-xs text-gray-400 hidden md:block">
                  {post.postedBy.userName}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="lg:ml-20 flex gap-4 relative mr-3">
        <div className="rounded-3xl">
          <Link href={`/detail/${post._id}`}>
            <video
              loop
              ref={videoRef}
              src={post.video.asset.url}
              className="rounded-lg lg:h-[650px] cursor-pointer bg-gray-100"
              onKeyPress={onVideoPress}
            ></video>
          </Link>
          <div className="absolute bottom-2 cursor-pointer left-8 md:left-14 lg:left-0 flex gap-48 md:gap-56 lg:justify-between w-[100px] md:w-[50px] md:pl-8">
            {playing ? (
              <button onClick={onVideoPress}>
                <BsFillPauseFill className="text-2xl text-black lg:text-4xl" />.
              </button>
            ) : (
              <button onClick={onVideoPress}>
                <BsFillPlayFill className="text-2xl text-black lg:text-4xl" />.
              </button>
            )}
            {isVideoMuted ? (
              <button onClick={() => setIsVideoMuted(false)}>
                <HiVolumeOff className="text-2xl text-black lg:text-4xl " />.
              </button>
            ) : (
              <button onClick={() => setIsVideoMuted(true)}>
                <HiVolumeUp className="text-2xl text-black lg:text-4xl " />.
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoCard
