//@ts-nocheck
import React, { useEffect, useRef } from "react"
import { Pool } from "app/core/components/Pool"
import { Account } from "app/core/components/Account/Account"
import { Wallet } from "app/core/components/Wallet"
import styles from "./styles.module.scss"
import { useAnimateHideByScroll } from "../../hooks/useAnimateHideByScroll"
import { getOffset } from "../../utls/getOffset"
import useWebAnimations from "@wellyshen/use-web-animations"
import useScrollPosition from "@react-hook/window-scroll"
import { useWindowSize } from "react-use"
import { useAccountPkh } from "app/dapp/dapp"

function hsl_col_perc(percent, start, end) {
  const a = percent / 100,
    b = (end - start) * a,
    c = b + start
  return `hsla(${c}, 100%, 5%, ${percent / 100})`
}

const start = 0
const black = 231

const getPercentDarnessBg = (ref, windowSize) => {
  let percent = 100 - (getOffset(ref.current).top / windowSize.height) * 100
  if (percent <= 0) return 0
  if (percent >= 100) return 100
  return percent
}

export const Main = ({ backgroundRef, navRef, footerLogoRef }) => {
  const { ref, animate } = useWebAnimations()
  const scrollY = useScrollPosition(60)
  const windowSize = useWindowSize()

  const { animate: animateBackground } = useWebAnimations({ ref: backgroundRef })
  const { animate: animateNav } = useWebAnimations({ ref: navRef })
  const { animate: animateFooterLogo } = useWebAnimations({ ref: footerLogoRef })
  //useAnimateHideByScroll({ ref, speed: 1 })

  useEffect(() => {
    //console.log(getOffset(ref.current).top - scrollY - windowSize.height, windowSize)
    const percent = getPercentDarnessBg(ref, windowSize)
    const opacity = 1 - Math.abs((getOffset(ref.current).top - scrollY) / 100)

    animateBackground({
      keyframes: { background: hsl_col_perc(percent, start, black) },
      animationOptions: { duration: 300, fill: "forwards" },
    })

    animateNav({
      keyframes: { opacity: 1 - percent / 100 },
      animationOptions: { duration: 300, fill: "forwards" },
    })

    animateFooterLogo({
      keyframes: { opacity: percent / 100 },
      animationOptions: { duration: 300, fill: "forwards" },
    })

    animate({
      keyframes: { transform: `translateY(-${scrollY * 0.3}px)` },
      animationOptions: { duration: 300, fill: "forwards" },
    })
  }, [
    scrollY,
    animate,
    backgroundRef,
    windowSize,
    ref,
    animateBackground,
    animateNav,
    animateFooterLogo,
  ])

  return (
    <div ref={ref} className={styles.wrapper}>
      <div className={styles.inner}>
        <Pool />
        <Account />
        <Wallet />
      </div>
    </div>
  )
}
