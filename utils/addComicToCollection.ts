import axios from 'axios'

export default (
    comic: Comic_ShortBoxed_SplitTitle_Image,
    collectionMutate: ({
        collection,
    }: {
        collection: Comic_ShortBoxed_SplitTitle_Image[]
    }) => void
) => {
    axios
        .post('/api/collectionHandler', {
            comic,
        })
        .then((res) => {
            if (res.data.collection) {
                collectionMutate({
                    collection: res.data.collection,
                })
            }
        })
        .catch((err) => console.log(err))
}
