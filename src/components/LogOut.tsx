'use client'
import { useTransition } from "react"
import { signOut } from "../app/actions/auth"
import { useRouter } from 'next/navigation'


const LogOut = () => {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleClick = () => {
    startTransition(async () => {
      try {
        await signOut()
        // refresh server components / layout to reflect signed-out state
        router.refresh()
      } catch (err) {
        console.error('Sign out failed', err)
      }
    })
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="flex items-center w-full px-2 py-2 text-sm bg-gray-700 dark:text-gray-300 hover:bg-gray-900 dark:hover:bg-gray-800 rounded-md transition-colors"
    >
      {isPending ? 'Signing out...' : 'Logout'}
    </button>
  )
}

export default LogOut