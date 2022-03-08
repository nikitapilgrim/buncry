import { Info } from "../Info/Info"
import { NETWORK, useAccountPkh, useConnect, useOnBlock, useTezos } from "app/dapp/dapp"
import { useCallback, useEffect, useMemo, useState } from "react"
import { Button } from "../Button"
import style from "./style.module.scss"
import { TezosToolkit } from "@taquito/taquito"

export const Account = () => {
  const connect = useConnect()
  const accountPkh = useAccountPkh()
  const tezos = useTezos()
  const [balance, setBalance] = useState(null)
  const handleConnect = useCallback(async () => {
    try {
      await connect(NETWORK, { forcePermission: true })
    } catch (err) {
      console.error(err.message)
    }
  }, [connect])

  const accountPkhPreview = useMemo(() => {
    if (!accountPkh) return undefined
    else {
      const accPkh = accountPkh as unknown as string
      const ln = accPkh.length
      return `${accPkh.slice(0, 7)}...${accPkh.slice(ln - 4, ln)}`
    }
  }, [accountPkh])

  const loadBalance = useCallback(async () => {
    if (tezos) {
      const tezosOk = tezos as any
      const bal = await tezosOk.tz.getBalance(accountPkh)
      const { TezosToolkit } = require("@taquito/taquito")
      const Tezos = new TezosToolkit("https://hangzhounet.smartpy.io/") //там уже объявляют константу тезос в гайде, но ноа чему-то другому равна
      let balance = await Tezos.tz.getBalance(accountPkh)
      console.log(tezosOk.format("mutez", "tz", balance).toString(), "bal")
      /*async function a() {
        let balance = await Tezos.tz.getBalance(
          "тут должен быть адрес который подрубился, он где-то в стейтах хранится"
        ) // собсна функция которая баланс на кошельке чекает, переменную баланс можно вывести куда-нибудь
        console.log(balance)
      }
      a()*/
      setBalance(tezosOk.format("mutez", "tz", bal).toString())
    }
  }, [tezos, accountPkh, setBalance])

  useEffect(() => {
    loadBalance()
  }, [loadBalance])

  useOnBlock(tezos, loadBalance)

  return (
    <Info title={"account"}>
      {!balance && (
        <div className={style.textNotConnected}>
          Connect a wallet to manage your deposits & rewards
        </div>
      )}
      {balance && (
        <div className={style.balanceWrapper}>
          <div className={style.balanceValue}>${balance}</div>
          <div className={style.balanceText}>Assets</div>
          {/*<div>{accountPkhPreview}</div>*/}
        </div>
      )}
      {balance && (
        <div className={style.balanceWrapper} style={{ color: "#8795B0" }}>
          <div className={style.balanceValue}>${balance}</div>
          <div className={style.balanceText}>Won in the last lottery</div>
          {/*<div>{accountPkhPreview}</div>*/}
        </div>
      )}
      {balance && (
        <div className={style.balanceWrapper} style={{ color: "#8795B0" }}>
          <div className={style.balanceValue}>${balance}</div>
          <div className={style.balanceText}>Won in all time</div>
          {/*<div>{accountPkhPreview}</div>*/}
        </div>
      )}

      {!balance && (
        <Button type={"secondary"} onClick={handleConnect}>
          Connect account
        </Button>
      )}
    </Info>
  )
}
