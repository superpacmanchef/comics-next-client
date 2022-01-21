/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

type ComicTileProps = {
    title: string
    img: string
    issue_no: string
    updateFocusComic: () => void
}

const ComicTile = (props: ComicTileProps) => {
    const { title, img, issue_no, updateFocusComic } = props
    return (
        <div className="bg-gray-800 h-full flex flex-col text-center shadow-lg shadow-gray-500 rounded-md">
            <div className="flex mx-auto mt-6">
                <img
                    alt={`${title} #${issue_no}`}
                    src={img}
                    className="m-auto w-5/6 hover:cursor-pointer hover:scale-110 transition duration-200"
                    onClick={() => {
                        updateFocusComic()
                    }}
                />
            </div>
            <p className="text-sm md:text-xl my-3 md:mt-6 text-white p-4">
                {title} {issue_no !== '' ? `#${issue_no}` : ''}
            </p>
        </div>
    )
}

export default ComicTile
