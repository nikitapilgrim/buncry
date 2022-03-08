import Styles from "./styles.module.scss"
import { Logo } from "app/core/common/Logo/Logo"
import { forwardRef } from "react"

export const Nav = forwardRef((_, ref) => {
  return (
    <nav ref={ref} className={Styles.nav}>
      <div className={Styles.inner}>
        <a className={Styles.logolink} href="/">
          <Logo />
        </a>
      </div>
    </nav>
  )
})
