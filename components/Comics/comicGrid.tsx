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
                <div className="grid grid-cols-2 mt-4 space-x-0 sm:grid-cols-3 lg:grid-cols-5">
                    {[...Array(10)].map(() => {
                        return (
                            <div className="px-2 my-2 md:my-5">
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
                    {comics && comics.length > 0 ? (
                        <div className="grid grid-cols-2 mt-4 sm:grid-cols-3 lg:grid-cols-5">
                            {comics.map((comic, index) => {
                                return (
                                    <div
                                        tabIndex={0}
                                        className="px-0 mx-2 my-2 md:my-5"
                                        role="button"
                                        onClick={() => {
                                            updateDisplayModal(true)
                                            updateFocusComic(comic)
                                        }}
                                        onKeyPress={() => {
                                            updateDisplayModal(true)
                                            updateFocusComic(comic)
                                        }}
                                    >
                                        <ComicTile
                                            title={comic.title}
                                            issue_no={comic.issue_no}
                                            img={comic.image}
                                            // eslint-disable-next-line react/no-array-index-key
                                            key={index}
                                        />
                                    </div>
                                )
                            })}
                        </div>
                    ) : (
                        <div className="w-full mx-auto text-2xl text-center">
                            <p>No Comics Found</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default ComicGrid
