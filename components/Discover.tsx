import React from "react"
import Link from "next/link"
import { useRouter } from "next/router"

import { topics } from "../utils/constants"

function Discover() {
  const router = useRouter()
  const { topic } = router.query

  const ActiveTopicStyle =
    "xl:border-2 hover:bg-primary xl:border-gray-400 px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer font-semibold text-blue-400"

  const topicStyle =
    "xl:border-2 hover:bg-gray-200 xl:border-gray-200 px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer font-semibold text-gray-800"

  return (
    <div className="xl:border-b-2 xl:border-gray-200 pb-6">
      <p className="text-gray-400 font-normal m-3 mt-4 hidden xl:block">
        Popular Topics
      </p>
      <div className="flex gap-3 flex-wrap ">
        {topics.map((item) => (
          <Link href={`/$topic/${item.name}`} key={item.name}>
            <div
              className={topic === item.name ? ActiveTopicStyle : topicStyle}
            >
              <span className="font-bold text-2xl xl:text-md">{item.icon}</span>
              <span className="font-medium text-md hidden xl:block capitalize">
                {item.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Discover
