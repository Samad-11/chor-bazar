'use client'

import { getSession } from "@/actions/testAction"
import { Session } from "next-auth"
import { useEffect, useState } from "react"

const Test2Component = () => {
  const [session, setSession] = useState<Session | null>(null)
  useEffect(() => {
    getSession().then((data) => setSession(data))
  }, [])


  return (
    <div>
      <pre>
        {
          JSON.stringify(session?.user, null, 2)
        }
      </pre>
    </div>
  )
}

export default Test2Component