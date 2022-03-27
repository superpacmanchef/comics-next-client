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
        <div className="flex flex-col mb-4">
            <DropDown
                onChange={(val) => {
                    updateCurrentPage(parseInt(val.target.value, 10))
                }}
                value={currentPage}
                name=""
            >
                {[...Array(currentTotalPageNo)].map((e, i) => {
                    return <option value={i}>{i + 1}</option>
                })}
            </DropDown>
            <div className="flex flex-row justify-center">
                <div className="w-1/3 px-4 lg:w-40">
                    <MainButton
                        onClick={() => {
                            updateCurrentPage(currentPage - 1)
                        }}
                        styles="w-full"
                        disabled={currentPage === 0}
                    >
                        Prev
                    </MainButton>
                </div>
                <div className="w-1/3 px-4 lg:w-40">
                    <MainButton
                        onClick={() => {
                            updateCurrentPage(currentPage + 1)
                        }}
                        styles="w-full"
                        disabled={
                            currentPage === currentTotalPageNo - 1 ||
                            currentTotalPageNo === 0 ||
                            currentTotalPageNo === 1
                        }
                    >
                        Next
                    </MainButton>
                </div>
            </div>
        </div>
    )
}

export default ComicPageNavigation
