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
        .delete('/api/collectionHandler', {
            data: {
                diamond_id: comic.diamond_id,
            },
        })
        .then((res) => {
            console.log(res.data.collection)
            if (res.data.collection) {
                collectionMutate(res.data.collection)
            }
        })
}
