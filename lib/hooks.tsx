import useSWR from 'swr'

export const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function useUser() {
    const { data, mutate } = useSWR('/api/userHandler', fetcher)

    // if data is not defined, the query has not completed
    const loading = !data
    const user = data?.user
    return [user, { mutate, loading }]
}

export const useCollection = () => {
    const { data, mutate } = useSWR('/api/collectionHandler', fetcher)
    const collectionMutate = mutate
    // if data is not defined, the query has not completed
    const collectionLoading = !data
    let collection = []
    if (data?.collection) {
        collection = data?.collection
    }

    return [collection, { collectionMutate, collectionLoading }]
}

export const usePull = () => {
    const { data, mutate } = useSWR('/api/pullListHandler', fetcher)
    const pullListMutate = mutate
    // if data is not defined, the query has not completed
    const pullListLoading = !data
    let pullList = []
    if (data?.pullList) {
        pullList = data?.pullList
    }

    return [pullList, { pullListMutate, pullListLoading }]
}
