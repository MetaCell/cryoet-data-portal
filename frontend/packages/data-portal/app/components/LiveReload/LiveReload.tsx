import { LiveReloadEvent } from './event'

/**
 * LiveReload component inlined from remix-run/react:
 * https://github.com/remix-run/remix/blob/a20ae7fb0727212ac52bdc687513c61851ac4014/packages/remix-react/components.tsx#L1038-L1149
 */
export const LiveReload =
  process.env.NODE_ENV !== 'development'
    ? () => null
    : function LiveReload({
        port,
        timeoutMs = 1000,
        nonce = undefined,
      }: {
        port?: number
        timeoutMs?: number
        nonce?: string
      }) {
        const js = String.raw

        return (
          <script
            nonce={nonce}
            suppressHydrationWarning
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: js`
                function remixLiveReloadConnect(config) {
                  let REMIX_DEV_ORIGIN = ${JSON.stringify(
                    process.env.REMIX_DEV_ORIGIN,
                  )}

                  let protocol =
                    REMIX_DEV_ORIGIN ? new URL(REMIX_DEV_ORIGIN).protocol.replace(/^http/, "ws") :
                    location.protocol === "https:" ? "wss:" : "ws:" // remove in v2?

                  let hostname = REMIX_DEV_ORIGIN ? new URL(REMIX_DEV_ORIGIN).hostname : location.hostname
                  let url = new URL(protocol + "//" + hostname + "/socket")

                  url.port =
                    ${port} ||
                    (REMIX_DEV_ORIGIN ? new URL(REMIX_DEV_ORIGIN).port : 8002)

                  let ws = new WebSocket(url.href)

                  ws.onmessage = async (message) => {
                    let event = JSON.parse(message.data)

                    if (event.type === "LOG") {
                      console.log(event.message)

                      if (event.message.includes('file changed')) {
                        window.dispatchEvent(new CustomEvent('${
                          LiveReloadEvent.Started
                        }'))
                      }
                    }

                    if (event.type === "RELOAD") {
                      console.log("💿 Reloading window ...")
                      window.location.reload()
                    }

                    if (event.type === "HMR") {
                      if (!window.__hmr__ || !window.__hmr__.contexts) {
                        console.log("💿 [HMR] No HMR context, reloading window ...")
                        window.location.reload()
                        return
                      }

                      if (!event.updates || !event.updates.length) return

                      let updateAccepted = false
                      let needsRevalidation = new Set()

                      for (let update of event.updates) {
                        console.log("[HMR] " + update.reason + " [" + update.id +"]")

                        if (update.revalidate) {
                          needsRevalidation.add(update.routeId)
                          console.log("[HMR] Revalidating [" + update.routeId + "]")
                        }

                        let imported = await import(update.url +  '?t=' + event.assetsManifest.hmr.timestamp)
                        if (window.__hmr__.contexts[update.id]) {
                          let accepted = window.__hmr__.contexts[update.id].emit(
                            imported
                          )

                          if (accepted) {
                            console.log("[HMR] Update accepted by", update.id)
                            updateAccepted = true
                          }
                        }
                      }

                      if (event.assetsManifest && window.__hmr__.contexts["remix:manifest"]) {
                        let accepted = window.__hmr__.contexts["remix:manifest"].emit(
                          { needsRevalidation, assetsManifest: event.assetsManifest }
                        )

                        if (accepted) {
                          console.log("[HMR] Update accepted by", "remix:manifest")
                          updateAccepted = true
                        }
                      }

                      if (!updateAccepted) {
                        console.log("[HMR] Update rejected, reloading...")
                        window.location.reload()
                      }

                      window.dispatchEvent(new CustomEvent('${
                        LiveReloadEvent.Completed
                      }'))
                    }
                  }

                  ws.onopen = () => {
                    if (config && typeof config.onOpen === "function") {
                      config.onOpen()
                    }

                    window.dispatchEvent(new CustomEvent('${
                      LiveReloadEvent.Connected
                    }'))
                  }

                  ws.onclose = (event) => {
                    if (event.code === 1006) {
                      console.log("Remix dev asset server web socket closed. Reconnecting...")

                      setTimeout(
                        () =>
                          remixLiveReloadConnect({
                            onOpen: () => window.location.reload(),
                          }),
                      ${String(timeoutMs)}
                      )
                    }

                    window.dispatchEvent(new CustomEvent('${
                      LiveReloadEvent.Closed
                    }'))
                  }

                  ws.onerror = (error) => {
                    console.log("Remix dev asset server web socket error:")
                    console.error(error)

                    window.dispatchEvent(new CustomEvent('${
                      LiveReloadEvent.Error
                    }', { detail: error }))
                  }
                }
                remixLiveReloadConnect()
              `,
            }}
          />
        )
      }
