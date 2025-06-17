'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function WidgetManager() {
  const pathname = usePathname()

  useEffect(() => {
    // rutas donde NO queremos el widget
    const excluded = [
      "/login",
      "/register",
      "/user",
      "/products/info",
      "/checkout",
      "/admin/productos",
      "/admin/estadisticas",
      "/admin/pedidos",
      "/admin/usuarios",
      "/gracias",
      // …
    ]

    // si la ruta actual coincide o empieza por una excluida, quitamos
    const isExcluded = excluded.some(route =>
      pathname === route || pathname.startsWith(route + "?")
    )
    if (isExcluded) {
      const old = document.querySelector<HTMLScriptElement>('script[data-my-widget]')
      if (old) old.remove()
      return
    }

    // si ya existe, no hacemos nada
    if (document.querySelector('script[data-my-widget]')) return

    // inyectamos el script
    const script = document.createElement('script')
    script.src = 'https://uniclick-backend.onrender.com/webchat.js'
    script.async = true
    script.setAttribute('data-project-id', '867a239c-340b-46ca-9a81-133b7c33a828-690')
    script.setAttribute('data-backend-url', 'https://uniclick-backend.onrender.com')
    script.setAttribute('data-my-widget', 'true')
    document.body.appendChild(script)

    // sessionId
    let sessionId = sessionStorage.getItem('webchat_sessionId')
    if (!sessionId) {
      sessionId = 'session-' + Math.random().toString(36).substr(2, 9)
      sessionStorage.setItem('webchat_sessionId', sessionId)
    }

    // cleanup: antes de volver a ejecutar o desmontar, lo quitamos
    return () => {
      script.remove()
    }
  }, [pathname])

  return null
}
