import "../styles/globals.css"
import { useState, useEffect } from "react"
import type { AppProps } from "next/app"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import { GoogleOAuthProvider } from "@react-oauth/google"

function MyApp({ Component, pageProps }: AppProps) {
  const [isSSR, setIsSSR] = useState(true)

  useEffect(() => {
    setIsSSR(false)
  }, [])

  if (isSSR) return null

  return (
    <GoogleOAuthProvider
      clientId={`${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}`}
    >
      <div className="m-auto md:w-[1400px] overflow-hidden md:h-[100vh]">
        <Navbar />
        <div className="flex gap-1 md:gap-20 ">
          <div className="h-[92vh] overflow-hidden xl:hover:overflow-auto">
            <Sidebar />
          </div>
          <div className="mt-4 flex flex-col gap-10 overflow-auto h-[88vh] videos flex-1">
            <Component {...pageProps} />
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  )
}

export default MyApp
