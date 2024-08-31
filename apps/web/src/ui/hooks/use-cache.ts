import useSWR from 'swr'

type UseCacheProps<CacheData> = {
  key: string
  fetcher: () => Promise<CacheData | undefined>
  dependencies?: unknown[]
  isEnabled?: boolean
  initialData?: CacheData
}

export function useCache<CacheData>({
  key,
  fetcher,
  dependencies,
  initialData,
  isEnabled = true,
}: UseCacheProps<CacheData>) {
  const dependenciesQuery = dependencies
    ? dependencies.map((dependency, index) => `dep_${index + 1}=${dependency}`)
    : ''

  const { data, error, isLoading, mutate } = useSWR(
    () => (isEnabled ? `${key}?${dependenciesQuery}` : null),
    fetcher,
    {
      fallbackData: initialData,
    },
  )

  async function mutateCache(data: CacheData) {
    await mutate(data)
  }

  return {
    data,
    error,
    isLoading,
    mutateCache,
  }
}
