/* eslint-disable no-param-reassign */
import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import ComicGrid from './comicGrid'
import ComicPageNavigation from './comicPageNavigation'

type ComicComponentProps = {
    chosenWeeksComicsFilter: Comic_ShortBoxed_SplitTitle_Image[] | null
}

const ComicComponent = (props: ComicComponentProps) => {
    const { chosenWeeksComicsFilter } = props

    const [currentPage, updateCurrentPage] = useState(1)
    const [currentPageComics, updateCurrentPageComics] =
        useState<Comic_ShortBoxed_SplitTitle_Image[]>()
    const [currentTotalPageNo, updateCurrentTotalPageNo] = useState(1)
    const [loading, updateLoading] = useState(true)

    const pageChange = useCallback(
        (pageNo: number) => {
            if (chosenWeeksComicsFilter !== null) {
                updateLoading(true)
                updateCurrentPage(pageNo)

                // Get section of array we want to modify
                // shallow copy of array so that it modifies chosen elements in chosenWeeksComics
                const noPerPage = 10
                const subArray = chosenWeeksComicsFilter.slice(
                    pageNo * noPerPage,
                    pageNo * noPerPage + noPerPage
                )

                // Check if image needs to be retrrieved and get it if needed
                const currentPageImages = subArray.flatMap((comic) => {
                    if (comic.image === 'null' || comic.image === null) {
                        return axios
                            .post('/api/pageComics', { comic })
                            .then((res) => res.data)
                            .catch((err) => console.log(err))
                    }
                    return comic.image
                })

                // Add all images required to corespondign elemnts in array
                Promise.all(currentPageImages).then((comics) => {
                    const imageComics = subArray.map((comic, index) => {
                        comic.image = comics[index]
                        return comic
                    })
                    if (imageComics.length > 0) {
                        updateCurrentPageComics(imageComics)
                    } else {
                        updateCurrentPageComics([])
                    }
                    setTimeout(() => {
                        updateLoading(false)
                    }, 300)
                })
            }
        },
        [chosenWeeksComicsFilter]
    )

    useEffect(() => {
        if (chosenWeeksComicsFilter !== null) {
            updateCurrentTotalPageNo(
                Math.ceil(chosenWeeksComicsFilter.length / 10)
            )
            pageChange(0)
        }
    }, [chosenWeeksComicsFilter, pageChange])

    return (
        <div>
            {(chosenWeeksComicsFilter ||
                (currentPageComics && currentPageComics?.length > 0)) && (
                <ComicPageNavigation
                    currentPage={currentPage}
                    updateCurrentPage={(val) => pageChange(val)}
                    currentTotalPageNo={currentTotalPageNo}
                />
            )}
            <ComicGrid comics={currentPageComics} loading={loading} />
            {currentPageComics && currentPageComics?.length > 0 && (
                <ComicPageNavigation
                    currentPage={currentPage}
                    updateCurrentPage={(val) => pageChange(val)}
                    currentTotalPageNo={currentTotalPageNo}
                />
            )}
        </div>
    )
}

export default ComicComponent
