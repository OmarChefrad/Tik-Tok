import React, { useEffect, useRef, useState } from "react"
import { GoVerified } from "react-icons/go"
import Image from "next/image"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/router"

import VideoCard from "../../components/VideoCard"
import NoResults from "../../components/NoResults"
import { IUser, Video } from "../../types"
import { BASE_URL } from "../../utils"
import useAuthStore from "../../store/authStore"

const Search = ({ videos }: { videos: Video[] }) => {
  const [isAccounts, setIsAccounts] = useState(false)
  const router = useRouter()
  const { searchTerm }: any = router.query
  const { allUsers } = useAuthStore()

  const accounts = isAccounts ? `border-b-2 border-black ` : `text-gray-400`
  const isVideos = !isAccounts ? `border-b-2 border-black ` : `text-gray-400`

  const searchedAccounts = allUsers.filter((user: IUser) =>
    user.userName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="w-full">
      <div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-2 bg-white w-full">
        <p
          onClick={() => setIsAccounts(true)}
          className={`text-base font-semibold cursor-pointer mt-2 ${accounts}`}
        >
          Accounts
        </p>
        <p
          onClick={() => setIsAccounts(false)}
          className={`text-base font-semibold cursor-pointer mt-2 ${isVideos}`}
        >
          Videos
        </p>
      </div>
      {isAccounts ? (
        <div className="md:mt-16">
          {searchedAccounts.length > 0 ? (
            searchedAccounts.map((user: IUser, idx: number) => (
              <Link href={`/profile/${user._id}`} key={idx}>
                <div className="flex justify-center gap-3 pr-[700px] pt-[10px] cursor-pointer border-b-2 border-gray-200">
                  <div>
                    <Image
                      src={user.image}
                      width={48}
                      height={48}
                      className="rounded-full cursor-pointer"
                      alt="user-profile"
                    />
                  </div>

                  <p className="flex justify-center cursor-pointer gap-1 items-center text-[18px] font-bold leading-6 text-primary">
                    {user.userName} <GoVerified className="text-blue-400" />
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <NoResults text={`No video results for ${searchTerm}`} />
          )}
        </div>
      ) : (
        <div className="md:mt-16 flex flex-wrap gap-6 md:justify-start">
          {videos.length > 0 ? (
            videos.map((video: Video, idx) => (
              <VideoCard post={video} key={idx} />
            ))
          ) : (
            <NoResults text={`No video results for ${searchTerm}`} />
          )}
        </div>
      )}
    </div>
  )
}

export const getServerSideProps = async ({
  params: { searchTerm },
}: {
  params: { searchTerm: string }
}) => {
  const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`)

  return {
    props: { videos: res.data },
  }
}

export default Search
