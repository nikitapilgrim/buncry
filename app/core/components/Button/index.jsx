import { forwardRef } from "react"
import clsx from "clsx"
import Styles from "./styles.module.scss"

export const Button = forwardRef(({ children, className, type = "primary", onClick }, ref) => {
  return (
    <button
      onClick={onClick}
      ref={ref}
      className={clsx(
        Styles.button,
        {
          [Styles.primary]: type === "primary",
          [Styles.secondary]: type === "secondary",
        },
        className
      )}
    >
      <span>{children}</span>
    </button>
  )
})
