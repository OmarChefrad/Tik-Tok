import sanityClient from "@sanity/client"

export const client = sanityClient({
  projectId: "feiz7wtw",
  dataset: "production",
  apiVersion: "2022-07-15",
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
})
