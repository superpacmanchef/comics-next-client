import { useState } from 'react'
import ComicModal from './comicModal'
import ComicTile from './comicTile'

type ComicsGridType = {
    comics: Comic_ShortBoxed_SplitTitle_Image[]
}

const ComicGrid = (props: ComicsGridType) => {
    const { comics } = props

    const [displayModal, updateDisplayModal] = useState(false)
    const [focusComic, updateFocusComic] = useState<
        Comic_ShortBoxed_SplitTitle_Image | undefined
    >()

    return (
        <div>
            <ComicModal
                displayModal={displayModal}
                updateDisplayModal={updateDisplayModal}
                comic={focusComic}
            />

            <div className="grid mt-4 space-x-0 md:grid-cols-5 grid-cols-2">
                {comics.map((comic, index) => {
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
    )
}

export default ComicGrid
