import { Info } from "../Info/Info"
import styles from "./styles.module.scss"
import { Timer } from "../Timer"
import { Button } from "../Button"
import { useAnimateByScroll } from "app/core/hooks/useAnimateHideByScroll"
import { useRef } from "react"

const PoolPrize = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>$1,488.20</div>
      <div className={styles.bottom}>In weekly prizes</div>
    </div>
  )
}

const Participate = () => {
  return <Button type={"secondary"}>Participate</Button>
}

export const Pool = () => {
  const ref = useRef()

  return (
    <Info ref={ref} title={"pool"}>
      <PoolPrize />
      <Timer />
      <Participate />
    </Info>
  )
}
