import useScrollPosition from "@react-hook/window-scroll"
import { useEffect, useRef } from "react"
import useWebAnimations from "@wellyshen/use-web-animations"
import { getOffset } from "../utls/getOffset"
import useWindowSize from "react-use/lib/useWindowSize"

export const useAnimateHideByScroll = ({ ref, speed, offset = 0, breakpoint }) => {
  const scrollY = useScrollPosition(60)
  const initial = useRef()
  const { animate } = useWebAnimations({ ref })

  const calculateOpacity = (elem, speed = 1) => {
    let opacity = 1
    const START_OPACITY = 130
    const FULL_HIDDEN = 60
    const yElem = getOffset(elem).top

    if (yElem + offset <= initial.current) {
      //console.log(yElem, initial.current, (yElem / initial.current) * 100)
      const _opacity = (((yElem - 100) / initial.current) * 100) / 100
      if (_opacity >= 100) {
        opacity = 0
      } else {
        opacity = _opacity
      }
      if (opacity <= 0.5) {
        elem.style.pointerEvents = "none"
      } else {
        elem.style.pointerEvents = "auto"
      }
    }
    return opacity
  }

  useEffect(() => {
    if (ref?.current) {
      initial.current = getOffset(ref.current).top
    }
  }, [ref, speed])

  useEffect(() => {
    if (ref?.current && Number(initial?.current)) {
      animate({
        keyframes: { opacity: calculateOpacity(ref.current, speed) },
        animationOptions: { duration: 200, fill: "forwards" },
      })
    }
  }, [scrollY, initial, speed, animate, ref])
}

export const useAnimateByScroll = ({ ref, breakpoint }) => {
  const scrollY = useScrollPosition(60)
  const windowSize = useWindowSize()
  const initial = useRef()
  const { animate } = useWebAnimations({ ref })

  const calculateOpacity = (elem) => {
    let opacity = 1
    const yElem = getOffset(elem).top
    const startPos = windowSize.height * (breakpoint / 100)
    let percent = (yElem / startPos) * 100
    if (Math.sign(percent) === -1) percent = 0
    if (percent > 100) percent = 100
    opacity = percent / 100

    if (opacity <= 0.5) {
      elem.style.pointerEvents = "none"
    } else {
      elem.style.pointerEvents = "auto"
    }
    return opacity
  }

  useEffect(() => {
    if (ref?.current) {
      initial.current = getOffset(ref.current).top
    }
  }, [ref])

  useEffect(() => {
    if (ref?.current && Number(initial?.current)) {
      animate({
        keyframes: { opacity: calculateOpacity(ref.current) },
        animationOptions: { duration: 100, fill: "forwards" },
      })
    }
  }, [scrollY, initial, animate, ref, windowSize])
}
