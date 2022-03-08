import { useMemo } from "react"
import { Info } from "../Info/Info"
import { Button } from "../Button"
import style from "./style.module.scss"
import { useAccountPkh } from "../../../dapp/dapp"

export const Wallet = () => {
  const accountPkh = useAccountPkh()
  const accountPkhPreview = useMemo(() => {
    if (!accountPkh) return undefined
    else {
      const accPkh = accountPkh as unknown as string
      const ln = accPkh.length
      return `${accPkh.slice(0, 7)}...${accPkh.slice(ln - 4, ln)}`
    }
  }, [accountPkh])

  return (
    <>
      {accountPkhPreview && (
        <Info title={"wallet"}>
          <div className={style.balanceWrapper}>
            <div className={style.balanceValue}>{accountPkhPreview}</div>
            <div className={style.balanceText}>Address</div>
          </div>
          <div className={style.balanceWrapper} style={{ color: "#8795B0" }}>
            <div className={style.balanceValue}>Kukai</div>
            <div className={style.balanceText}>Wallet</div>
          </div>
          <Button type={"secondary"}>Disconnect</Button>
        </Info>
      )}
    </>
  )
}
