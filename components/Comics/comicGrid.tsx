import { useState } from 'react'
import ComicModal from './comicModal'
import ComicTile from './comicTile'
import LoadingComicTile from './loadingComicTile'

type ComicsGridType = {
    comics: Comic_ShortBoxed_SplitTitle_Image[] | undefined
    loading: boolean
}

const ComicGrid = (props: ComicsGridType) => {
    const { comics, loading } = props

    const [displayModal, updateDisplayModal] = useState(false)
    const [focusComic, updateFocusComic] = useState<
        Comic_ShortBoxed_SplitTitle_Image | undefined
    >()
    return (
        <div>
            {loading ? (
                <div className="grid mt-4 space-x-0 md:grid-cols-3 lg:grid-cols-5   grid-cols-2">
                    {[...Array(10)].map(() => {
                        return (
                            <div className="my-2 md:my-5 px-2">
                                <LoadingComicTile />{' '}
                            </div>
                        )
                    })}
                </div>
            ) : (
                <div>
                    <ComicModal
                        displayModal={displayModal}
                        updateDisplayModal={updateDisplayModal}
                        comic={focusComic}
                    />
                    <div className="grid mt-4 space-x-0 md:grid-cols-3 lg:grid-cols-5 grid-cols-2">
                        {comics &&
                            comics.map((comic, index) => {
                                return (
                                    <div className="my-2 md:my-5 px-2">
                                        <ComicTile
                                            title={comic.title}
                                            issue_no={comic.issue_no}
                                            img={comic.image}
                                            // eslint-disable-next-line react/no-array-index-key
                                            key={index}
                                            updateFocusComic={() => {
                                                updateFocusComic(comic)
                                                updateDisplayModal(true)
                                            }}
                                        />
                                    </div>
                                )
                            })}
                    </div>
                </div>
            )}
        </div>
    )
}

export default ComicGrid
