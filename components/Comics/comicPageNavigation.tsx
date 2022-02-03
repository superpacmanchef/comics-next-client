import { current } from '@reduxjs/toolkit'
import DropDown from '../elements/dropDown'
import MainButton from '../elements/mainButton'

type ComicPageNavigationProps = {
    currentPage: number
    updateCurrentPage: (val: number) => void
    currentTotalPageNo: number
}

const ComicPageNavigation = (props: ComicPageNavigationProps) => {
    const { currentPage, updateCurrentPage, currentTotalPageNo } = props
    return (
        <div className="flex flex-col">
            <DropDown
                onChange={(val) => {
                    updateCurrentPage(parseInt(val.target.value, 10))
                }}
                value={currentPage}
                name="Current Page"
            >
                {[...Array(currentTotalPageNo)].map((e, i) => {
                    return <option value={i}>{i + 1}</option>
                })}
            </DropDown>
            <div className="flex flex-row flex-1 mx-auto">
                <MainButton
                    text="Prev"
                    onClick={() => {
                        updateCurrentPage(currentPage - 1)
                    }}
                    styles="px-16 mx-4"
                    disabled={currentPage === 0}
                />
                <MainButton
                    text="Next"
                    onClick={() => {
                        updateCurrentPage(currentPage + 1)
                    }}
                    styles="px-16 mx-4"
                    disabled={currentPage === currentTotalPageNo - 1}
                />
            </div>
        </div>
    )
}

export default ComicPageNavigation
