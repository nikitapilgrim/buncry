//@ts-nocheck
import { Suspense, useRef } from "react"
import { Image, Link, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import logo from "public/logo.png"
import { Background } from "app/core/components/Background/Background"
import { Header } from "app/core/blocs/Header/Header"
import { Nav } from "app/core/components/Nav"
import { Footer } from "app/core/components/Footer"
import { Descr } from "app/core/blocs/Descr"
import { Main } from "app/core/blocs/Main"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */
/*

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <button
          className="button small"
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Logout
        </button>
        <div>
          User id: <code>{currentUser.id}</code>
          <br />
          User role: <code>{currentUser.role}</code>
        </div>
      </>
    )
  } else {
    return (
      <>
        <Link href={Routes.SignupPage()}>
          <a className="button small">
            <strong>Sign Up</strong>
          </a>
        </Link>
        <Link href={Routes.LoginPage()}>
          <a className="button small">
            <strong>Login</strong>
          </a>
        </Link>
      </>
    )
  }
}
*/

const Home: BlitzPage = () => {
  const backgroundRef = useRef()
  const nav = useRef()
  const logoFooter = useRef()
  return (
    <div className="">
      <Nav ref={nav} />
      <Background ref={backgroundRef} />
      <main>
        <Header />
        <Descr />
        <Main footerLogoRef={logoFooter} navRef={nav} backgroundRef={backgroundRef} />
      </main>
      <Footer ref={logoFooter} />
    </div>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
