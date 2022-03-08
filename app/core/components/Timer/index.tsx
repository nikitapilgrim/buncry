import { useEffect, useMemo } from "react"
import useCountDown from "react-countdown-hook"
import {
  differenceInCalendarDays,
  differenceInHours,
  differenceInMonths,
  format,
  formatDistanceToNow,
  formatDuration,
  intervalToDuration,
} from "date-fns"
import styles from "./styles.module.scss"

const initialTime = new Date(2022, 1, 24, 1)
const interval = 1000

const getFormat = (interval) => {
  if (interval.years === 0) {
    if (interval.months === 0) {
      if (interval.days) {
        return ["days", "hours"]
      }
      if (!interval.days) {
        if (interval.hours === 0) {
          return ["minutes", "seconds"]
        }
        return ["hours", "minutes"]
      }
    }
  }
  return null
}

export const Timer = ({ initialDate }) => {
  const [timeLeft, { start, pause, resume, reset }] = useCountDown(initialTime.getTime(), interval)

  useEffect(() => {
    start()
  }, [])

  const formattedTime = useMemo(() => {
    const date = new Date(timeLeft)
    const currentDate = new Date()
    const diffInMonths = differenceInMonths(date, currentDate)
    let time = ""

    const interval = intervalToDuration({
      start: currentDate,
      end: date,
    })
    const _format = getFormat(interval)
    if (_format) {
      time = formatDuration(interval, {
        delimiter: " ",
        format: _format,
      })
      //return format(date, "dd kk")
      return time
    }
    time = formatDistanceToNow(date, { includeSeconds: true })
    return time
  }, [timeLeft])

  return (
    <div className={styles.wrapper}>
      <div className={styles.time}>
        {/*1 day 14 hours*/} {formattedTime}
      </div>
      <div className={styles.descr}>Before the end of the lottery</div>
    </div>
  )
}
