import { useConnect, NETWORK } from "app/dapp/dapp"
import { useCallback } from "react"
import { Button } from "../Button"

export function ConnexionButton() {
  const connect = useConnect()
  const handleConnect = useCallback(async () => {
    try {
      await connect(NETWORK, { forcePermission: true })
    } catch (err) {
      console.error(err.message)
    }
  }, [connect])

  return (
    <Button type={"secondary"} onClick={handleConnect}>
      Connect account
    </Button>
  )
}
