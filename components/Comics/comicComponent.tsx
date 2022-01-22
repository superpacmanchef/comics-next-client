import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import ComicGrid from './comicGrid'
import ComicPageNavigation from './comicPageNavigation'

type ComicComponentProps = {
    chosenWeeksComicsFilter: Comic_ShortBoxed_SplitTitle_Image[]
}

const ComicComponent = (props: ComicComponentProps) => {
    const { chosenWeeksComicsFilter } = props

    const [currentPage, updateCurrentPage] = useState(0)
    const [currentPageComics, updateCurrentPageComics] = useState<
        Comic_ShortBoxed_SplitTitle_Image[]
    >([])
    const [currentTotalPageNo, updateCurrentTotalPageNo] = useState(1)

    const pageChange = useCallback(
        (pageNo: number) => {
            updateCurrentPage(pageNo)
            const noPerPage = 10
            const subArray = chosenWeeksComicsFilter.slice(
                pageNo * noPerPage,
                pageNo * noPerPage + noPerPage
            )

            const currentPageMetron = subArray.flatMap((comic) => {
                if (comic.image === null) {
                    return axios
                        .post('/api/pageComics', { comic })
                        .then((res) => res.data)
                }
                return comic.image
            })

            Promise.all(currentPageMetron).then((comics) => {
                const imageComics = subArray.map((comic, index) => {
                    // eslint-disable-next-line no-param-reassign
                    comic.image = comics[index]
                    return comic
                })

                updateCurrentPageComics(imageComics)
            })
        },
        [chosenWeeksComicsFilter]
    )

    useEffect(() => {
        updateCurrentTotalPageNo(Math.ceil(chosenWeeksComicsFilter.length / 10))
        pageChange(0)
    }, [chosenWeeksComicsFilter, pageChange])

    return (
        <div>
            <ComicPageNavigation
                currentPage={currentPage}
                updateCurrentPage={(val) => pageChange(val)}
                currentTotalPageNo={currentTotalPageNo}
            />

            <ComicGrid comics={currentPageComics} />
            <ComicPageNavigation
                currentPage={currentPage}
                updateCurrentPage={(val) => pageChange(val)}
                currentTotalPageNo={currentTotalPageNo}
            />
        </div>
    )
}

export default ComicComponent
