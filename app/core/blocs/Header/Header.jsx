import { useEffect, useRef } from "react"
import useWebAnimations from "@wellyshen/use-web-animations"
import useScrollPosition from "@react-hook/window-scroll"

import { Button } from "app/core/components/Button"
import clsx from "clsx"
import styles from "./styles.module.scss"
import { getOffset } from "app/core/utls/getOffset"
import { useAnimateByScroll } from "../../hooks/useAnimateHideByScroll"

/*
* let opacity = 1
  const yElem = getOffset(elem).top
  const START_OPACITY = 130
  const FULL_HIDDEN = 60

  if (yElem <= START_OPACITY) {
    const _opacity = ((yElem / START_OPACITY) * 100) / 100
    if (_opacity >= 100) {
      opacity = 0
    } else {
      opacity = _opacity * speed
    }
  }
  //const opacity = 1 - Math.abs((getOffset(elem).top - scrollY) / 100)
  return opacity
* */

export const Header = () => {
  const prizeValueRef = useRef()
  const pRef = useRef()
  const buttonRef = useRef()
  useAnimateByScroll({ ref: prizeValueRef, breakpoint: 20 })
  useAnimateByScroll({ ref: pRef, breakpoint: 20 })
  useAnimateByScroll({ ref: buttonRef, breakpoint: 20 })

  return (
    <header
      style={{ zIndex: 1 }}
      className="w-full min-h-screen relative flex flex-col items-center justify-center"
    >
      <div className="relative z-10 w-[length:var(--global-width)]">
        <div
          ref={prizeValueRef}
          className={clsx(styles.prizeValue, "not-italic font-medium text-white")}
        >
          $1,488<span className="opacity-50">.20</span>
        </div>
        <p ref={pRef} className="mt-8 not-italic font-semibold text-xl text-white leading-normal">
          The prize pool for this round.
          <br />
          <span className="inline-block mt-4">
            Pools is a crypto lottery based on Tezos blabla.Save money and have a chance to win
            every week.
          </span>
        </p>

        <Button ref={buttonRef} className="mt-8">
          Start saving & winning
        </Button>
      </div>
    </header>
  )
}
