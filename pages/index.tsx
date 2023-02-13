import { dehydrate, QueryClient } from "@tanstack/react-query"
import { getComments } from "client/api/fetchers"
import { useMeQuery } from "client/api/useQueries"
import { createContext } from "react"
import { UserEntityServerResponse } from "server/server-response.types"
import { Layout } from "src/sections/Layout"
import { Comments } from "../src/sections/Comments/Comments"

export const UserContext = createContext<UserEntityServerResponse>(undefined)

export default function Home() {
  const { data: user } = useMeQuery()

  return (
    <UserContext.Provider value={user}>
      <Layout>
        <div style={{ paddingInline: 20 }}>
          <Comments />
        </div>
      </Layout>
    </UserContext.Provider>
  )
}

export async function getStaticProps() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(["comments"], getComments)
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}
