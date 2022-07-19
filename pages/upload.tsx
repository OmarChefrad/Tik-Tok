import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { FaCloudUploadAlt } from "react-icons/fa"
import { MdDelete } from "react-icons/md"
import axios from "axios"
import { SanityAssetDocument } from "@sanity/client"

import useAuthStore from "../store/authStore"
import { client } from "../utils/client"
import { topics } from "../utils/constants"
import { BASE_URL } from "../utils"

const Upload = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [videoAsset, setVideoAsset] = useState<
    SanityAssetDocument | undefined
  >()
  const [wrongFileType, setWrongFileType] = useState(false)
  const [caption, setCaption] = useState(" ")
  const [category, setCategory] = useState(topics[0].name)
  const [savingPost, setSavingPost] = useState(false)
  const { userProfile }: { userProfile: any } = useAuthStore()

  const router = useRouter()

  const uploadVideo = async (e: any) => {
    const selectedFile = e.target.files[0]
    const fileTypes = [`video/mp4`, `video/webm`]

    if (fileTypes.includes(selectedFile.type)) {
      client.assets
        .upload("file", selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((data) => {
          setVideoAsset(data)
          setIsLoading(false)
        })
    } else {
      setIsLoading(false)
      setWrongFileType(true)
    }
  }

  const handlePost = async () => {
    if (caption && videoAsset?._id && category) {
      setSavingPost(true)

      const document = {
        _type: "post",
        caption,
        video: {
          _type: "file",
          asset: {
            _type: "reference",
            _ref: videoAsset?._id,
          },
        },
        userId: userProfile?._id,
        postedBy: {
          _type: "postedBy",
          _ref: userProfile?._id,
        },
        topic: category,
      }
      await axios.post(`${BASE_URL}/api/post`, document)

      router.push("/")
    }
  }

  return (
    <div className="flex w-full h-full absolute left-0 top-[60px] mt-4 md:mt-0 md:pt-0  bg-slate-100 justify-center ">
      <div className="bg-white rounded-xl md:h-full h-[110vh] flex gap-6 flex-wrap justify-center items-center mt-4 p-14 pt-6 md:pt-6 pb-0 shadow-lg shadow-slate-200 md:shadow-lg md:shadow-slate-200">
        <div>
          <div>
            <p className="text-2xl font-bold pl-12">Upload Section</p>
            <p className="text-md text-gray-400 mt-1 pl-8">
              Post a video to your account
            </p>
            <div className="border-dashed rounded-xl border-4 border-gray-200 flex  justify-center items-center outline-none mt-4 md:mt-10 w-[260px] h-[full]  cursor-pointer hover:border-silentred hover:bg-slate-50">
              {isLoading ? (
                <p>Uploading...</p>
              ) : (
                <div>
                  {videoAsset ? (
                    <div>
                      <video
                        src={videoAsset.url}
                        loop
                        controls
                        className="rounded-xl h-[450px]
                         bg-black outline-none
                        "
                      ></video>
                    </div>
                  ) : (
                    <label className="cursor-pointer">
                      <div className="flex flex-col items-center justify-center h-full">
                        <div className="flex flex-col items-center justify-center">
                          <p className="font-bold text-xl">
                            <FaCloudUploadAlt className="text-gray-300 text-6xl" />
                          </p>
                          <p className="text-xl font-semibold">Upload Video</p>
                        </div>
                        <p className="text-gray-400 font-light text-center mt-7 text-sm leading-10 font-mono">
                          MP4 or WebM <br />
                          720p or higger <br />
                          Up to 10min <br />
                          Less than 2gb
                        </p>
                        <p className="bg-regalblue text-center mt-10 rounded text-white text-md font-medium p-2 w-52 outline none shadow-md shadow-slate-500 ">
                          Select File
                        </p>
                      </div>
                      <input
                        type="file"
                        name="upload-video"
                        onChange={uploadVideo}
                        className="w-0 h-0"
                      />
                    </label>
                  )}
                </div>
              )}
              {wrongFileType && (
                <p className="text-center text-xl text-silentred font-semibold mtm-4 w-[250px]">
                  Please Select Video Format
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2 pb-20">
              <label className="text-md font-meduim text-gray-400 font-mono pt-2">
                Caption
              </label>
              <input
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="rounded-xl border-4 outline-none text-md border-dashed border-slate-200 p-2 hover:bg-slate-50 hover:border-dashed hover:border-silentred"
                placeholder="Select"
              />
              <label className="text-md font-meduim text-gray-400 font-mono">
                Chose a Category
              </label>
              <select
                onChange={(e) => setCategory(e.target.value)}
                className="rounded-xl border-4 outline-none text-md border-dashed border-slate-200 p-2 hover:bg-slate-100 hover:border-dashed hover:border-silentred cursor-pointer"
              >
                {topics.map((topic) => (
                  <option
                    key={topic.name}
                    className="outline-none capitalize text-silentred text-md  p-2 hover:bg-slate-200 bg-slate-50 hover:text-slate-50"
                    value={topic.name}
                  >
                    {topic.name}
                  </option>
                ))}
              </select>
              <div className="flex gap-6 ">
                <button
                  onClick={handlePost}
                  type="button"
                  className="bg-silentred text-center ml-[24px] rounded text-white text-md font-medium p-2 mt-2 w-52 outline none shadow-md shadow-slate-500 "
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Upload
