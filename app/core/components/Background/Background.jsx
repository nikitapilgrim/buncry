import React, { forwardRef, useEffect, useImperativeHandle, useRef } from "react"
import clsx from "clsx"
import styles from "./styles.module.scss"
import useScrollPosition from "@react-hook/window-scroll"
import useWebAnimations from "@wellyshen/use-web-animations"

const Noise = () => {
  return (
    <div className="absolute top-0 w-full h-full left-0 opacity-10 z-20">
      <svg style={{ width: "100%", height: "100%" }} xmlns="http://www.w3.org/2000/svg">
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
    </div>
  )
}

const Shapes = {
  topLeft: "#6593FF",
  topBottom: "#002A8D",
  centerBottom: "#00C2FF",
  rightTop: "#90FFAF",
}

const convertMatrix = (scaleX, skewY, skewX, scaleY, translateX, translateY) => {
  //matrix( scaleX(), skewY(), skewX(), scaleY(), translateX(), translateY() )
  return `scaleX(${scaleX}) skewY(${skewY}) skewX(${skewX}) scaleY(${scaleY}) translateX(${translateX}%) translateY(${translateY}%)`
}
const blocks = {
  1: {
    centerBottomRef: {
      scaleX: -1,
      skewY: 0,
      skewX: 0,
      scaleY: 1,
      translateX: -70,
      translateY: 90,
    },
  },
}

const Background = forwardRef((_, ref) => {
  const scrollY = useScrollPosition(60)
  const { ref: centerBottomRef, animate: animateCenterBottom } = useWebAnimations({
    onUpdate: ({ playState, animation: { pending } }) => {
      getComputedStyle(centerBottomRef.current)
      /*console.log({
        x: getComputedStyle(centerBottomRef.current).rx,
        y: getComputedStyle(centerBottomRef.current).ry,
      })*/
    },
  })
  const { ref: rightTopRef, animate: animateRightTop } = useWebAnimations()
  const { ref: topBottomRef, animate: animateTopBottom } = useWebAnimations()
  const { ref: topLeftRef, animate: animateTopLeft } = useWebAnimations()
  const { ref: whiteRef, animate: animateWhite } = useWebAnimations()

  /* useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus()
    },
  }))*/

  useEffect(() => {
    //"matrix(-1 0 0 1 812.5 658.5)"

    animateCenterBottom({
      //keyframes: { rx: 393.5 + scrollY / 5, ry: 254.5 + scrollY },
      keyframes: {
        transform: convertMatrix(-1, 0, 0, 1, -55, 90),
        "-webkit-transform": convertMatrix(-1, 0, 0, 1, -55, 90),
      },
      animationOptions: { duration: 300, fill: "forwards" },
    })

    /*animateRightTop({
      keyframes: { rx: 393.5 + scrollY / 5, ry: 254.5 + scrollY },
      animationOptions: { duration: 300, fill: "forwards" },
    })*/
  }, [scrollY])

  return (
    <div className="fixed h-full w-full pointer-events-none overflow-hidden -z-10">
      <Noise />
      <div className={"relative w-full h-full"}>
        <div ref={ref} className={clsx("absolute top-0 left-0 h-full w-full", styles.blur)} />
        <div className={"h-full w-full"}>
          <svg
            style={{ width: "100%", height: "100%" }}
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            /*viewBox="0 0 1440 720"*/
          >
            <g clipPath="url(#clip0_24_547)">
              <path fill="#fff" d="M0 0H1440V720H0z" transform="matrix(-1 0 0 1 1440 0)" />
              <ellipse
                ref={centerBottomRef}
                fill="#00C2FF"
                rx="393.5"
                ry="254.5"
                /*transform="matrix(-1 0 0 1 812.5 658.5)"*/
              />

              <circle
                ref={topBottomRef}
                r="283.5"
                fill="#002A8D"
                transform="matrix(-1 0 0 1 135.5 542.5)"
              />
              <circle
                ref={rightTopRef}
                r="312.5"
                fill="#90FFAF"
                transform="matrix(-1 0 0 1 1357.5 599.5)"
              />
              <circle
                ref={topLeftRef}
                r="512"
                fill="#6593FF"
                transform="matrix(-1 0 0 1 327 -11)"
              />
              <ellipse
                ref={whiteRef}
                fill="#fff"
                rx="531.998"
                ry="245.371"
                transform="scale(-1 1) rotate(-.73 2174.09 84424.234)"
              />
            </g>
            <defs>
              <clipPath id="clip0_24_547">
                <path fill="#fff" d="M0 0H1440V720H0z" transform="matrix(-1 0 0 1 1440 0)" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  )
})

export { Background }
