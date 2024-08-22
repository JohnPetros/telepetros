import useSWR from 'swr'

type UseCacheProps<CacheData> = {
  key: string
  fetcher: () => Promise<CacheData | undefined>
}

export function useCache<CacheData>({ key, fetcher }: UseCacheProps<CacheData>) {
  const { data, error, isLoading } = useSWR(key, fetcher)

  return {
    data,
    error,
    isLoading,
  }
}
