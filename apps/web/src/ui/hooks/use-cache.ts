import useSWR from 'swr'

type UseCacheProps<CacheData> = {
  key: string
  fetcher: () => Promise<CacheData | undefined>
}

export function useCache<CacheData>({ key, fetcher }: UseCacheProps<CacheData>) {
  const { data, error, isLoading, mutate } = useSWR(key, fetcher)

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
