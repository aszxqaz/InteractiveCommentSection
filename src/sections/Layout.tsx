import { UserContext } from "pages"
import { ReactNode, useContext } from "react"
import { ModalProvider } from "src/components/Modal/Modal"
import { Header } from "./Header"

type LayoutProps = {
  children: ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  const user = useContext(UserContext)
  return (
    <ModalProvider>
      <Header user={user} />
      {children}
    </ModalProvider>
  )
}
