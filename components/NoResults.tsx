import React from "react"
import { MdOutlineVideocamOff } from "react-icons/md"

interface Iprops {
  text: string
}

const NoResult = ({ text }: Iprops) => {
  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      <p className="text-2xl">
        <MdOutlineVideocamOff />
      </p>
      <p className="text-4xl md:text-base text-center">{text}</p>
    </div>
  )
}

export default NoResult
