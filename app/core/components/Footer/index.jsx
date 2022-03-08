import Styles from "./styles.module.scss"
import { Logo } from "app/core/common/Logo/Logo"
import { forwardRef } from "react"

export const Footer = forwardRef((_, ref) => {
  return (
    <div className={Styles.footer}>
      <ul className={Styles.inner}>
        <li>
          <a href="">Contact us</a>
        </li>
        <li>
          <a href="">About us</a>
        </li>
        <li>
          <a href="">FAQ</a>
        </li>
      </ul>
      <div ref={ref}>
        <Logo />
      </div>
    </div>
  )
})
