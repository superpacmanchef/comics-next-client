import axios from 'axios'

export default (
    comicTitle: string,
    pullListMutate: ({ pullList }: { pullList: string }) => void
) => {
    axios
        .post('/api/pullListHandler', {
            comic: comicTitle,
        })
        .then((res) => {
            if (res.data.pullList) {
                pullListMutate({
                    pullList: res.data.pullList,
                })
            }
        })
        .catch((err) => console.error(err))
}
