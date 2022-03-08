import React, { forwardRef } from "react"
import styles from "./styles.module.scss"

export const Info = forwardRef(({ title, children }, ref) => {
  return (
    <section ref={ref} className={styles.wrapper}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.info}>
        {React.Children.map(children, (child) => {
          if (child) {
            return <div className={styles.info_item}>{child}</div>
          }
        })}
      </div>
    </section>
  )
})
