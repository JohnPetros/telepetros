import { useRouter } from 'next/navigation'

export function useNavigation() {
  const router = useRouter()

  function navigateTo(route: string) {
    router.push(route)
  }

  return {
    navigateTo,
  }
}
