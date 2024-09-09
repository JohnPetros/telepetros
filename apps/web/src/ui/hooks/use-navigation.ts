'use client'

import { usePathname, useRouter } from 'next/navigation'

export function useNavigation() {
  const router = useRouter()
  const pathname = usePathname()

  function navigateTo(route: string) {
    router.push(route)
  }

  return {
    navigateTo,
    currentRoute: pathname,
  }
}
