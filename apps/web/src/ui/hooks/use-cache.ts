import useSWR from 'swr'

type UseCacheProps<CacheData> = {
  key: string
  fetcher: () => Promise<CacheData | undefined>
  initialData?: CacheData
}

export function useCache<CacheData>({
  key,
  fetcher,
  initialData,
}: UseCacheProps<CacheData>) {
  const { data, error, isLoading, mutate } = useSWR(key, fetcher, {
    fallbackData: initialData,
  })

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
