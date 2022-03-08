//@ts-nocheck
import React, { useEffect, useRef } from "react"
import { useVideo } from "react-use"
import styles from "./styles.module.scss"
import useScrollPosition from "@react-hook/window-scroll"
import { useWindowSize } from "react-use"
import useWebAnimations from "@wellyshen/use-web-animations"
import { getOffset } from "../../utls/getOffset"
import { useAnimateByScroll, useAnimateHideByScroll } from "../../hooks/useAnimateHideByScroll"

export const Descr = () => {
  const scrollY = useScrollPosition(60)
  const windowSize = useWindowSize()
  const refList = useRef()
  const refVideoWrapper = useRef()
  const { ref: refBlock, animate } = useWebAnimations()
  //useAnimateHideByScroll({ ref: refBlock, speed: 1, offset: 250 })
  useAnimateByScroll({ ref: refList, breakpoint: 20 })
  useAnimateByScroll({ ref: refVideoWrapper, breakpoint: 20 })
  const [video, state, controls, ref] = useVideo(
    <video
      src="https://link.ap1.storjshare.io/juk7b5p6w3c7p27cje3t22fs4clq/demo-bucket%2F16454704723421.mp4?view"
      controls
    />
  )
  useEffect(() => {
    //console.log(getOffset(ref.current).top - scrollY - windowSize.height, windowSize)
    const opacity = 1 - Math.abs((getOffset(ref.current).top - scrollY) / 100)
    animate({
      keyframes: { transform: `translateY(-${scrollY * 0.3}px)` },
      animationOptions: { duration: 300, fill: "forwards" },
    })
  }, [scrollY, animate, windowSize])

  return (
    <section className={styles.wrapper} ref={refBlock}>
      <div className={styles.inner}>
        <div ref={refVideoWrapper} className={styles.videoWrapper}>
          {video}
        </div>
        <ol ref={refList} className={styles.list}>
          <li>1. Deposit money for a chance to win</li>
          <li>2. Prizes are awarded every day </li>
          <li>3. Even if you don't win, keep all of your money! </li>
        </ol>
      </div>
    </section>
  )
}
